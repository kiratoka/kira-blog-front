"use client"

import React, { useState, ChangeEvent, useEffect } from 'react';
import { CloudArrowUpIcon, PhotoIcon, DocumentTextIcon, GlobeAltIcon, EyeSlashIcon, TagIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Tag } from '@/lib/types/modelTypes';
import { Session } from '@/lib/session';
import { useMutation } from '@tanstack/react-query';
import { BACKEND_URL } from '@/lib/constants';
import { PostFormSchema } from '@/lib/zodSchemas/postFormSchema';

interface FormDataLocal {
  title: string;
  content: string;
  thumbnail: File | null;
  isPublished: boolean;
  tags: Tag[]
}

export default function InputCreatePost({ session }: { session: Session | null }) {

  const [previewUrl, setPreviewURl] = useState("")


  const [tagInput, setTagInput] = useState("")


  const [formData, setFormData] = useState<FormDataLocal>({
    title: '',
    content: '',
    thumbnail: null,
    isPublished: false,
    tags: []
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTagInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value)
  }

  const handleAddTag = () => {

    const name = tagInput.trim().toLowerCase()
    if (!name) return

    const existingTags = formData.tags

    const exists = existingTags.some(t => t.name.toLowerCase() === name.toLowerCase());
    if (exists) {
      setTagInput("");
      return;
    }

    const id = crypto.randomUUID()

    setFormData(prev => ({
      ...prev,
      tags: [...(prev.tags ?? []), { id, name }]
    }))

    setTagInput("")

  }

  // Berikut cara agar typenya tidak error:
  // Pastikan state formData.tags sudah ter-definisikan tipenya sebagai array objek { id: string, name: string }
  // handleDeleteTag menerima string (tagId) dan akan filter tag yang bukan dihapus, lalu update state.
  const handleDeleteTag = (tagId: string) => {
    setFormData(prev => ({
      ...prev,
      tags: (prev.tags ?? []).filter(tag => tag.id !== tagId)
    }));
  }


  const handlePublished = (e: React.MouseEvent<HTMLButtonElement>) => {
    setFormData(prev => ({
      ...prev,
      isPublished: !formData.isPublished
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return;



    if (previewUrl) {
      URL.revokeObjectURL(previewUrl); // revoke preview lama sebelum set yang baru
    }

    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX_SIZE) {
      alert("File is too big (max 5MB)")
      e.currentTarget.value = ""
      return
    }

    setFormData(prev => ({ ...prev, thumbnail: file }));

    const url = URL.createObjectURL(file)
    setPreviewURl(url)

  }

  const handleFileDelete = () => {
    setFormData(prev => ({
      ...prev,
      thumbnail: null
    }));
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewURl("");
    }
    // Kenapa harus pake document.getElementById('thumbnail') dan set input.value = ''?
    // Karena kalau lo cuma hapus thumbnail dari state doang, file input di HTML ga bakal ke-reset (nilainya masih nyimpen file lama)
    // Jadi perlu di-set manual value-nya jadi kosong biar user bisa upload file dengan nama/isi yang sama, dan file input-nya fresh lagi.

    const input = document.getElementById('thumbnail') as HTMLInputElement | null;
    if (input) input.value = '';
  }

  const createPostMutation = useMutation({
    mutationFn: async (fd: FormData) => {
      const token = session?.accessToken
      
      // LOG URL LENGKAP
      const fullUrl = `${BACKEND_URL}/post`;
      console.log('Fetching to:', fullUrl);
      console.log('Token:', token ? 'exists' : 'missing');
      console.log('FormData entries:');
      for (let [key, value] of fd.entries()) {
        console.log(key, value);
      }
  
      const response = await fetch(fullUrl, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: fd,
      })
  
      console.log('Response status:', response.status);
      console.log('Response URL:', response.url);
  
      if (!response.ok) {
        const text = await response.text().catch(() => null);
        console.error('Error response:', text);
        throw new Error(text || `HTTP error ${response.status}`);
      }
      return response.json();
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validatedFormData = PostFormSchema.safeParse(formData)
    if (!validatedFormData.success) {
      alert("Form tidak valid. Mohon cek kembali data Anda.");
      return;
    }


    const fd = new FormData()
    fd.append("title", formData.title);
    fd.append("content", formData.content);
    // Udah bener nih bro!
    // Kenapa isPublished jadi String? Karena FormData itu cuma bisa nerima value string aja, jadi kalo lo kirim boolean langsung, nanti datanya ga bakal masuk ke backend yang bener.
    fd.append("published", String(formData.isPublished));

    // Nah, kalo tags di-JSON.stringify, itu karena tags biasanya array (misal ["santai", "tutorial"])
    // FormData juga nggak bisa langsung kirim array, makanya diubah dulu ke string pake JSON.stringify.
    // Nanti backend-nya tinggal parse lagi JSON-nya jadi array.
    fd.append("tags", JSON.stringify(formData.tags));

    if (formData.thumbnail) {
      fd.append("thumbnail", formData.thumbnail, formData.thumbnail.name);
    }


    try {
      await createPostMutation.mutateAsync(fd);
      console.log('Mutation success!');
      // on success: reset form & preview
      setFormData({
        title: "",
        content: "",
        thumbnail: null,
        isPublished: false,
        tags: [],
      });
      if (previewUrl) {
        try {
          URL.revokeObjectURL(previewUrl);
        } catch (e) { }
      }
      setPreviewURl("");
      setTagInput("");
      // optional: show toast or redirect user
      alert("Post berhasil dibuat");
    } catch (err: any) {
      // tampilkan error sederhana
      alert("Gagal membuat post: " + (err?.message ?? "unknown error"));
    }

    
  }
  
  



  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg border-2 border-cyan-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 px-6 py-8 sm:px-8">
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <DocumentTextIcon className="w-8 h-8" />
              Create New Post
            </h1>
            <p className="text-cyan-50 mt-2">Share your thoughts with the world</p>
          </div>

          {/* Form */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Title Input */}
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                Post Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter an engaging title..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all"
              />
            </div>

            {/* Content Textarea */}
            <div>
              <label htmlFor="content" className="block text-sm font-semibold text-gray-700 mb-2">
                Content
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows={10}
                placeholder="Write your content here..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all resize-none"
              />
              <p className="text-sm text-gray-500 mt-2">
                {formData.content.length} characters
              </p>
            </div>

            {/* Tags Input */}
            <div>
              <label htmlFor="tags" className="block text-sm font-semibold text-gray-700 mb-2">
                <TagIcon className="w-4 h-4 inline mr-1" />
                Tags
              </label>
              <div className="space-y-3">
                {/* Input untuk menambah tag */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    id="tags"
                    value={tagInput}
                    onChange={handleTagInput}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault(); // penting
                        handleAddTag();     // tambah tagnya
                      }
                    }}
                    name="tags"
                    placeholder="Add a tag and press Enter..."
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-6 py-3 bg-cyan-500 text-white rounded-lg font-semibold hover:bg-cyan-600 transition-all"
                  >
                    Add
                  </button>
                </div>

                {/* Daftar Tags yang sudah ditambahkan */}
                <div className="flex flex-wrap gap-2">
                  {/* Contoh tag - nanti bisa di-map dari formData.tags */}

                  {formData.tags && formData.tags.map((tag) =>
                    <span key={tag.id} className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-50 text-cyan-700 rounded-full border-2 border-cyan-200 font-medium">
                      <TagIcon className="w-4 h-4" />
                      {tag.name}
                      <button
                        type="button"
                        onClick={() => handleDeleteTag(tag.id)}
                        className="hover:bg-cyan-200 rounded-full p-1 transition-colors"
                      >
                        <XMarkIcon className="w-4 h-4" />
                      </button>
                    </span>
                  )
                  }

                </div>

                {/* Info helper text */}
                <p className="text-sm text-gray-500">
                  Add tags to help people discover your post
                </p>
              </div>
            </div>

            {/* Thumbnail Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Thumbnail Image
              </label>

              <div className="relative">
                {/* Jika sudah ada thumbnail, tampilkan preview */}
                {formData.thumbnail ? (
                  <div className="flex flex-col items-center justify-center w-full bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-4">
                    <img
                      src={typeof formData.thumbnail === "string" ? formData.thumbnail : URL.createObjectURL(formData.thumbnail)}
                      alt="Thumbnail Preview"
                      className="object-contain max-h-48 rounded mb-3"
                    />
                    <div className="flex gap-2">
                      <label htmlFor="thumbnail" className="inline-flex items-center px-4 py-2 bg-cyan-500 text-white rounded-lg font-semibold cursor-pointer hover:bg-cyan-600 transition-all">
                        Ganti Gambar
                        <input
                          type="file"
                          id="thumbnail"
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </label>
                      <button
                        type="button"
                        onClick={handleFileDelete}
                        className="inline-flex items-center px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-all"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <input
                      type="file"
                      id="thumbnail"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <label
                      htmlFor="thumbnail"
                      className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-cyan-500 hover:bg-cyan-50 transition-all"
                    >
                      <CloudArrowUpIcon className="w-12 h-12 text-gray-400 mb-3" />
                      <p className="text-sm font-medium text-gray-600">
                        Click to upload thumbnail
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </label>
                  </>
                )}
              </div>
            </div>

            {/* Publish Toggle */}
            <div className="bg-cyan-50 rounded-lg p-6 border-2 border-cyan-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {formData.isPublished ? (
                    <GlobeAltIcon className="w-6 h-6 text-cyan-600" />
                  ) : (
                    <EyeSlashIcon className="w-6 h-6 text-gray-500" />
                  )}
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {formData.isPublished ? 'Public Post' : 'Draft Post'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {formData.isPublished
                        ? 'This post will be visible to everyone'
                        : 'Save as draft, publish later'}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handlePublished}
                  className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors cursor-pointer ${formData.isPublished ? 'bg-cyan-600' : 'bg-gray-300'
                    }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${formData.isPublished ? 'translate-x-9' : 'translate-x-1'
                      }`}
                  />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="button"
                onClick={handleSubmit}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-cyan-600 hover:to-cyan-700 transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                {formData.isPublished ? 'Publish Post' : 'Save Draft'}
              </button>
            </div>
          </div>
        </div>

        {/* Preview Card */}
        {(formData.title || formData.content || formData.thumbnail || formData.tags) && (
          <div className="mt-8 bg-white rounded-2xl shadow-lg border-2 border-cyan-100 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <PhotoIcon className="w-6 h-6 text-cyan-600" />
              Preview
            </h2>
            <div className="space-y-4">
              {formData.title && (
                <h3 className="text-2xl font-bold text-gray-900">
                  {formData.title}
                </h3>
              )}
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-lg"
                />
              )}
              {formData.tags && formData.tags.map((tag) =>
                <span key={tag.id} className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-50 text-cyan-700 rounded-full border-2 border-cyan-200 font-medium">
                  <TagIcon className="w-4 h-4" />
                  {tag.name}
                </span>
              )}

              {formData.content && (
                <p className="text-gray-700 whitespace-pre-wrap">
                  {formData.content}
                </p>
              )}
            </div>


            {/*  PREVIEW CARD END*/}
          </div>
        )}

      </div>
    </div>
  );
}
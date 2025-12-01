"use client"

import React, { useState, ChangeEvent } from 'react';
import { CloudArrowUpIcon, DocumentTextIcon, GlobeAltIcon, EyeSlashIcon, TagIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Tag } from '@/lib/types/modelTypes';
import { Session } from '@/lib/session';
import { useMutation } from '@tanstack/react-query';
import { BACKEND_URL } from '@/lib/constants';
import { PostFormSchema } from '@/lib/zodSchemas/postFormSchema';
import PreviewCard from './PreviewCard';
import ErrorAlert from './ErrorAlert';
import PublishToggle from './PublishToggle';
import ThumbnailUploader from './ThumbnailUploader';
import TagInput from './TagInput';
import ContentInput from './ContentInput';
import TitleInput from './TitleInput';
import SubmitPostButton from './SubmitPostButton';

interface FormDataLocal {
  title: string;
  content: string;
  thumbnail: File | null;
  isPublished: boolean;
  tags: Tag[]
}

export default function InputCreatePost({ session }: { session: Session | null }) {

  const [previewUrl, setPreviewURl] = useState("")
  const [open, setOpen] = useState(false)

  const [tagInput, setTagInput] = useState("")
  const [errorMessages, setErrorMessages] = useState<{ message: string }[]>([])

  const [formData, setFormData] = useState<FormDataLocal>({
    title: '',
    content: '',
    thumbnail: null,
    isPublished: false,
    tags: []
  });

  const user = session!.user

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

    const id = crypto.randomUUID();
    setFormData(prev => ({
      ...prev,
      tags: [...(prev.tags ?? []), { id, name }]
    }))
    setTagInput("")
  }

  const handleDeleteTag = (tagId: string) => {
    setFormData(prev => ({
      ...prev,
      tags: (prev.tags ?? []).filter(tag => tag.id !== tagId)
    }));
  }


  const handlePublished = () => {
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
    const input = document.getElementById('thumbnail') as HTMLInputElement | null;
    if (input) input.value = '';
  }

  const createPostMutation = useMutation({
    mutationFn: async (fd: FormData) => {
      const token = session?.accessToken
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
    e.preventDefault();

    const validatedFormData = PostFormSchema.safeParse(formData)
    if (!validatedFormData.success) {
      const zodError = validatedFormData.error.issues.map(
        (issue: { message: string }) => issue.message
      );
      setErrorMessages(zodError.map(message => ({ message })));
      setOpen(true)
      return;
    }

    const fd = new FormData()
    fd.append("title", formData.title);
    fd.append("content", formData.content);
    fd.append("published", String(formData.isPublished));
    fd.append("tags", JSON.stringify(formData.tags));
    if (formData.thumbnail) {
      fd.append("thumbnail", formData.thumbnail, formData.thumbnail.name);
    }

    try {
      await createPostMutation.mutateAsync(fd);
      console.log('Mutation success!');
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
      alert("Post berhasil dibuat");
    } catch (err: any) {
      alert("Gagal membuat post: " + (err?.message ?? "unknown error"));
    }
  }

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg border-2 border-cyan-100 overflow-hidden">
          <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 px-6 py-8 sm:px-8">
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <DocumentTextIcon className="w-8 h-8" />
              Create New Post
            </h1>
            <p className="text-cyan-50 mt-2">Share your thoughts with the world</p>
          </div>
          <div className="p-6 sm:p-8 space-y-6">
            <TitleInput
              title={formData.title}
              handleInputChange={handleInputChange} />

            <ContentInput
              content={formData.content}
              handleInputChange={handleInputChange} />

            <TagInput
              tags={formData.tags}
              handleAddTag={handleAddTag}
              handleDeleteTag={handleDeleteTag}
              tagInput={tagInput}
              handleTagInput={handleTagInput} />

            <ThumbnailUploader
              thumbnail={formData.thumbnail}
              handleFileChange={handleFileChange}
              handleFileDelete={handleFileDelete} />

            <PublishToggle
              isPublished={formData.isPublished}
              handlePublished={handlePublished} />

            <SubmitPostButton
              isPublished={formData.isPublished}
              handleSubmit={handleSubmit} />
          </div>
        </div>

        <PreviewCard
          formData={formData}
          previewUrl={previewUrl}
          user={user} />

        <ErrorAlert
          open={open}
          setOpen={setOpen}
          errorMessages={errorMessages}
          setErrorMessages={setErrorMessages} />

      </div>
    </div>
  );
}
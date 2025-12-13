"use client"

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

import { Session } from '@/lib/session'
import { Post, Tag } from '@/lib/types/modelTypes'
import { PostFormSchema } from '@/lib/zodSchemas/postFormSchema';
import { CloudArrowUpIcon, DocumentTextIcon, EyeSlashIcon, GlobeAltIcon, PhotoIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { useMutation } from '@tanstack/react-query';
import { TagIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react'


interface FormDataLocal {
    id: number
    title: string;
    content: string;
    thumbnail: File | null | string;
    isPublished: boolean;
    tags?: Tag[]
    path?: string
}


const UpdatePost = ({ session, post }: { session: Session, post: Post }) => {

    const router = useRouter()

    const [previewUrl, setPreviewURl] = useState("")


    const [tagInput, setTagInput] = useState("")


    // Jawaban lewat komentar:
    // Karena nilai 'thumbnail' yang datang dari database (post.thumbnail) biasanya berupa string (misal URL path/filename), 
    // sementara state FormDataLocal.thumbnail maunya File/null (karena mau kirim file di FormData), 
    // maka untuk HTML-nya saran saya:
    // - Simpan thumbnail asli (string URL/filepath) di state terpisah, misal originalThumbnail.
    // - Di UI, kalau originalThumbnail ada, tampilkan preview-nya (pakai <img src=...>), dan beri tombol 'hapus/replace'.
    // - Thumbnail baru hanya bisa diambil dari file input, bukan langsung isi FormData dari string.
    // - Kalau user upload file baru, simpan di formData.thumbnail, dan hapus originalThumbnail dari preview.
    // - Saat submit, kalau formData.thumbnail ada, kirim file baru; kalau tidak, bisa kirim field info bahwa thumbnail tidak diubah.

    // Implementasinya contoh seperti ini (pseudocode):

    // State tambahan untuk menampung thumbnail awal dari db (string URL), 
    // sedangkan file input tetap pakai formData.thumbnail (tipe File/null)
    const [formData, setFormData] = useState<FormDataLocal>({
        id: post.id,
        title: post.title,
        content: post.content,
        thumbnail: post.thumbnail, // Jangan isi dari post.thumbnail karena tipenya bukan File, biar user upload ulang kalau ingin ganti
        isPublished: post.published,
        tags: post.tags ?? [],
        path: post.path ?? ""
    });



    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

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

        const exists = existingTags?.some(t => t.name.toLowerCase() === name.toLowerCase());
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
        // Kenapa harus pake document.getElementById('thumbnail') dan set input.value = ''?
        // Karena kalau lo cuma hapus thumbnail dari state doang, file input di HTML ga bakal ke-reset (nilainya masih nyimpen file lama)
        // Jadi perlu di-set manual value-nya jadi kosong biar user bisa upload file dengan nama/isi yang sama, dan file input-nya fresh lagi.

        const input = document.getElementById('thumbnail') as HTMLInputElement | null;
        if (input) input.value = '';
    }

    const updatePostMutation = useMutation({
        mutationFn: async (fd: FormData) => {
            const token = session?.accessToken

            // LOG URL LENGKAP
            const fullUrl = `${backendUrl}/post`;
            console.log('Fetching to:', fullUrl);
            console.log('Token:', token ? 'exists' : 'missing');
            console.log('FormData entries:');


            const response = await fetch(fullUrl, {
                method: "PATCH",
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
            const errorMessages = validatedFormData.error.issues.map(
                (issue: { message: string }) => issue.message
            );
            alert("Error:\n" + errorMessages.join("\n"));
            return;
        }


        const fd = new FormData()
        fd.append("id", String(formData.id))
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
            if (typeof formData.thumbnail === "string") {
                fd.append("thumbnail", formData.thumbnail);
            } else {
                fd.append("thumbnail", formData.thumbnail, formData.thumbnail.name);
            }
        }

        if (formData.path) {
            fd.append("path", formData.path)
        }

        try {
            await updatePostMutation.mutateAsync(fd);
            console.log('Mutation success!');
            // on success: reset form & preview
            setFormData({
                id: post.id,
                title: "",
                content: "",
                thumbnail: null,
                isPublished: false,
                tags: [],
            });
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
            setPreviewURl("");
            setTagInput("");
            // optional: show toast or redirect user
            alert("Post successfully created");
        } catch (err) {
            // tampilkan error sederhana
            if (err instanceof Error) {
                alert("Failed to update post: " + err.message);
            } else if (typeof err === "object" && err !== null && "message" in err) {
                alert("Failed to create post: " + String((err as { message: unknown }).message));
            } else {
                alert("Failed to create post: unknown error");
            }
        }


    }


    const deleteMutation = useMutation({
        mutationFn: async () => {
            const token = session.accessToken
            const postId = post.id
            const path = formData.path
            const response = await fetch(`${backendUrl}/post`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ postId, path })

            })

            if (!response.ok) {
                const text = await response.text().catch(() => null);
                console.error('Error response delete:', text);
                throw new Error(text || `HTTP error ${response.status}`);
            }

            return response.json()
        }
    })

    const handleDeletePost = async () => {
        try {
            await deleteMutation.mutateAsync();
            router.push("/user/posts")
        }
        catch (err) {
            if (err instanceof Error) {
                alert("Failed to delete post: " + err.message);
            } else if (typeof err === "object" && err !== null && "message" in err) {
                alert("Failed to delete post: " + String((err as { message: unknown }).message));
            } else {
                alert("Failed to delete post: unknown error");
            }
            console.error('Error when deleting post:', err);
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

                        {/* Action & Delete Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="flex-1 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-cyan-600 hover:to-cyan-700 transition-all shadow-md hover:shadow-lg cursor-pointer"
                            >
                                {formData.isPublished ? 'Publish Post' : 'Save Draft'}
                            </button>

                            {/* Delete Button */}
                            <Dialog>
                                <DialogTrigger asChild>
                                    <button
                                        type="button"
                                        className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg cursor-pointer"
                                    >
                                        Delete Post
                                    </button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Are you sure you want to delete this post?</DialogTitle>
                                        <DialogDescription>
                                            This action cannot be undone. This will permanently delete your post.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="flex justify-end gap-2 pt-4">
                                        <DialogClose asChild>
                                            <button
                                                type="button"
                                                className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50"
                                            >
                                                Cancel
                                            </button>
                                        </DialogClose>
                                        <button
                                            type="button"
                                            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                                            onClick={handleDeletePost}
                                        >
                                            Yes, Delete
                                        </button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                        {/* ACTION BUTTONS END */}
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
                                    <h1>{tag.id}</h1>
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
    )
}

export default UpdatePost
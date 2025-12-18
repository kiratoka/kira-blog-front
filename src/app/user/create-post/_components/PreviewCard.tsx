"use client"


import { Tag } from '@/lib/types/modelTypes'
import { Calendar, Eye, Share2 } from "lucide-react"
import { TagIcon } from '@heroicons/react/24/outline'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import SanitizedContent from '@/app/blog/[slug]/[id]/_components/SanitizedContent'
import { SessionUser } from '@/lib/session'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { serialize } from "next-mdx-remote/serialize"

import type { MDXRemoteSerializeResult } from "next-mdx-remote";


// NOTE: We'll use dangerouslySetInnerHTML as done in the real article page.
//      (for live preview, it's expected you directly render the raw HTML; if you want, you could also use the SanitizedContent component)
interface PreviewCardProps {
    formData: {
        title: string;
        content: string;
        thumbnail: File | null | string;
        isPublished: boolean;
        tags: Tag[]
        path?: string
    }
    previewUrl: string 
    user: SessionUser
}

const PreviewCard: React.FC<PreviewCardProps> = ({ formData, previewUrl, user }) => {



    const [compiled, setCompiled] = useState<MDXRemoteSerializeResult<Record<string, unknown>> | null>(null)

    // ERROR PENYEBAB DAN PENJELASAN:
    // Error ini terjadi karena di React, hooks seperti useState/useEffect TIDAK BOLEH Ditaruh di bawah percabangan/conditional rendering!
    // if (!hasContent) return null
    // menyebabkan:
    // - kadang hooks di bawah tidak pernah dieksekusi (urutan pemanggilan hooks berubah-ubah saat render)
    // - ini menghasilkan error: "Rendered more hooks than during the previous render."
    // BACAAN: https://react.dev/reference/react/useState#storing-information-from-previous-renders

    // Cara memperbaikinya:
    // - LARANGAN: Jangan pernah letakkan return/null sebelum semua hooks dijalankan (jangan beri conditional render sebelum hooks)
    // - Solusi: Jalankan semua hooks tanpa kondisi, lalu baru conditional rendering isi komponen di dalam return (bukan di dalam logika utama)

    // Jadi, ubah menjadi seperti ini:
    const hasContent = formData.title
        || formData.content
        || previewUrl
        || (formData.tags && formData.tags.length > 0);

    // ... hooks tetap selalu berjalan

    // Di bagian return nanti, lakukan conditional rendering:
    // return (!hasContent ? null : <div> ... </div> )
    // (atau dengan && operator di dalam return)


    // For dummy author display
    const author = {
        name: user.name,
        avatar: user.avatar,
    }
    // Fake current date for preview
    const postDate = new Date()


    useEffect(() => {

        async function compile() {


            const mdxSource = await serialize(formData.content)
            setCompiled(mdxSource)
        }

        compile()
    }, [formData.content])


    return (
        <div className="mt-8 bg-gradient-to-br from-slate-50 via-cyan-50/30 to-blue-50/30 rounded-3xl shadow-xl border border-cyan-100 overflow-hidden max-w-4xl mx-auto">
            {/* Hero Image */}
            <div className="relative w-full h-60 sm:h-96 bg-gradient-to-br from-cyan-400 to-blue-500 overflow-hidden">
                {previewUrl ? (
                    <img
                        src={previewUrl}
                        alt="Preview Thumbnail"
                        className="w-full h-full object-cover opacity-90"
                    />
                ) : (
                    // Tampilkan string url dari formData.thumbnail jika tersedia dan bertipe string
                    (typeof formData.thumbnail === "string" && formData.thumbnail) && (
                        <img
                            src={formData.thumbnail}
                            alt="Preview Thumbnail"
                            className="w-full h-full object-cover opacity-90"
                        />
                    )
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            {/* Content Section */}
            <div className="p-6 sm:p-8">
                {/* Title */}
                {formData.title && (
                    <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-800 leading-tight">
                        {formData.title}
                    </h1>
                )}
                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-4 mb-6 pb-4 border-b border-cyan-100">
                    <div className="flex items-center gap-2 text-slate-600">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center overflow-hidden">
                            {/* No avatar in preview, fallback only */}
                            <Avatar className="w-9 h-9">
                                {author.avatar ? (
                                    <Image
                                        src={author.avatar}
                                        alt={author.name!}
                                        className="w-full h-full object-cover"
                                        fill
                                        sizes="36px"
                                    />
                                ) : (
                                    <AvatarFallback>
                                        {author.name!
                                            .split(' ')
                                            .map(word => word[0])
                                            .join('')
                                            .toUpperCase()
                                            .slice(0, 2)}
                                    </AvatarFallback>
                                )}
                            </Avatar>
                        </div>
                        <span className="font-medium">{author.name}</span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                        <Calendar className="w-4 h-4" />
                        {postDate.toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                        })}
                    </div>
                </div>
                {/* Tags */}
                {formData.tags && formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {formData.tags.map((tag) => (
                            <span
                                key={tag.id}
                                className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-50 text-cyan-700 rounded-full border border-cyan-200 font-medium text-sm"
                            >
                                <TagIcon className="w-4 h-4" />
                                {tag.name}
                            </span>
                        ))}
                    </div>
                )}

                {/* Article Content */}
                {formData.content && (
                    <div className="prose prose-slate prose-lg max-w-none mb-8">
                        {compiled ?

                            <SanitizedContent className='text-slate-700 leading-relaxed' content={formData.content} />
                            :
                            <div className="prose text-slate-400">Loading preview...</div>
                        }
                    </div>
                )}

                {/* Interaction Bar */}
                <div className="flex flex-wrap items-center gap-4 py-3 border-t border-cyan-100">
                    <button
                        disabled
                        className="flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-cyan-50 to-blue-50 text-slate-400 cursor-not-allowed"
                        title="Disabled in preview"
                    >
                        <Eye className="w-5 h-5" />
                        <span className="text-sm font-medium">0 Views</span>
                    </button>
                    <button
                        disabled
                        className="flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-cyan-50 to-blue-50 text-slate-400 cursor-not-allowed"
                        title="Disabled in preview"
                    >
                        <Share2 className="w-5 h-5" />
                        <span className="text-sm font-medium">Share</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PreviewCard
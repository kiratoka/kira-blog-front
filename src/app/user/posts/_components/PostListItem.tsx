import { Post } from "@/lib/types/modelTypes";
import { CheckCircleIcon, HeartIcon, ChatBubbleLeftIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon as CheckCircleIconSolid } from "@heroicons/react/24/solid";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  post: Post;
};

const PostListItem = ({ post }: Props) => {
  return (
    <div className="group relative bg-white/80 backdrop-blur-sm border border-cyan-100 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-1">
      {/* Gradient Border Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />

      <div className="relative bg-white/95 backdrop-blur rounded-2xl p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          {/* Thumbnail */}
          <div className="relative w-full lg:w-48 h-48 lg:h-32 flex-shrink-0 rounded-xl overflow-hidden bg-gradient-to-br from-cyan-50 to-blue-50">
            <Image
              src={post.thumbnail || "/no-image.png"}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            {/* Cyber Corner Accent */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-400" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 space-y-3">
            {/* Title */}
            <h3 className="text-xl font-bold text-slate-800 line-clamp-2 group-hover:text-cyan-600 transition-colors">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
              {post.content}
            </p>

            {/* Metadata Grid */}
            <div className="flex flex-wrap gap-4 lg:gap-6 pt-2">
              {/* Date */}
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                <span className="text-slate-600 font-medium">
                  {new Date(post.createdAt).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </span>
              </div>

              {/* Published Status */}
              <div className="flex items-center gap-2">
                {post.published ? (
                  <>
                    <CheckCircleIconSolid className="w-5 h-5 text-cyan-500" />
                    <span className="text-sm text-cyan-600 font-medium">Published</span>
                  </>
                ) : (
                  <>
                    <CheckCircleIcon className="w-5 h-5 text-slate-400" />
                    <span className="text-sm text-slate-500 font-medium">Draft</span>
                  </>
                )}
              </div>

              {/* Likes */}
              <div className="flex items-center gap-2 bg-gradient-to-r from-cyan-50 to-transparent px-3 py-1 rounded-full">
                <HeartIcon className="w-5 h-5 text-cyan-500" />
                <span className="text-sm font-semibold text-slate-700">{post._count.likes}</span>
              </div>

              {/* Comments */}
              <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-transparent px-3 py-1 rounded-full">
                <ChatBubbleLeftIcon className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-semibold text-slate-700">{post._count.comments}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex lg:flex-col justify-end lg:justify-center items-center gap-2">
            {/* View Button */}
            <Link
              href={`/blog/${post.slug}/${post.id}`}
              className="group/btn relative px-4 py-2 lg:px-6 lg:py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-medium shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center gap-2">
                <EyeIcon   className="w-5 h-5" />
                <span className="hidden sm:inline">View</span>
              </div>
              {/* Shine Effect */}
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 skew-x-12" />
            </Link>
            {/* Edit Button */}
            <Link
              href={`/user/posts/${post.id}/update`}
              className="group/btn relative px-4 py-2 lg:px-6 lg:py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-medium shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center gap-2">
                <PencilSquareIcon className="w-5 h-5" />
                <span className="hidden sm:inline">Edit</span>
              </div>
              {/* Shine Effect */}
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 skew-x-12" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};


export default PostListItem;
import { Post } from "@/lib/types/modelTypes";

import Pagination from "@/components/Pagination";
import PostListItem from "./PostListItem";

type Props = {
  posts: Post[];
  currentPage: number;
  totalPages: number;
};

const PostList = ({ posts, currentPage, totalPages }: Props) => {
  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Header with Futuristic Design */}
      <div className="relative bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 p-[2px] rounded-2xl shadow-xl shadow-cyan-500/20">
        <div className="bg-white rounded-2xl p-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full" />
            <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Content Overview
            </h2>
          </div>
        </div>
      </div>

      {/* Post List */}
      <div className="space-y-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostListItem post={post} key={post.id} />
          ))
        ) : (
          <div className="text-center py-16 bg-white/80 backdrop-blur rounded-2xl border border-cyan-100">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-100 to-blue-100 flex items-center justify-center">
              <svg className="w-10 h-10 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-slate-600 text-lg font-medium">No posts available</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {posts.length > 0 && (
        <div className="flex justify-center pt-8">
          <Pagination currentPage={currentPage} totalPages={totalPages} className="my-4" />
        </div>
      )}
    </div>
  );
};

export default PostList;
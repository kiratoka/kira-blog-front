"use client";
import { getPostComments } from "@/lib/actions/commentActions";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { SessionUser } from "@/lib/session";
import { MessageCircle, RefreshCw } from "lucide-react";

import CommentCard from "./CommentCard";
import CommentPagination from "./CommentPagination";
import CommentCardSkeleton from "./CommentCardSkeleton";
import AddComment from "./AddComment";

type Props = {
  postId: number;
  user?: SessionUser;
};

const Comments = ({ postId, user }: Props) => {
  const [page, setPage] = useState(1);

  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: ["GET_POST_COMMENTS", postId, page],
    queryFn: async () =>
      await getPostComments({
        postId,
        skip: (page - 1) * DEFAULT_PAGE_SIZE,
        take: DEFAULT_PAGE_SIZE,
      }),
  });

  const totalPages = Math.ceil((data?.count ?? 0) / DEFAULT_PAGE_SIZE);
  const commentCount = data?.count ?? 0;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-cyan-100 overflow-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-cyan-50 via-blue-50 to-cyan-50 px-6 py-5 border-b border-cyan-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">
                Comments
              </h3>
              <p className="text-sm text-slate-500">
                {commentCount} {commentCount === 1 ? 'comment' : 'comments'}
              </p>
            </div>
          </div>
          
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="p-2 rounded-lg bg-white border border-cyan-200 hover:bg-cyan-50 hover:border-cyan-300 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Refresh comments"
          >
            <RefreshCw 
              className={`w-5 h-5 text-cyan-600 group-hover:text-cyan-700 transition-all duration-300 ${
                isFetching ? 'animate-spin' : ''
              }`} 
            />
          </button>
        </div>
      </div>

      {/* Add Comment Section */}
      {!!user && (
        <div className="p-6 border-b border-cyan-100 bg-gradient-to-br from-white to-cyan-50/20">
          <AddComment user={user} postId={postId} refetch={refetch} />
        </div>
      )}

      {/* Comments List */}
      <div className="p-6">
        {isLoading ? (
          <div className="flex flex-col gap-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <CommentCardSkeleton key={index} />
            ))}
          </div>
        ) : data?.comments && data.comments.length > 0 ? (
          <div className="flex flex-col gap-4">
              {data.comments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-100 to-blue-100 flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-10 h-10 text-cyan-400" />
            </div>
            <h4 className="text-lg font-semibold text-slate-700 mb-2">
              No comments yet
            </h4>
            <p className="text-slate-500 text-sm">
              Be the first to share your thoughts!
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 pb-6">
          <CommentPagination
            className="flex justify-center"
            currentPage={page}
            setCurrentPage={(p) => setPage(p)}
            totalPages={totalPages}
          />
        </div>
      )}
    </div>
  );
};

export default Comments;
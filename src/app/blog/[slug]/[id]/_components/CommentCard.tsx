
import { CommentEntity } from "@/lib/types/modelTypes";

import { Clock } from "lucide-react";
import Image from "next/image";

type Props = {
  comment: CommentEntity;
};

const CommentCard = ({ comment }: Props) => {


  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="group relative bg-white rounded-2xl p-6 border border-slate-200/60 hover:border-cyan-300 transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] overflow-hidden">
      {/* Animated gradient border effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-cyan-500/10 pointer-events-none" />

      <div className="relative flex gap-4">
        {/* Avatar with glassmorphism effect */}
        <div className="relative flex-shrink-0">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
          <div className="relative w-11 h-11 ring-2 ring-white shadow-lg group-hover:ring-cyan-300 transition-all duration-300 rounded-full overflow-hidden">
            {comment.author.avatar ? (
              <Image
                src={comment.author.avatar}
                alt={comment.author.name}
                fill
                sizes="44px"
                className="object-cover w-11 h-11 rounded-full"
                style={{ objectFit: "cover" }}
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-500 text-white font-bold text-sm rounded-full">
                {getInitials(comment.author.name)}
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-3">
          {/* Header */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <h4 className="font-semibold text-slate-900 truncate group-hover:text-cyan-600 transition-colors duration-300">
                {comment.author.name}
              </h4>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 flex-shrink-0">
                <Clock className="w-3 h-3" />
                <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Comment text */}
          <p className="text-slate-700 leading-relaxed text-[15px]">
            {comment.content}
          </p>



        </div>
      </div>

      {/* Decorative gradient line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
};

export default CommentCard;
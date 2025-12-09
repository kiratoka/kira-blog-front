import { Post } from "@/lib/types/modelTypes";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, CalendarIcon } from "@heroicons/react/24/outline";

type Props = Partial<Post>;

const PostCard = ({
  id,
  title,
  slug,
  thumbnail,
  content,
  createdAt,
}: Props) => {
  return (
    <Link 
      href={`/blog/${slug}/${id}`} 
      className="group block h-full"
    >
      <div className="relative h-full bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-cyan-100 shadow-lg hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 hover:-translate-y-2 flex flex-col">
        {/* Gradient Border Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />
        
        {/* Thumbnail Container */}
        <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden bg-gradient-to-br from-cyan-50 to-blue-50">
          <Image 
            src={thumbnail ?? "/no-image.png"} 
            alt={title ?? ""} 
            fill 
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
          
          {/* Cyber Corner Accents */}
          <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-60" />
          
          {/* Floating Date Badge */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md rounded-xl px-3 py-2 shadow-lg border border-cyan-100">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-cyan-500" />
              <span className="text-xs font-semibold text-slate-700">
                {new Date(createdAt ?? "").toLocaleDateString('id-ID', { 
                  day: 'numeric', 
                  month: 'short', 
                  year: 'numeric' 
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="relative flex-grow p-5 sm:p-6 flex flex-col bg-white/95 backdrop-blur">
          {/* Decorative Line */}
          <div className="h-1 w-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mb-4" />
          
          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold text-slate-800 break-words line-clamp-2 group-hover:text-cyan-600 transition-colors duration-300 mb-3">
            {title}
          </h3>
          
          {/* Excerpt */}
          <p className="text-sm sm:text-base text-slate-600 break-words line-clamp-3 leading-relaxed flex-grow">
            {content?.slice(0, 120)}...
          </p>
          
          {/* Read More Button */}
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-2 text-cyan-600 font-semibold group-hover:gap-3 transition-all duration-300">
              <span className="text-sm sm:text-base">Read More</span>
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
            
            {/* Animated Dots */}
            <div className="flex gap-1.5">
              <div className="w-2 h-2 bg-cyan-400 rounded-full group-hover:animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-blue-400 rounded-full group-hover:animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-cyan-400 rounded-full group-hover:animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
          
          {/* Bottom Shine Effect */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Cyber Grid Overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }} />
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
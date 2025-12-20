import { fetchPostById } from "@/lib/actions/postActions";
import Image from "next/image";
import SanitizedContent from "./_components/SanitizedContent";
import Comments from "./_components/Comments";
import { getSession } from "@/lib/session";
import Like from "./_components/Like";
import { Calendar, Share2 } from "lucide-react";



type Props = {
  params: {
    id: string;
  };
};
const PostPage = async ({ params }: Props) => {
  const postId = (await params).id;
  const post = await fetchPostById(+postId);
  const session = await getSession();

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50/30 to-blue-50/30">
      <div className="container mx-auto md:px-4 py-8 max-w-4xl">
        {/* Header Section */}
        <article className="bg-white rounded-3xl shadow-xl overflow-hidden border border-cyan-100">
          {/* Hero Image */}
          <div className="relative w-full h-96 bg-gradient-to-br from-cyan-400 to-blue-500 overflow-hidden">
            {post.thumbnail &&
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-full h-full object-cover opacity-90"
              />

            }
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>

          {/* Content Section */}
          <div className="md:p-8 lg:p-12">
            {/* Title */}
            <h1 className="text-4xl max-md:px-4 py-8 lg:text-5xl font-bold mb-6 text-slate-800 leading-tight">
              {post.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-cyan-100 max-md:px-4">
              <div className="flex items-center gap-2 text-slate-600">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center overflow-hidden">
                  {post.author.avatar ? (
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        width={40}
                        height={40}
                        className="object-cover w-10 h-10"
                      />
                    </div>
                  ) : (
                    <span className="text-white font-semibold text-lg">
                      {post.author.name.charAt(0)}
                    </span>
                  )}
                </div>
                <span className="font-medium">{post.author.name}</span>
              </div>

              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <Calendar className="w-4 h-4" />
                {new Date(post.createdAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>



            </div>

            {/* Article Content */}
            <div className="prose prose-slate prose-lg max-w-none mb-8">
              <SanitizedContent
                content={post.content}
                className="text-slate-700 leading-relaxed"
              />
            </div>

            {/* Interaction Bar */}
            <div className="max-md:px-4 flex items-center gap-4 py-6 border-y border-cyan-100">
              <Like
                postId={post.id}
                user={session?.user}
              />

              <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-50 to-blue-50 hover:from-cyan-100 hover:to-blue-100 transition-all duration-300 group">
                <Share2 className="w-5 h-5 text-slate-600 group-hover:text-cyan-600 transition-colors" />
                <span className="text-sm font-medium text-slate-700">Share</span>
              </button>
            </div>
          </div>
        </article>

        {/* Comments Section */}
        <div className="mt-8">
          <Comments
            user={session?.user}
            postId={post.id}
          />
        </div>
      </div>
    </div>
  );
};

export default PostPage;
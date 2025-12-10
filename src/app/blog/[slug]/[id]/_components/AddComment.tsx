import SubmitButton from "@/components/SubmitButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { saveComment } from "@/lib/actions/commentActions";
import { SessionUser } from "@/lib/session";
import { CommentEntity } from "@/lib/types/modelTypes";
import { cn } from "@/lib/utils";
import { Dialog } from "@radix-ui/react-dialog";
import { RefetchOptions, QueryObserverResult } from "@tanstack/react-query";
import { MessageSquarePlus, Send, Sparkles } from "lucide-react";
import { useActionState, useEffect, useState } from "react";

import { toast } from "sonner";



type Props = {
  postId: number;
  user: SessionUser;
  className?: string;
  refetch: (options?: RefetchOptions) => Promise<
    QueryObserverResult<
      {
        comments: CommentEntity[];
        count: number;
      },
      Error
    >
  >;
};
const AddComment = (props: Props) => {
  const [state, action] = useActionState(saveComment, undefined);
  const [open, setOpen] = useState(false);



  // Maksud warning ini: React Hook useEffect membutuhkan daftar dependensi yang tepat agar efek dijalankan secara benar.
  // Jika kita menggunakan props di dalam useEffect, idealnya yang dimasukkan ke dependency array adalah property yang benar-benar dipakai
  // bukan keseluruhan object props, karena props akan berubah setiap ada update prop apapun, sehingga useEffect bisa berjalan terlalu sering.
  // Cara mengatasinya: destruktur properti yang dipakai (misal refetch) dari props sebelum useEffect, lalu gunakan variabel tersebut di useEffect dan masukkan ke dependency array.
  const { refetch } = props;

  useEffect(() => {
    if (state?.message) {
      // Menampilkan pesan toast hanya dengan string
      toast(`${state?.ok ? "Success: " : "Oops: "}${state?.message}`);
    }
    if (state?.ok) {
      setOpen(false);
      refetch();
    }
  }, [state, refetch]);
  return (
    <Dialog open={open} onOpenChange={(o) => setOpen(o)}>
      <DialogTrigger asChild>
        <Button className="group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          <span className="relative flex items-center gap-2">
            <MessageSquarePlus className="w-5 h-5" />
            Leave Your Comment
          </span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[550px] p-0 gap-0 bg-gradient-to-br from-white to-cyan-50/30 border-2 border-cyan-200 rounded-2xl overflow-hidden">
        <div className="relative bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-5 text-white">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
          <DialogTitle className="relative text-2xl font-bold flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Sparkles className="w-6 h-6" />
            </div>
            Write Your Comment
          </DialogTitle>
          <p className="relative text-cyan-50 text-sm mt-2">Share your thoughts with the community</p>
        </div>

        <form action={action} className={cn("p-6 space-y-5", props.className)}>
          <input hidden name="postId" defaultValue={props.postId} />

          <div className="space-y-3">
            <Label htmlFor="content" className="text-slate-700 font-semibold flex items-center gap-2">
              <MessageSquarePlus className="w-4 h-4 text-cyan-600" />
              Your Comment
            </Label>

            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl opacity-0 group-focus-within:opacity-100 transition duration-300" />
              <div className="relative bg-white rounded-xl border-2 border-slate-200  transition-all duration-300 overflow-hidden">
                <Textarea
                  id="content"
                  name="content"
                  placeholder="What are your thoughts?"
                  className="min-h-[140px] border-none focus-visible:ring-0 shadow-none resize-none text-slate-700 placeholder:text-slate-400 p-4"
                />
                {!!state?.errors?.content && (
                  <div className="px-4 pb-3">
                    <p className="text-red-500 text-sm font-medium animate-shake flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                      {state.errors.content}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-xl px-4 py-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src={props.user.avatar} alt={props.user.name} />
                <AvatarFallback>
                  {props.user.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-slate-500">Posting as</span>
                <span className="font-semibold text-slate-800">{props.user.name}</span>
              </div>
            </div>
          </div>

          <SubmitButton className="w-full group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <span className="relative flex items-center justify-center gap-2">
              <Send className="w-5 h-5" />
              Submit Comment
            </span>
          </SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddComment;
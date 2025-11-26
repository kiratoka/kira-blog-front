import SubmitButton from "@/components/SubmitButton";
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
import { useActionState, useEffect, useState } from "react";

import { toast } from "sonner";
import { fa } from "zod/v4/locales";


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

  // Penjelasan:
  // Error ini muncul karena object literal yang dilempar ke function `toast()` memiliki property `title` dan `description`.
  // Namun, berdasarkan dokumentasi library `sonner`, function `toast()` hanya menerima string atau ReactNode
  // sebagai argumen pertama, bukan object literal seperti pada contoh ini.
  // Untuk memperbaikinya, cukup kirim pesan toast sebagai string -- misal, gabungkan title dan description,
  // atau gunakan toast.custom jika ingin komponen lebih kompleks.

  useEffect(() => {
    if (state?.message) {
      // Menampilkan pesan toast hanya dengan string
      toast(`${state?.ok ? "Success: " : "Oops: "}${state?.message}`);
    }
    if (state?.ok) {
      setOpen(false)
      props.refetch();

    }
  }, [state]);
  return (
    <Dialog open={open} onOpenChange={(o) => setOpen(o)}>
      <DialogTrigger asChild>
        <Button>Leave Your Comment</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Write Your Comment</DialogTitle>
        <form action={action} className={cn(props.className)}>
          <input hidden name="postId" defaultValue={props.postId} />
          <Label htmlFor="comment">Your Comment</Label>
          <div className="border-t border-x rounded-t-md">
            <Textarea
              className="border-none active:outline-none focus-visible:ring-0 shadow-none"
              name="content"
            />
            {!!state?.errors?.content && (
              <p className="text-red-500 animate-shake">
                {state.errors.content}
              </p>
            )}
          </div>
          <p className="border rounded-b-md p-2">
            <span className="text-slate-400">Write as </span>
            <span className="text-slate-700">{props.user.name}</span>
          </p>
          <SubmitButton className="mt-2">Submit</SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddComment;
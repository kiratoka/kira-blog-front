import { SessionUser } from "@/lib/session";
import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  ArrowRightStartOnRectangleIcon,
  ListBulletIcon,
  PencilSquareIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import Image from "next/image";

type Props = {
  user: SessionUser;
};
const Profile = ({ user }: Props) => {


  return (
    <Popover>
      <PopoverTrigger>
        <div className="relative w-14 h-14">
          {user.avatar ? (
            <Image
              src={user.avatar}
              alt={user.name || "User avatar"}
              fill
              className="rounded-full border-2 border-white object-cover"
              sizes="56px"
              priority
            />
          ) : (
            <div className="flex items-center justify-center rounded-full w-14 h-14 bg-slate-100 border-2 border-white">
              <UserIcon className="w-8 text-slate-500" />
            </div>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex justify-center items-center gap-3">
          <UserIcon className="w-4" />
          <p>{user.name}</p>
        </div>
        <div className="*:grid *:grid-cols-5 *:gap-3 *:items-center *:my-2 *:py-2 [&>*>span]:col-span-4 [&>*:hover]:bg-sky-500 [&>*:hover]:text-white *:transition *:rounded-md [&>*>*:nth-child(1)]:justify-self-end ">
          <a href="/api/auth/signout">
            <ArrowRightStartOnRectangleIcon className="w-4" />
            <span>Sign Out</span>
          </a>
          <Link href="/user/create-post">
            <PencilSquareIcon className="w-4 " />
            <span>Create New Post</span>
          </Link>
          <Link href="/user/posts">
            <ListBulletIcon className="w-4" />
            <span>Posts</span>
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Profile;
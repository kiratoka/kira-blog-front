import Link from "next/link";

const SignInPanel = ({ isHomePage, isScrollDown }: { isHomePage: boolean, isScrollDown: boolean }) => {
  return (
    <div className={`max-md:flex max-md:flex-col max-md:gap-y-3 ${isHomePage && !isScrollDown ? "text-white" : "text-slate-700"}`}>
      <Link className="mr-3" href={"/auth/signin"}>Sign In</Link>
      <Link href={"/auth/signup"}>Sign Up</Link>
    </div>
  );
};

export default SignInPanel;
// "use client";

import ResetPasswordForm from "@/components/ResetPasswordForm";
import { useAuth } from "@/context/AuthProvider";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import { RiBug2Fill } from "react-icons/ri";

const ResetPassword = () => {
  // const { currentUser } = useAuth();
  // const router = useRouter();

  // if (!currentUser) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col gap-5 items-center p-10 bg-[#203a43] rounded-none sm:rounded-md w-full sm:w-[28rem]">
        <h2 className="text-2xl lowercase text-decoration flex gap-1">
          bug tracker <RiBug2Fill className="text-3xl" />
        </h2>
        <ResetPasswordForm />
        <p className="text-white/50 text-sm text-center font-extralight italic">
          Please check your email inbox and follow the link.
        </p>
        <div className="w-full flex flex-row justify-between">
          <Link href="/signup" className="link">
            Sign Up
          </Link>
          <Link href="/" className="link">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
  // }
  // if (currentUser) {
  //   router.push("/dashboard");
  // }
};

export default ResetPassword;
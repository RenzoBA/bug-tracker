import Link from "next/link";
import { RiBug2Fill } from "react-icons/ri";
import LoginForm from "@/components/LoginForm";

const Home = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col gap-5 items-center p-10 bg-[#203a43] rounded-none sm:rounded-md w-full sm:w-[28rem]">
        <h2 className="text-2xl lowercase text-decoration flex gap-1">
          bug tracker <RiBug2Fill className="text-3xl" />
        </h2>
        <LoginForm />
        <div className="w-full flex flex-row justify-between">
          <Link href={"/signup"} className="link">
            Sign Up
          </Link>
          <Link href={"/reset_password"} className="link">
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

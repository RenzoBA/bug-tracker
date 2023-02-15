"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RiBug2Fill } from "react-icons/ri";
import { useAuth } from "@/context/AuthProvider";

const UpdateUser = () => {
  const { signInLink, updateUserInfo, updateUserPassword } = useAuth();
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // console.log("PHOTO URL: ", photoURL);
  // signInLink();
  useEffect(() => {
    const getData = async () => {
      await signInLink();
    };
    getData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserInfo(displayName, photoURL);
    updateUserPassword(password);
    router.push("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col gap-5 items-center p-10 bg-[#203a43] rounded-none sm:rounded-md w-full sm:w-[28rem]">
        <h2 className="text-2xl lowercase text-decoration flex gap-1">
          bug tracker <RiBug2Fill className="text-3xl" />
        </h2>
        <form
          onSubmit={
            password === confirmPassword
              ? handleSubmit
              : (e) => e.preventDefault
          }
          className="w-full flex flex-col gap-6 pt-5"
        >
          <div className="relative flex items-center justify-center">
            <input
              id="image_upload"
              name="image_upload"
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) =>
                setPhotoURL(URL.createObjectURL(e.currentTarget.files[0]))
              }
              className="hidden"
            />
            {photoURL ? (
              <div className="flex flex-col gap-2 items-center justify-center">
                <Image
                  src={photoURL}
                  width={50}
                  height={50}
                  alt="user-photo"
                  className="user-photo"
                />
                <label
                  htmlFor="image_upload"
                  className=" text-xs text-white/50 cursor-pointer border-2 border-white/50 p-1 rounded-lg h-fit hover:text-white"
                >
                  Change photo
                </label>
              </div>
            ) : (
              <label
                htmlFor="image_upload"
                className=" text-white/50 cursor-pointer border-2 border-white/50 p-2 rounded-lg"
              >
                Upload photo (png, jpg)
              </label>
            )}
          </div>
          <div className="relative">
            <input
              required
              id="display-name"
              type="text"
              placeholder="Display name"
              className="input peer"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
            <label className="label">Display name</label>
          </div>
          <div className="relative">
            <input
              required
              id="password"
              type="password"
              placeholder="Password"
              className="input peer"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="label">Password</label>
          </div>
          <div className="relative">
            <input
              required
              id="confirm-password"
              type="password"
              placeholder="Confirm password"
              className="input peer"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <label className="label">Confirm password</label>
          </div>
          {password !== confirmPassword && (
            <p className="text-white/50 text-sm">Passwords do not match</p>
          )}
          <button className="signin-button mt-4">Save</button>
        </form>
        <div className="w-full flex flex-row justify-between">
          <Link href="/signup" className="link">
            Sign Up
          </Link>
          <Link href="/password_reset" className="link">
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
  //error, when you enter the signin link, you redirect to "/" because the currentUser still doesn't load
};

export default UpdateUser;

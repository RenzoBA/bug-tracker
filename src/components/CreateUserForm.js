"use client";

import { useAuth } from "@/context/AuthProvider";
import { useEffect, useState } from "react";
import Image from "next/image";

const CreateUserForm = () => {
  const { signInLink, setUserInfo } = useAuth();

  const [displayName, setDisplayName] = useState("");
  const [photoFile, setPhotoFile] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const getData = async () => {
      await signInLink();
    };
    getData();
  }, [signInLink]);

  const handlePhoto = (e) => {
    setPhotoFile(e.target.files[0]);
    setPhotoPreview(URL.createObjectURL(e.target.files[0]));
    console.log("photoFile (update_user page): ", photoFile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    password === confirmPassword &&
      setUserInfo(displayName, photoFile, password);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6 pt-5">
      <div className="relative flex items-center justify-center">
        <input
          id="image_upload"
          name="image_upload"
          type="file"
          accept="image/png, image/jpeg"
          onChange={handlePhoto}
          className="hidden"
        />
        {photoPreview ? (
          <div className="flex flex-col gap-2 items-center justify-center">
            <Image
              src={photoPreview}
              width={50}
              height={50}
              alt="user-photo"
              className="user-photo w-12 h-12"
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
          name="display-name"
          type="text"
          placeholder="Display name"
          className="input peer"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <label className="label" htmlFor="display-name">
          Display name
        </label>
      </div>
      <div className="relative">
        <input
          required
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          minLength={6}
          className="input peer"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label className="label" htmlFor="password">
          Password
        </label>
      </div>
      <div className="relative">
        <input
          required
          id="confirm-password"
          name="confirm-password"
          type="password"
          placeholder="Confirm password"
          minLength={6}
          className="input peer"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <label className="label" htmlFor="confirm-password">
          Confirm password
        </label>
      </div>
      {password !== confirmPassword && (
        <p className="text-white/50 text-sm">Passwords do not match</p>
      )}
      <button className="signin-button mt-4">Save</button>
    </form>
  );
};

export default CreateUserForm;

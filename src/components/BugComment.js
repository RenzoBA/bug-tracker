"use client";

import { useAuth } from "@/context/AuthProvider";
import { useEffect, useState } from "react";

const BugComment = ({ comment }) => {
  const { getDuration, getUserInfo } = useAuth();
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getUserInfo(comment.user);
      setUserInfo(data);
    };
    getData();
  }, [comment.user, getUserInfo]);

  return (
    <div className="bg-primary/50 p-4 rounded-lg">
      <p className="font-medium">{userInfo.displayName}</p>
      <p className="text-sm text-white/50">
        {comment.date ? getDuration(comment.date?.seconds) : "0m ago"}
      </p>
      <p className="mt-2 font-light">{comment.comment}</p>
    </div>
  );
};

export default BugComment;

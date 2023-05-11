import React from "react";

const UserSkeleton = () => {
  return (
    <div className="flex flex-row items-center gap-2 animate-pulse">
      <div className="user-photo w-12 h-12 bg-white/5" />
      <div className="rounded-lg w-52 h-8 bg-white/5" />
    </div>
  );
};

export default UserSkeleton;

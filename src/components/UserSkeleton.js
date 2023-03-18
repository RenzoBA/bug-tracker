import React from "react";

const UserSkeleton = () => {
  return (
    <div className="flex flex-row items-center gap-2 animate-pulse">
      <div className="user-photo w-12 h-12 bg-primary/50" />
      <div className="flex flex-col gap-1">
        <div className="rounded-lg w-40 h-4 bg-primary/50" />
        <div className="rounded-lg w-40 h-4 bg-primary/50" />
      </div>
    </div>
  );
};

export default UserSkeleton;

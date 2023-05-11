import React from "react";

const ProjectSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 p-4 rounded-lg w-60 h-60 bg-secondary">
      <div className="rounded-lg h-12 w-36 bg-white/5 animate-pulse my-1" />
      <div className="rounded-lg h-full w-full bg-white/5 animate-pulse mt-1" />
    </div>
  );
};

export default ProjectSkeleton;

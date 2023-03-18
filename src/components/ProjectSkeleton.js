import React from "react";

const ProjectSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 px-4 py-2 rounded-lg w-60 h-60 bg-secondary">
      <div>
        <label htmlFor="project" className="text-white/50 text-sm">
          project:
        </label>
        <div className="rounded-lg h-6 w-36 bg-primary/50 animate-pulse my-1" />
        <div className="rounded-lg h-6 w-36 bg-primary/50 animate-pulse" />
      </div>
      <div>
        <label htmlFor="description" className="text-white/50 text-sm">
          description:
        </label>
        <div className="rounded-lg h-24 w-full bg-primary/50 animate-pulse mt-1" />
      </div>
    </div>
  );
};

export default ProjectSkeleton;

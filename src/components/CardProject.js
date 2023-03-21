import { useAuth } from "@/context/AuthProvider";
import Link from "next/link";

const CardProject = ({ project }) => {
  const { currentPid, setCurrentPid, setCategorySelected } = useAuth();

  const handleClick = () => {
    setCurrentPid(project.pid);
    setCategorySelected("dashboard");
  };
  return (
    <Link
      href="/dashboard"
      className={`${
        currentPid === project.pid ? "bg-secondary" : "bg-secondary/50"
      } flex flex-col gap-2 p-4 rounded-lg hover:bg-secondary w-60 h-60`}
      onClick={handleClick}
    >
      <div>
        <p
          className={`${
            currentPid === project.pid && "text-decoration"
          } text-2xl`}
        >
          {project.name}
        </p>
        <p>{`${project.pid.slice(0, 5)}.....${project.pid.slice(-5)}`}</p>
      </div>
      <div>
        <label htmlFor="description" className="text-white/50 text-sm">
          description:
        </label>
        <p className="text-sm">
          {project.description.length <= 65
            ? project.description
            : `${project.description.substring(0, 65)}...`}
        </p>
      </div>
    </Link>
  );
};

export default CardProject;

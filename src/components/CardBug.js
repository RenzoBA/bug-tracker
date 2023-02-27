import { useAuth } from "@/context/AuthProvider";

const CardBug = ({ bug }) => {
  const { getDuration } = useAuth();
  return (
    <div className="flex flex-col justify-between gap-2 bg-[#203a43] p-2 rounded-md shadow w-80 h-48">
      <div>
        <h2 className="text-base">{bug.title}</h2>
        <p className="text-sm font-light text-white/50">
          {"#" + bug.tags.replaceAll(/[^A-Za-z0-9_']+/g, " #")}
        </p>
      </div>
      <p className="text-sm">{bug.resume}</p>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-2 text-sm font-light">
          <div>
            <p>{getDuration(bug.date, Date.now())}</p>
            <label className="text-xs text-white/50">Published</label>
          </div>
          <div>
            <p>{bug.priority}</p>
            <label className="text-xs text-white/50">Priority</label>
          </div>
        </div>
        <div>
          <p>respons</p>
        </div>
      </div>
    </div>
  );
};

export default CardBug;

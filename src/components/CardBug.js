import { useAuth } from "@/context/AuthProvider";
import { useState } from "react";
import ModalBug from "./ModalBug";

const CardBug = ({ bug }) => {
  const { getDuration } = useAuth();
  const [openModalBug, setOpenModalBug] = useState(false);

  return (
    <>
      <button
        className="flex flex-col justify-between items-start gap-2 bg-[#203a43] p-3 text-left rounded-md shadow w-80 h-48"
        onClick={() => setOpenModalBug(true)}
      >
        <div>
          <h2 className="text-base">{bug.title}</h2>
          <p className="text-sm font-light text-white/50">
            {"#" + bug.tags.replaceAll(/[^A-Za-z0-9_']+/g, " #")}
          </p>
        </div>
        <p className="text-sm">
          {bug.resume.length <= 65
            ? bug.resume
            : `${bug.resume.substring(0, 65)}...`}
        </p>
        <div className="flex flex-row justify-between w-full">
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
      </button>
      {openModalBug && <ModalBug setOpenModalBug={setOpenModalBug} bug={bug} />}
    </>
  );
};

export default CardBug;

"use client";

import { useAuth } from "@/context/AuthProvider";
import Image from "next/image";
import { useEffect, useState } from "react";
import ModalBug from "./ModalBug";

const CardBug = ({ bug }) => {
  const { getDuration, getUserInfo } = useAuth();
  const [openModalBug, setOpenModalBug] = useState(false);
  const [responsable, setResponsable] = useState([]);

  useEffect(() => {
    const getData = async () => {
      let team = [];
      for (let i = 0; i < bug.team.length; i++) {
        const data = await getUserInfo(bug.team[i]);
        team.push(data);
      }
      setResponsable(team);
    };
    getData();
  }, [bug.team, getUserInfo]);

  const handleClick = () => {
    setOpenModalBug(true);
  };
  return (
    <>
      <button
        className={`${
          bug.complete
            ? "opacity-30 shadow-none grayscale"
            : "opacity-100 shadow grayscale-0"
        } flex flex-col justify-between items-start gap-2 bg-[#203a43] p-3 text-left rounded-md w-80 h-48`}
        onClick={handleClick}
      >
        <div>
          <h2 className="text-base">{bug.title}</h2>
          <div className="flex flex-wrap gap-1 mt-1">
            {bug.tags.map((tag, i) => (
              <span
                key={i}
                className="text-sm font-light bg-[#41575f] px-2 rounded-sm text-white/50"
              >
                {tag.label}
              </span>
            ))}
          </div>
        </div>
        <p className="text-sm">
          {bug.resume.length <= 65
            ? bug.resume
            : `${bug.resume.substring(0, 65)}...`}
        </p>
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-row gap-2 text-sm font-light">
            <div>
              <p>{getDuration(bug.date.seconds)}</p>
              <label className="text-xs text-white/50">Published</label>
            </div>
            <div>
              <p>{bug.priority}</p>
              <label className="text-xs text-white/50">Priority</label>
            </div>
          </div>
          <div className="flex flex-row relative">
            {responsable.map((member) => (
              <Image
                src={member.photoURL}
                key={member.uid}
                width={50}
                height={50}
                alt="user-photo"
                className="user-photo w-10 h-10"
              />
            ))}
          </div>
        </div>
      </button>
      {openModalBug && <ModalBug setOpenModalBug={setOpenModalBug} bug={bug} />}
    </>
  );
};

export default CardBug;

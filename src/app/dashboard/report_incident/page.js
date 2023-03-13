"use client";

import { useAuth } from "@/context/AuthProvider";
import Image from "next/image";
import { useEffect, useState } from "react";
import { RiUser3Fill } from "react-icons/ri";

const DashboardReportIncident = () => {
  const { currentUser, createBugReport, getUserInfo, getTeamMembers } =
    useAuth();
  const [teamMembers, setTeamMembers] = useState([]);
  const [bugData, setBugData] = useState({
    date: Date.now(),
    owner: currentUser.uid,
    title: "",
    resume: "",
    description: "",
    priority: "",
    tags: "",
    team: [],
    complete: false,
  });

  useEffect(() => {
    const getData = async () => {
      const arr = await getTeamMembers();

      let team = [];

      for (let i = 0; i < arr.length; i++) {
        team.push({ ...(await getUserInfo(arr[i])), uid: arr[i] });
      }
      setTeamMembers(team);
    };

    getData();
  }, []);

  const handleChange = (e) => {
    if (e.target.id === "member") {
      let currentTeam = bugData.team;
      if (e.target.checked) {
        setBugData({
          ...bugData,
          team: [...currentTeam, e.target.value],
        });
      } else {
        setBugData({
          ...bugData,
          team: currentTeam.filter((item) => item !== e.target.value),
        });
      }
    } else {
      setBugData({
        ...bugData,
        [e.target.id]: e.target.value,
      });
    }
  };

  console.log("bug data", bugData);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit", bugData);
    createBugReport(bugData);
    setBugData({
      date: Date.now(),
      owner: currentUser.uid,
      title: "",
      resume: "",
      description: "",
      priority: "",
      tags: "",
      team: [],
      complete: false,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full pt-16 pl-[4.5rem]">
      <div className="flex flex-col gap-5 items-center p-10 bg-[#203a43] rounded-none md:rounded-md w-full md:w-[50rem]">
        <h2 className="text-3xl sm:text-5xl py-2 lowercase text-decoration flex gap-1">
          Bug Report
        </h2>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
          <div className="flex flex-row gap-1 w-full">
            {!currentUser.photoURL ? (
              <RiUser3Fill className="text-decoration" />
            ) : (
              <Image
                src={currentUser.photoURL}
                width={50}
                height={50}
                alt="user-photo"
                className="user-photo w-12 h-12"
              />
            )}
            <div className="relative">
              <label className="label-2" htmlFor="owner">
                Owner (you)
              </label>
              <p
                id="owner"
                name="owner"
                className="text-base sm:text-lg uppercase px-2 select-none"
              >
                {currentUser.displayName}
              </p>
            </div>
          </div>
          <div className="relative">
            <input
              required
              autoFocus
              id="title"
              name="title"
              type="text"
              placeholder="Title"
              className="input peer"
              value={bugData.title}
              onChange={handleChange}
            />
            <label className="label" htmlFor="title">
              Title
            </label>
          </div>
          <div className="relative">
            <textarea
              required
              id="resume"
              name="resume"
              rows="3"
              placeholder="Resume"
              className="input peer"
              value={bugData.resume}
              onChange={handleChange}
            />
            <label className="label" htmlFor="resume">
              Resume
            </label>
          </div>
          <div className="relative">
            <textarea
              required
              id="description"
              name="description"
              rows="5"
              placeholder="Description"
              className="input peer"
              value={bugData.description}
              onChange={handleChange}
            />
            <label className="label" htmlFor="description">
              Description
            </label>
          </div>
          <div className="relative">
            <label className="label-2" htmlFor="priority">
              Priority
            </label>
            <select
              required
              id="priority"
              name="priority"
              className="input-2"
              value={bugData.priority}
              onChange={handleChange}
            >
              <option value="" className="text-black/50">
                Select...
              </option>
              <option value="low" className="text-black">
                Low
              </option>
              <option value="medium" className="text-black">
                Medium
              </option>
              <option value="high" className="text-black">
                High
              </option>
              <option value="urgent" className="text-black">
                Urgent
              </option>
            </select>
          </div>
          <div className="relative">
            <label className="label-2" htmlFor="responsable">
              Responsable
            </label>
            <div id="responsable" className="flex flex-col gap-2 mt-2">
              {teamMembers.map((member) => (
                <label key={member.uid} className="input-container">
                  <>
                    {!member.photoURL ? (
                      <RiUser3Fill className="text-decoration" />
                    ) : (
                      <Image
                        src={member.photoURL}
                        width={50}
                        height={50}
                        alt="user-photo"
                        className="user-photo w-10 h-10"
                      />
                    )}
                    <span>{member.displayName}</span>
                  </>
                  <input
                    type="checkbox"
                    id="member"
                    value={member.uid}
                    onChange={handleChange}
                  />
                  <div className="checkmark" />
                </label>
              ))}
            </div>
          </div>
          <div className="relative">
            <input
              required
              id="tags"
              name="tags"
              type="text"
              placeholder="Tags"
              className="input peer"
              value={bugData.tags}
              onChange={handleChange}
            />
            <label className="label" htmlFor="tags">
              Tags{" "}
              <span className="text-xs text-white/50">
                (separate with commas)
              </span>
            </label>
          </div>

          <button className="signin-button mt-4">Add Bug</button>
        </form>
      </div>
    </div>
  );
};

export default DashboardReportIncident;

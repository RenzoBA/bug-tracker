"use client";

import UserSkeleton from "@/components/UserSkeleton";
import { useAuth } from "@/context/AuthProvider";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { RiUser3Fill } from "react-icons/ri";
import CreatableSelect from "react-select/creatable";

const DashboardReportIncident = () => {
  const {
    currentUser,
    createBugReport,
    getUserInfo,
    getTeamMembers,
    getTags,
    addTags,
  } = useAuth();
  const [teamMembers, setTeamMembers] = useState("");
  const [tagsProject, setTagsProject] = useState([]);
  const [tagsSelected, setTagsSelected] = useState([]);
  const [tagsCreated, setTagsCreated] = useState([]);
  const [bugData, setBugData] = useState({
    title: "",
    resume: "",
    description: "",
    priority: "",
    tags: [],
    team: [],
  });

  useEffect(() => {
    const getData = async () => {
      const teamMembersUid = await getTeamMembers();

      let team = [];
      for (let i = 0; i < teamMembersUid.length; i++) {
        const data = await getUserInfo(teamMembersUid[i]);
        team.push(data);
      }
      setTeamMembers(team);

      getTags(setTagsProject);
    };

    getData();
  }, [getTags, getTeamMembers, getUserInfo]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    createBugReport(bugData);
    addTags(tagsCreated);
    setTagsSelected([]);
    setBugData({
      title: "",
      resume: "",
      description: "",
      priority: "",
      tags: [],
      team: [],
    });
  };

  if (!currentUser) {
    redirect("/");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full py-20 pl-[4.5rem]">
      <div className="flex flex-col items-center gap-10 w-3/4">
        <h2 className="text-3xl sm:text-5xl lowercase text-decoration">
          Bug Report
        </h2>
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
              Bug owner <span className="text-xs text-white/50">(you)</span>
            </label>
            <p
              id="owner"
              name="owner"
              className="text-base sm:text-lg px-2 select-none"
            >
              {currentUser.displayName}
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
          <div className="flex flex-row gap-5">
            <div className="flex flex-col gap-5 items-center justify-between p-10 bg-[#203a43] rounded-none md:rounded-md w-full md:w-[50rem]">
              <div className="relative w-full">
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
              <div className="relative w-full">
                <textarea
                  required
                  id="resume"
                  name="resume"
                  rows="3"
                  placeholder="Resume"
                  className="input peer scrollbar-thin scrollbar-thumb-decoration scrollbar-track-white/10"
                  value={bugData.resume}
                  onChange={handleChange}
                />
                <label className="label" htmlFor="resume">
                  Resume
                </label>
              </div>
              <div className="relative w-full">
                <textarea
                  required
                  id="description"
                  name="description"
                  rows="5"
                  placeholder="Description"
                  className="input peer scrollbar-thin scrollbar-thumb-decoration scrollbar-track-white/10"
                  value={bugData.description}
                  onChange={handleChange}
                />
                <label className="label" htmlFor="description">
                  Description
                </label>
              </div>
            </div>
            <div className="flex flex-col gap-5 items-center justify-between p-10 bg-[#203a43] rounded-none md:rounded-md w-full md:w-[50rem]">
              <div className="relative w-full">
                <label className="label-2" htmlFor="responsable">
                  Responsables{" "}
                  <span className="text-xs text-white/50">(select)</span>
                </label>
                <div id="responsable" className="flex flex-col gap-2 mt-2">
                  {teamMembers ? (
                    teamMembers.map((member) => (
                      <div key={member.uid} className="input-container">
                        <>
                          {!member.photoURL ? (
                            <RiUser3Fill className="text-decoration" />
                          ) : (
                            <Image
                              src={member.photoURL}
                              width={50}
                              height={50}
                              alt="user-photo"
                              className="user-photo w-12 h-12"
                            />
                          )}
                          <span>{`${member.displayName} ${
                            currentUser.uid === member.uid ? "(you)" : ""
                          }`}</span>
                        </>
                        <input
                          type="checkbox"
                          id="member"
                          value={member.uid}
                          onChange={handleChange}
                        />
                        <div className="checkmark" />
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="input-container">
                        <UserSkeleton />
                        <div className="checkmark" />
                      </div>
                      <div className="input-container">
                        <UserSkeleton />
                        <div className="checkmark" />
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-5 items-center justify-between w-full">
                <div className="relative w-full">
                  <label className="label-2" htmlFor="priority">
                    Priority
                  </label>
                  <select
                    required
                    id="priority"
                    name="priority"
                    className={`input-2 ${
                      bugData.priority === "" ? "text-white/50" : "text-white"
                    } bg-secondary`}
                    value={bugData.priority}
                    onChange={handleChange}
                  >
                    <option value="" className="text-white/50">
                      Select...
                    </option>
                    <option value="low" className="text-white">
                      Low
                    </option>
                    <option value="medium" className="text-white">
                      Medium
                    </option>
                    <option value="high" className="text-white">
                      High
                    </option>
                    <option value="urgent" className="text-white">
                      Urgent
                    </option>
                  </select>
                </div>
                <div className="relative w-full">
                  <CreatableSelect
                    required
                    isMulti
                    id="tags"
                    noOptionsMessage={() => "No tags yet"}
                    placeholder="Select or create..."
                    onChange={(tags) => {
                      setBugData({ ...bugData, tags });
                      setTagsSelected(tags);
                      setTagsCreated(tags.filter((tag) => !tag.tid && tag));
                    }}
                    options={tagsProject}
                    onCreateOption={(tag) => {
                      const tagCreated = {
                        label: tag,
                        value: tag.toLowerCase(),
                        tid: crypto.randomUUID(),
                      };
                      setBugData({
                        ...bugData,
                        tags: [...bugData.tags, tagCreated],
                      });
                      setTagsSelected([...tagsSelected, tagCreated]);
                      setTagsCreated([...tagsCreated, tagCreated]);
                    }}
                    value={tagsSelected}
                    theme={(theme) => ({
                      ...theme,
                      colors: {
                        ...theme.colors,
                        primary: "transparent", // input border focus
                        primary25: "#41575f",
                        primary50: "#41575f",
                        neutral0: "#203A43", // input bg
                        neutral10: "#41575f", //option bg
                        neutral20: "#9ca3af", // down arrow
                        neutral50: "#9ca3af", //"select..."
                        neutral60: "#9ca3af", //down arrow focus
                        neutral80: "white", //text color hover
                      },
                      spacing: {
                        baseUnit: 3,
                        controlHeight: 15,
                        menuGutter: 2,
                      },
                    })}
                    className="input peer text-base font-normal"
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderStyle: "none",
                        boxShadow: undefined,
                        boxSizing: "border-box",
                        cursor: "pointer",
                        label: "control",
                        minHeight: 15,
                        position: "relative",
                      }),
                    }}
                  />
                  <label className="label" htmlFor="tags">
                    Tags
                  </label>
                </div>
              </div>
            </div>
          </div>

          <button className="signin-button mt-4">Add Bug</button>
        </form>
      </div>
    </div>
  );
};

export default DashboardReportIncident;

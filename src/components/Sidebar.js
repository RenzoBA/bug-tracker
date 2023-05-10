import {
  RiHome2Fill,
  RiAlertFill,
  RiTeamFill,
  RiUser3Fill,
} from "react-icons/ri";
import SectionLink from "./SectionLink";

const sectionsData = [
  {
    url: "/dashboard",
    label: "Dashboard",
    logo: <RiHome2Fill />,
  },
  {
    url: "/dashboard/report_incident",
    label: "Report",
    logo: <RiAlertFill />,
  },
  {
    url: "/dashboard/project",
    label: "Project",
    logo: <RiTeamFill />,
  },
  {
    url: "/dashboard/user",
    label: "User",
    logo: <RiUser3Fill />,
  },
];

const Sidebar = () => {
  return (
    <nav className="flex flex-col gap-5 justify-start items-center pt-20 backdrop-blur shadow fixed h-full w-[4.5rem] text-[0.6rem] z-10">
      {sectionsData.map((section, i) => (
        <SectionLink section={section} key={i} />
      ))}
    </nav>
  );
};

export default Sidebar;

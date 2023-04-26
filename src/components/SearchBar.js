import { useAuth } from "@/context/AuthProvider";
import { useEffect, useState } from "react";
import Select from "react-select";

const SearchBar = ({
  tagsToFilter,
  setTagsToFilter,
  titleToFilter,
  setTitleToFilter,
}) => {
  const { getTags } = useAuth();
  const [tagsProject, setTagsProject] = useState([]);

  useEffect(() => {
    getTags(setTagsProject);
  }, []);

  return (
    <div className="flex flex-row gap-10 justify-between w-full px-1">
      <input
        type="text"
        placeholder="Filter title..."
        className="w-2/3 bg-secondary rounded pl-2 focus:outline-none"
        value={titleToFilter}
        onChange={(e) => setTitleToFilter(e.target.value)}
      />
      <Select
        isMulti
        noOptionsMessage={() => "No tags"}
        placeholder="Filter tags..."
        onChange={(tags) => {
          setTagsToFilter(tags);
        }}
        options={tagsProject}
        value={tagsToFilter}
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
        className="text-base font-normal w-1/3"
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderStyle: "none",
            boxShadow: undefined,
            boxSizing: "border-box",
            cursor: "pointer",
            label: "control",
            minHeight: 48,
            position: "relative",
          }),
        }}
      />
    </div>
  );
};

export default SearchBar;

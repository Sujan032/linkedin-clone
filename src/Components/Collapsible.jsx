import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selecttoggleTheme } from "../features/toggleThemeReducer";
import PeopleIcon from "@material-ui/icons/People";
import CollapsiblePart from "./CollapsiblePart";
import CollapsibleTop from "./CollapsibleTop";

const Collapsible = ({ Groups, Followed, Recent }) => {
  const toggleTheme = useSelector(selecttoggleTheme);
  const [isexpanded, setIsExpanded] = useState(false);

  const expand = useRef();
  const handleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <>
      {Recent && (
        <div
          className="sidebar__collapsible"
          style={{
            backgroundColor: toggleTheme ? "rgb(29, 34, 38)" : "white",
            color: toggleTheme ? "white" : "#565656",
          }}
        >
          <CollapsibleTop
            text="Recent"
            func={handleExpand}
            isexpanded={isexpanded}
          />

          <div
            className="collapsible"
            style={{
              backgroundColor: toggleTheme ? "rgb(29, 34, 38)" : "white",
              color: toggleTheme ? "white" : "#565656",
              height: !isexpanded ? "0px" : expand.current.scrollHeight + "px",
              overflow: "hidden",
            }}
            ref={expand}
          >
            <CollapsiblePart text="branding" />
            <CollapsiblePart text="marketing" />
            <CollapsiblePart text="web development" />
            <CollapsiblePart text="reactjs" />
            <CollapsiblePart text="redux toolkit" />
            <CollapsiblePart text="programming" />
          </div>
        </div>
      )}
      {Groups && (
        <div
          className="sidebar__collapsible"
          style={{
            backgroundColor: toggleTheme ? "rgb(29, 34, 38)" : "white",
            color: toggleTheme ? "white" : "#565656",
          }}
        >
          <CollapsibleTop
            text="Groups"
            func={handleExpand}
            isexpanded={isexpanded}
          />

          <div
            className="collapsible"
            style={{
              backgroundColor: toggleTheme ? "rgb(29, 34, 38)" : "white",
              color: toggleTheme ? "white" : "#565656",
              height: !isexpanded ? "0px" : expand.current.scrollHeight + "px",
              overflow: "hidden",
            }}
            ref={expand}
          >
            <CollapsiblePart Icon={PeopleIcon} text="Geeksforgeeks" />
            <CollapsiblePart Icon={PeopleIcon} text="Premium career group" />
          </div>
        </div>
      )}
      {Followed && (
        <div
          className="sidebar__collapsible"
          style={{
            backgroundColor: toggleTheme ? "rgb(29, 34, 38)" : "white",
            color: toggleTheme ? "white" : "#565656",
          }}
        >
          <CollapsibleTop
            text="Followed Hashtags"
            func={handleExpand}
            isexpanded={isexpanded}
          />

          <div
            className="collapsible"
            style={{
              backgroundColor: toggleTheme ? "rgb(29, 34, 38)" : "white",
              color: toggleTheme ? "white" : "#565656",
              height: !isexpanded ? "0px" : expand.current.scrollHeight + "px",
              overflow: "hidden",
            }}
            ref={expand}
          >
            <CollapsiblePart text="branding" />
            <CollapsiblePart text="marketing" />
            <CollapsiblePart text="web development" />
            <CollapsiblePart text="reactjs" />
            <CollapsiblePart text="redux toolkit" />
            <CollapsiblePart text="programming" />
          </div>
        </div>
      )}
    </>
  );
};

export default Collapsible;

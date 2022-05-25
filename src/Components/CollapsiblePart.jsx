import React, { useState } from "react";
import { selecttoggleTheme } from "../features/toggleThemeReducer";
import { useSelector } from "react-redux";
import PeopleIcon from "@material-ui/icons/People";

const CollapsiblePart = ({ Icon, text }) => {
  const [hover, setHover] = useState(false);
  const toggleTheme = useSelector(selecttoggleTheme);

  function sethover() {
    setHover((prev) => {
      return !prev;
    });
  }

  return (
    <div
      className="hash"
      style={{
        backgroundColor: toggleTheme
          ? hover
            ? "rgba(234, 255, 252, 0.075)"
            : "rgb(29, 34, 38)"
          : hover
          ? "lightgray"
          : "white",
        color: toggleTheme ? "white" : "#565656",
      }}
      onMouseEnter={sethover}
      onMouseLeave={sethover}
    >
      {Icon ? <PeopleIcon /> : <span>#</span>}
      <p>{text}</p>
    </div>
  );
};

export default CollapsiblePart;

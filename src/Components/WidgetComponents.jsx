import React, { useState } from "react";
import { selecttoggleTheme } from "../features/toggleThemeReducer";
import { useSelector } from "react-redux";
import CircleIcon from "@mui/icons-material/Circle";

const WidgetComponents = ({ text, details }) => {
  const [hover, setHover] = useState(false);
  const toggleTheme = useSelector(selecttoggleTheme);

  function sethover() {
    setHover((prev) => {
      return !prev;
    });
  }

  return (
    <div
      className="widget__parts"
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
      <div className="details">
        <CircleIcon />
        <h4>{text}</h4>
      </div>
      <p>{details}</p>
    </div>
  );
};

export default WidgetComponents;

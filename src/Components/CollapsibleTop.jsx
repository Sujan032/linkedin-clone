import React, { useState } from "react";
import { selecttoggleTheme } from "../features/toggleThemeReducer";
import { useSelector } from "react-redux";
import { AddOutlined, KeyboardArrowDown } from "@mui/icons-material";

const CollapsibleTop = ({ text, func, isexpanded }) => {
  const [hover, setHover] = useState(false);
  const toggleTheme = useSelector(selecttoggleTheme);

  function sethover() {
    setHover((prev) => {
      return !prev;
    });
  }

  return (
    <div className="collapsibleTop">
      <h5>
        <strong> {text}</strong>
      </h5>
      <div
        className="icon"
        onClick={func}
        style={{
          height: "1em",
          width: "1em",
          borderRadius: "50%",
          objectPosition: "centre",
          backgroundColor: toggleTheme
            ? hover
              ? "rgba(234, 255, 252, 0.075)"
              : "rgb(29, 34, 38)"
            : hover
            ? "lightgray"
            : "white",
        }}
        onMouseEnter={sethover}
        onMouseLeave={sethover}
      >
        {text === "Events" ? (
          <AddOutlined />
        ) : (
          <KeyboardArrowDown
            style={{
              transform: isexpanded ? "rotate(180deg)" : "none",
              transition: "transform ease-in 0.3s",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default CollapsibleTop;

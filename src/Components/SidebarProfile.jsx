import React, { useEffect, useState } from "react";
import { selecttoggleTheme } from "../features/toggleThemeReducer";
import { useSelector } from "react-redux";

const SidebarProfile = ({ text, num, text2 }) => {
  const [hover, setHover] = useState(false);
  const toggleTheme = useSelector(selecttoggleTheme);
  const [number, setNumber] = useState(null);

  function sethover() {
    setHover((prev) => {
      return !prev;
    });
  }
  useEffect(() => {
    setNumber(Math.floor(Math.random() * num) + 20);
  }, [num]);
  return (
    <div
      className="profile__stats"
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
      <span>
        {text}
        <br /> {text2 && <b>{text2}</b>}
      </span>
      <span className="stat__number">{number}</span>
    </div>
  );
};

export default SidebarProfile;

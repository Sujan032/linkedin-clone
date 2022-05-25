import React, { useState } from "react";
import { selecttoggleTheme } from "../features/toggleThemeReducer";
import { useSelector } from "react-redux";

const Option = ({ Logo, Title, func, likeCount }) => {
  const [toggle, setToggle] = useState(false);
  const toggleTheme = useSelector(selecttoggleTheme);

  function settoggle() {
    setToggle((prev) => {
      return !prev;
    });
  }
  return (
    <div
      className="option"
      style={{
        backgroundColor: toggleTheme
          ? toggle
            ? "rgba(234, 255, 252, 0.075)"
            : "#1d2226"
          : toggle
          ? "lightgray"
          : "white",
        color: likeCount ? "blue" : toggleTheme ? "white" : "#565656",
      }}
      onMouseEnter={settoggle}
      onMouseLeave={settoggle}
      onClick={func}
    >
      <Logo />
      <span>{Title}</span>
    </div>
  );
};

export default Option;

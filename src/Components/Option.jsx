import React, { useState } from "react";
import { selecttoggleTheme } from "../features/toggleThemeReducer";
import { useSelector } from "react-redux";

const Option = ({ iconColor, Icon, Title, label, func }) => {
  const [toggle, setToggle] = useState(false);
  const toggleTheme = useSelector(selecttoggleTheme);

  function settoggle() {
    setToggle((prev) => {
      return !prev;
    });
  }
  return (
    <label htmlFor={label ? label : ""}>
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
        }}
        onMouseEnter={settoggle}
        onMouseLeave={settoggle}
        onClick={func}
      >
        <Icon style={{ color: iconColor }} />
        <span>{Title}</span>
      </div>
    </label>
  );
};

export default Option;

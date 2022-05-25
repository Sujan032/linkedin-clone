import React, { useState } from "react";
import { selecttoggleTheme } from "../features/toggleThemeReducer";
import { useSelector } from "react-redux";
import BookmarkSharpIcon from "@material-ui/icons/BookmarkSharp";

const Bookmarks = ({ Icon, Text }) => {
  const [toggle, setToggle] = useState(false);
  const toggleTheme = useSelector(selecttoggleTheme);

  function settoggle() {
    setToggle((prev) => {
      return !prev;
    });
  }
  return (
    <div
      className="bookmarks"
      style={{
        backgroundColor: toggleTheme
          ? toggle
            ? "rgba(234, 255, 252, 0.075)"
            : "#1d2226"
          : toggle
          ? "lightgray"
          : "white",
        color: toggleTheme ? "white" : "#565656",
      }}
      onMouseEnter={settoggle}
      onMouseLeave={settoggle}
    >
      {Icon && <BookmarkSharpIcon />}
      <h4>{Text}</h4>
    </div>
  );
};

export default Bookmarks;

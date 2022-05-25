import React, { useState } from "react";
import { Avatar } from "@material-ui/core";
import "../CSS/header.css";
import { auth } from "./firebase";
import { selecttoggleTheme } from "../features/toggleThemeReducer";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

const HeaderOptions = ({ Icons, title, src, avatar, color }) => {
  const [toggle, setToggle] = useState(false);
  const toggleTheme = useSelector(selecttoggleTheme);

  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: "rgba(0, 0, 0, 0.87)",
      boxShadow: theme.shadows[1],
      fontSize: 12,
    },
  }));

  return (
    <div
      className={avatar ? "header__options avatar" : "header__options"}
      style={{
        color: toggleTheme
          ? toggle
            ? "white"
            : "#aeaeae"
          : toggle
          ? "#333"
          : "#565656",
      }}
      onMouseEnter={() => {
        setToggle(true);
      }}
      onMouseLeave={() => {
        setToggle(false);
      }}
    >
      {Icons && <Icons style={{ color: color }} />}
      {avatar && (
        <LightTooltip title="Sign out" placement="bottom">
          <Avatar name={avatar} src={src} onClick={() => auth.signOut()} />
        </LightTooltip>
      )}
      <span style={{ color: color }}>{title} </span>
    </div>
  );
};

export default HeaderOptions;

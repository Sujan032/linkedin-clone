import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import "../CSS/header.css";
import HomeIcon from "@material-ui/icons/Home";
import HeaderOptions from "./HeaderOptions";
import PeopleIcon from "@material-ui/icons/People";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import MessageIcon from "@material-ui/icons/Message";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { Avatar } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { selecttoggleTheme, toggler } from "../features/toggleThemeReducer";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import Logo from "./logo.png";

const Header = () => {
  const user = useSelector(selectUser);
  const toggleTheme = useSelector(selecttoggleTheme);
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <div
        className="header"
        style={{
          backgroundColor: toggleTheme ? "#1d2226" : "white",
        }}
      >
        <div className="header__left">
          <div className="header__logo">
            <img src={Logo} alt="" />
          </div>

          <div
            className="header__search"
            style={{
              backgroundColor: toggleTheme ? "#272e37" : "#eef3f8",
              color: toggleTheme ? "#7a7a7c" : "#565656",
            }}
          >
            <SearchIcon />
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSearchValue("");
              }}
            >
              <input
                type="text"
                placeholder="Search for jobs, people, posts..."
                style={{
                  color: toggleTheme ? "white" : "#565656",
                }}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
                value={searchValue}
              />
              <input type="submit" />
            </form>
          </div>
          <HeaderOptions avatar={Avatar} src={user.photoURL} />
        </div>
        <div
          className="header__right"
          style={{
            backgroundColor: toggleTheme ? "#1d2226" : "white",
          }}
        >
          <HeaderOptions
            Icons={HomeIcon}
            title="Home"
            color={toggleTheme ? "white" : "#000"}
          />
          <HeaderOptions Icons={PeopleIcon} title="Network" />
          <HeaderOptions Icons={BusinessCenterIcon} title="Jobs" />
          <HeaderOptions Icons={MessageIcon} title="Messaging" />
          <HeaderOptions Icons={NotificationsIcon} title="Notification" />

          <HeaderOptions
            avatar={Avatar}
            src={user.photoURL}
            title={user.displayName}
          />

          <div
            className="toggle__theme"
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
            onClick={() => {
              dispatch(toggler({ value: !toggleTheme }));
            }}
          >
            {!toggleTheme ? <DarkModeIcon /> : <LightModeIcon />}
            {!toggleTheme ? <span>Dark</span> : <span>Light</span>}
          </div>
        </div>
      </div>
      <div
        className="header__right_bottom"
        style={{
          backgroundColor: toggleTheme ? "#1d2226" : "white",
        }}
      >
        <HeaderOptions
          Icons={HomeIcon}
          title="Home"
          color={toggleTheme ? "white" : "#000"}
        />
        <HeaderOptions Icons={PeopleIcon} title="Network" />
        <HeaderOptions Icons={BusinessCenterIcon} title="Jobs" />
        <HeaderOptions Icons={MessageIcon} title="Messaging" />
        <HeaderOptions Icons={NotificationsIcon} title="Notification" />

        <div
          className="toggle__theme"
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
          onClick={() => {
            dispatch(toggler({ value: !toggleTheme }));
          }}
        >
          {!toggleTheme ? <DarkModeIcon /> : <LightModeIcon />}
          {!toggleTheme ? <span>Dark</span> : <span>Light</span>}
        </div>
      </div>
    </>
  );
};

export default Header;

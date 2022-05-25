import React from "react";
import "../CSS/sidebar.css";
import { Avatar } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { selecttoggleTheme } from "../features/toggleThemeReducer";
import SidebarProfile from "./SidebarProfile";
import Bookmarks from "./Bookmarks";
import BookmarkSharpIcon from "@material-ui/icons/BookmarkSharp";
import Collapsible from "./Collapsible";
import CollapsibleTop from "./CollapsibleTop";

function Sidebar() {
  const user = useSelector(selectUser);
  const toggleTheme = useSelector(selecttoggleTheme);

  return (
    <div className="sidebar">
      <div
        className="sidebar__profile"
        style={{
          backgroundColor: toggleTheme ? "#1d2226" : "white",
          color: toggleTheme ? "white" : "#333",
          boxShadow: toggleTheme ? "none" : "1px 1px #ccbeb29c",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d2FsbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80"
          alt="Loading"
        />

        <Avatar src={user.photoURL} />
        <div className="profile__details">
          <h4>{user.displayName}</h4>
          <p>{user.email} </p>
        </div>
        <SidebarProfile text="Who viewed your profile" num="100" />
        <SidebarProfile
          text="Connections"
          num="500"
          text2="Manage your network"
        />
        <Bookmarks Text="My items" Icon={BookmarkSharpIcon} />
      </div>
      <div
        className="sidebar__bottom"
        style={{
          backgroundColor: toggleTheme ? "#1d2226" : "white",
          color: toggleTheme ? "white" : "#333",
          boxShadow: toggleTheme ? "none" : "1px 1px #ccbeb29c",
        }}
      >
        <section>
          <Collapsible Recent="true" />
        </section>
        <section>
          <Collapsible Groups="true" />
        </section>
        <section>
          <CollapsibleTop text="Events" />
        </section>
        <section>
          <Collapsible Followed="true" />
        </section>

        <Bookmarks Text="Discover more" />
      </div>
    </div>
  );
}

export default Sidebar;

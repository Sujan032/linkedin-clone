import React, { forwardRef, useState } from "react";
import "../CSS/post.css";
import { Avatar } from "@material-ui/core";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PostOptions from "./PostOptions";
import { selecttoggleTheme } from "../features/toggleThemeReducer";
import { useSelector } from "react-redux";
import ReactionSection from "./ReactionSection";
import { ReactComponent as Like } from "../Svgs/Like.svg";
import { ReactComponent as Comment } from "../Svgs/Comment.svg";
import { ReactComponent as Share } from "../Svgs/Share.svg";
import { ReactComponent as Send } from "../Svgs/Send.svg";
import { ReactComponent as LikeActive } from "../Svgs/LikeActive.svg";
import ReactPlayer from "react-player";

const Post = forwardRef(
  ({ name, message, photoURL, email, fileData, fileType }, ref) => {
    const toggleTheme = useSelector(selecttoggleTheme);
    const [toggle, setToggle] = useState(false);
    const [likeCount, setlikeCount] = useState(false);

    function increaseCount() {
      setlikeCount((prev) => !prev);
    }
    return (
      <div
        className="post"
        ref={ref}
        style={{
          backgroundColor: toggleTheme ? "#1d2226" : "white",
          color: toggleTheme ? "white" : "#565656",
          boxShadow: toggleTheme ? "none" : "1px 1px #ccbeb29c",
        }}
      >
        <div className="post__header">
          <div className="post__headerLeft">
            <Avatar src={photoURL} />
            <div className="profile__detail">
              <h3>{name}</h3>
              <p>{email}</p>
            </div>
          </div>
          <div
            className="post__headerRight"
            style={{
              backgroundColor: toggleTheme
                ? toggle
                  ? "rgba(234, 255, 252, 0.075)"
                  : "#1d2226"
                : toggle
                ? "lightgray"
                : "white",
            }}
            onMouseEnter={() => {
              setToggle(true);
            }}
            onMouseLeave={() => {
              setToggle(false);
            }}
          >
            <MoreHorizIcon />
          </div>
        </div>

        <div className="post__body">
          <p>{message}</p>
          {fileData &&
            (fileType === "image" ? (
              <img src={fileData} alt="" width="100%"/>
            ) : (
              <ReactPlayer url={fileData} controls={true} width="100%" height="100%" muted />
            ))}
        </div>
        <ReactionSection likeCount={likeCount} />
        <div className="post__footer">
          <PostOptions
            Logo={likeCount ? LikeActive : Like}
            Title="Like"
            func={increaseCount}
            likeCount={likeCount}
          />
          <PostOptions Logo={Comment} Title="Comment" />
          <PostOptions Logo={Share} Title="Share" />
          <PostOptions Logo={Send} Title="Send" />
        </div>
      </div>
    );
  }
);

export default Post;

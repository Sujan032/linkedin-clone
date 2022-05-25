import React, { useEffect, useState } from "react";
import "../CSS/feed.css";
import { Avatar } from "@material-ui/core";
import Option from "./Option";
import PhotoIcon from "@material-ui/icons/Photo";
import YouTubeIcon from "@material-ui/icons/YouTube";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Post from "./Post";
import firebase from "firebase/compat/app";
import { db, storage } from "./firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import FlipMove from "react-flip-move";
import { selecttoggleTheme } from "../features/toggleThemeReducer";
import Loading from "./Lottie_Animation/Loading";
import Swal from "sweetalert2";
import { imageUploadHandler } from "./formUtils";
import { Box, Chip, LinearProgress } from "@mui/material";
import { v4 as uuid } from "uuid";
import {
  PhotoSizeSelectActualOutlined,
  VideocamRounded,
} from "@mui/icons-material";

const Feed = () => {
  const user = useSelector(selectUser);
  const [hover, setHover] = useState(false);
  const [searchBar, setsearchBar] = useState(false);
  const toggleTheme = useSelector(selecttoggleTheme);
  const [uploadData, setUploadData] = useState({
    message: "",
    file: {
      type: "",
      name: "",
      data: "",
    },
  });

  const [progress, setProgress] = useState(0);
  const [posts, setPosts] = useState([]);

  const resetState = () => {
    setUploadData({
      ...uploadData,
      file: {
        type: "",
        name: "",
        data: "",
      },
    });
  };

  const resetStates = () => {
    setProgress(0);
    setUploadData({
      message: "",
      file: {
        type: "",
        name: "",
        data: "",
      },
    });
  };
  function sethover() {
    setHover((prev) => {
      return !prev;
    });
  }

  const uploadToFirebaseDB = (fileData) => {
    // uploading to collection called posts
    db.collection("posts")
      .add({
        photoURL: user.photoURL,
        name: user.displayName,
        email: user.email,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: uploadData.message,
        fileType: uploadData.file.type,
        fileName: uploadData.file.name,
        fileData: fileData,
      })
      .then(() => resetStates());
  };

  const handleSubmitButton = async (e) => {
    e.preventDefault();

    // verify atleast one of the input fields are not empty
    if (uploadData.message || uploadData.file.data) {
      // if file input is true...upload the file to Fire-Store
      if (uploadData.file.data) {
        const id = uuid();
        const uploadTask = storage
          .ref(`posts/${id}`)
          .putString(uploadData.file.data, "data_url");
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const value = Math.floor(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(value);
          },

          (error) => {
            alert(error);
          },

          () => {
            storage
              .ref("posts")
              .child(id)
              .getDownloadURL()
              .then((url) => uploadToFirebaseDB(url));
          }
        );

        // do not go further..
        return;
      } else {
        // if no file input provided
        uploadToFirebaseDB(uploadData.file.data);
      }
    } else {
      Swal.fire({
        title: "Empty Post",
        text: "Please enter something",
        icon: "warning",
        width: "400px",
      });
    }
  };

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snap) =>
        setPosts(snap.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
      );
  }, []);
  return (
    <div className="feed__container">
      <div className="feed">
        <div
          className="feed__input"
          style={{
            backgroundColor: toggleTheme ? "#1d2226" : "white",
            color: toggleTheme ? "white" : "#565656",
            boxShadow: toggleTheme ? "none" : "1px 1px #ccbeb29c",
          }}
        >
          <Avatar src={user.photoURL} />
          <form onSubmit={handleSubmitButton}>
            <input
              type="text"
              onChange={(e) =>
                setUploadData({ ...uploadData, message: e.target.value })
              }
              value={uploadData.message}
              placeholder="Start a post"
              style={{
                backgroundColor: toggleTheme
                  ? "rgba(234, 255, 252, 0.075)"
                  : "#f4eaead4",
                color: toggleTheme ? "white" : "#565656",
                border: searchBar ? "1px solid blueviolet" : "none",
              }}
              onFocus={() => {
                setsearchBar((prev) => !prev);
              }}
              onBlur={() => {
                setsearchBar((prev) => !prev);
              }}
            />
            <input
              type="file"
              id="image"
              accept="image/*"
              hidden
              onChange={(e) => {
                imageUploadHandler(e, "image", uploadData, setUploadData);
              }}
            />
            <input
              type="file"
              id="video"
              accept="video/*"
              hidden
              onChange={(e) => {
                imageUploadHandler(e, "video", uploadData, setUploadData);
              }}
            />
            <input
              type="submit"
              value="Post"
              style={{
                backgroundColor: !toggleTheme
                  ? hover
                    ? "#0073b1"
                    : "#70b5f9"
                  : hover
                  ? "#70b5f9"
                  : "#0073b1",
              }}
              onMouseEnter={sethover}
              onMouseLeave={sethover}
            />
          </form>
        </div>
        <div
          className="file"
          style={{
            backgroundColor: toggleTheme ? "rgb(29, 34, 38)" : "white",
            boxShadow: toggleTheme ? "none" : "1px 1px #ccbeb29c",
          }}
        >
          {progress === 0 && uploadData.file.name && (
            <Chip
              color="primary"
              size="small"
              onDelete={resetState}
              icon={
                uploadData.file.type === "image" ? (
                  <PhotoSizeSelectActualOutlined />
                ) : (
                  <VideocamRounded />
                )
              }
              label={uploadData.file.name}
            />
          )}
          {progress !== 0 ? (
            <>
              <Box sx={{ width: "88%" }}>
                <LinearProgress variant="determinate" value={progress} />
              </Box>
              <p
                style={{
                  color: toggleTheme ? "white" : "#565656",
                }}
              >{`${progress} %`}</p>
            </>
          ) : null}
        </div>
        <div
          className="feed__options"
          style={{
            backgroundColor: toggleTheme ? "#1d2226" : "white",
            color: toggleTheme ? "#fff" : "#565656",
            boxShadow: toggleTheme ? "none" : "1px 1px #ccbeb29c",
          }}
        >
          <Option
            iconColor="#70b5f9"
            Icon={PhotoIcon}
            Title="Photo"
            label="image"
          />
          <Option
            iconColor="#7fc15e"
            Icon={YouTubeIcon}
            Title="Video"
            label="video"
          />
          <Option iconColor="#e7a33e" Icon={InsertLinkIcon} Title="Insert" />
          <Option iconColor="#fc9295" Icon={AssignmentIcon} Title="Article" />
        </div>
        <div className="posts">
          {posts.length === 0 ? (
            <Loading />
          ) : (
            <FlipMove>
              {posts.map(
                ({
                  id,
                  data: {
                    name,
                    message,
                    photoURL,
                    email,
                    timestamp,
                    fileName,
                    fileType,
                    fileData,
                  },
                }) => (
                  <Post
                    key={id}
                    name={name}
                    message={message}
                    photoURL={photoURL}
                    email={email}
                    timestamp={timestamp}
                    fileName={fileName}
                    fileType={fileType}
                    fileData={fileData}
                  />
                )
              )}
            </FlipMove>
          )}
        </div>
      </div>
    </div>
  );
};

export default Feed;

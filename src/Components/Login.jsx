import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import "../CSS/login.css";
import { loginUser } from "../features/userSlice";
import { auth } from "./firebase";
import LoginAnimation from "./Lottie_Animation/LoginAnimation";
const Login = () => {
  const [isLoginned, setIsLoginned] = useState(false);
  const [userDetails, setUserDetails] = useState({
    username: "",
    photoURL: "",
    email: "",
    password: "",
  });
  const { username, photoURL, email, password } = userDetails;
  const dispatch = useDispatch();
  function handleChange(e) {
    const { name, value } = e.target;
    setUserDetails((prev) => {
      return { ...prev, [name]: value };
    });
  }
  function Signup(e) {
    e.preventDefault();
    if (username && email && password) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((userAuth) => {
          userAuth.user.updateProfile({
            displayName: username,
            photoURL: photoURL,
          });
          userAuth.user.sendEmailVerification();
          auth.signOut();
          Swal.fire({
            icon: "success",
            title: "Email sent",
            width: "400px",
          });
        })
        .catch((error) => alert(error));
      setUserDetails({
        username: "",
        photoURL: "",
        email: "",
        password: "",
      });
    } else {
      Swal.fire({
        icon: "info",
        title: "Oops...",
        text: "Please fill out all the details!",
        width: "400px",
      });
    }
  }

  function Signin(e) {
    e.preventDefault();
    if (email && password) {
      auth.signInWithEmailAndPassword(email, password).then(({ user }) => {
        if (!user.emailVerified) {
          auth.signOut();
          Swal.fire({
            icon: "info",
            title: "Oops...",
            text: "Email is not verified!",
            width: "400px",
          });
        }

        else {
          dispatch(
            loginUser({
              email: user.email,
              uid: user.uid,
              photoURL: user.photoURL,
              displayName: user.displayName,
            })
          );
        }
        
      });
    } else {
      Swal.fire({
        icon: "info",
        title: "Oops...",
        text: "Please fill out all the details!",
        width: "400px",
      });
    }
  }

  return (
    <>
      {isLoginned ? (
        <div className="signup__container">
          <div className="Signup">
            <img
              src="https://www.jobvite.com/wp-content/uploads/2020/09/linkedin-logo-300x83.png"
              alt=""
            />
            <label>
              <p className="para">Make the most of your professional life</p>
            </label>
            <div className="form">
              <form onSubmit={Signup}>
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={handleChange}
                  placeholder="Full Name"
                />

                <input
                  type="text"
                  name="photoURL"
                  value={photoURL}
                  onChange={handleChange}
                  placeholder="Profile Picture URL(Optional)"
                />
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="Email"
                />
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  placeholder="Password"
                />
                <input type="submit" value="Join" />
                <h4>
                  Already on LinkedIn?
                  <span onClick={() => setIsLoginned(false)}> Sign in</span>
                </h4>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="login">
          <LoginAnimation />
          <div className="form">
            <form onSubmit={Signin}>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Email"
              />

              <input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Password"
                autoComplete="on"
              />
              <input type="submit" value="Sign in" />
              <h4>
                New to LinkedIn?
                <span onClick={() => setIsLoginned(true)}> Join now</span>
              </h4>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;

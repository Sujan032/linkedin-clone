import React, { useEffect} from "react";
import Header from "./Header";
import Body from "./Body";
import Login from "./Login";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, logoutUser, selectUser } from "../features/userSlice";
import { auth } from "./firebase";
import { selecttoggleTheme } from "../features/toggleThemeReducer";
import "../CSS/index.css";

function App() {
  const user = useSelector(selectUser);
  const toggleTheme = useSelector(selecttoggleTheme);
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        //already logged in
        dispatch(
          loginUser({
            email: userAuth.email,
            uid: userAuth.uid,
            photoURL: userAuth.photoURL,
            displayName: userAuth.displayName,
          })
        );
      } else {
        //logged out
        dispatch(logoutUser(null));
      }
    });
  }, [dispatch]);
  return (
    <>
      {!user ? (
        <Login />
      ) : (
        <div
          className="app"
          style={{ backgroundColor: toggleTheme ? "#151515" : "#f3f2ef" }}
        >
          <Header />
          <Body />
        </div>
      )}
    </>
  );
}

export default App;

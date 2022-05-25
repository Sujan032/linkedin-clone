import React from "react";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Widget from "./Widget";

const Body = () => {
  return (
    <>
      <div className="app_body">
        <Sidebar />
        <Feed />
        <Widget />
      </div>
    </>
  );
};

export default Body;

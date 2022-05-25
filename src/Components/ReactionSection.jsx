import React, { useEffect, useState } from "react";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

const ReactionSection = ({ likeCount }) => {
  const [reaction, setReaction] = useState({ likes: "", comments: "" });
  useEffect(() => {
    setReaction({
      likes: Math.floor(Math.random() * 499) + 50,
      comments: Math.floor(Math.random() * 50) + 7,
    });
  }, []);
  const { likes, comments } = reaction;
  return (
    <div className="reaction__section">
      <div className="reactions">
        <img
          src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb"
          alt=""
        />
        <img
          src="https://static-exp1.licdn.com/sc/h/7fx9nkd7mx8avdpqm5hqcbi97"
          alt=""
        />
        <img
          src="https://static-exp1.licdn.com/sc/h/5thsbmikm6a8uov24ygwd914f"
          alt=""
        />
      </div>
      <span>
        {likeCount ? likes + 1 : likes} <FiberManualRecordIcon />
        {comments} comments
      </span>
    </div>
  );
};

export default ReactionSection;

import { InfoRounded } from "@material-ui/icons";
import { KeyboardArrowDown } from "@mui/icons-material";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import "../CSS/widget.css";
import { selecttoggleTheme } from "../features/toggleThemeReducer";
import WidgetComponents from "./WidgetComponents";
import ad from "./ad.jpg";

const Widget = () => {
  const [isexpanded, setIsExpanded] = useState(false);
  const toggleTheme = useSelector(selecttoggleTheme);
  const [hover, setHover] = useState(false);
  const expand = useRef();
  function sethover() {
    setHover((prev) => {
      return !prev;
    });
  }

  return (
    <div className="container">
      <div
        className="widget"
        style={{
          backgroundColor: toggleTheme ? "rgb(29, 34, 38)" : "white",
          boxShadow: toggleTheme ? "none" : "1px 1px #ccbeb29c",
        }}
      >
        <div
          className="widget_header"
          style={{
            backgroundColor: toggleTheme ? "rgb(29, 34, 38)" : "white",
            color: toggleTheme ? "white" : "#565656",
          }}
        >
          <h4>LinkedIn News</h4>
          <InfoRounded />
        </div>

        <div
          className="top"
          style={{
            backgroundColor: toggleTheme ? "rgb(29, 34, 38)" : "white",
            color: toggleTheme ? "white" : "#565656",
          }}
        >
          <WidgetComponents
            text="Russian attacks intensify near K..."
            details="Top news 1,783,617 readers"
          />
          <WidgetComponents
            text="Consumer goods to get expens..."
            details="4d ago"
          />
          <WidgetComponents
            text="The top voices in gender equity"
            details="1d ago"
          />
          <WidgetComponents
            text="How to get promoted at work"
            details="1d ago"
          />
        </div>

        <div
          className="bottom"
          style={{
            backgroundColor: toggleTheme ? "rgb(29, 34, 38)" : "white",
            color: toggleTheme ? "white" : "#565656",
            height: !isexpanded ? "0px" : expand.current.scrollHeight + "px",
            overflow: "hidden",
          }}
          ref={expand}
        >
          <WidgetComponents
            text="Is crypto talent leaving India?"
            details="1d ago"
          />
          <WidgetComponents
            text="A billion-dollar IT opportunity"
            details="1d ago"
          />
          <WidgetComponents text="The surge in coding jobs" details="1d ago" />
          <WidgetComponents
            text="Better.com to fire 4,000 more..."
            details="1d ago"
          />
        </div>

        <div
          className="expand"
          style={{
            backgroundColor: toggleTheme
              ? hover
                ? "rgba(234, 255, 252, 0.075)"
                : "rgb(29, 34, 38)"
              : hover
              ? "lightgray"
              : "white",
            color: toggleTheme ? "white" : "#565656",
            borderRadius: "5px",
          }}
          onMouseEnter={sethover}
          onMouseLeave={sethover}
          onClick={() => {
            setIsExpanded((prev) => !prev);
          }}
        >
          <h4>Show {isexpanded ? "less" : "more"}</h4>
          <KeyboardArrowDown
            style={{
              transform: isexpanded ? "rotate(180deg)" : "none",
              transition: "transform ease-in 0.3s",
            }}
          />
        </div>
      </div>
      <div
        className="widget_ad"
        style={{
          backgroundColor: toggleTheme ? "rgb(29, 34, 38)" : "white",
          boxShadow: toggleTheme ? "none" : "1px 1px #ccbeb29c",
        }}
      >
        <img src={ad} alt="" />
      </div>
    </div>
  );
};

export default Widget;

import React from "react";
import "./style.css";

export default function FeedWrap(props) {
  return (
    <>
      <div
        className={`feed-wrap container${props.fluid ? "-fluid" : ""}`}
        {...props}
      />
    </>
  );
}

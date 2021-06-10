import React from "react";
import "./style.css";

function Card(props) {
  return <div className={`card container${props.fluid ? "-fluid" : ""}`} {...props} />;
}


export default Card;

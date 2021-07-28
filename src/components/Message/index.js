import React from "react";
import Avatar from "../Avatar";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import { faCommentAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Message({
  username,
  date,
  description,
  images,
  title,
  profileImage,
}) {
  return (
    <div className="post">
      <div className="post-top">
        <Avatar avatarImage={profileImage} className="post-avatar" />
        <div className="post-info">
          <h6>{username}</h6>
          <h6>{date}</h6>
        </div>
      </div>
      <div className="post-bottom">
        <div className="post-title">
          <h5>{title}</h5>
        </div>
        <div className="post-message">
          <p>{description}</p>
        </div>
        <div className="post-image">
          {images.length > 0 &&
            images.map((image) => <img src={image} alt="" />)}
        </div>
        <div className="post-options">
          <div className="post-icon">
            <FontAwesomeIcon
              icon={faThumbsUp}
              size="lg"
              style={{ marginRight: 7 }}
            />
            Like
          </div>
          <div className="post-icon">
            <FontAwesomeIcon
              icon={faCommentAlt}
              size="lg"
              style={{ marginRight: 7 }}
            />
            Comment
          </div>
          <div className="post-icon">
            <FontAwesomeIcon
              icon={faShare}
              size="lg"
              style={{ marginRight: 7 }}
            />
            Share
          </div>
        </div>
      </div>
    </div>
  );
}

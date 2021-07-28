import React from "react";

export default function Avatar({ avatarImage }) {
  return (
    <>
      <img
        className="avatarImage noselect"
        src={avatarImage}
        alt=""
        style={{ width: 70, height: 70, borderRadius: 1000 }}
      />
    </>
  );
}

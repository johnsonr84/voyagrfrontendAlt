import React, { useState } from "react";
import UserHeader from "../../UserPage"
import MessageSender from "../../components/MessageSender"
import Feed from "../../components/Feed";
import UserPost from "../../components/UserPost";
import UserInfo from "../../components/UserInfo";

// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';

function UserDashboard() {
  const [addPostLocation, setAddPostLocation] = useState(null);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '60vh',
    latitude: 37.6,
    longitude: -95.665,
    zoom: 2
  });
  return (
    <div
      style={{ backgroundColor: "lightgray" }}
    >
      <UserHeader addPostLocation={addPostLocation} setAddPostLocation={setAddPostLocation} viewport={viewport} setViewport={setViewport} />
      {/* <UserInfo></UserInfo> */}
      <Feed>
        {/* <MessageSender addPostLocation={addPostLocation} setAddPostLocation={setAddPostLocation} viewport={viewport} setViewport={setViewport} /> */}
        <UserPost />
      </Feed>
    </div>
  );
}

export default UserDashboard;
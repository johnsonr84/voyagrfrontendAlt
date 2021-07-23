import React, { useState } from "react";
import Header from "../../Map";
import MessageSender from "../../components/MessageSender";
import Feed from "../../components/Feed";
import Post from "../../components/Post";
import UserInfo from "../../components/UserInfo";
import VoyagrSearchFriend from "../../components/VoyagrSearchFriend";
import FeedWrap from "../../components/FeedWrap";
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';

function DashboardPage() {
  const [addPostLocation, setAddPostLocation] = useState(null);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "60vh",
    latitude: 37.6,
    longitude: -95.665,
    zoom: 2,
  });
  return (
    <div style={{ backgroundColor: "lightgray" }}>
      <Header
        addPostLocation={addPostLocation}
        setAddPostLocation={setAddPostLocation}
        viewport={viewport}
        setViewport={setViewport}
      />
      <FeedWrap>
        <Feed
          addPostLocation={addPostLocation}
          setAddPostLocation={setAddPostLocation}
          viewport={viewport}
          setViewport={setViewport}
        />
      </FeedWrap>
      {/* <UserInfo /> */}
      {/* <Feed>
        <VoyagrSearchFriend/>
        <MessageSender
        addPostLocation={addPostLocation}
        setAddPostLocation={setAddPostLocation}
        viewport={viewport}
        setViewport={setViewport}
        />
        <Post />
      </Feed> */}
    </div>
  );
}

export default DashboardPage;

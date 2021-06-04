import React, { useState } from "react";
import Header from "../../Map"
import MessageSender from "../../components/MessageSender"
import Feed from "../../components/Feed";
import Post from "../../components/Post";
import ModalComp from "../../components/Modal";
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';

function DashboardPage() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      <Header addPostLocation={addPostLocation} setAddPostLocation={setAddPostLocation} viewport={viewport} setViewport={setViewport} />
      <Feed>
        <ModalComp />
        <MessageSender addPostLocation={addPostLocation} setAddPostLocation={setAddPostLocation} viewport={viewport} setViewport={setViewport} />
        <Post />
      </Feed>
    </div>
  );
}

export default DashboardPage;
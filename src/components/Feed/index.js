import React, { useState, useEffect } from "react";
import PhotoListContainer from "../PhotoList";
import ProfileImage from "../ProfileImage";
import Button from "react-bootstrap/Button";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth, AuthProvider } from "../../Contexts/AuthContext";
import { API } from "../../utils/API";
import Message from "../Message";
import { usePosts } from "../../Contexts/PostContexts";
import { Col } from "../Grid";
import Container from "../Container";
import Avatar from "../Avatar";
import { faImages } from "@fortawesome/free-solid-svg-icons";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faGrinAlt } from "@fortawesome/free-solid-svg-icons";
import VoyagrSearchFriend from "../VoyagrSearchFriend";
import "./style.css";
// import VoyagrSearchFriend from "../VoyagrSearchFriend";
import SearchForm from "../SearchForm";
import VoyagrSearchPopup from "../VoyagrSearchPopup";

var moment = require("moment");

export default function Feed({
  addPostLocation,
  setAddPostLocation,
  viewport,
  setViewport,
}) {
  let timestamp = Date.now();
  var now = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");

  const { updatePhotoURL, currentUser } = useAuth();
  const { uid, displayName, photoURL } = currentUser;

  const [profilePhoto, setProfilePhoto] = useState();
  const defaultUserImage = "https://i.imgur.com/ScCwMk8.png";
  const [showProfilePopup, setShowProfilePopup] = useState();
  const [userImage, setUserImage] = useState("");
  const [input, setInput] = useState({});
  const [posts, setPosts] = usePosts();
  const [image, setImage] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [messages, setMessages] = usePosts();

  const [listOfUsers, setListOfUsers] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const nameFilterRegExp = new RegExp(nameFilter, "i");

  useEffect(() => {
    API.getUserByName(nameFilter)
      .then((res) => setListOfUsers(res.data))
      .catch(console.log("Did not Get the data"));
  }, []);

  useEffect(() => {
    if (photoURL == null) {
      setProfilePhoto(defaultUserImage);
    } else {
      setProfilePhoto(photoURL);
    }
  }, [photoURL]);

  const togglePopup = (e) => {
    if (showProfilePopup) setShowProfilePopup(false);
    else {
      setShowProfilePopup(true);
    }
  };

  const profilePopupShow = (event) => {
    setShowProfilePopup(true);
  };
  const profilePopupHide = (event) => {
    setShowProfilePopup(false);
  };

  const updatedProfileImage = async () => {
    const profileImage = image[0];
    console.log("profilePhoto: " + profileImage);

    await API.updateUser({ uid: uid, profileImage: profileImage });
  };

  async function handleUploadPhoto(e) {
    e.preventDefault();
    try {
      updatedProfileImage();
      updatePhotoURL(image[image.length - 1]).then(() => {
        setRefresh(!refresh);
        setImage([]);
      });
      profilePopupHide();
    } catch {
      console.log("Didn't work");
    }
  }

  function handleChange(event) {
    const { value } = event.target;
    setInput({ ...input, [event.target.name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setInput({ title: "", description: "", visitDate: "" });
    setImage([]);
    const newPost = {
      title: input.title,
      description: input.description,
      image: image,
      latitude: addPostLocation?.latitude || viewport.latitude,
      longitude: addPostLocation?.longitude || viewport.longitude,
      visitDate: input.visitDate,
      userID: uid,
      date: now,
      timestamp: timestamp,
    };
    console.log(newPost);
    API.savePost(newPost).catch((e) => console.log(e));
    setPosts((newPosts) => [newPost, ...newPosts]);
  };

  const handleShow = () =>
    setAddPostLocation({
      latitude: addPostLocation?.latitude || viewport.latitude,
      longitude: addPostLocation?.longitude || viewport.longitude,
    });

  return (
    <>
      <ProfileImage
        className="profileImageDiv noselect"
        avatarImage={profilePhoto}
      />

      <FontAwesomeIcon
        onClick={togglePopup}
        icon={faCamera}
        className="camera"
        size="3x"
      />

      <div
        className="showHidePopup"
        style={{
          position: "relative",
          display: showProfilePopup ? "block" : "none",
        }}
      >
        <div className="profilePopup">
          <div className="profileImageUploadBtn">
            <PhotoListContainer setImage={setImage} />
          </div>
          <p className="profilePopupText noselect"> Select a profile image</p>
          <Button
            className="profilePopupSubmit"
            style={{ backgroundColor: "#585858", borderColor: "white" }}
            onClick={handleUploadPhoto}
          >
            Submit{" "}
          </Button>
        </div>
      </div>
      {/* <div
        style={{
          position: "relative",
        }}
      > */}
      <h2 className="profileName noselect">{displayName}</h2>
      {/* </div> */}
      <Container className="feed-columns">
        <Container className="friend-search-column">
          <VoyagrSearchFriend />
          {/* <div className="friendSearch">
            <div className="form-group">
              <label htmlFor="search" className="searchLabel">
                Search Friends
              </label>
              <SearchForm setNameFilter={setNameFilter} />
            </div>
            {listOfUsers
              .filter((name) => nameFilterRegExp.test(name.userName))
              .map((friend) => (
                <VoyagrSearchPopup
                  uidID={friend.uid}
                  userName={
                    friend.userName == currentUser.displayName
                      ? "You"
                      : friend.userName
                  }
                  profileImage={
                    friend.uid == currentUser.uid
                      ? photoURL
                      : friend.profileImage.length > 0
                      ? friend.profileImage
                      : defaultUserImage
                  }
                  showHide={friend.uid == currentUser.uid ? "hidden" : "show"}
                />
              ))}
          </div> */}
        </Container>
        <Container className="posts-column">
          <div className="messageSender">
            <div className="messageSender-forms">
              <div className="messageSenderImage">
                <Avatar avatarImage={profilePhoto} />
              </div>
              <form>
                <div className="messageSender-top-forms">
                  <Container>
                    <div className="messageSender-top-left-form">
                      <input
                        name="title"
                        placeholder="Title"
                        value={input.title}
                        onChange={handleChange}
                        className="titleInput"
                        type="text"
                      />
                    </div>
                  </Container>
                  <Container>
                    <div className="messageSender-top-right-form">
                      <div className="visitDateText">Date Visited:</div>
                      <div className="visitDateDiv">
                        <input
                          name="visitDate"
                          value={input.visitDate}
                          onChange={handleChange}
                          className="visitDateInput"
                          type="date"
                        />
                      </div>
                    </div>
                  </Container>
                </div>
                <Container>
                  <div
                    className="messageSender-bottom-form"
                    style={{ marginTop: 15 }}
                  >
                    <input
                      name="description"
                      placeholder="What's on your mind?                                        "
                      value={input.description}
                      onChange={handleChange}
                      className="descriptionInput"
                      type="text"
                    />
                  </div>
                  <input
                    className="senderBtn"
                    type="submit"
                    value="Submit"
                    onClick={handleSubmit}
                  />
                </Container>
              </form>
            </div>
            <Container>
              <div className="messageSender-icons">
                <div className="icons-row-first">
                  <div
                    className="messageSender-icon"
                    variant="primary"
                    onClick={handleShow}
                  >
                    <FontAwesomeIcon icon={faMapMarkerAlt} size="2x" />
                    Pin
                  </div>
                  <div className="messageSender-icon ">
                    <FontAwesomeIcon icon={faImages} size="2x" />
                    <PhotoListContainer setImage={setImage} />
                  </div>
                </div>
                <div className="icons-row-second">
                  <div className="messageSender-icon">
                    <FontAwesomeIcon icon={faVideo} size="2x" />
                    Live
                  </div>
                  <div className="messageSender-icon">
                    <FontAwesomeIcon icon={faGrinAlt} size="2x" />
                    Feeling
                  </div>
                </div>
              </div>
            </Container>
          </div>
          {messages.map((message) => (
            <Message
              title={message.title}
              profileImage={profilePhoto}
              username={displayName}
              date={message.date}
              description={message.description}
              images={message.image}
            />
          ))}
        </Container>
      </Container>
    </>
  );
}

import React, { useState, useRef, useCallback, useEffect } from "react";
import PhotoListContainer from "./components/PhotoList";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";
import ReactMapGL, {
  Marker,
  Popup,
  GeolocateControl,
  NavigationControl,
} from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import { Nav, NavMenu } from "./NavbarElements";
import BurgerMenu from "./components/Dropdown";
import "./map.css";
import { API } from "./utils/API";
import ProfileImage from "./components/ProfileImage";
import UploadPhoto from "./components/UploadPhoto";
import { usePosts } from "./Contexts/PostContexts";

// import { usePhotoURL } from './Contexts/UserContexts/photoURL';

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useAuth, AuthProvider } from "./Contexts/AuthContext";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Feed from "./components/Feed";
var moment = require("moment");

export const Header = ({
  addPostLocation,
  setAddPostLocation,
  viewport,
  setViewport,
  images,
}) => {
  const { updatePhotoURL, currentUser } = useAuth();
  const { uid, displayName, photoURL } = currentUser;
  const userID = uid;
  const [input, setInput] = useState({});
  const [newPosts, setNewPosts] = usePosts();
  const [showPopup, setShowPopup] = useState({});
  const [posts, setPosts] = usePosts();
  const [image, setImage] = useState([]);
  // const [showProfilePopup, setShowProfilePopup] = useState();
  const [username, setUsername] = useState();
  const geocoderContainerRef = useRef();
  const geolocateControlRef = useRef();
  const mapRef = useRef();
  // const [refresh, setRefresh] = useState(false);
  // const [upload, setUpload] = usePhotoURL()
  // const [userImage, setUserImage] = useState("");
  const [profilePhoto, setProfilePhoto] = useState();

  const defaultUserImage = "https://i.imgur.com/ScCwMk8.png";

  // const getUserImage = () => {
  //   API.getUser({ uid: uid }).then(res =>
  //     setUserImage(res.data)
  //   )
  //     .catch(err => console.log(err));
  // }

  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );
  const geolocateControlStyle = {
    right: 30,
    top: 15,
  };

  const showAddMarkerPopup = (event) => {
    const [longitude, latitude] = event.lngLat;
    setAddPostLocation({ latitude, longitude });
  };

  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };
      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides,
      });
    },
    [handleViewportChange]
  );

  let timestamp = Date.now();
  var now = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");

  function handleUpload(event) {
    const { value } = event.target;
    setInput({ ...input, [event.target.name]: value });
  }

  function handleChange(event) {
    const { value } = event.target;
    setInput({ ...input, [event.target.name]: value });
  }

  async function clearImages() {
    setImage([]);
  }

  async function handleSubmit(e) {
    // const handleSubmit = (e) => {
    e.preventDefault();
    setInput({ title: "", description: "", image: "", visitDate: "" });

    const newPost = {
      title: input.title,
      description: input.description,
      image: image,
      latitude: parseFloat(addPostLocation.latitude),
      longitude: parseFloat(addPostLocation.longitude),
      visitDate: input.visitDate,
      userID: uid,
      date: now,
      timestamp: timestamp,
    };
    console.log(newPost);
    API.savePost(newPost).catch((e) => console.log(e));
    setNewPosts((newPosts) => [newPost, ...newPosts]);
    await clearImages();
  }

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  return (
    <>
      <Nav>
        <img
          src="/voyagr.png"
          height="60"
          className="voyagr-logo-header"
          alt="Voyagr logo"
        />
        <NavMenu ref={geocoderContainerRef}></NavMenu>
        <BurgerMenu />
      </Nav>
      <ReactMapGL
        ref={mapRef}
        {...viewport}
        width="100vw"
        height="60vh"
        onViewportChange={setViewport}
        attributionControl={false}
        mapStyle="mapbox://styles/thecjreynolds/ck117fnjy0ff61cnsclwimyay"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        onDblClick={showAddMarkerPopup}
        transitionDuration="200"
        doubleClickZoom={false}
      >
        <NavigationControl
          style={{ padding: 15 }}
          showZoom={true}
          showCompass={false}
        />
        <GeolocateControl
          style={geolocateControlStyle}
          containerRef={geolocateControlRef}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          // auto
        />
        <Geocoder
          mapRef={mapRef}
          containerRef={geocoderContainerRef}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          placeholder="Find Your Destination"
        />
        {newPosts.map((post) => (
          <React.Fragment key={post._id}>
            <Marker latitude={post.latitude} longitude={post.longitude}>
              <div
                onClick={() =>
                  setShowPopup({
                    // ...showPopup,
                    [post._id]: true,
                  })
                }
              >
                <svg
                  className="marker yellow"
                  style={{
                    height: `${6 * viewport.zoom}px`,
                    width: `${6 * viewport.zoom}px`,
                  }}
                  version="1.1"
                  id="Layer_1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 512 512"
                >
                  <g>
                    <g>
                      <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z" />
                    </g>
                  </g>
                </svg>
              </div>
            </Marker>
            {showPopup[post._id] ? (
              <Popup
                className="postPopup"
                latitude={post.latitude}
                longitude={post.longitude}
                closeButton={true}
                closeOnClick={false}
                dynamicPosition={true}
                onClose={() => setShowPopup({})}
                anchor="top"
              >
                <div className="popup">
                  <h3 className="popupPostTitle">{post.title}</h3>
                  <p className="popupDescription">{post.description}</p>
                  <h6>Latitude, Longitude:</h6>
                  <p>
                    {" "}
                    {post.latitude.toFixed(2)}, {post.longitude.toFixed(2)}{" "}
                  </p>

                  <small>
                    Visited on: {new Date(post.visitDate).toLocaleDateString()}
                  </small>
                  <div className="centerPopupImage">
                    <Carousel
                      swipeable={true}
                      draggable={false}
                      showDots={true}
                      responsive={responsive}
                      infinite={true}
                    >
                      {post.image.length > 0 &&
                        post.image.map((img) => (
                          <img src={img} alt={post.title} />
                        ))}
                    </Carousel>
                  </div>
                </div>
              </Popup>
            ) : null}
          </React.Fragment>
        ))}
        {addPostLocation ? (
          <>
            <Marker
              latitude={addPostLocation.latitude}
              longitude={addPostLocation.longitude}
            >
              <div>
                <svg
                  className="marker react-blue"
                  style={{
                    height: `${6 * viewport.zoom}px`,
                    width: `${6 * viewport.zoom}px`,
                  }}
                  version="1.1"
                  id="Layer_1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 512 512"
                >
                  <g>
                    <g>
                      <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z" />
                    </g>
                  </g>
                </svg>
              </div>
            </Marker>
            <Popup
              latitude={addPostLocation.latitude}
              longitude={addPostLocation.longitude}
              closeButton={true}
              closeOnClick={false}
              dynamicPosition={true}
              onClose={() => setAddPostLocation(null)}
              anchor="top"
            >
              <div className="popup">
                <form className="post-form" onSubmit={handleSubmit}>
                  <label htmlFor="title">Title</label>
                  <input
                    name="title"
                    required
                    onChange={handleChange}
                    value={input.title}
                  />
                  <label htmlFor="description">Description</label>
                  <input
                    name="description"
                    rows={3}
                    value={input.description}
                    onChange={handleChange}
                  />
                  <label htmlFor="image">Images</label>
                  <div className="popupImages">
                    <PhotoListContainer
                      style={{ justifyContent: "center" }}
                      setImage={setImage}
                    />
                  </div>
                  <label htmlFor="visitDate">Visit Date</label>
                  <input
                    name="visitDate"
                    type="date"
                    value={input.visitDate}
                    onChange={handleChange}
                  />
                  <input type="submit" value="Submit" />
                </form>
              </div>
            </Popup>
          </>
        ) : null}
      </ReactMapGL>
    </>
  );
};

export default Header;

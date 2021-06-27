import React, { useEffect, useState } from 'react'
import "./style.css";
import { faImages } from '@fortawesome/free-solid-svg-icons'
import { faVideo } from '@fortawesome/free-solid-svg-icons'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { faGrinAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Avatar from '../Avatar';
import { useAuth } from "../../Contexts/AuthContext"
import { API } from "../../utils/API"
import { usePosts } from '../../Contexts/PostContexts';
import { Col } from '../Grid';
import Container from "../Container";
import PhotoListContainer from "../PhotoList";


var moment = require('moment');

export default function MessageSender({ addPostLocation, setAddPostLocation, viewport, setViewport }) {

    let timestamp = Date.now()
    var now = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");

    const { currentUser } = useAuth()
    const { uid, photoURL } = currentUser;
    const userID = uid;

    const [input, setInput] = useState({});
    const [posts, setPosts] = usePosts();
    const [image, setImage] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const [profilePhoto, setProfilePhoto] = useState();

    const defaultUserImage = "https://i.imgur.com/ScCwMk8.png"

    useEffect(() => {
        if (photoURL == null) {
            setProfilePhoto(defaultUserImage)
        }
        else {
            setProfilePhoto(photoURL)
        }
    }, [])


    function handleChange(event) {

        const { value } = event.target
        setInput({ ...input, [event.target.name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setInput({ title: "", description: "", visitDate: "" })
        setImage([])
        const newPost = {
            title: input.title,
            description: input.description,
            image: image,
            latitude: addPostLocation?.latitude || viewport.latitude,
            longitude: addPostLocation?.longitude || viewport.longitude,
            visitDate: input.visitDate,
            userID: uid,
            date: now,
            timestamp: timestamp
        }
        console.log(newPost);
        API.savePost(newPost).catch(e => console.log(e))
        setPosts((newPosts) => [newPost, ...newPosts])
    }

    const handleShow = () => setAddPostLocation({ latitude: addPostLocation?.latitude || viewport.latitude, longitude: addPostLocation?.longitude || viewport.longitude });

    return (
        <>
            <div className="messageSender">
                <div className="messageSender-forms">
                    <div className="messageSenderImage">
                        <Avatar
                            avatarImage={profilePhoto}
                        />
                    </div>
                    <form>
                        <div className="messageSender-top-forms">
                            <Col size="md-6">
                                <div
                                    className="messageSender-top-left-form"
                                >
                                    <input
                                        name="title"
                                        placeholder="Title"
                                        value={input.title}
                                        onChange={handleChange}
                                        className="titleInput"
                                        type="text"
                                    />
                                </div>
                            </Col>
                            <Col size="md-6">
                                <div className="messageSender-top-right-form">
                                    <div className="visitDateText">
                                        Date Visited:
                                    </div>
                                    <div
                                        className="visitDateDiv"
                                    >
                                        <input
                                            name="visitDate"
                                            value={input.visitDate}
                                            onChange={handleChange}
                                            className="visitDateInput"
                                            type="date"
                                        />
                                    </div>
                                </div>
                            </Col>
                        </div>
                        <Container>
                            <div className="messageSender-bottom-form"
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
                            <input className="senderBtn" type="submit" value="Submit" onClick={handleSubmit} />
                        </Container>
                    </form>
                </div>
                <Container>
                    <div className="messageSender-icons">
                        <div className="icons-row-first">
                            <div className="messageSender-icon" variant="primary" onClick={handleShow}>
                                <FontAwesomeIcon icon={faMapMarkerAlt} size="2x" />
                                Pin
                            </div>
                            <div className="messageSender-icon ">
                                <FontAwesomeIcon icon={faImages} size="2x" />
                                <PhotoListContainer
                                    setImage={setImage}
                                />
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
        </>
    )
}
import React, { useEffect, useState } from 'react'
import "./style.css";
import { useAuth } from "../../Contexts/AuthContext"
import { API } from "../../utils/API"
import { Col } from '../Grid';
import Container from "../Container";





export default function VoyagrSearchFriend(search) {

    
    const { currentUser } = useAuth()
    const { uid} = currentUser;
    const userID = uid;
 

    const [search, setSearch] = useState({});
   
    function handleChange(event) {

        const { value } = event.target
        setSearch(event.target)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearch({ search: ""})
       
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
                            avatarImage={photoURL}
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
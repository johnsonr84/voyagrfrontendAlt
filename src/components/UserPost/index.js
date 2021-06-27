import React, { useState, useEffect } from 'react';
import "./style.css"
import { useAuth } from "../../Contexts/AuthContext"
import Message from '../Message'
import { usePosts } from '../../Contexts/PostContexts';
import { useParams } from 'react-router-dom';
import { API } from "../../utils/API"

export default function UserPost(profileImage) {
    const { currentUser } = useAuth()
    const { uid, displayName, photoURL } = currentUser;
    const defaultUserImage = "https://i.imgur.com/ScCwMk8.png"
    const [messages, setMessages] = useState([]);
    const [profilePhoto, setProfilePhoto] = useState();


    const { id } = useParams()
    console.log("UserPage id: " + id)

    useEffect(() => {
        if (!currentUser) {
            return
        }

        API.getPost(id)
            .then(res =>
                setMessages(res.data)
            )
            .catch(err => console.log(err));
    }, [id]);

    useEffect(() => {
        if (profilePhoto == null) {
            setProfilePhoto(defaultUserImage)
            return
        }

        API.getUserByParam(id)
            .then(res =>
                setProfilePhoto(res.data.profileImage)
            )
            .catch(err => console.log(err));
    }, [id]);

    return (
        messages
            .map(message =>
                <Message
                    title={message.title}
                    profileImage={profilePhoto}
                    username={displayName}
                    date={message.date}
                    description={message.description}
                    images={message.image}
                />)

    )
}
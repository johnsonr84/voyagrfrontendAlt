import React, { useState, useEffect } from 'react';
import "./style.css"
import { useAuth } from "../../Contexts/AuthContext"
import UserMessage from '../UserMessage'
import { usePosts } from '../../Contexts/PostContexts';
import { useParams } from 'react-router-dom';
import { API } from "../../utils/API"

export default function UserPost(profileImage, username) {
    const { currentUser } = useAuth()
    const { uid, displayName, photoURL } = currentUser;
    const defaultUserImage = "https://i.imgur.com/ScCwMk8.png"
    const [messages, setMessages] = useState([]);
    const [profilePhoto, setProfilePhoto] = useState();
    const [avatar, setAvatar] = useState([]);


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

    return (
        messages
            .map(message =>
                <UserMessage
                    title={message.title}
                    date={message.date}
                    description={message.description}
                    images={message.image}
                />)
    )
}
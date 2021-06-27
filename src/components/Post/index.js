import React, { useEffect, useState } from 'react'
import "./style.css"
import { useAuth } from "../../Contexts/AuthContext"
import Message from '../Message'
import { usePosts } from '../../Contexts/PostContexts';

export default function Post(profileImage) {
    const { currentUser } = useAuth()
    const { uid, displayName, photoURL } = currentUser;
    const [messages, setMessages] = usePosts();

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
import React from 'react'
import "./style.css"
import { useAuth } from "../../Contexts/AuthContext"
import Message from '../Message'
import { usePosts } from '../../Contexts/PostContexts';

export default function Post(profileImage) {
    const { currentUser } = useAuth()
    const { uid, displayName, photoURL } = currentUser;
    const defaultUserImage = "https://i.imgur.com/ScCwMk8.png"
    const [messages, setMessages] = usePosts();

    return (
        messages
            .map(message =>
                <Message
                    title={message.title}
                    profileImage={photoURL}
                    username={displayName}
                    date={message.date}
                    description={message.description}
                    images={message.image}
                />)

    )
}
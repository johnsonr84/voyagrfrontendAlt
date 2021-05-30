import React from 'react'
import "./style.css"
import { useAuth0 } from '@auth0/auth0-react';
import Message from '../Message'
import { usePosts } from '../../Contexts/PostContexts';

export default function Post(profileImage) {
    const { user } = useAuth0();
    const { name, picture } = user;
    const [messages, setMessages] = usePosts();

    return (
        messages
            .map(message =>
                <Message
                    title={message.title}
                    profileImage={picture}
                    username={name}
                    date={message.date}
                    description={message.description}
                    images={message.image}
                />)

    )
}
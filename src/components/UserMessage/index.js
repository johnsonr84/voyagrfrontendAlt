import React, { useState, useEffect } from 'react';
import AvatarImage from '../AvatarImage'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { faShare } from '@fortawesome/free-solid-svg-icons'
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useParams } from 'react-router-dom';
import { API } from "../../utils/API"
export default function Message({ username, date, description, images, title, profileImage }) {

    const [avatar, setAvatar] = useState([]);
    const { id } = useParams()

    useEffect(() => {
        API.getUserByParam(id)
            .then(res =>
                setAvatar(res.data)
            )
            .catch(err => console.log(err));
    }, [id]);

    return (
        <div className="post" >
            <div className="post-top">
                <AvatarImage
                    className="post-avatar" />
                <div className="post-info">

                    {avatar
                        .map(avatar => avatar.userName
                        )}
                    <h6>{date}</h6>
                </div>
            </div>
            <div className="post-bottom">
                <div className="post-title">
                    <h5>{title}</h5>
                </div>
                <div className="post-message">
                    <p>{description}</p>
                </div>
                <div className="post-image">
                    {images.length > 0 && images.map(image => <img src={image} alt="" />)}
                </div>
                <div className="post-options">
                    <div className="post-icon">
                        <FontAwesomeIcon icon={faThumbsUp} size="lg" style={{ marginRight: 7 }} />
                        Like
                    </div>
                    <div className="post-icon">
                        <FontAwesomeIcon icon={faCommentAlt} size="lg" style={{ marginRight: 7 }} />
                        Comment
                    </div>
                    <div className="post-icon">
                        <FontAwesomeIcon icon={faShare} size="lg" style={{ marginRight: 7 }} />
                        Share
                    </div>
                </div>
            </div>
        </div >
    )
}
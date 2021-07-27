import React, { useState, useEffect } from 'react';
import Avatar from '../Avatar'
import { useParams } from 'react-router-dom';
import { API } from "../../utils/API"

export default function AvatarImage({ avatarImage }) {

    const [avatar, setAvatar] = useState([]);
    const [profilePhoto, setProfilePhoto] = useState();
    const defaultUserImage = "https://i.imgur.com/ScCwMk8.png"

    const { id } = useParams()

    useEffect(() => {
        API.getUserByParam(id)
            .then(res =>
                setAvatar(res.data)
            )
            .catch(err => console.log(err));

        // if (profilePhoto == null) {
        //     setProfilePhoto(defaultUserImage)
        //     return
        // }
        console.log("Hello")
        console.log(JSON.stringify(avatar))

    }, [id]);


    return (
        avatar
            .map(avatar =>
                <Avatar
                avatarImage={avatar.profileImage.length !== 0 ? avatar.profileImage : defaultUserImage}
                    //avatarImage={avatar.profileImage}
                />)
    )
}
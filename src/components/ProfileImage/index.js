import React from 'react'
// import { faCamera } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./style.css";
// import { useAuth, AuthProvider } from "./Contexts/AuthContext"

export default function ProfileImage({ avatarImage }) {


    return (

        <div className="imageDiv" >
            <img className="profileImage" src={avatarImage} alt="" style={{ borderRadius: 1000 }} />
            {/* <FontAwesomeIcon icon={faCamera} className="camera" size="3x" onClick={handleUploadPhoto} /> */}

        </div>
    )
}
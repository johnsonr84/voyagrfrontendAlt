import React from 'react'
import { faImages } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PhotoListContainer from "../PhotoList";

import "./style.css";


export default function UploadPhoto() {


    return (

        <div className="uploadPopup" >
            <FontAwesomeIcon icon={faImages} className="imagesPopup" size="3x" />
            <h4>Upload a Profile Picture</h4>
        </div>
    )
}
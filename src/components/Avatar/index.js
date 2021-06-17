import React from 'react'

export default function Avatar({ avatarImage }) {

    return (
        <div>
            <img className="avatarImage" src={avatarImage} alt="" style={{ width: 70, height: 70, borderRadius: 1000 }} />
        </div>
    )
}
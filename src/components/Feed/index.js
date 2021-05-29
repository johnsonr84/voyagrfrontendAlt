import React from 'react'
import "./style.css"
export default function Feed(props) {

    return (
        <>
            <div className={`feed container${props.fluid ? "-fluid" : ""}`} {...props} />
        </>
    )
}
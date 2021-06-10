import React from "react";
import "./style.css"

// This file exports the Input, TextArea, and FormBtn components
export function Input(props) {
    return (
        <div className="form-group">
            <input className="form-control" {...props} />
        </div>
    );
}

export function TextArea(props) {
    return (
        <div className="form-group">
            <textarea className="form-control" rows="20" {...props} />
        </div>
    );
}

export function LoginBtn(props) {
    return (
        <button {...props} className="formBtn btn btn-info">
            {props.children}
        </button>
    );
}

export function SignupBtn(props) {
    return (
        <button {...props} className="formBtn btn btn-success">
            {props.children}
        </button>
    );
}
import React from "react";
// import { useAuth0 } from "@auth0/auth0-react";
import "./style.css"
const SignupButton = () => {
    // const { loginWithRedirect } = useAuth0();
    return (
        <button
            className="signupBtn btn btn-success btn-block"
        >
            Create account
        </button>
    );
};

export default SignupButton;
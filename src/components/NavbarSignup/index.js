import { NavLink, NavBtn } from "./NavbarElements"
import "./style.css";
import LoginButton from '../LoginButton';
import SignupButton from '../SignupButton';
import { Col, Row } from '../Grid';
import Container from "../Container";
import React, { useState, useRef } from "react";
import "./style.css";
import Card from "../../components/FormCard";
import { Alert } from "react-bootstrap"
import { Input, LoginBtn, SignupBtn } from "../Form";
import axios from 'axios'
import { useAuth, AuthProvider } from "../../Contexts/AuthContext"
import { useHistory } from "react-router-dom"

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import { useAuth0 } from '@auth0/auth0-react';
// import 'bootstrap/dist/css/bootstrap.min.css'

export const NavbarSignup = () => {
    const { login, signup, currentUser, emailVerified } = useAuth()
    // const emailRef = useRef()
    // const passwordRef = useRef()
    // const passwordConfirmRef = useRef()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const [email, setEmail] = useState()
    const [name, setName] = useState()
    const [password, setPassword] = useState()
    const [passwordConfirm, setPasswordConfirm] = useState()

    async function handleSubmitSignup(e) {
        e.preventDefault()

        if (password !== passwordConfirm) {
            return setError("Passwords do not match")
        }

        try {
            setError("")
            setLoading(true)
            await signup(name, email, password)
            handleCloseSignup();
            handleShowAlert();

        } 
        catch {
            setError("Failed to create an account")
        }

        setLoading(false)

    }


    async function handleSubmitLogin(e) {
        e.preventDefault()
if (!emailVerified){
    return setError("Invalid Username or Password")
}
        try {
            setError("")
            setLoading(true)
            await login(email, password)
            history.push("/dashboard")
        } catch {
            setError("Invalid Username or Password")
        }

        setLoading(false)

    }


    // const [username, setUsername] = useState("")

    const [showLogin, setShowLogin] = useState(false);
    const handleCloseLogin = () => setShowLogin(false);
    const handleShowLogin = () => setShowLogin(true);

    const [showSignup, setShowSignup] = useState(false);
    const handleCloseSignup = () => setShowSignup(false);
    const handleShowSignup = () => setShowSignup(true);

    const [showAlert, setShowAlert] = useState(false);
    const handleCloseAlert = () => setShowAlert(false);
    const handleShowAlert = () => setShowAlert(true);

    return (
        <>

            <Container>
                <Row>
                    <Col size="md-4">
                        <img
                            style={{ marginTop: 20 }}
                            src="/voyagr.png"
                            // width="30"
                            height="60"
                            className="voyagr-logo-header"
                            alt="Voyagr logo"
                        />
                    </Col>
                    <Col size="md-2">
                    </Col>
                    <Col size="md-6">
                        <NavBtn>
                            <Button className="loginBtn" onClick={() => {
                                handleCloseSignup();
                                handleShowLogin();
                            }}>
                                Login
                            </Button>
                            <Button className="signupBtn" variant="success" onClick={() => {
                                handleCloseLogin();
                                handleShowSignup();
                            }}>
                                Sign Up
                            </Button>
                        </NavBtn>
                    </Col>
                </Row>
            </Container>


            <Modal
                show={showLogin}
                onHide={handleCloseLogin}
                centered
                // backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form.Group onSubmit={handleSubmitLogin}>

                        <Form.Label>Email: </Form.Label>
                        <Form.Control
                            onChange={(e) => setEmail(e.target.value)}
                            id="email"
                            type="email"
                            required
                        // type="text" onChange={handleChange} value={username} placeholder="Your name" 
                        />
                        <Form.Label>Password: </Form.Label>
                        <Form.Control
                            onChange={(e) => setPassword(e.target.value)}
                            id="password"
                            type="password"
                            required
                        // type="text" onChange={handleChange} value={username} placeholder="Your name" 
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer className="login-modal-footer">
                    <NavLink className="forgotPasswordText" to="/password-reset">Forgot Password?</NavLink>
                    <Button
                        disabled={loading}
                        onClick={handleSubmitLogin}
                    // variant="primary" form="userForm" type="submit" onClick={handleSubmit}
                    >Submit</Button>
                </Modal.Footer>
            </Modal>





            <Modal
                show={showSignup}
                onHide={handleCloseSignup}
                centered
                // backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form.Group onSubmit={handleSubmitSignup}>

                        <Form.Label>Username: </Form.Label>
                        <Form.Control
                            onChange={(e) => setName(e.target.value)}
                            id="name"
                            type="text"
                            required
                        // type="text" onChange={handleChange} value={username} placeholder="Your name" 
                        />
                        <Form.Label>Email: </Form.Label>
                        <Form.Control
                            onChange={(e) => setEmail(e.target.value)}
                            id="email"
                            type="email"
                            required
                        // type="text" onChange={handleChange} value={username} placeholder="Your name" 
                        />
                        <Form.Label>Password: </Form.Label>
                        <Form.Control
                            onChange={(e) => setPassword(e.target.value)}
                            id="password"
                            type="password"
                            required
                        // type="text" onChange={handleChange} value={username} placeholder="Your name" 
                        />
                        <Form.Label>Confirm Password: </Form.Label>
                        <Form.Control
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            id="password-confirm"
                            type="password"
                            required
                        //  type="text" onChange={handleChange} value={username} placeholder="Your name" 
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer className="signup-modal-footer">
                    <Button
                        disabled={loading}
                        onClick={handleSubmitSignup}
                    // variant="primary" form="userForm" type="submit" onClick={handleSubmit}
                    >Submit</Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={showAlert}
                onHide={handleCloseAlert}
                centered
                // backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                   
                </Modal.Header>
                <Modal.Body className="alertBody" >
                <h3  >Check your inbox for further instructions</h3>

                    
                </Modal.Body>
                <Modal.Footer className="signup-modal-footer">
                    
                    <Button
                        
                        onClick={handleCloseAlert}
                    // variant="primary" form="userForm" type="submit" onClick={handleSubmit}
                    >Close</Button>
                </Modal.Footer>
            </Modal>


        </>
    )
}

export default NavbarSignup;
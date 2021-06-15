import { NavLink, NavBtn } from "./NavbarElements"
import "./style.css";
import LoginButton from '../LoginButton';
import SignupButton from '../SignupButton';
import { Col, Row } from '../Grid';
import Container from "../Container";
import React, { useState, useEffect } from "react";
import "./style.css";
import Card from "../../components/FormCard";
import { Alert } from "react-bootstrap"
import { Input, LoginBtn, SignupBtn } from "../Form";
import axios from 'axios'
import { useAuth, AuthProvider } from "../../Contexts/AuthContext"
import { useHistory } from "react-router-dom"
import { auth } from "../../firebase"

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
// import 'bootstrap/dist/css/bootstrap.min.css'

export const NavbarSignup = () => {
    const { login, logout, signup, currentUser } = useAuth()

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const [email, setEmail] = useState()
    const [name, setName] = useState()
    const [password, setPassword] = useState()
    const [passwordConfirm, setPasswordConfirm] = useState()
    const [message, setMessage] = useState("")

    async function handleSubmitSignup(e) {
        e.preventDefault()

        if (password !== passwordConfirm) {
            return setError("Passwords do not match")
        }

        try {
            setMessage("")
            setError("")
            setLoading(true)
            await signup(name, email, password)
            setMessage("Check your inbox for further instructions")
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

        try {
            setMessage("")
            setError("")
            setLoading(true)
            await login(email, password)
        }


        catch {
            setError("Invalid Username or Password")

        }

        setLoading(false)

    }


    const [showLogin, setShowLogin] = useState(false);
    const handleCloseLogin = () => setShowLogin(false);
    const handleShowLogin = () => setShowLogin(true);

    const [showSignup, setShowSignup] = useState(false);
    const handleCloseSignup = () => setShowSignup(false);
    const handleShowSignup = () => setShowSignup(true);

    const [showAlert, setShowAlert] = useState(false);
    const handleCloseAlert = () => setShowAlert(false);
    const handleShowAlert = () => setShowAlert(true);





    useEffect(() => {

        const checkVerified = async () => {
            if (currentUser && currentUser.emailVerified) {

                history.push("/dashboard")
            }
            else {
                auth.signOut();
                // setError("Email address not verified")
            }
        }

        checkVerified()
    }, [currentUser])

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
                                setError("");
                                handleCloseSignup();
                                handleShowLogin();
                            }}>
                                Login
                            </Button>
                            <Button className="signupBtn" variant="success" onClick={() => {

                                setError("");
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

                    <Form.Group>

                        <Form.Label>Email: </Form.Label>
                        <Form.Control
                            onChange={(e) => setEmail(e.target.value)}
                            id="email"
                            type="email"
                            required
                        />
                        <Form.Label>Password: </Form.Label>
                        <Form.Control
                            onChange={(e) => setPassword(e.target.value)}
                            id="password"
                            type="password"
                            required
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer className="login-modal-footer">
                    <NavLink className="forgotPasswordText" to="/password-reset">Forgot Password?</NavLink>
                    <Button
                        disabled={loading}
                        type="submit"
                        onClick={handleSubmitLogin}
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
                    {/* {message && <Alert variant="success">{message}</Alert>} */}
                    <Form.Group>

                        <Form.Label>Username: </Form.Label>
                        <Form.Control
                            onChange={(e) => setName(e.target.value)}
                            id="name"
                            type="text"
                            required
                        />
                        <Form.Label>Email: </Form.Label>
                        <Form.Control
                            onChange={(e) => setEmail(e.target.value)}
                            id="email"
                            type="email"
                            required
                        />
                        <Form.Label>Password: </Form.Label>
                        <Form.Control
                            onChange={(e) => setPassword(e.target.value)}
                            id="password"
                            type="password"
                            required
                        />
                        <Form.Label>Confirm Password: </Form.Label>
                        <Form.Control
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            id="password-confirm"
                            type="password"
                            required
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer className="signup-modal-footer">
                    <Button
                        disabled={loading}
                        type="submit"
                        onClick={handleSubmitSignup}
                    >
                        Submit</Button>
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
                    >Close</Button>
                </Modal.Footer>
            </Modal>


        </>
    )
}

export default NavbarSignup;
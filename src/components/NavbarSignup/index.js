import { NavBtn } from "./NavbarElements"
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
import { Link, useHistory } from "react-router-dom"

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import { useAuth0 } from '@auth0/auth0-react';
// import 'bootstrap/dist/css/bootstrap.min.css'

export const NavbarSignup = () => {
    const { signup, currentUser } = useAuth()
    // const emailRef = useRef()
    // const passwordRef = useRef()
    // const passwordConfirmRef = useRef()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [passwordConfirm, setPasswordConfirm] = useState()

    async function handleSubmit(e) {
        e.preventDefault()

        if (password !== passwordConfirm) {
            return setError("Passwords do not match")
        }

        try {
            setError("")
            setLoading(true)
            await signup(email, password)
            history.push("/")
        } catch {
            setError("Failed to create an account")
        }

        setLoading(false)

    }

    // const [username, setUsername] = useState("")

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShowSignup = () => setShow(true);


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
                            <LoginButton
                            />
                            <Button className="signupBtn" variant="success" onClick={handleShowSignup}>
                                Sign Up
      </Button>
                        </NavBtn>
                    </Col>
                </Row>
            </Container>
            <Modal
                show={show}
                onHide={handleClose}
                centered
                // backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form.Group onSubmit={handleSubmit}>


                        <Form.Label>Name: </Form.Label>
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
                <Modal.Footer>
                    <Button
                        disabled={loading}
                        onClick={handleSubmit}
                    // variant="primary" form="userForm" type="submit" onClick={handleSubmit}
                    >Submit</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default NavbarSignup;
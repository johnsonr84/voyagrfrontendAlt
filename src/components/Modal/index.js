import React, { useEffect, useState } from 'react'
import { API } from "../../utils/API"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import { useAuth0 } from '@auth0/auth0-react';
// import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css';

export default function ModalComp() {
    const { user } = useAuth0();
    const { sub } = user;
    const handleSubmit = (e) => {
        e.preventDefault();

        const newUser = {
            userName: username,
            profileImage: "",
            subID: sub
        }
        console.log(newUser);
        API.saveUser(newUser).catch(e => console.log(e))
    }
    useEffect(() => {
        API.userExists(sub).then({ handleShow }).catch(e => console.log(e))

    }, [])

    const [username, setUsername] = useState("")

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = (e) => setUsername(e.target.value)
    console.log(username)
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Launch static backdrop modal
      </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Getting Set Up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Please input your username:
                     <Form.Group id="userForm">
                        {/* <Form.Label>Name: </Form.Label> */}
                        <Form.Control type="text" onChange={handleChange} value={username} placeholder="Your name" />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" form="userForm" type="submit" onClick={handleSubmit}>Submit</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
// import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css';

export default function ModalComp() {

    const [username, setUsername] = useState()

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = (e) => setUsername(e.target.value)
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
                    <Modal.Title>Getting set up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Please input your username:
                     <Form.Group >
                        {/* <Form.Label>Name: </Form.Label> */}
                        <Form.Control type="text" onChange={handleChange} value={username} placeholder="name input" />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary">Submit</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

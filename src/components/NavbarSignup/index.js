import React from 'react'
import { NavBtn } from "./NavbarElements"
import "./style.css";
import LoginButton from '../LoginButton';
import SignupButton from '../SignupButton';
import { Col, Row } from '../Grid';
import Container from "../Container";

export const NavbarSignup = () => {

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
                            <LoginButton />
                            <SignupButton />
                        </NavBtn>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default NavbarSignup;
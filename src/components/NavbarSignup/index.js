import React from 'react'
import { Nav, NavBtn, NavMenu } from "./NavbarElements"
import "./style.css";
import LoginButton from '../LoginButton';
import SignupButton from '../SignupButton';
import { Col } from '../Grid';
export const NavbarSignup = () => {

    return (
        <>
            <Nav>
                <Col size="md-12">
                    <img
                        style={{ marginTop: 20 }}
                        src="/voyagr.png"
                        // width="30"
                        height="60"
                        className="voyagr-logo"
                        alt="Voyagr logo"
                    />
                </Col>
                <Col size="md-12">

                </Col>



                {/* <NavMenu>

                </NavMenu> */}

                <Col size="md-8">

                    <NavBtn>
                        <LoginButton />
                        <SignupButton />
                    </NavBtn>
                </Col>
            </Nav>
        </>
    )
}

export default NavbarSignup;
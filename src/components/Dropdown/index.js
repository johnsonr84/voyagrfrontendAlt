import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import "./style.css";
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { useAuth0 } from '@auth0/auth0-react';
import { useAuth } from "../../Contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

const BurgerMenu = (props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);

    const [error, setError] = useState("")
    const { logout, currentUser } = useAuth()
    const history = useHistory()

    // const { logout } = useAuth0();
    async function handleLogout() {
        setError("")

        try {
            await logout()
            history.push("/")
        } catch {
            setError("Failed to log out")
        }
    }

    return (

        <div className="dropdownDiv">
            <Dropdown className="dropdown" isOpen={dropdownOpen} toggle={toggle} size="lg">
                <DropdownToggle color="343A40" className="dropdown-icon" >
                    <FontAwesomeIcon icon={faBars} className="bars" size="lg" />
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem href="/dashboard">Dashboard</DropdownItem>
                    <DropdownItem href="/">Settings</DropdownItem>
                    <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
                </DropdownMenu>
            </Dropdown >
        </div>
    );
}

export default BurgerMenu;
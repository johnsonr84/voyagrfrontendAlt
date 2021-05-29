import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import "./style.css";
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAuth0 } from '@auth0/auth0-react';

const BurgerMenu = (props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    const { logout } = useAuth0();

    return (

        <div className="dropdownDiv">
            <Dropdown className="dropdown" isOpen={dropdownOpen} toggle={toggle} size="lg">
                <DropdownToggle color="343A40" className="dropdown-icon" >
                    <FontAwesomeIcon icon={faBars} className="bars" size="lg" />
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem href="/dashboard">Dashboard</DropdownItem>
                    <DropdownItem href="/">Settings</DropdownItem>
                    <DropdownItem onClick={() => logout({ returnTo: window.location.origin })}>Logout</DropdownItem>
                </DropdownMenu>
            </Dropdown >
        </div>
    );
}

export default BurgerMenu;
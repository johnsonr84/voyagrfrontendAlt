
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components"

export const Nav = styled.nav`
background: #333333;
height: 80px;
display: flex;
justify-content: space-between;
z-index: 10;
align-items: center;
border-bottom: 3px solid #61DAFB;
`;

export const NavLink = styled(Link)`
color: #fff;
display: flex;
align-items: center;
text-decoration: none;
padding: 0 1rem;
height: 100%;
cursor: pointer;

&:hover {
    transition: all 0.2s ease-in-out;
    color: #61DAFB;
}
&.active {
    color: #61DAFB;
}
`;

export const NavMenu = styled.div`
align-items: center;
/* justify-content: flex-start; */
`;
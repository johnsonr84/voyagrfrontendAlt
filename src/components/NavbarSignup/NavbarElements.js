
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components"

export const Nav = styled.nav`
height: 80px;
display: flex;
justify-content: space-between;
z-index: 10;
`;

export const NavLink = styled(Link)`
color: #fff;
display: flex;
align-items: center;
text-decoration: none;
padding: 0 1rem;
height: 100%;
cursor: pointer;

&.active {
    color: #3e81c9;
}
`;

export const NavMenu = styled.div`
display: flex;
align-items: center;
justify-content: right;


`;

export const NavBtn = styled.nav`
display: flex;
align-items: center;
margin-top: 2rem;

 @media (min-width: 768px) {
    
 }
`;
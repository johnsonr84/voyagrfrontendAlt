
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components"

export const Nav = styled.nav`
// background: #333333;
height: 80px;
display: flex;
justify-content: space-between;
padding: 0.5rem calc((100vw-1000px) / 2);
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
margin-top: 1rem;
/* margin-left: 20%; */


 @media (min-width: 768px) {
    
 }
`;

// export const NavBtnLink = styled(Link)`
// border-radius:4px;
// background: #256ce1;
// padding: 10px 22px;
// color: #fff;
// border: none;
// outline: none;
// cursor: pointer;
// transition: all 0.2s ease-in-out;
// text-decoration: none;

// &:hover {
//     transition: all 0.2s ease-in-out;
//     background: #fff;
//     color: #010606;
// }
// `;
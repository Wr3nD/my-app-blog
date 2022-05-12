import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/enigoo.png";
import styled from "styled-components";
import LoginButton from "./LoginButton";

const Navbar = () => {
    return (
        <NavContainer>
            <div className="nav-center">
                <div className="nav-header">
                    <Link to="/">
                        <img src={logo} alt="enigoo eshop" />
                    </Link>
                </div>
                <ul className="nav-links">
                    <li>
                        <Link to="/articles">Articles</Link>
                    </li>
                    <LoginButton />
                </ul>
            </div>
        </NavContainer>
    );
};
const NavContainer = styled.nav`
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    .cart-btn {
        color: var(--clr-grey-1);
        font-size: 1.5rem;
        letter-spacing: var(--spacing);
        color: var(--clr-grey-1);
        display: flex;

        align-items: center;
    }
    .cart-value {
        position: absolute;
        top: -10px;
        right: -16px;
        background: var(--clr-primary-5);
        width: 16px;
        height: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        font-size: 0.75rem;
        color: var(--clr-white);
        padding: 12px;
    }
    .nav-center {
        width: 90vw;
        margin: 0 auto;
        max-width: var(--max-width);
    }
    .nav-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        img {
            width: 175px;
            margin-left: -15px;
        }
    }

    .nav-center {
        display: grid;
        grid-template-columns: auto 1fr auto;
        align-items: center;
    }
    .nav-links {
        display: flex;
        justify-content: center;
        li {
            margin: 0 0.5rem;
        }
        a {
            color: var(--clr-grey-3);
            font-size: 1rem;
            text-transform: capitalize;
            letter-spacing: var(--spacing);
            padding: 0.5rem;
            &:hover {
                border-bottom: 2px solid var(--clr-primary-7);
            }
        }
    }
    .cart-btn-wrapper {
        display: grid;
    }
`;
export default Navbar;

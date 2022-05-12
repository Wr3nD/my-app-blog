import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
const HomePage = () => {
    return (
        <Wrapper>
            <h2>HACKERNEWS</h2>
            <ul>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/register">Registration</Link>
                </li>
                <li>
                    <Link to="/articles">Articles</Link>
                </li>
            </ul>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    text-align: center;
    padding: 1.5rem;
    li {
        text-decoration: underline;
        font-size: 2rem;
    }
`;
export default HomePage;

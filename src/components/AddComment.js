import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { api } from "../action";
import transformRequest from "axios";
const AddComment = ({ users, article, sendData }) => {
    const [data, setData] = useState("");

    const { id } = useParams();

    const submit = () => {
        sendData(data);
        setData("");
    };

    if (users.user) {
        return (
            <Wrapper>
                <h4>Add comment</h4>
                <input
                    type="text"
                    onChange={(e) => setData(e.target.value)}
                    value={data}
                ></input>
                <button className="btn" type="submit" onClick={submit}>
                    add
                </button>
            </Wrapper>
        );
    }
    return (
        <Wrapper>
            <Link to="/login">
                <h5>aby jste mohli přidávat komentáře, musíte se přihlásit</h5>
            </Link>
        </Wrapper>
    );
};

const Wrapper = styled.article`
    width: 500px;
    padding: 2rem;
    input {
        min-width: 300px;
        min-height: 80px;
        margin: 1rem;
        font-size: 1rem;
    }

    /* :hover {
        border-radius: 2rem;
        border: 1px solid rgb(85, 26, 139);
    } */
`;
export default AddComment;

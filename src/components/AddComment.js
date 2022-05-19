import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { apiGetAllUsers } from "../action";

import { HighlightWithinTextarea } from "react-highlight-within-textarea";
const AddComment = ({ users, sendData }) => {
    const [data, setData] = useState("");
    const [listOfUsers, setListOfUsers] = useState(null);

    const [textInfo, setTextInfo] = useState(null);

    const submit = () => {
        sendData(data);
        setData("");
    };

    const re = /@[a-zA-Z]$/g;

    useEffect(() => {
        if (data.match(re)) {
            const text = data.match(re).toString().slice(1, 2);

            setTextInfo(text);
            apiGetAllUsers(
                text,
                (data) => {
                    setListOfUsers(data);
                },
                (err) => console.log(err)
            );
        }
        return setListOfUsers(null);
    }, [data]);

    function addText(x) {
        setData(data.slice(0, -1).concat(x));

        setListOfUsers(null);
    }

    if (users.user) {
        return (
            <Wrapper>
                <h4>Add comment</h4>
                <div className="container">
                    <HighlightWithinTextarea
                        highlight={/@[a-zA-Z0-9.]+/g}
                        className="scroll"
                        type="text"
                        id="input"
                        onChange={(data) => setData(data)}
                        value={data}
                    />
                </div>

                <div>
                    {listOfUsers?.map((user) => {
                        return (
                            <button
                                key={user.id}
                                onClick={() => addText(user.username)}
                            >
                                @{user.username}
                            </button>
                        );
                    })}
                </div>

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
    .container {
        border: 1px solid black;
        min-width: 300px;
        min-height: 80px;
        margin: 1rem;
        font-size: 1rem;
        text-align: center;
    }

    .color {
        color: black;
        background: purple;
    }
    input::-webkit-calendar-picker-indicator {
        opacity: 0;
    }
    p {
        text-decoration: underline;
        color: blue;
    }
    datalist {
        display: none;
    }
`;
export default AddComment;

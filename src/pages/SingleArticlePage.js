import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
    apiGetAllComments,
    apiGetAllUsers2,
    apiGetOneUser,
    apiGetUserByUsersId,
} from "../action";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { MdDeleteForever } from "react-icons/md";
import { api } from "../action";
import AddComment from "../components/AddComment";
import "react-quill/dist/quill.bubble.css";
import ReactQuill from "react-quill";
import { SEND_INFO, SEND_INFO2, DELETE_ARRAY } from "../actions";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { useSearchParams } from "react-router-dom";

import * as Scroll from "react-scroll";
const SingleArticlePage = () => {
    const [article, setArticle] = useState(null);
    const [users, setUsers] = useState(null);
    const [allUsers, setAllUsers] = useState(null);

    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();

    const [sending, setSending] = useState("");
    let scroll = Scroll.animateScroll;

    const userData = useSelector((state) => state.admin);
    const specificId = useSelector((state) => state.bell);

    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        apiGetAllComments(
            id,
            (data) => {
                setArticle(data);
            },
            (err) => console.log(err)
        );
        setTimeout(() => setLoading(false), 300);
        apiGetAllUsers2(
            (data) => setAllUsers(data),
            (err) => console.log(err)
        );
    }, [sending]);

    useEffect(() => {
        const currentParams = Object.fromEntries([...searchParams]);

        setTimeout(
            () =>
                document
                    .getElementById(`${currentParams._embed}`)
                    ?.scrollIntoView(),
            1000
        );
    }, [searchParams]);

    useEffect(() => {
        if (article) {
            const UserData = () => {
                return article.comments?.map((item) => item.userId);
            };

            apiGetUserByUsersId(
                UserData(),
                (data) => setUsers(data),
                (err) => console.log(err)
            );
        }
    }, [article]);

    const DeleteComent = (id) => {
        api.delete(`comments/${id}`)
            .then((promise) => console.log(promise.data))
            .catch((err) => console.log(err));
        setSending(id.toString());
    };
    useEffect(() => {
        if (!loading) {
            specificId.userId?.map((specId) => {
                api.post(`notifications`, {
                    userId: specId,
                    visited: false,
                    articleId: article?.id,
                    commentsId: specificId.commentId,
                })
                    .then((resp) => resp.data)
                    .catch((error) => {
                        console.log(error);
                    });
            });
            setTimeout(() => dispatch({ type: DELETE_ARRAY }), 2500);
        }
    }, [specificId.commentId]);

    if (loading) {
        return <h3> Loading...</h3>;
    }

    const dataTransform = (data) => {
        const cut = data.match(/@[a-zA-Z0-9]+/g);
        const users = cut?.map((name) => name.toString().substring(1));

        console.log("CUT A USER ", cut, users, data);
        if (users.length) {
            users.forEach((user) => {
                apiGetOneUser(
                    user,
                    (info) => {
                        dispatch({ type: SEND_INFO, payload: info });
                    },
                    (err) => console.log(err)
                );
            });
            const safe = data.replace(
                /@[a-zA-Z0-9]+/g,
                `<p><span style="background-color: rgb(204, 102, 153);">$&</span>﻿</p>`
            );

            return safe;
        }
        return data;
    };

    const sendData = (data) => {
        api.post(`articles/${article.id}/comments`, {
            text: dataTransform(data),
            userId: Number(userData.id),
            date: Date.now(),
            articleId: article.id,
        })

            .then((resp) => {
                console.log("PROC", resp);
                dispatch({ type: SEND_INFO2, payload: resp });
            })
            .catch((error) => {
                console.log(error);
            });

        setSending(data);
    };

    return (
        <Wrapper>
            <Link to="/articles">
                <BsFillArrowLeftSquareFill className="arrow" />
            </Link>
            <h3>{article.header}</h3>
            <ReactQuill value={article.text} readOnly={true} theme={"bubble"} />
            <hr />
            <div className="comments">
                <h5>Comments section</h5>

                {article.comments?.map((item) => {
                    const { userId, text, date, id } = item;

                    const myName = users.filter((i) => i.id === userId);
                    if (userData.isAdmin === true) {
                        return (
                            <div id={id} className="single-comments" key={id}>
                                <h5>{myName[0]?.username}</h5>
                                <h6>{date}</h6>
                                <ReactQuill
                                    value={text}
                                    readOnly={true}
                                    theme={"bubble"}
                                    className="bubble"
                                />
                                <button
                                    className="btn"
                                    onClick={() => DeleteComent(id)}
                                >
                                    <MdDeleteForever />
                                    delete Comment
                                </button>
                            </div>
                        );
                    }
                    return (
                        <div id={id} className="single-comments" key={id}>
                            <h5>{myName[0]?.username}</h5>
                            <h6>{date}</h6>
                            <ReactQuill
                                value={text}
                                readOnly={true}
                                theme={"bubble"}
                                className="bubble"
                            />
                        </div>
                    );
                })}

                <AddComment
                    sendData={sendData}
                    users={userData}
                    article={article.id}
                />
                <button className="btn" onClick={() => scroll.scrollToTop()}>
                    Back to the top
                </button>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.article`
    padding: 2rem;
    h3 {
        text-align: center;
        color: rgb(85, 26, 139);
    }
    h5 {
        font-style: italic;
        font-size: 1.5rem;
        text-align: start;
    }
    p {
        text-align: start;
        font-size: 1.5rem;
        color: black;
    }
    .box {
        padding: 2rem;
    }
    .arrow {
        height: 50px;
        width: 35px;
    }

    .single-comments {
        display: flex;
        flex-direction: column;
        width: 400px;
        padding: 2rem;
        border: 1px solid rgb(85, 26, 139);
        border-radius: 2rem;
        border-top: 1px solid rgb(85, 26, 139);
        margin: 1rem;

        text-align: center;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: 250px;
        -webkit-box-shadow: 7px 7px 13px -2px #000000;
        box-shadow: 7px 7px 13px -2px #000000;
    }
`;
export default SingleArticlePage;

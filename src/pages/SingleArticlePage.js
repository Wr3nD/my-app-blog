import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    apiGetAllComments,
    apiGetAllUsers,
    apiGetUserByUsersId,
} from "../action";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { MdDeleteForever } from "react-icons/md";
import { api } from "../action";
import AddComment from "../components/AddComment";
const SingleArticlePage = () => {
    const [article, setArticle] = useState(null);
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(true);

    const userData = useSelector((state) => state.admin);

    const { id } = useParams();
    useEffect(() => {
        apiGetAllComments(
            id,
            (data) => {
                setArticle(data);
                console.log("TADY", data);
            },
            (err) => console.log(err)
        );

        setTimeout(() => setLoading(false), 300);
    }, []);

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

    const sendData = (data) => {
        api.post(`articles/${article.id}/comments`, {
            text: data,
            userId: Number(userData.id),
            date: Date.now(),
            articleId: article.id,
        })

            .then((resp) => {
                console.log(resp.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const DeleteComent = (id) => {
        console.log("a TOHLE", id);
        api.delete(`comments/${id}`)
            .then((promise) => console.log(promise.data))
            .catch((err) => console.log(err));
    };

    if (loading) {
        return <h3> Loading...</h3>;
    }
    console.log("USERS", users);
    console.log("ART", article);
    return (
        <Wrapper>
            <h3>{article.header}</h3>
            <p>---{article.text}</p>
            <div className="comments">
                <h5>Comments section</h5>

                {article.comments?.map((item) => {
                    const { userId, text, date, id } = item;
                    const myName = users.filter((i) => i.id === userId);
                    if (userData.isAdmin === true) {
                        return (
                            <div className="single-comments" key={id}>
                                <h5>{myName[0].username}</h5>
                                <h6>{date}</h6>
                                <p>{text}</p>
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
                        <div className="single-comments" key={id}>
                            <h5>{myName[0].username}</h5>
                            <h6>{date}</h6>
                            <p>{text}</p>
                        </div>
                    );
                })}
                <h5>Add comment</h5>
                {console.log("ID", article.id)}
                <AddComment
                    sendData={sendData}
                    users={userData}
                    article={article.id}
                    // userId={userId}
                />
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
    }
    p {
        text-align: start;
        font-size: 1.5rem;
        color: green;
    }
    .box {
        padding: 2rem;
    }

    .single-comments {
        display: flex;
        flex-direction: column;
        width: 400px;
        padding: 2rem;
        border-bottom: 1px solid rgb(85, 26, 139);
        border-radius: 2rem;
        border-top: 1px solid rgb(85, 26, 139);
        margin: 3rem;
    }
`;
export default SingleArticlePage;

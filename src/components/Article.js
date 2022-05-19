import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import MyEditor from "./Editor";

import "react-quill/dist/quill.bubble.css";
const Article = ({ articles, userData }) => {
    if (userData.isAdmin === true) {
        return (
            <Wrapper>
                <h2>Articles</h2>
                <div className="grid">
                    {articles.map((article) => {
                        const { header, date, id } = article;
                        const interestingData = article.comments.length;

                        return (
                            <article className="box" key={id}>
                                <Link to={`/articles/${id}`}>
                                    <h4>{header}</h4>
                                    <p className="date">---{date}</p>

                                    <h5>počet komentářů {interestingData}</h5>
                                </Link>
                                <Link to={`/article/${id}`} className="btn">
                                    Edit Article
                                </Link>
                            </article>
                        );
                    })}
                </div>
                <h2>Add new Article</h2>
                <MyEditor />
            </Wrapper>
        );
    }
    return (
        <Wrapper>
            <h2>Articles</h2>
            <div className="grid">
                {articles.map((article) => {
                    const { header, date, id } = article;
                    const interestingData = article.comments.length;

                    return (
                        <article className="box" key={id}>
                            <Link to={`/articles/${id}`}>
                                <h4>{header}</h4>
                                <p className="date">---{date}</p>

                                <h5>počet komentářů {interestingData}</h5>
                            </Link>
                        </article>
                    );
                })}
            </div>
        </Wrapper>
    );
};
const Wrapper = styled.div`
    h2 {
        margin: auto;
        text-align: center;
        font-size: 4rem;
        font-family: Georgia, "Times New Roman", Times, serif;
        color: rgb(85, 26, 139);
        margin-top: 2rem;
        color: rgb(85, 26, 139);
        background: #ffffff;
        text-shadow: 1px 0px 1px #cccccc, 0px 1px 1px #eeeeee,
            2px 1px 1px #cccccc, 1px 2px 1px #eeeeee, 3px 2px 1px #cccccc,
            2px 3px 1px #eeeeee, 4px 3px 1px #cccccc, 3px 4px 1px #eeeeee,
            5px 4px 1px #cccccc, 4px 5px 1px #eeeeee, 6px 5px 1px #cccccc,
            5px 6px 1px #eeeeee, 7px 6px 1px #cccccc;
    }
    h4 {
        color: rgb(85, 26, 139);
    }
    .grid {
        display: grid;
        text-align: center;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: 250px;
    }
    .date {
        font-style: italic;
    }
    .btn {
        max-width: 135px;
        max-height: 35px;
        margin: auto;
    }
    .box {
        /* border: 1px solid rgb(85, 26, 139); */
        border: 1px solid rgb(85, 26, 139);
        margin: 1rem;
        text-align: center;
        display: grid;
        padding: 1rem;
        border-radius: 3rem;
        -webkit-box-shadow: 7px 7px 13px -2px #000000;
        box-shadow: 7px 7px 13px -2px #000000;
    }
    .box:hover {
        background-color: #dfc4e4;
        cursor: pointer;
    }
`;
export default Article;

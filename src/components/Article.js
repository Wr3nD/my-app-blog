import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { EditorState, ContentState, convertToRaw, Editor } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import MyEditor from "./Editor";
const Article = ({ articles, userData }) => {
    if (userData.isAdmin === true) {
        return (
            <Wrapper>
                <h2>Articles</h2>
                <div className="grid">
                    {articles.map((article) => {
                        const { header, text, date, id } = article;
                        const interestingData = article.comments.length;

                        return (
                            <article className="box" key={id}>
                                <Link to={`/articles/${id}`}>
                                    <h4>{header}</h4>
                                    <p className="date">---{date}</p>
                                    <p>{text}</p>
                                    <h5>počet komentářů {interestingData}</h5>
                                </Link>
                                <Link to={`/article/${id}`} className="btn">
                                    Edit Article
                                </Link>
                                {/* <button
                                    className="btn"
                                    onClick={() => deleteme(id)}
                                >
                                    {" "}
                                    delete{" "}
                                </button> */}
                            </article>
                        );
                    })}
                </div>
                <h3>Add new Article</h3>
                <MyEditor />
            </Wrapper>
        );
    }
    return (
        <Wrapper>
            <h2>Articles</h2>
            <div className="grid">
                {articles.map((article) => {
                    const { header, text, date, id } = article;
                    const interestingData = article.comments.length;

                    return (
                        <article className="box" key={id}>
                            <Link to={`/articles/${id}`}>
                                <h4>{header}</h4>
                                <p className="date">---{date}</p>
                                <p>{text}</p>
                                <h5>počet komentářů {interestingData}</h5>
                            </Link>

                            {/* <button
                                    className="btn"
                                    onClick={() => deleteme(id)}
                                >
                                    {" "}
                                    delete{" "}
                                </button> */}
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
    }
    h4 {
        color: rgb(85, 26, 139);
    }
    .grid {
        display: grid;
        text-align: center;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: 200px;
    }
    .date {
        font-style: italic;
    }
    .btn {
        max-width: 150px;
    }
    .box {
        /* border: 1px solid rgb(85, 26, 139); */
        border-bottom: 1px solid rgb(85, 26, 139);
        margin: 1rem;
        text-align: start;
        display: grid;
        padding: 1rem;
        border-radius: 3rem;
    }
    .box:hover {
        background-color: aquamarine;
        cursor: pointer;
    }
`;
export default Article;

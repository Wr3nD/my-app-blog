import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiGetAllArticles, apiGetSingleArticleComments } from "../action";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { api } from "../action";
import { useSelector } from "react-redux";
import Article from "../components/Article";

const ArticlePage = () => {
    const [articles, setArticles] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const userData = useSelector((state) => state.admin);
    useEffect(() => {
        apiGetAllArticles(
            (data) => setArticles(data),
            (err) => console.log(err)
        );
        setTimeout(() => setIsLoading(false), 300);
    }, []);

    if (isLoading) {
        return <h3> Loading...</h3>;
    }
    return (
        <div>
            <Article articles={articles} userData={userData} />
        </div>
    );
    // const deleteme = (id) => {
    //     api.delete(`articles/${id}`)
    //         .then((promise) => console.log(promise.data))
    //         .catch((err) => console.log(err));
    // };
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
        max-width: 100px;
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
export default ArticlePage;

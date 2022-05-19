import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api, apiGetArticle } from "../action";
import { Field, Form } from "react-final-form";

const EditSingleArticlePage = () => {
    const [value2, setValue2] = useState("");

    const [loading, setLoading] = useState(true);

    const { isAdmin } = useSelector((state) => state.admin);
    const { id } = useParams();
    const navigate = useNavigate();
    const modules = {
        toolbar: [
            [{ font: [] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ script: "sub" }, { script: "super" }],
            ["blockquote", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
            ["link", "image", "video"],
            ["clean"],
        ],
    };
    const onSubmit = (e) => {
        api.put(`articles/${id}`, e)
            .then((data) => console.log(data.data))
            .catch((error) => {
                console.log(error);
            });
        navigate("/articles");
    };
    const required = (value) => (value ? undefined : "Required");
    useEffect(() => {
        apiGetArticle(
            id,
            (data) => {
                setValue2(data);
                setLoading(false);
            },
            (err) => console.log(err)
        );
    }, []);
    const DeleteArticle = () => {
        api.delete(`articles/${id}`)
            .then((promise) => console.log(promise.data))
            .catch((err) => console.log(err));
        navigate("/articles");
    };
    if (loading) {
        <h1>Loading...</h1>;
    }
    if (!loading && isAdmin) {
        const initialData = {
            header: `${value2[0].header}`,
            text: `${value2[0].text}`,
        };
        return (
            <Wrapper>
                <Link to="/articles" className="btn">
                    go back to articles
                </Link>
                <h1>editace článku</h1>
                <div>
                    <h4>header</h4>
                    <Form
                        onSubmit={onSubmit}
                        validate={required}
                        initialValues={initialData}
                        render={({ handleSubmit }) => (
                            <form onSubmit={handleSubmit}>
                                <Field name="header">
                                    {({ input, meta }) => (
                                        <div className="box">
                                            <input type="text" {...input} />
                                            {meta.touched && meta.error && (
                                                <span>{meta.error}</span>
                                            )}
                                        </div>
                                    )}
                                </Field>
                                <Field name="text">
                                    {({ input, meta }) => (
                                        <div className="box">
                                            <h4>text of an Article</h4>
                                            <ReactQuill
                                                {...input}
                                                theme="snow"
                                                modules={modules}
                                            />
                                            {meta.touched && meta.error && (
                                                <span>{meta.error}</span>
                                            )}
                                        </div>
                                    )}
                                </Field>
                                <button type="submit" className="btn">
                                    Update
                                </button>
                            </form>
                        )}
                    />
                    <button className="btn" onClick={() => DeleteArticle()}>
                        delete article
                    </button>
                </div>
            </Wrapper>
        );
    }
    if (!loading && !isAdmin) {
        return (
            <Wrapper>
                <h3>Bohužel nemáš dostatečná práva pro editaci článků</h3>
                <Link to="/" className="btn">
                    go back
                </Link>
            </Wrapper>
        );
    }
};
const Wrapper = styled.div`
    text-align: center;
    margin: 1rem;
    input {
        min-width: 600px;
        min-height: 60px;
        font-size: 1.5rem;
    }
    .btn {
        margin: 1rem;
    }
`;
export default EditSingleArticlePage;

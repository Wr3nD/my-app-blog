import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { api, apiGetArticle } from "../action";
import { Field, Form } from "react-final-form";

const EditSingleArticlePage = () => {
    const [value, setValue] = useState("");
    const [value2, setValue2] = useState("");
    const [value3, setValue3] = useState("");
    const [loading, setLoading] = useState(true);

    const { isAdmin } = useSelector((state) => state.admin);
    const { id } = useParams();
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
        // const json = JSON.stringify(data);
        // console.log("json", json);
        // setDataLock((prevState) => [...prevState, json]);
        // console.log("state", dataLock);
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
                                            <input
                                                type="text"
                                                {...input}
                                                // onChange={(e) =>
                                                //     setValue2(e.target.value)
                                                // }
                                            />
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

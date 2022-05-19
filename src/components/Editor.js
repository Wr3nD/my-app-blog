import React from "react";
import { Field, Form } from "react-final-form";
import ReactQuill from "react-quill";
import { api } from "../action";
import styled from "styled-components";
const MyEditor = () => {
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
    function toReadableString(time) {
        if (time < 0) time = 0;
        var hrs = ~~((time / 3600) % 24),
            mins = ~~((time % 3600) / 60),
            timeType = hrs > 11 ? "PM" : "AM";
        if (hrs > 12) hrs = hrs - 12;
        if (hrs == 0) hrs = 12;
        return hrs + ":" + mins + timeType;
    }
    const required = (value) => (value ? undefined : "Required");
    const onSubmit = (e) => {
        e.id = Date.now().toString();
        e.date = toReadableString(Date.now());

        api.post(`articles`, e)

            .then((resp) => {
                console.log(resp.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <Wrapper>
            <Form
                onSubmit={onSubmit}
                validate={required}
                render={({ handleSubmit, form }) => (
                    <form
                        onSubmit={async (event) => {
                            await handleSubmit(event);
                            form.reset();
                        }}
                    >
                        <h4>header</h4>
                        <Field name="header">
                            {({ input, meta }) => (
                                <div>
                                    <input type="text" {...input} />
                                    {meta.touched && meta.error && (
                                        <span>{meta.error}</span>
                                    )}
                                </div>
                            )}
                        </Field>
                        <Field name="text">
                            {({ input, meta }) => (
                                <div>
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
                            Add
                        </button>
                    </form>
                )}
            />
        </Wrapper>
    );
};
const Wrapper = styled.div`
    text-align: center;
    border: 1px solid black;
    border-radius: 2rem;
    margin: 1rem;

    input {
        min-width: 300px;
        min-height: 40px;
    }
`;
export default MyEditor;

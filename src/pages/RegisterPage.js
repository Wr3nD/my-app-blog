import React, { useEffect, useState } from "react";
import { Form, Field } from "react-final-form";
import styled from "styled-components";
import axios from "axios";
import Alert from "../components/Alert";

import Spinner from "../components/Spinner";
import { api } from "../action";
const url = "http://localhost:3000/users";

const RegisterPage = () => {
    const showAlert = (show = false, type = "", msg = "") => {
        setAlert({ show, type, msg });
    };
    const [alert, setAlert] = useState({
        show: true,
        msg: "",
        type: "",
    });

    const onSubmit = (value) => {
        const data = { ...value, isAdmin: false };
        sendData(data);
        showAlert(true, "success", "učet úspěšně vytvořen");
    };
    const sendData = (data) => {
        api.post("users", data).catch((error) => {
            console.log(error);
        });
    };

    return (
        <Login>
            <Form
                onSubmit={onSubmit}
                validate={(values) => {
                    const errors = {};
                    if (!values.username) {
                        errors.username = "Required";
                    }
                    if (!values.password) {
                        errors.password = "Required";
                    }
                    if (!values.confirm) {
                        errors.confirm = "Required";
                    } else if (values.confirm !== values.password) {
                        errors.confirm = "Does not match";
                    }
                    return Object.keys(errors).length ? errors : undefined;
                }}
                render={({ handleSubmit, form, validating }) => (
                    <form
                        onSubmit={async (event) => {
                            await handleSubmit(event);
                            form.restart();
                        }}
                    >
                        {}
                        {alert.show && (
                            <Alert {...alert} removeAlert={showAlert} />
                        )}
                        {validating && <Spinner />}
                        <h2>Registration</h2>
                        <Field name="username">
                            {({ input, meta }) => (
                                <div>
                                    <label>Username</label>
                                    <input
                                        {...input}
                                        type="text"
                                        placeholder="Username"
                                    />
                                    {meta.error && meta.touched && (
                                        <span>{meta.error}</span>
                                    )}
                                </div>
                            )}
                        </Field>
                        <Field name="password">
                            {({ input, meta }) => (
                                <div>
                                    <label>Password</label>
                                    <input
                                        {...input}
                                        type="password"
                                        placeholder="Password"
                                    />
                                    {meta.error && meta.touched && (
                                        <span>{meta.error}</span>
                                    )}
                                </div>
                            )}
                        </Field>
                        <Field name="confirm">
                            {({ input, meta }) => (
                                <div>
                                    <label>Confirm</label>
                                    <input
                                        {...input}
                                        type="password"
                                        placeholder="Confirm password"
                                    />
                                    {meta.error && meta.touched && (
                                        <span>{meta.error}</span>
                                    )}
                                </div>
                            )}
                        </Field>

                        <div className="buttons">
                            <button type="submit" className="btn">
                                Submit
                            </button>
                        </div>
                    </form>
                )}
            />
        </Login>
    );
};

const Login = styled.div`
    font-family: sans-serif;

    h1 {
        text-align: center;
        color: #222;
    }

    h2 {
        text-align: center;
        color: #222;
    }

    & > div {
        text-align: center;
    }

    a {
        display: block;
        text-align: center;
        color: #222;
    }

    form {
        max-width: 500px;
        margin: 10px auto;
        border: 1px solid #ccc;
        padding: 20px;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
        border-radius: 3px;

        & > div {
            display: flex;
            flex-flow: row nowrap;
            line-height: 2em;
            margin: 5px;
            & > label {
                color: #333;
                width: 110px;
                font-size: 1em;
                line-height: 32px;
            }
            & > input,
            & > select,
            & > textarea {
                flex: 1;
                padding: 3px 5px;
                font-size: 1em;
                margin-left: 15px;
                border: 1px solid #ccc;
                border-radius: 3px;
            }
            & > input[type="checkbox"] {
                margin-top: 7px;
            }
            & > div {
                margin-left: 16px;
                & > label {
                    display: block;
                    & > input {
                        margin-right: 3px;
                    }
                }
            }
            & > span {
                line-height: 32px;
                margin-left: 10px;
                color: #800;
                font-weight: bold;
            }
        }
        & > .buttons {
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            margin-top: 15px;
        }

        pre {
            border: 1px solid #ccc;
            background: rgba(0, 0, 0, 0.1);
            box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.2);
            padding: 20px;
        }
    }
    .register {
        text-decoration: underline;
        color: blue;
    }
    .alert-danger {
        color: #721c24;
        background: #f8d7da;
        text-align: center;
    }
    .alert-success {
        color: #155724;
        background: #d4edda;
        text-align: center;
    }
`;
export default RegisterPage;

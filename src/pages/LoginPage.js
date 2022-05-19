import React, { useEffect, useState } from "react";
import { Form, Field } from "react-final-form";
import styled from "styled-components";

import Alert from "../components/Alert";
import { useDispatch, useSelector } from "react-redux";
import { apiGetUser, user } from "../action";
import { LOGIN } from "../actions";
import { Link, Navigate, useNavigate } from "react-router-dom";

const required = (value) => (value ? undefined : "Required");
const LoginPage = () => {
    const [alert, setAlert] = useState({
        show: true,
        msg: "",
        type: "",
    });
    const { isAdmin } = useSelector((state) => state.admin);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const showAlert = (show = false, type = "", msg = "") => {
        setAlert({ show, type, msg });
    };
    const onSubmit = (values) => {
        console.log(values);
        apiGetUser(
            values.username,
            values.password,
            (value) => {
                if (value.length) {
                    dispatch({
                        type: LOGIN,
                        payload: {
                            username: value[0].username,
                            user: true,
                            isAdmin: value[0].isAdmin,
                            id: value[0].id,
                        },
                    });
                    showAlert(true, "success", "Úspěšně přihlášen");
                    navigate("/articles");
                } else {
                    showAlert(true, "danger", "špatné přihlašovací udaje");
                }
            },
            (error) => {
                showAlert(true, "danger", "neočekáváná chyba");
            }
        );
    };
    if (!isAdmin) {
        return (
            <Login>
                <Form
                    onSubmit={onSubmit}
                    render={({
                        handleSubmit,
                        form,
                        submitting,
                        pristine,
                        values,
                    }) => (
                        <form
                            onSubmit={async (event) => {
                                await handleSubmit(event);
                                form.restart();
                            }}
                        >
                            {alert.show && (
                                <Alert {...alert} removeAlert={showAlert} />
                            )}
                            <h2>Login</h2>
                            <Field name="username" validate={required}>
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
                            <Field name="password" validate={required}>
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

                            <div className="buttons">
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="btn"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    )}
                />
                <Link to="/register">
                    <h4 className="register">
                        dont you have an account ? create one
                    </h4>
                </Link>
            </Login>
        );
    }
    return (
        <Login>
            {" "}
            <h3>
                you are already logged in, you can loggout or proceed to
                articles
            </h3>
        </Login>
    );
};

const Login = styled.div`
    font-family: sans-serif;
    h3 {
        text-align: center;
        margin: 2rem;
    }
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
export default LoginPage;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserMinus, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { LOGIN, LOGOUT } from "../actions";
const LoginButton = () => {
    const dispatch = useDispatch();
    const { user, username } = useSelector((state) => state.admin);
    return (
        <>
            {user ? (
                <Link
                    type="button"
                    className="auth-btn"
                    onClick={() =>
                        dispatch({
                            type: LOGIN,
                            payload: {
                                user: null,
                                username: "",
                                isAdmin: false,
                                id: 0,
                            },
                        })
                    }
                    to="/"
                >
                    {username} <FaUserMinus />
                </Link>
            ) : (
                <Link type="button" className="auth-btn" to="/login">
                    Login <FaUserPlus />
                </Link>
            )}
        </>
    );
};

export default LoginButton;

import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:3000/",
});

export const apiGetUser = (username, password, success, alert) => {
    api.get("users", { params: { username, password } })
        .then((response) => {
            success(response.data);
        })
        .catch((error) => {
            alert(error.response);
        });
};

export const apiGetOneUser = (username, success, alert) => {
    api.get("users", { params: { username } })
        .then((response) => {
            success(response.data);
        })
        .catch((error) => {
            alert(error.response);
        });
};
export const apiGetNotifications = (userId, success, alert) => {
    api.get("notifications", { params: { userId } })
        .then((response) => {
            success(response.data);
        })
        .catch((error) => {
            alert(error.response);
        });
};
export const apiGetAllUsers = (text, success, alert) => {
    api.get(`users?q=${text}`)
        .then((response) => {
            success(response.data);
        })
        .catch((error) => {
            alert(error.response);
        });
};
export const apiGetAllUsers2 = (success, alert) => {
    api.get(`users`)
        .then((response) => {
            success(response.data);
        })
        .catch((error) => {
            alert(error.response);
        });
};
export const apiGetUserByUsersId = (userId, success, alert) => {
    api.get("users")
        .then((response) => {
            success(response.data.filter((item) => userId.includes(item.id)));
        })
        .catch((error) => {
            alert(error.response);
        });
};
export const apiGetArticle = (id, success, alert) => {
    api.get("articles", { params: { id } })
        .then((response) => {
            success(response.data);
        })
        .catch((error) => {
            alert(error.response);
        });
};

export const apiGetAllArticles = (success, error) => {
    api.get("articles1")
        .then((promise) => success(promise.data))
        .catch((err) => error(err));
};

export const apiGetAllComments = (id, success, error) => {
    api.get(`/articles/${id}?_embed=comments`)
        .then((promise) => success(promise.data))
        .catch((err) => error(err));
};

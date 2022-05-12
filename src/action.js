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
// export const apiGetSingleArticleComments = (id, success, alert) =>
//     api
//         .get(`articles/${id}`)
//         .then((resp) => {
//             success(console.log(resp.data.comments));
//         })
//         .catch((error) => {
//             alert(error.response);
//         });
export const apiGetAllArticles = (success, error) => {
    api.get("articles1")
        .then((promise) => success(promise.data))
        .catch((err) => error(err));
};
// export const apiGetAllUsers = (success, error) => {
//     api.get("users")
//         .then((promise) =>
//             success(promise.data.map((data) => [data.username, data.id]))
//         )
//         .catch((err) => error(err));
// };

export const apiGetAllComments = (id, success, error) => {
    api.get(`/articles/${id}?_embed=comments`)
        .then((promise) => success(promise.data))
        .catch((err) => error(err));
};

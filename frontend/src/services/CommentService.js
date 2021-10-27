import http from "../http-common";

const getAll = () => {
    return http.get("/comments");
};

const get = id => {
    return http.get(`/comments/${id}`);
};

const create = data => {
    return http.post("/comments", data);
};

const update = (id, data) => {
    return http.put(`/comments/${id}`, data);
};

const remove = id => {
    return http.delete(`/comments/${id}`);
};

const removeAll = () => {
    return http.delete(`/comments`);
};

const findByTitle = title => {
    return http.get(`/comments?title=${title}`);
};

export default {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByTitle
};

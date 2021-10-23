import {history} from "../utils/history";
import {message} from "antd";
import {postRequest} from "../utils/ajax";

export const login = (data) => {
    const url = `https://localhost:8443/login`;
    const callback = (data) => {
        if (data.status >= 0) {
            sessionStorage.setItem('user', JSON.stringify(data.data));
            let user = JSON.parse(sessionStorage.getItem('user'));
            if (user.userType !== 0)
                history.push("/");
            else history.push("/bookManage");
            message.success(data.msg);
        } else {
            message.error(data.msg);
        }
    };
    postRequest(url, data, callback);
};

export const register = (data) => {
    const url = `https://localhost:8443/register`;
    const callback = (data) => {
        if (data.status >= 0) {
            history.push("/login");
            message.success(data.msg);
        } else message.error(data.msg);
    };
    postRequest(url, data, callback);
}

export const logout = () => {
    const url = `https://localhost:8443/logout`;

    const callback = (data) => {
        if (data.status >= 0) {
            sessionStorage.removeItem("user");
            history.push("/login");
            message.success(data.msg);
        } else {
            message.error(data.msg);
        }
    };
    postRequest(url, {}, callback);
};

export const getCart = (userId, callback) => {
    const data = {userId: userId};
    const url = "https://localhost:8443/getCart";
    postRequest(url, data, callback);
}

export const addCart = (json, callback) => {
    const url = "https://localhost:8443/addCart";
    postRequest(url, json, callback);
}

export const getOrders = (userId, callback) => {
    const data = {userId: userId};
    const url = "https://localhost:8443/getOrders"
    postRequest(url, data, callback);
}

export const addOrder = (data, callback) => {
    const url = "https://localhost:8443/addOrder"
    postRequest(url, data, callback);
}

export const deleteCartItem = (data, callback) => {
    const url = "https://localhost:8443/delCart"
    postRequest(url, data, callback);
}

export const getUsers = (data, callback) => {
    const url = "https://localhost:8443/getUsers"
    postRequest(url, data, callback);
}

export const switchUserAuth = (data, callback) => {
    const url = "https://localhost:8443/switchUserAuth"
    postRequest(url, data, callback);
}

export const getAllOrders = (data, callback) => {
    const url = "https://localhost:8443/getAllOrders"
    postRequest(url, data, callback);
}

export const delOrder = (data, callback) => {
    const url = "https://localhost:8443/delOrder"
    postRequest(url, data, callback);
}

export const getVisits = (data, callback) => {
    const url="https://localhost:8443/visits";
    postRequest(url, data, callback);
}
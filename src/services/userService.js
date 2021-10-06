import {history} from "../utils/history";
import {message} from "antd";
import {postRequest, postRequest_v3} from "../utils/ajax";

export const login = (data) => {
    const url = `http://localhost:8080/login`;
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
    const url = `http://localhost:8080/register`;
    const callback = (data) => {
        if (data.status >= 0) {
            history.push("/login");
            message.success(data.msg);
        } else message.error(data.msg);
    };
    postRequest(url, data, callback);
}

export const logout = () => {
    const url = `http://localhost:8080/logout`;

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
    const url = "http://localhost:8080/getCart";
    postRequest(url, data, callback);
}

export const addCart = (json, callback) => {
    const url = "http://localhost:8080/addCart";
    postRequest(url, json, callback);
}

export const getOrders = (userId, callback) => {
    const data = {userId: userId};
    const url = "http://localhost:8080/getOrders"
    postRequest(url, data, callback);
}

export const addOrder = (data, callback) => {
    const url = "http://localhost:8080/addOrder"
    postRequest(url, data, callback);
}

export const deleteCartItem = (data, callback) => {
    const url = "http://localhost:8080/delCart"
    postRequest(url, data, callback);
}

export const getUsers = (data, callback) => {
    const url = "http://localhost:8080/getUsers"
    postRequest(url, data, callback);
}

export const switchUserAuth = (data, callback) => {
    const url = "http://localhost:8080/switchUserAuth"
    postRequest(url, data, callback);
}

export const getAllOrders = (data, callback) => {
    const url = "http://localhost:8080/getAllOrders"
    postRequest(url, data, callback);
}

export const delOrder = (data, callback) => {
    const url = "http://localhost:8080/delOrder"
    postRequest(url, data, callback);
}

export const checkUsername = (data, callback) => {
    const url = "http://localhost:8080/checkUsername"
    postRequest_v3(url, data, callback);
}

export const getVisits = (data, callback) => {
    const url="http://localhost:8080/visits";
    postRequest(url, data, callback);
}
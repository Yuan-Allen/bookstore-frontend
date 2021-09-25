import {postRequest, postRequest_v2} from "../utils/ajax";

export const getBooks = (data, callback) => {
    const url = 'http://localhost:8080/getBooks';
    postRequest(url, data, callback);
}

export const getBook = (id, callback) => {
    const data = {id: id};
    const url = 'http://localhost:8080/getBook';
    postRequest_v2(url, data, callback);
}

export const editBook = (json, callback) => {
    const url = 'http://localhost:8080/editBook';
    postRequest(url, json, callback);
}

export const addBook = (json, callback) => {
    const url = 'http://localhost:8080/addBook';
    postRequest(url, json, callback);
}

export const delBook = (json, callback) => {
    const url = 'http://localhost:8080/delBook';
    postRequest(url, json, callback);
}
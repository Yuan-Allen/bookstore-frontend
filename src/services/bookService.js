import {getRequest, getRequest_returnText, postRequest, postRequest_v2} from "../utils/ajax";

export const getBooks = (data, callback) => {
    const url = 'https://localhost:8443/getBooks';
    postRequest(url, data, callback);
}

export const getBook = (id, callback) => {
    const data = {id: id};
    const url = 'https://localhost:8443/getBook';
    postRequest_v2(url, data, callback);
}

export const editBook = (json, callback) => {
    const url = 'https://localhost:8443/editBook';
    postRequest(url, json, callback);
}

export const addBook = (json, callback) => {
    const url = 'https://localhost:8443/addBook';
    postRequest(url, json, callback);
}

export const delBook = (json, callback) => {
    const url = 'https://localhost:8443/delBook';
    postRequest(url, json, callback);
}

export const fullTextSearch = (query, callback) => {
    const url = 'https://localhost:8443/fullTextSearching?query='+query;
    getRequest(url, callback);
}

export const searchAuthor = (bookName, callback) => {
    const url = 'https://localhost:8443/author/'+bookName;
    getRequest_returnText(url, callback);
}
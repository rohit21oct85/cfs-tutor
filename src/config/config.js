import axios from 'axios';

const apiUrl = 'http://localhost:8080/tutor/v1/';
// const apiUrl = 'https://cfs-admin-panel.herokuapp.com/tutor/v1/';

const config = {
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
    },
};

const authAxios = axios.create(config);

authAxios.interceptors.request.use(function(config) {
    config.headers.Authorization = localStorage.getItem('tutor_token') ?
        `Bearer ${localStorage.getItem('tutor_token')}` :
        ``;
    return config;
});

export { apiUrl, authAxios };
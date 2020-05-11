import axios from 'axios';
import Store from "store";

const server = axios.create({
    baseURL: 'http://localhost:8888',
});

server.interceptors.request.use(function (config) {
    config.headers["Api_Token"] = Store.get('Api_Token');
    return config;
})

export default server;
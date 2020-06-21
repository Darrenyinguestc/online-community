import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import server from "./server"; 
import App from './App/App';
import { Spin } from 'antd';
import AppUnLogin from './App/AppUnLogin';

// 渲染初始加载界面
ReactDOM.render((
    <Spin size="large">
        <div style={{ width:"100%", height:"100vh" }}/>
    </Spin>
), document.getElementById("root"));

// 获取用户信息
const ready = () => {
    return new Promise((resolve, reject) => {
        server.get("/auth/auth").then(response => {
            window.auth = response.data;
            resolve();
        }).catch(error => {
            reject();
        });
    })
}

// 获取用户信息成功则转至APP界面，否则转至未登录界面
ready().then(() => { 
    ReactDOM.render(<App />, document.getElementById("root"))
}).catch(()=>{
    ReactDOM.render(<AppUnLogin />, document.getElementById("root"))
});
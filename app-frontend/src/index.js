import React from 'react';
import {createRoot} from 'react-dom/client';
import "font-awesome/css/font-awesome.min.css"
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
);

//test first commit in git
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

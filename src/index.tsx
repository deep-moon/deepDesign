/*
 * @Author: deep moon
 * @Date: 2022-08-23 17:21:01
 * @LastEditTime: 2022-08-23 18:16:31
 * @LastEditors: deep moon
 * @Description:
 * @FilePath: /deepDesign/src/index.tsx
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

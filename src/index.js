import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

let posts = [
    {id: 1, message: 'Hello, how are you?', likesCount: 8},
    {id: 2, message: 'This is my first Post', likesCount: 50},
    {id: 3, message: 'This is my second Post', likesCount: 0}
];

let dialogs = [
    {id: 1, name: 'Vahagn'},
    {id: 2, name: 'Ani'},
    {id: 3, name: 'Vardan'},
    {id: 4, name: 'Sveta'},
    {id: 5, name: 'Garik'},
    {id: 6, name: 'Arman'}
];

let messages = [
    {id: 1, message: 'Hello'},
    {id: 2, message: 'Hi'},
    {id: 3, message: 'How are you?'},
    {id: 4, message: 'Okay'},
    {id: 5, message: 'Fine'},
    {id: 6, message: 'Thanks'}
];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App posts={posts} dialogs={dialogs} messages={messages}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

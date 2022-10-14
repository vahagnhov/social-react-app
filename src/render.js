import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {addMessage, addPost, updateNewPostText} from "./redux/state";

const root = ReactDOM.createRoot(document.getElementById('root'));
export let rerenderEntireTree = (state) => {
    root.render(
        <React.StrictMode>
            <BrowserRouter>
                <App state={state} addPost={addPost} addMessage={addMessage} updateNewPostText={updateNewPostText}/>
            </BrowserRouter>
        </React.StrictMode>
    );
}

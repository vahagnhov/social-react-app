import React from "react";
import s from './MyPosts.module.css';
import Post from "./Post/Post";

const MyPosts = () => {
    return (
        <div className={s.posts}>
            My Posts
            <div>
                <textarea></textarea>
                <button>Add Post</button>
                <button>Remove</button>
            </div>
            <Post message='Hello, how are you?' likes_count='8'/>
            <Post message='This is my first Post' likes_count='50'/>
            <Post message='This is my second Post' likes_count='0'/>
        </div>
    );
}

export default MyPosts;
import React from "react";
import s from './MyPosts.module.css';
import Post from "./Post/Post";

const MyPosts = () => {
    return (
        <div className={s.postsBlock}>
            <h2>My Posts</h2>
            <div>
                <div>
                    <textarea></textarea>
                </div>
                <div>
                    <button>Add Post</button>
                </div>
                <button>Remove</button>
            </div>
            <div className={s.posts}>
                <Post message='Hello, how are you?' likes_count='8'/>
                <Post message='This is my first Post' likes_count='50'/>
                <Post message='This is my second Post' likes_count='0'/>
            </div>
        </div>
    );
}

export default MyPosts;
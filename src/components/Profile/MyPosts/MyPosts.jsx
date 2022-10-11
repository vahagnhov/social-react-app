import React from "react";
import s from './MyPosts.module.css';
import Post from "./Post/Post";

const MyPosts = () => {

    let postData = [
        {id: 1, message: 'Hello, how are you?', likesCount: 8},
        {id: 2, message: 'This is my first Post', likesCount: 50},
        {id: 3, message: 'This is my second Post', likesCount: 0}
    ];

    let postsElements = postData.map(p => <Post id={p.id} message={p.message} likes_count={p.likesCount}/>);

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
                {postsElements}
            </div>
        </div>
    );
}

export default MyPosts;
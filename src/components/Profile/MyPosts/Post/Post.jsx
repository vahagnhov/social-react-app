import React from "react";
import s from './Post.module.css';

const Post = (props) => {

    return (
        <div className={s.item}>
            <img alt='user-avatar'
                src='https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg'/>

            {props.message}

            <div>
                <span>like {props.likes_count}</span>
            </div>
        </div>
    );
}

export default Post;
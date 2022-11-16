import React, {FC} from "react";
import s from './Post.module.css';

type PropsType = {
    id: number
    message: string
    likes_count: number
};

const Post: FC<PropsType> = ({message, likes_count}) => {
    return (
        <div className={s.item}>
            <img alt='user-avatar' src='https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector.png'/>
            {message}
            <div>
                <span>like {likes_count}</span>
            </div>
        </div>
    );
}

export default Post;
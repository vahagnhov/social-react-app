import React, {FC} from "react";
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import {PostType} from "../../../types/types";
import AddPostForm, {AddPostFormValuesType} from "./AddPostForm/AddPostForm";

type MapStateToPropsType = {
    posts: Array<PostType>
};
type MapDispatchToPropsType = {
    addPost: (newPostText: string) => void
};

type PropsType = MapStateToPropsType & MapDispatchToPropsType;

const MyPosts: FC<PropsType> = ({posts, addPost}) => {

    let postsElements = [...posts].reverse().map(p =>
        <Post key={p.id} message={p.message} likes_count={p.likesCount}/>);

    let onAddPost = (formData: AddPostFormValuesType) => {
        addPost(formData.newPostText);
    };

    return (
        <div className={s.postsBlock}>
            <h2>My Posts</h2>
            <AddPostForm onSubmit={onAddPost}/>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    );
}

export default MyPosts;
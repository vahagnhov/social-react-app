import React from "react";
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";

const AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name='newPostText' component='textarea' placeholder='Enter your post message'/>
            </div>
            <div>
                <button>Add Post</button>
            </div>
            <button>Remove</button>
        </form>
    );
}

const AddNewPostReduxForm = reduxForm({form: 'profileAddNewPostForm'})(AddNewPostForm);

const MyPosts = (props) => {

    let postsElements = props.posts.map(p => <Post key={p.id} id={p.id} message={p.message} likes_count={p.likesCount}/>);

    let onAddPost = (formData) => {
        props.addPost(formData.newPostText);
    };

    return (
        <div className={s.postsBlock}>
            <h2>My Posts</h2>
            <AddNewPostReduxForm onSubmit={onAddPost}/>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    );
}

export default MyPosts;
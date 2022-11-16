import React, {FC} from "react";
import s from './MyPosts.module.css';
import style from '../../common/FormsControls/FormsControls.module.css';
import Post from "./Post/Post";
import {InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../helpers/validators/validators";
import {createField, Textarea} from "../../common/FormsControls/FormsControls";
import {PostType} from "../../../types/types";

let maxLength10 = maxLengthCreator(10);

type MapStateToPropsType = {
    posts: Array<PostType>
};
type MapDispatchToPropsType = {
    addPost: (newPostText: string) => void
};

type PropsType = MapStateToPropsType & MapDispatchToPropsType;

type MyPostsFormOwnPropsType = {};

const AddNewPostForm: FC<InjectedFormProps<MyPostsFormValuesType, MyPostsFormOwnPropsType> & MyPostsFormOwnPropsType> =
    ({handleSubmit, error}) => {
        return (
            <form onSubmit={handleSubmit}>
                <div>
                    {createField<MyPostsFormValuesTypeTypeKeys>('Post Message', 'newPostText',
                        [required, maxLength10], Textarea)}
                </div>
                {error && <div className={style.formSummaryError}>
                    {error}
                </div>}
                <div>
                    <button>Add Post</button>
                </div>
            </form>
        );
    }

type MyPostsFormValuesType = {
    newPostText: string
}
type MyPostsFormValuesTypeTypeKeys = Extract<keyof MyPostsFormValuesType, string>;

const AddNewPostReduxForm = reduxForm<MyPostsFormValuesType, MyPostsFormOwnPropsType>({form: 'profileAddNewPostForm'})(AddNewPostForm);

const MyPosts: FC<PropsType> = ({posts, addPost}) => {

    let postsElements = [...posts].reverse().map(p =>
        <Post key={p.id} id={p.id} message={p.message} likes_count={p.likesCount}/>);

    let onAddPost = (formData: MyPostsFormValuesType) => {
        addPost(formData.newPostText);
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
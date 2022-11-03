import React from "react";
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../helpers/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";

let maxLength10 = maxLengthCreator(10);

const AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name='newPostText' component={Textarea} placeholder='Post Message'
                       validate={[required, maxLength10]}/>
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

    /*
    For new versions of React js (starting from 2021) we may not use these features.
       For old versions of react to get rid of the redraw component if there are no updates in props or states
          1) If we are using a class component, we have 2 options use
               a) shouldComponentUpdate(nextProps, nextState, nextContext) {
                  return nextProps!=this.props || next state = this.state;
              }
              b) extend from React.PureComponent.
          2) For a functional component, we can wrap React.memo((props) => {})
    */

    let postsElements = props.posts.map(p => <Post key={p.id} id={p.id} message={p.message}
                                                   likes_count={p.likesCount}/>);

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
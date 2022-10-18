import React from "react";
import {addPostActionCreator, updatePostActionCreator} from "../../../redux/reducers/profile-reducer";
import MyPosts from "./MyPosts";
import StoreContext from "../../../StoreContext";

const MyPostsContainer = (props) => {
    return (<StoreContext.Consumer>
            {
            (store) => {
                let state = store.getState();

                let addPost = () => {
                    store.dispatch(addPostActionCreator());
                };

                let onPostChange = (text) => {
                    let action = updatePostActionCreator(text);
                    store.dispatch(action);
                };

                return <MyPosts updateNewPostText={onPostChange}
                     addPost={addPost}
                     posts={state.profilePage.posts}
                     newPostText={state.profilePage.newPostText}/>
            }
        }
        </StoreContext.Consumer>
    );
}

export default MyPostsContainer;
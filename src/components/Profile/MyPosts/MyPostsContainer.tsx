import {addPostAC} from "../../../redux/reducers/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import {PostType} from "../../../types/types";

type MapStateToPropsType = {
    posts: Array<PostType>
    newPostText: string
};

type MapDispatchToPropsType = {
    addPost: (newPostText: string) => void
};

type OwnPropsType = {};

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}
let mapDispatchToProps = (dispatch: any): MapDispatchToPropsType => {
    return {
        addPost: (newPostText: string) => {
            dispatch( addPostAC(newPostText))
        }
    }
}

const MyPostsContainer = connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>
(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
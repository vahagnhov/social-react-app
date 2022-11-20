import React, {ComponentType} from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, savePhoto, saveProfile, updateStatus} from "../../redux/reducers/profile-reducer";
import {compose} from "redux";
import {withRouter} from "../../utils/functions/functions";
import {Navigate} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";
import {ProfileType} from "../../types/types";

type MapStateToPropsType =  ReturnType<typeof mapStateToProps>

type MapDispatchToPropsType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    savePhoto: (file: File) => void,
    updateStatus: (newStatus: string) => void
    saveProfile: (profile: ProfileType) => Promise<any>
};

type OwnPropsType = {
    router: {
        params: {
            userId: string
        }
    }
};

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType;

class ProfileContainer extends React.Component<PropsType> {

    refreshProfile() {
        let userId: number | null = +this.props.router.params.userId;
        if (!userId) {
            if (this.props.isAuth) {
                userId = this.props.authorizedUserId;
            }
        }
        if (userId) {
            this.props.getUserProfile(userId);
            this.props.getStatus(userId);
        }
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
        if (this.props.router.params.userId != prevProps.router.params.userId) {
            this.refreshProfile();
        }
    }

    render() {
        let isOwner = false;
        if (!this.props.router.params.userId && !this.props.authorizedUserId) {
            return <Navigate to="/login"/>;
        }else{
            if(this.props.authorizedUserId){
                isOwner = true
            }else if(!this.props.router.params.userId || +this.props.router.params.userId == this.props.authorizedUserId){
                isOwner = true
            }
        }

        return <Profile {...this.props}
                        isOwner={isOwner}
                        profile={this.props.profile}
                        status={this.props.status}
                        updateStatus={this.props.updateStatus}
                        savePhoto={this.props.savePhoto}/>
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        isAuth: state.auth.isAuth,
        authorizedUserId: state.auth.userId
    };
};

export default compose<ComponentType>(
    connect
        (mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter,
)(ProfileContainer);
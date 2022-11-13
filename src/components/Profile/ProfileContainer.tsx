import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, savePhoto, saveProfile, updateStatus} from "../../redux/reducers/profile-reducer";
import {compose} from "redux";
import {withRouter} from "../../helpers/functions/functions";
import {Navigate} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";
import {ProfileType} from "../../types/types";

type MapStateToPropsType = {
    profile: ProfileType | null
    status: string
    isAuth: boolean
    authorizedUserId: number | null
};

type MapDispatchToPropsType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    savePhoto: (userId: number) => void,
    updateStatus: (newStatus: string) => void
};

type OwnPropsType = {
    router: {
        params: {
            userId: number | null
        }
    }
};

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType;

class ProfileContainer extends React.Component<PropsType> {

    refreshProfile() {
        let userId = this.props.router.params.userId;
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

    componentDidUpdate(prevProps: PropsType, prevState: any, snapshot: any) {
        if (this.props.router.params.userId != prevProps.router.params.userId) {
            this.refreshProfile();
        }
    }

    render() {

        if (!this.props.router.params.userId && !this.props.authorizedUserId) {
            return <Navigate to="/login"/>;
        }

        let isOwner = this.props.authorizedUserId &&
            (!this.props.router.params.userId || this.props.router.params.userId == this.props.authorizedUserId)

        return <Profile {...this.props}
                        isOwner={isOwner}
                        profile={this.props.profile}
                        status={this.props.status}
                        updateStatus={this.props.updateStatus}
                        savePhoto={this.props.savePhoto}/>
    }
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        isAuth: state.auth.isAuth,
        authorizedUserId: state.auth.userId
    };
};

export default compose(
    connect/*<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>*/
    (mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter,
)(ProfileContainer);
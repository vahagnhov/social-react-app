import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, updateStatus, savePhoto, saveProfile} from "../../redux/reducers/profile-reducer";
import {compose} from "redux";
import {withRouter} from "../../helpers/functions/functions";
import {Navigate} from "react-router-dom";

class ProfileContainer extends React.Component {

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

    componentDidUpdate(prevProps, prevState, snapshot) {
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

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        isAuth: state.auth.isAuth,
        authorizedUserId: state.auth.userId
    };
};

export default compose(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter,
)(ProfileContainer);
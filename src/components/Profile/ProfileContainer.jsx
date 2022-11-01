import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, updateStatus} from "../../redux/reducers/profile-reducer";
import {compose} from "redux";
import {withRouter} from "../../helpers/functions/functions";
import {Navigate} from "react-router-dom";

class ProfileContainer extends React.Component {
    componentDidMount() {
    }

    render() {
        let userId = this.props.router.params.userId;
        if (!userId) {
            if(this.props.isAuth){
                userId = this.props.authorizedUserId;
            }else{
                return <Navigate
                    to="/login"
                />;
            }
        }
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);

        return <Profile {...this.props}
                        profile={this.props.profile}
                        status={this.props.status}
                        updateStatus={this.props.updateStatus}/>
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
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus}),
    withRouter,
)(ProfileContainer);
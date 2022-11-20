import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {logout} from "../../redux/reducers/auth-reducer";
import {AppStateType} from "../../redux/redux-store";

export type MapStateToPropsType = ReturnType<typeof mapStateToProps>;

export type MapDispatchToPropsType = {
    logout: () => void
};

type OwnPropsType = {};

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType;

class HeaderContainer extends React.Component<PropsType> {
    render() {
        return (
            <Header {...this.props}/>
        );
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    };
};
export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>
(mapStateToProps, {logout})(HeaderContainer);
import React from "react";
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";

type MapStateToPropsType = {
    isAuth: boolean
};
type MapDispatchToPropsType = {};

type OwnPropsType = {};

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType;

let mapStateToPropsForRedirect = (state: AppStateType): MapStateToPropsType  => {
    return {
        isAuth: state.auth.isAuth
    };
};

export const withAuthRedirect = (Component: any) => {
    class RedirectComponent extends React.Component<PropsType> {
        render() {
            if (!this.props.isAuth) return <Navigate to='/login'/>
            return <Component {...this.props} />
        }
    }

    let ConnectedAuthRedirectComponent = connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>
    (mapStateToPropsForRedirect)(RedirectComponent);

    return ConnectedAuthRedirectComponent;
}
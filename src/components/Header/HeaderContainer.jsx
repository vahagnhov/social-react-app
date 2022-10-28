import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {setAuthUserData} from "../../redux/reducers/auth-reducer";
import {authAPI} from "../../api/authAPI";

class HeaderContainer extends React.Component {
    componentDidMount() {
        authAPI.login().then(response => {
            if(response.data.resultCode === 0 ){
                let {id, login, email} = response.data.data;
                this.props.setAuthUserData(id, email, login);
            }
        });
    }

    render() {
        return (
            <Header {...this.props}/>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    };
};
export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer);
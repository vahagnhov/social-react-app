import {Field, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, minLengthCreator, required} from "../../helpers/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/reducers/auth-reducer";
import {Navigate} from "react-router-dom";
import React from "react";

let maxLength30 = maxLengthCreator(30);
let minLength7 = minLengthCreator(7);

const LoginForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name='email' component={Input} placeholder='Login' validate={[required, maxLength30]}/>
            </div>
            <div>
                <Field name='password' component={Input} placeholder='password' type='password'
                       validate={[required, minLength7]}/>
            </div>
            <div>
                <Field name='rememberMe' component={Input} type='checkbox'/>
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    );
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

const Login = (props) => {
    const onSubmitLogin = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe);
    }

    if (props.isAuth) return <Navigate to='/profile'/>

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmitLogin}/>
    </div>
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps, {login})(Login);
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, minLengthCreator, required} from "../../helpers/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/reducers/auth-reducer";
import {Navigate} from "react-router-dom";
import React from "react";
import s from './../common/FormsControls/FormsControls.module.css';

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

            {props.captchaUrl &&
            <div>
                <img alt='login-captcha' src={props.captchaUrl}/>
                <div>
                    <Field name='captcha' component={Input} placeholder='Captcha'
                           validate={[required]}/>
                </div>
            </div>
            }

            {props.error &&  <div className={s.formSummaryError}>
                {props.error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    );
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

const Login = (props) => {
    const onSubmitLogin = (formData) => {
        let captcha = formData.captcha ? formData.captcha : '';
        props.login(formData.email, formData.password, formData.rememberMe, captcha);
    }

    if (props.isAuth) return <Navigate to='/profile'/>

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmitLogin} captchaUrl={props.captchaUrl}/>
    </div>
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl
    }
}

export default connect(mapStateToProps, {login})(Login);
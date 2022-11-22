import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, GetStringKeys, Input} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, minLengthCreator, required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/reducers/auth-reducer";
import {Navigate} from "react-router-dom";
import React, {FC} from "react";
import s from './../common/FormsControls/FormsControls.module.css';
import {AppStateType} from "../../redux/redux-store";

let maxLength30 = maxLengthCreator(30);
let minLength7 = minLengthCreator(7);

type LoginFormOwnPropsType = {
    captchaUrl: null | string
};

const LoginForm: FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnPropsType> & LoginFormOwnPropsType> =
    ({handleSubmit, error, captchaUrl}) => {

        return (
            <form onSubmit={handleSubmit}>
                <div>
                    {createField<LoginFormValuesTypeKeys>('Login', 'email',
                        [required, maxLength30], Input)}
                </div>
                <div>
                    {createField<LoginFormValuesTypeKeys>('Password', 'password',
                        [required, minLength7], Input, {type: 'password'})}
                </div>
                <div>
                    {createField<LoginFormValuesTypeKeys>('', 'rememberMe',
                        [], Input, {type: 'checkbox'})}
                </div>

                {captchaUrl &&
                    <div>
                        <img alt='login-captcha' src={captchaUrl}/>
                        <div>
                            {createField<LoginFormValuesTypeKeys>('Captcha', 'captcha', [required], Input)}
                        </div>
                    </div>
                }

                {error && <div className={s.formSummaryError}>
                    {error}
                </div>}
                <div>
                    <button>Login</button>
                </div>
            </form>
        );
    }

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnPropsType>({form: 'login'})(LoginForm);

type MapStateToPropsType = {
    isAuth: boolean
    captchaUrl: null | string
};
type MapDispatchToPropsType = {
    login: (email: string | null, password: string, rememberMe: boolean, captcha: string | null) => void
};

type PropsType = MapStateToPropsType & MapDispatchToPropsType;

type LoginFormValuesType = {
    email: string | null
    password: string,
    rememberMe: boolean,
    captcha: string | null
}
type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>;

const Login: FC<PropsType> = (props) => {
    const onSubmitLogin = (formData: LoginFormValuesType) => {
        let captcha = formData.captcha ? formData.captcha : '';
        props.login(formData.email, formData.password, formData.rememberMe, captcha);
    }

    if (props.isAuth) return <Navigate to='/profile'/>

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmitLogin} captchaUrl={props.captchaUrl}/>
    </div>
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl
    }
}

export default connect(mapStateToProps, {login})(Login);
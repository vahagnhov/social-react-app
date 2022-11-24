import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, GetStringKeys, Input} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, minLengthCreator, required} from "../../utils/validators/validators";
import {connect, useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/reducers/auth-reducer";
import {Navigate} from "react-router-dom";
import React, {FC} from "react";
import s from './../common/FormsControls/FormsControls.module.css';
import {AppDispatchType, AppStateType} from "../../redux/redux-store";

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

type LoginFormValuesType = {
    email: string | null
    password: string,
    rememberMe: boolean,
    captcha: string | null
}
type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>;

const LoginPage: FC = () => {
    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)

    const dispatch: AppDispatchType = useDispatch();

    const onSubmitLogin = (formData: LoginFormValuesType) => {
        let captcha = formData.captcha ? formData.captcha : '';
        dispatch<any>(login(formData.email, formData.password, formData.rememberMe, captcha));
    }

    if (isAuth) return <Navigate to='/profile'/>

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmitLogin} captchaUrl={captchaUrl}/>
    </div>
}

export default LoginPage;
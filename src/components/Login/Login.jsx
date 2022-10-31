import {Field, reduxForm} from "redux-form";

const LoginForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={'login'} component={'input'} placeholder={'Login'}/>
            </div>
            <div>
                <Field name={'password'} component={'input'} placeholder={'password'} type={'password'}/>
            </div>
            <div>
                <Field name={'rememberMe'} component={'input'} type={'checkbox'}/>
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    );
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm); // a unique name 'login' for the form

const Login = (props) => {
    const onSubmitLogin = (formData) => {
        // send server this formData for login
    }
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmitLogin}/>
    </div>
}

export default Login;
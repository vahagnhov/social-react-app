import {Field, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, minLengthCreator, required} from "../../helpers/validators/validators";

let maxLength30 = maxLengthCreator(30);
let minLength7 = minLengthCreator(7);

const LoginForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name='login' component={Input} placeholder='Login' validate={[required, maxLength30]}/>
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
    }
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmitLogin}/>
    </div>
}

export default Login;
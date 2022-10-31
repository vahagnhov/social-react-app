import React from "react";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../helpers/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";

let maxLength50 = maxLengthCreator(50);

const AddNewMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name='newMessageBody' component={Textarea} placeholder='Enter your message'
                       validate={[required, maxLength50]}/>
            </div>
            <div>
                <button>Add Message</button>
            </div>
        </form>
    );
}

const AddNewMessageReduxForm = reduxForm({form: 'dialogsAddNewMessageForm'})(AddNewMessageForm);
export default AddNewMessageReduxForm;
import React from "react";
import {reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../helpers/validators/validators";
import {createField, Textarea} from "../../common/FormsControls/FormsControls";
import style from "../../common/FormsControls/FormsControls.module.css";

let maxLength50 = maxLengthCreator(50);

const AddNewMessageForm = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                {createField('Enter your message', 'newMessageBody',
                    [required, maxLength50], Textarea)}
            </div>
            {error &&
                <div className={style.formSummaryError}>
            {error}
            </div>}
            <div>
                <button>Add Message</button>
            </div>
        </form>
    );
}

const AddNewMessageReduxForm = reduxForm({form: 'dialogsAddNewMessageForm'})(AddNewMessageForm);
export default AddNewMessageReduxForm;
import React, {FC} from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {createField, GetStringKeys, Textarea} from "../../common/FormsControls/FormsControls";
import style from "../../common/FormsControls/FormsControls.module.css";
import {NewMessageFormValuesType} from "../Dialogs";

let maxLength50 = maxLengthCreator(50);

type NewMessageFormValuesTypeKeys = GetStringKeys<NewMessageFormValuesType>;

type NewMessageOwnPropsType = {};

const AddNewMessageForm: FC<InjectedFormProps<NewMessageFormValuesType, NewMessageOwnPropsType> & NewMessageOwnPropsType> =
    ({handleSubmit, error}) => {
        return (
            <form onSubmit={handleSubmit}>
                <div>
                    {createField<NewMessageFormValuesTypeKeys>('Enter your message', 'newMessageBody',
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

const AddNewMessageReduxForm = reduxForm<NewMessageFormValuesType, NewMessageOwnPropsType>
({form: 'dialogsAddNewMessageForm'})(AddNewMessageForm);
export default AddNewMessageReduxForm;
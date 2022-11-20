import React, {FC} from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, GetStringKeys, Textarea} from "../../../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../../../utils/validators/validators";
import style from "../../../common/FormsControls/FormsControls.module.css";

let maxLength10 = maxLengthCreator(10);

type AddPostFormOwnPropsType = {};

export type AddPostFormValuesType = {
    newPostText: string
}
type AddPostFormValuesTypeKeys = GetStringKeys<AddPostFormValuesType>;

const AddPostForm: FC<InjectedFormProps<AddPostFormValuesType, AddPostFormOwnPropsType> & AddPostFormOwnPropsType> =
    ({handleSubmit, error}) => {
        return (
            <form onSubmit={handleSubmit}>
                <div>
                    {createField<AddPostFormValuesTypeKeys>('Post Message', 'newPostText',
                        [required, maxLength10], Textarea)}
                </div>
                {error && <div className={style.formSummaryError}>
                    {error}
                </div>}
                <div>
                    <button>Add Post</button>
                </div>
            </form>
        );
    }


export default reduxForm<AddPostFormValuesType, AddPostFormOwnPropsType>
({form: 'profileAddNewPostForm'})(AddPostForm);

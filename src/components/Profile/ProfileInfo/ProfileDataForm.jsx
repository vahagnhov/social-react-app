import React from "react";
import {reduxForm} from "redux-form";
import {createField, Input, Textarea} from "../../common/FormsControls/FormsControls";
import s from "./ProfileInfo.module.css";
import style from "../../common/FormsControls/FormsControls.module.css";
import {required, validURL} from "../../../helpers/validators/validators";

const ProfileDataForm = ({handleSubmit, profile, error}) => {
    return <form onSubmit={handleSubmit}>
        {error && <div className={style.formSummaryError}>
            {error}
        </div>}
        <div>
            <b>FullName </b> :
            {createField('Full Name', 'fullName', [required], Input)}
        </div>
        <div>
            <b>Looking For A Job </b> :
            {createField('', 'lookingForAJob', [], Input, {type: 'checkbox'})}
        </div>
        <div>
            <b>My Professional Skills </b> :
            {createField('My Professional Skills', 'lookingForAJobDescription', [], Textarea)}
        </div>
        <div>
            <b>About Me </b> :
            {createField('About Me', 'aboutMe', [], Textarea)}
        </div>
        {<div>
            <b>Contacts</b> : {Object.keys(profile.contacts).map(key => {
            return <div key={key} className={s.contact}>
                <b>{key} : {createField(key, 'contacts.' + key, [validURL], Input)}</b>
            </div>
        })}
        </div>}
        <div>
            <button>Update</button>
        </div>
    </form>;
}

const ProfileDataFormReduxForm = reduxForm({form: 'edit-profile'})(ProfileDataForm);

export default ProfileDataFormReduxForm;
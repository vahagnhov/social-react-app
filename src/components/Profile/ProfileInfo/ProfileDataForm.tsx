import React, {FC} from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, GetStringKeys, Input, Textarea} from "../../common/FormsControls/FormsControls";
import s from "./ProfileInfo.module.css";
import style from "../../common/FormsControls/FormsControls.module.css";
import {required, validURL} from "../../../utils/validators/validators";
import {ProfileType} from "../../../types/types";

type PropsType = {
    profile: ProfileType
}
type ProfileTypeKeys = GetStringKeys<ProfileType>

const ProfileDataForm: FC<InjectedFormProps<ProfileType, PropsType> & PropsType> =
    ({handleSubmit, profile, error}) => {
        return <form onSubmit={handleSubmit}>
            {error && <div className={style.formSummaryError}>
                {error}
            </div>}
            <div>
                <b>FullName </b> :
                {createField<ProfileTypeKeys>('Full Name', 'fullName', [required], Input)}
            </div>
            <div>
                <b>Looking For A Job </b> :
                {createField<ProfileTypeKeys>('', 'lookingForAJob', [], Input, {type: 'checkbox'})}
            </div>
            <div>
                <b>My Professional Skills </b> :
                {createField<ProfileTypeKeys>('My Professional Skills', 'lookingForAJobDescription', [], Textarea)}
            </div>
            <div>
                <b>About Me </b> :
                {createField<ProfileTypeKeys>('About Me', 'aboutMe', [], Textarea)}
            </div>
            {<div>
                <b>Contacts</b> : {Object.keys(profile.contacts).map(key => {
                return <div key={key} className={s.contact}>
                    {/* todo: create some solution for embedded objects */}
                    <b>{key} : {createField(key, "contacts." + key, [validURL], Input)}</b>
                </div>
            })}
            </div>}
            <div>
                <button>Update</button>
            </div>
        </form>;
    }

const ProfileDataFormReduxForm = reduxForm<ProfileType, PropsType>({form: 'edit-profile'})
(ProfileDataForm);

export default ProfileDataFormReduxForm;
import React, {ChangeEvent, FC, useState} from "react";
import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import userNoPhoto from '../../../assets/images/user.png';
import ProfileStatusWitHooks from "./ProfileStatusWitHooks";
import ProfileDataForm from "./ProfileDataForm";
import {ContactsType, ProfileType} from "../../../types/types";

type PropsType = {
    profile: ProfileType | null
    status: string
    isOwner: boolean
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

const ProfileInfo: FC<PropsType> = ({isOwner, profile, status, updateStatus, savePhoto, saveProfile}) => {
    let [editMode, setEditMode] = useState(false);
    if (!profile) {
        return <Preloader/>
    }

    const goToEditMode = () => {
        setEditMode(true);
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    }

    const onSubmitProfileData = (formData: ProfileType) => {
        saveProfile(formData)
            .then(
                () => {
                    setEditMode(false);
                }
            );
    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                <img alt='avatar' src={(profile.photos && profile.photos.large) || userNoPhoto} className={s.mainPhoto}
                     /*accept="image/!*"*//>
                {isOwner && <input type='file' onChange={onMainPhotoSelected}/>}
                <ProfileStatusWitHooks status={status} updateStatus={updateStatus}/>
                {editMode
                    ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmitProfileData}/>
                    : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={goToEditMode}/>}
            </div>
        </div>
    );
}

type ProfileDataPropsType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}

const ProfileData: FC<ProfileDataPropsType> = ({profile, isOwner, goToEditMode}) => {
    return <div>
        {isOwner && <div>
            <button onClick={goToEditMode}>Edit</button>
        </div>}
        <div>
            <b>FullName</b> : {profile.fullName}
        </div>
        <div>
            <b>Looking For A Job</b> : {profile.lookingForAJob ? 'Yes' : 'No'}
        </div>
        <div>
            <b>My Professional Skills</b> : {profile.lookingForAJobDescription ? profile.lookingForAJobDescription : ''}
        </div>
        <div>
            <b>About Me</b> : {profile.aboutMe ? profile.aboutMe : ''}
        </div>
        <div>
            <b>Contacts</b> : {Object.keys(profile.contacts).map(key => {
            return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]}/>
        })}
        </div>
    </div>;
}
type ContactsPropsType = {
    contactTitle: string
    contactValue: string
}

const Contact: FC<ContactsPropsType> = ({contactTitle, contactValue}) => {
    return <div className={s.contact}><b>{contactTitle}</b> : {contactValue}</div>;
}

export default ProfileInfo;
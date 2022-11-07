import React from "react";
import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import userNoPhoto from '../../../assets/images/user.png';
import ProfileStatusWitHooks from "./ProfileStatusWitHooks";

const ProfileInfo = ({isOwner, profile, status, updateStatus, savePhoto}) => {
    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    }
    return (
        <div>
            <div className={s.descriptionBlock}>
                <img alt='avatar' src={(profile.photos && profile.photos.large) || userNoPhoto} className={s.mainPhoto}
                     accept="image/*"/>
                {isOwner && <input type='file' onChange={onMainPhotoSelected}/>}
                <ProfileStatusWitHooks status={status} updateStatus={updateStatus}/>
                <div>
                    <div>
                        <h2>{profile.fullName}</h2>
                    </div>
                    <div>
                        <span>{profile.aboutMe ? profile.aboutMe : ''}</span>
                    </div>
                    <div>
                        <span>{profile.lookingForAJob
                            ? <span>{profile.lookingForAJobDescription}</span>
                            : ''}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileInfo;
import React from "react";
import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import userNoPhoto from '../../../assets/images/user.png';
import ProfileStatusWitHooks from "./ProfileStatusWitHooks";

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader/>
    }
    return (
        <div>
            <div className={s.descriptionBlock}>
                <img alt='avatar'
                     src={props.profile.photos && props.profile.photos.large ? props.profile.photos.large : userNoPhoto}/>
                <ProfileStatusWitHooks status={props.status} updateStatus={props.updateStatus}/>
                <div>
                    <div>
                        <h2>{props.profile.fullName}</h2>
                    </div>
                    <div>
                        <span>{props.profile.aboutMe ? props.profile.aboutMe : ''}</span>
                    </div>
                    <div>
                        <span>{props.profile.lookingForAJob
                            ? <span>{props.profile.lookingForAJobDescription}</span>
                            : ''}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileInfo;
import React from "react";
import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import userNoPhoto from '../../../assets/images/user.png';
import ProfileStatus from './ProfileStatus';

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader/>
    }
    return (
        <div>
            {/*<div>
                <img alt='thumb'
                     src='https://waytomonte.com/img/slider/4/1/3787/0d53860a0a252a83e0b2c6147c8d2352_thumb.jpg'/>
            </div>*/}
            <div className={s.descriptionBlock}>
                <img alt='avatar'
                     src={props.profile.photos && props.profile.photos.large ? props.profile.photos.large : userNoPhoto}/>
                <ProfileStatus status={'Hello My friend'}/>
                <div>
                    <div>
                        <h2>{props.profile.fullName}</h2>
                    </div>
                    <div>
                        <span>{props.profile.status ? 'Status -' + props.profile.status : ''}</span>
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
import React from "react";
import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import userNoPhoto from '../../../assets/images/user.png';

const ProfileInfo = (props) => {
    if(!props.profile){
        return <Preloader/>
    }
    return (
        <div>
            <div>
                <img alt='thumb'
                     src='https://waytomonte.com/img/slider/4/1/3787/0d53860a0a252a83e0b2c6147c8d2352_thumb.jpg'/>
            </div>
            <div className={s.descriptionBlock}>
                <img alt='avatar'
                     src={props.profile.photos && props.profile.photos.large? props.profile.photos.large : userNoPhoto}/>
                Avatar + Desc
            </div>
        </div>
    );
}

export default ProfileInfo;
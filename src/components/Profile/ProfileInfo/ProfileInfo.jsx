import React from "react";
import s from './ProfileInfo.module.css';

const ProfileInfo = () => {
    return (
        <div>
            <div>
                <img alt='thumb'
                     src='https://waytomonte.com/img/slider/4/1/3787/0d53860a0a252a83e0b2c6147c8d2352_thumb.jpg'/>
            </div>
            <div className={s.descriptionBlock}>
                Avatar + Desc
            </div>
        </div>
    );
}

export default ProfileInfo;
import React, {useEffect, useState} from "react";

const ProfileStatusWitHooks = (props) => {

    let [editMode, setEditMode] = useState(false);

    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    },[props.status]);

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }

    const onStateChange = (e) => {
        setStatus(e.currentTarget.value);
    }

    return (
        <div>
            {!editMode
                ?
                <div>
                    <span onDoubleClick={activateEditMode}>{props.status || '------'}</span>
                </div>
                :
                <div>
                    <input
                        onChange={onStateChange} autoFocus={true} onBlur={deactivateEditMode}
                        value={status || '------'}/>
                </div>
            }
        </div>
    );
}

export default ProfileStatusWitHooks;
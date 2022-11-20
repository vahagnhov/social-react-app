import React, {ChangeEvent, FC, useEffect, useState} from "react";

type PropsType = {
    status: string
    updateStatus: (status: string) => void
}
const ProfileStatusWitHooks: FC<PropsType> = (props) => {

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

    const onStateChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value);
    }

    return (
        <div>
            {!editMode
                ?
                <div>
                    <b>Status : </b><span onDoubleClick={activateEditMode}>{props.status || '------'}</span>
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
import React, {FC} from "react";
import s from './../Dialogs.module.css';
import {DialogMessageType} from "../../../types/types";

const Message: FC<DialogMessageType> = ({message}) => {
    return (
        <div className={s.message}>
            {message}
        </div>
    );
}

export default Message;
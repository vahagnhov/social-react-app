import {actions} from "../../redux/reducers/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";
import {DialogType, MessageType} from "../../types/types";

type MapStateToPropsType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
};
type MapDispatchToPropsType = {
    sendMessage: (newMessageBody: string) => void
};

type OwnPropsType = {};


let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages
    }
}

let mapDispatchToProps = (dispatch: any): MapDispatchToPropsType => {
    return {
        sendMessage: (newMessageBody: string) => {
            dispatch(actions.sendMessageAC(newMessageBody))
        }
    }
}

export default compose(
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>
    (mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs);
import {sendMessageAC, updateNewMessageBodyAC} from "../../redux/reducers/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

let mapStateToProps = (state) => {
    return {
        dialogPage: state.dialogsPage
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: () => {
            dispatch( sendMessageAC())
        },
        updateMessageBody: (body) => {
            dispatch( updateNewMessageBodyAC(body))
        },
    }
}

let AuthRedirectDialogsComponent = withAuthRedirect(Dialogs);

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectDialogsComponent);

export default DialogsContainer;
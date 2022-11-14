import Navbar from "./Navbar";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {FriendType} from "../../types/types";

type MapStateToPropsType = {
    friends: Array<FriendType>
};

type MapDispatchToPropsType = {};

type OwnPropsType = {};

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        friends: state.sidebar.friends,
    }
}
let mapDispatchToProps = (dispatch: any): MapDispatchToPropsType => {
    return {}
}

const NavbarContainer = connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>
(mapStateToProps, mapDispatchToProps)(Navbar);

export default NavbarContainer;
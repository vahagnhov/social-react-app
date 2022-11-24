import React, {FC} from "react";
import {useSelector} from "react-redux";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {getIsFetching} from "../../redux/selectors/users-selectors";

type UsersPagePropsType = {
    pageTitle: string
};

export const UsersPage: FC<UsersPagePropsType> = (props) => {

    const isFetching = useSelector(getIsFetching);

    return <>
        <h3>{props.pageTitle}</h3>
        {isFetching ?
            <Preloader/> : null}
        <Users/>
    </>
}
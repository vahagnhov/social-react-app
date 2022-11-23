import React from "react";
import {connect} from "react-redux";
import {FilterType, follow, requestUsers, unFollow} from "../../redux/reducers/users-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers, getUsersFilter
} from "../../redux/selectors/users-selectors";
import {UserType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";

type MapStateToPropsType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
    filter: FilterType
};

type MapDispatchToPropsType = {
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    requestUsers: (currentPage: number, pageSize: number, filter: FilterType) => void
};

type OwnPropsType = {
    pageTitle: string
};

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType;

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        const {currentPage, pageSize, filter} = this.props;
        this.props.requestUsers(currentPage, pageSize, filter);
    }

    onPageChange = (pageNumber: number) => {
        const {pageSize, filter} = this.props;
        this.props.requestUsers(pageNumber, pageSize, filter);
    }

    onFilterChange = (filter: FilterType) => {
        const {pageSize} = this.props;
        this.props.requestUsers(1, pageSize, filter);
    }

    render() {
        return <>
            <h3>{this.props.pageTitle} - {this.props.totalUsersCount}</h3>
            {this.props.isFetching ?
                <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   users={this.props.users}
                   onPageChange={this.onPageChange}
                   onFilterChange={this.onFilterChange}
                   follow={this.props.follow}
                   unFollow={this.props.unFollow}
                   followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        filter: getUsersFilter(state),
    };
};

export default compose(
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>
    (
        mapStateToProps,
        {follow, unFollow, requestUsers})
)(UsersContainer)
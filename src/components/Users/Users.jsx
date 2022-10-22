import React from "react";
import s from './Users.module.css';
import axios from "axios";
import userNoPhoto from '../../assets/images/user.png';

class Users extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/users', {
            params: {
                count: this.props.pageSize,
                page: this.props.currentPage
            }
        }).then(response => {
            this.props.setUsers(response.data.items);
            this.props.setUsersTotalCount(response.data.totalCount);
        });
    }

    onPageChange = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        axios.get('https://social-network.samuraijs.com/api/1.0/users', {
            params: {
                count: this.props.pageSize,
                page: pageNumber
            }
        }).then(response => {
            this.props.setUsers(response.data.items);
        });
    }


    render() {
        let pageCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);

        let pages = [];
        for (let i = 1; i <= pageCount; i++) {
            pages.push(i);
        }

        return <div>
            <div>
                <div><span>{this.props.totalUsersCount}</span> </div>
                {pages.map(p => {
                    return <span className={`${s.paginationElement} ${this.props.currentPage === p ? s.selectedPage : ''}`}
                                 onClick={(e) => {
                                     this.onPageChange(p)
                                 }}>{p}</span>
                })
                }
            </div>
            {
                this.props.users.map(u =>
                    <div key={u.id}>
                        <span>
                             <div>
                                 {u.photos && u.photos.small
                                     ? <img alt='User Icon' src={u.photos.small} className={s.userPhoto}/>
                                     : <img alt='User Icon'
                                            src={userNoPhoto}
                                            className={s.userPhoto}/>
                                 }
                              </div>
                        <div>
                             {u.followed
                                 ? <button onClick={() => {
                                     this.props.unFollow(u.id)
                                 }}>UnFollow</button>
                                 : <button onClick={() => {
                                     this.props.follow(u.id)
                                 }}>Follow</button>}
                        </div>
                        </span>

                        <span>
                            <span>
                                <div>{u.name}</div>
                                <div>{u.status}</div>
                            </span>
                        </span>
                    </div>
                )
            }
        </div>
    }
}

export default Users;
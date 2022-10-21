import React from "react";
import s from './Users.module.css';
import axios from "axios";
import userNoPhoto from '../../assets/images/user.png';

class Users extends React.Component {
    constructor(props) {
        super(props);

        axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
            this.props.setUsers(response.data.items);
        });
    }

    render() {
        return <div>
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
                            <span>
                                <div>"u.location.country"</div>
                                <div>"u.location.city"</div>
                            </span>
                        </span>
                    </div>
                )
            }
        </div>
    }
}

export default Users;
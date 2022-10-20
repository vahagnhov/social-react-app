import React from "react";
import s from './Users.module.css';

let Users = (props) => {

    if(props.users.length === 0){
        props.setUsers([ {
            id: 1,
            fullName: 'Vahagn H.',
            location: {country: 'Armenia', city: 'Erevan'},
            status: 'I like football',
            followed: true,
            photoUrl: 'https://www.clipartmax.com/png/small/248-2487966_matthew-man-avatar-icon-png.png'
        },
            {
                id: 2,
                fullName: 'Ani k.',
                location: {country: 'England', city: 'London'},
                status: 'I am looking for a job',
                followed: false,
                photoUrl: 'https://listimg.pinclipart.com/picdir/s/335-3356471_female-avatar-girls-avatar-clipart.png'
            },
            {
                id: 3,
                fullName: 'Vardan H.',
                location: {country: 'Belarus', city: 'Minsk'},
                status: 'I am free and can help',
                followed: false,
                photoUrl: 'https://www.clipartmax.com/png/small/248-2487966_matthew-man-avatar-icon-png.png'
            },
            {
                id: 4,
                fullName: 'Sveta N.',
                location: {country: 'Ukraine', city: 'Kiev'},
                status: 'I am so pretty',
                followed: true,
                photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTWdr4oEstNFlSHxIyfDvcOaPY52x81H3N5QwSZo8pnPLV7vV3lahuIC3vBdCMWA2CbAo&usqp=CAU'
            },
            {
                id: 5,
                fullName: 'Narine G.',
                location: {country: 'Armenia', city: 'Vandazor'},
                status: 'I like play tennis',
                false: false,
                photoUrl: 'https://img.lovepik.com/element/40145/0996.png_300.png'
            },
            {
                id: 6,
                fullName: 'Arman L.',
                location: {country: 'USA', city: 'Philadelphia'},
                status: 'I like golf',
                followed: true,
                photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxa1JLDaWAt2sl4MiJCTKkPNxlklH_qLnkhYvrh_0MHXXdWRiqC_7_c2BLEd_uYfoDgfA&usqp=CAU'
            }
        ] );
    }

    return (
        <div>
            {
                props.users.map(u =>
                    <div key={u.id}>
                        <span>
                             <div>
                                 <img alt='User Icon' src={u.photoUrl} className={s.userPhoto}/>
                              </div>
                        <div>
                             {u.followed
                                 ? <button onClick={() => {props.unFollow(u.id)}}>UnFollow</button>
                                 : <button onClick={() => {props.follow(u.id)}}>Follow</button> }
                        </div>
                        </span>

                        <span>
                            <span>
                                <div>{u.fullName}</div>
                                <div>{u.status}</div>
                            </span>
                            <span>
                                <div> {u.location.country}</div>
                                <div>{u.location.city}</div>
                            </span>
                        </span>
                    </div>
                )
            }
        </div>
    );
}

export default Users;
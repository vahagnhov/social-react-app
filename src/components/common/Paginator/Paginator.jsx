import React from "react";
import s from './Paginator.module.css';

const Paginator = (props) => {
    let pageCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }

    return (
        <div>
            <div><span>{props.totalUsersCount}</span></div>
            {pages.slice(0, 10).map(p => {
                return (
                    <span key={p}
                          className={`${s.paginationElement} ${props.currentPage === p ? s.selectedPage : ''}`}
                          onClick={(e) => {
                              props.onPageChange(p)
                          }}>
                            {p}
                        </span>);
            })
            }
            <span> ...  </span>
            {pages.slice(-10).map(p => {
                return (
                    <span key={p}
                          className={`${s.paginationElement} ${props.currentPage === p ? s.selectedPage : ''}`}
                          onClick={(e) => {
                              props.onPageChange(p)
                          }}>
                            {p}
                        </span>);
            })
            }
        </div>
    );
}

export default Paginator;
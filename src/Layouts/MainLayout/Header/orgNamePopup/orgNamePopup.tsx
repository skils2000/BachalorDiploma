import React, {useEffect, useRef, useState} from 'react';
import classes from "./orgNamePopup.module.scss";
import classNames from "classnames";
import {Link} from "react-router-dom";
import useOutsideClick from "../../../../app/hooks/useOutsideClick";
import './restyle.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBook, faSignOutAlt, faUser} from "@fortawesome/free-solid-svg-icons"
import {useAppDispatch, useAppSelector} from "../../../../app/hooks/hooks";
import {fetchUser} from "../../../../app/reducers/userSlice";
import {fetchCompany} from "../../../../app/reducers/companySlice";

const OrgNamePopup: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null!)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchUser(5))
    }, [])

    const [active, setActive] = useState<boolean>(false)
    const company = useAppSelector(state => state.company)
    const user = useAppSelector(state => state.user)


    useEffect(() => {
        if(user.user.idCompany)
            dispatch(fetchCompany(user.user.idCompany))
    }, [user.user.idCompany])

    useOutsideClick(ref, () => {
        setActive(false)
    })

    return (
        <div ref={ref} className={classes.orgNamePopupWrap}>
            <div onClick={() => setActive(!active)}
                 className={classNames(classes.orgNamePopup, {[classes.active]: active})}>
                <span className={classes.orgNameText}>{!company.company.companyName || company.isLoading ? 'Loading...' : company.company.companyName}</span>
            </div>
            <div style={{color: 'inherit'}}
                 className={classNames('dropdown-menu dropdown-menu-right shadow animated--grow-in', {show: active})}>
                <Link to={'/#tariffs'} onClick={() => setActive(false)} className="dropdown-item">
                    <FontAwesomeIcon style={{color: '#d1d3e2', marginRight: '0.75rem'}} icon={faBook}/>
                    <span>Тарифы</span>
                </Link>
                <div className="dropdown-divider"></div>
                <Link to={'/settings'} onClick={() => setActive(false)} className="dropdown-item">
                    <FontAwesomeIcon style={{color: '#d1d3e2', marginRight: '0.75rem'}} icon={faUser}/>
                    <span>{user.user.email}</span>
                </Link>
                <Link to={'#'} onClick={() => setActive(false)} className="dropdown-item">
                    <FontAwesomeIcon style={{color: '#d1d3e2', marginRight: '0.75rem'}} icon={faSignOutAlt}/>
                    <span>Выйти</span>
                </Link>
            </div>
        </div>
    )
}

export default OrgNamePopup;
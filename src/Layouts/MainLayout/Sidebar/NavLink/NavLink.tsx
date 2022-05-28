import React from 'react';
import classes from "./NavLink.module.scss";
import {Link} from "react-router-dom";
import {NavLinkInterface} from "./NavLinkInterface";
import classNames from "classnames";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface NavLinkProps extends NavLinkInterface {
    link: string
}


const NavLink: React.FC<NavLinkProps> = ({text, path, icon, link}) => {
    const active = link === path && link !== '/settings'

    return (
        <li className={classNames(classes.navItem, {[classes.active]: active})}>
            <Link to={path}>
                {icon ?
                    <>
                        <FontAwesomeIcon icon={icon}/>
                        <span style={{marginLeft: '0.5rem'}}>{text}</span>
                    </>
                    : <span>{text}</span>}
            </Link>
        </li>
    );
};

export default NavLink;
import React, {useEffect, useState} from 'react';
import {Collapse} from 'react-bootstrap';
import NavLinkClasses from "../NavLink/NavLink.module.scss";
import classes from "./SidebarCollapse.module.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBook, faAngleRight, faAngleDown} from '@fortawesome/free-solid-svg-icons';
import SidebarCollapseItem from "./SidebarCollapseItem/SidebarCollapseItem";
import {SidebarCollapseItemInterface} from "./SidebarCollapseItem/SidebarCollapseItemInterface";
import classNames from "classnames";

interface SidebarCollapseProps {
    link: string
}

const SidebarCollapse:React.FC<SidebarCollapseProps> = ({link}) => {
    const [open, setOpen] = useState<boolean>(false);

    const navs: Array<SidebarCollapseItemInterface> = [
        {text: 'Поля', path: '/fields'},
        //{text: 'Наименование работ', path: '/work-kinds'},
        //{text: 'Типы работ', path: '/work-types'},
        //{text: 'Единицы измерения', path: '/units'},
    ]

    const active = !!(navs.find(obj => obj.path === link))

    useEffect(()=> {
        if(active) setOpen(true)
    }, [])

    return (
        <>
            <li className={classNames(NavLinkClasses.navItem,{[classes.active]: active})}
                onClick={() => setOpen(!open)}
            >
                <button className={classes.collapseOpenButton}>
                    <div>
                        <FontAwesomeIcon icon={faBook}/>
                        <span style={{marginLeft: '0.5rem'}}>Справочники</span>
                    </div>
                    <div style={{fontSize: "1rem", padding: "0 .25rem"}}>
                        {open ?
                            <FontAwesomeIcon icon={faAngleDown}/>
                            :
                            <FontAwesomeIcon icon={faAngleRight}/>
                        }
                    </div>
                </button>
            </li>
            <Collapse in={open} timeout={150}>
                <div className={classes.collapse}>
                    <div className={classes.collapseInner}>
                        {navs.map((item, i) => <SidebarCollapseItem key={i} text={item.text} path={item.path} link={link} />)}
                    </div>
                </div>
            </Collapse>
        </>
    );
};

export default SidebarCollapse;
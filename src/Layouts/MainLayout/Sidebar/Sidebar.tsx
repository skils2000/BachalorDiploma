import React from 'react';
import classes from "./Sidebar.module.scss";
import {Link} from "react-router-dom";
import GazonLogo from "../images/logoGazon.png";
import NavLink from "./NavLink/NavLink";
import {NavLinkInterface} from "./NavLink/NavLinkInterface";
import SidebarDivider from "./SidebarDivider/SidebarDivider";
import SidebarCollapse from "./SidebarCollapse/SidebarCollapse";
import {
    faAddressBook,
    faBookOpen,
    faChartLine,
    faClipboardList, faCog,
    faHammer,
    faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';

interface SidebarProps {
    link: string
}

const Sidebar: React.FC<SidebarProps> = ({link}) => {
    const NavItems: Array<NavLinkInterface> = [
        {text: 'План', path: '/', icon: faClipboardList},
        //{text: 'Факт', path: '/fact-works', icon: faHammer},
        //{text: 'Аналитика', path: '/analytics', icon: faChartLine},
        //{text: 'Журнал работ', path: '/journal', icon: faBookOpen},
        //{text: 'Паспорт объекта', path: '/fields/passport', icon: faAddressBook},
        {text: 'Состояние газона', path: '/gtf', icon: faBookOpen}
    ]

    const SettingsItems: Array<NavLinkInterface> = [
        {text: 'Настройки', path: '/settings', icon: faCog},
        {text: 'Выйти', path: '#', icon: faSignOutAlt}
    ]

    return (
        <div className={classes.sidebar}>
            <Link className={classes.sidebarBrand} to="/">
                <img src={GazonLogo} alt="Gazon logo" style={{maxHeight: '100%'}}/>
            </Link>
            <SidebarDivider/>
            <ul className={classes.navbar}>
                {NavItems.map((item, i) => <NavLink link={link} key={i} text={item.text} path={item.path}
                                                    icon={item.icon}/>)}
                <SidebarCollapse link={link} />
                <SidebarDivider/>
                <div className={classes.settingItems}>
                    {SettingsItems.map((item, i) => <NavLink link={link} key={i} text={item.text} path={item.path}
                                                             icon={item.icon}/>)}
                </div>
                <SidebarDivider/>
            </ul>
        </div>
    );
};

export default Sidebar;
import React from 'react';
import {Link} from "react-router-dom";
import classes from "./SidebarCollapseItem.module.scss";
import {SidebarCollapseItemInterface} from "./SidebarCollapseItemInterface";
import classNames from "classnames";

interface SidebarCollapseItemProps extends SidebarCollapseItemInterface {
    link: string
}

const SidebarCollapseItem:React.FC<SidebarCollapseItemProps> = ({text, path, link}) => {
    const active = path === link
    return (
        <Link className={classNames(classes.collapseItem, {[classes.active]: active})} to={path}>{text}</Link>
    );
};

export default SidebarCollapseItem;
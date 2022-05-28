import React from 'react';
import classNames from "classnames";
import classes from "./SidebarDivider.module.scss";

const SidebarDivider = () => {
    return (
        <hr className={classNames(classes.sidebarDivider, 'my-0')}/>
    );
};

export default SidebarDivider;
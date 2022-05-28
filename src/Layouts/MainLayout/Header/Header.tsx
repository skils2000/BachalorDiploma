import React from 'react';
import classes from "./Header.module.scss";
import OrgNamePopup from "./orgNamePopup/orgNamePopup";

const Header = () => {

    return (
        <div className={classes.header}>
            <nav className={classes.topbarNavWrap}>
                <button className={classes.langButton}>En</button>
                <div className={classes.topbarDivider}></div>
                <OrgNamePopup />
            </nav>
        </div>
    );
};

export default Header;
import React, {ReactChild, ReactChildren, useEffect} from 'react';
import classes from './MainLayout.module.scss'
import Header from './Header/Header';
import Sidebar from "./Sidebar/Sidebar";

interface MainLayoutProps {
    children: ReactChild | ReactChildren
    link: string
}

const MainLayout: React.FC<MainLayoutProps> = ({children, link}) => {
    return (
        <div className={classes.mainLayoutWrap}>
            <Sidebar link={link} />
            <div className={classes.contentWrap}>
                <Header />
                <div className={classes.mainContent}>{children}</div>
            </div>
        </div>
    );
};

export default MainLayout;
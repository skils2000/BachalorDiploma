import React from 'react';
import MainHeaderDropdown from "./MainHeaderDropdown/MainHeaderDropdown";

interface MainHeaderProps {
    title: string
}

const MainHeader: React.FC<MainHeaderProps> = ({title}) => {
    return (
        <div className="row">
            <div className="col">
                <div className="card shadow mb-4">
                    <div className="card-body">
                        <div style={{textAlign: "left"}}>
                            <span className="mx-2 my-2 my-lg-0 font-weight-bold text-center">{title}</span>
                            <MainHeaderDropdown/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainHeader;
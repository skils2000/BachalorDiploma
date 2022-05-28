import React from 'react';
import classes from './ButtonGreenHover.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";



interface ButtonGreenHoverProps {
    value: string
    specificColour?: string
    icon?: any
    onClick?: () => void
}

const ButtonGreenHover:React.FC<ButtonGreenHoverProps> = ({value, specificColour, icon, onClick}) => {
    return (
        <button onClick={onClick} style={{backgroundColor: specificColour}} className={classes.button}>
            {icon && <FontAwesomeIcon icon={icon}/>}
            {value}
        </button>
    );
};

export default ButtonGreenHover;
import React from "react";
import burgerLogo from '../../assets/images/original.png';
import classes from './Logo.module.scss';

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt=""/>
    </div>
);

export default logo;
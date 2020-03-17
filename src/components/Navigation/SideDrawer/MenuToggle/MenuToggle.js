import React from "react";
import classes from './MenuToggle.module.scss';

const menu = (props) => (
    <div onClick={props.clicked} className={classes.MenuContainer}>
        <div className={classes.Hamburger}></div>
    </div>
);

export default menu;
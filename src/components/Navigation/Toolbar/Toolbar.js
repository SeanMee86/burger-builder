import React from "react";
import classes from "./Toolbar.module.scss";
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems'
import MenuToggle from '../SideDrawer/MenuToggle/MenuToggle'

const Toolbar  = (props) => (
    <header className={classes.Toolbar}>
        <MenuToggle clicked={props.openSideDrawer}/>
        <div className={classes.Logo}>
            <Logo/>
        </div>
        <nav className={classes.DeskTopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default Toolbar;
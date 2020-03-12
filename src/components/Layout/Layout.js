import React from "react";
import Aux from "../../hoc/Auxiliary";
import layoutStyles from './layout.module.scss';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const layout = (props) => (
    <Aux>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <Toolbar/>
        <main className={layoutStyles.Content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;
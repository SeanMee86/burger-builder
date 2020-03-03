import React from "react";
import Aux from "../../hoc/Auxiliary";
import layoutStyles from './layout.module.scss';

const layout = (props) => (
    <Aux>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className={layoutStyles.Content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;
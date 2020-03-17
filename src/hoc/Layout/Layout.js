import React, {useState} from "react";
import Aux from "../Auxiliary/Auxiliary";
import layoutStyles from './layout.module.scss';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = (props) => {

        const [showSideDrawer, setShowSideDrawer] = useState(false);

        const sideDrawerClosedHandler = () => {
            setShowSideDrawer(false);
        };

        const sideDrawerOpenHandler = () => {
            setShowSideDrawer((prevState) => {
                return !prevState
            });
        };

        return (
            <Aux>
                    <Toolbar openSideDrawer={sideDrawerOpenHandler}/>
                    <SideDrawer open={showSideDrawer} closed={sideDrawerClosedHandler}/>
                    <main className={layoutStyles.Content}>
                            {props.children}
                    </main>
            </Aux>
        );
};

export default Layout;
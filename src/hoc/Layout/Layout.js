import React, {useState} from "react";
import { connect } from 'react-redux';
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
                    <Toolbar
                        isAuth={props.isAuthenticated}
                        openSideDrawer={sideDrawerOpenHandler}/>
                    <SideDrawer
                        isAuth={props.isAuthenticated}
                        open={showSideDrawer}
                        closed={sideDrawerClosedHandler}/>
                    <main className={layoutStyles.Content}>
                            {props.children}
                    </main>
            </Aux>
        );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.token !== null
});

export default connect(mapStateToProps)(Layout);
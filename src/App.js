import React, { useEffect, Suspense } from 'react';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';

import Logout from "./containers/Auth/Logout/Logout";
import { connect } from 'react-redux';
import { authCheckState } from "./store/actions";

const Checkout = React.lazy(() => {
    return import('./containers/Checkout/Checkout');
});

const Orders = React.lazy(() => {
    return import('./containers/Orders/Orders');
});

const Auth = React.lazy(() => {
    return import('./containers/Auth/Auth');
});

const App = (props) => {

    const { authCheckState } = props

    useEffect(() => {
        authCheckState();
    }, [authCheckState])

    let routes = (
        <Switch>
            <Route path={'/auth'} render={() => <Auth/>}/>
            <Route path={'/'} component={BurgerBuilder}/>
            <Redirect to={'/'}/>
        </Switch>
    );

    if(props.isAuthenticated){
        routes = (
            <Switch>
                <Route path={'/checkout'} render={(props) => <Checkout {...props}/>}/>
                <Route path={'/orders'} render={(props) => <Orders {...props}/>}/>
                <Route path={'/logout'} component={Logout}/>
                <Route path={'/auth'} render={(props) => <Auth {...props}/>}/>
                <Route path={'/'} component={BurgerBuilder}/>
                <Redirect to={'/'}/>
            </Switch>
        )
    }

    return (
        <div>
          <Layout>
              <Suspense fallback={<p>Loading...</p>}>
              {routes}
              </Suspense>
          </Layout>
        </div>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.token !== null
});

export default withRouter(connect(mapStateToProps, {authCheckState})(App));

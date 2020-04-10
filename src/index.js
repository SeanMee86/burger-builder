import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom";
import burgerBuildReducer from './store/reducers/burgerBuildReducer';
import orderReducer from "./store/reducers/orderReducer";
import authReducer from "./store/reducers/auth";

const rootReducer = combineReducers({
    burgerBuilder: burgerBuildReducer,
    order: orderReducer,
    auth: authReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk),
    )
);

const app = (
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

ReactDOM.render(<Provider store={store}>{app}</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

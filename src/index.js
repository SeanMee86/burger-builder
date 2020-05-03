import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import {Provider} from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom";
import burgerBuildReducer from './store/reducers/burgerBuildReducer';
import orderReducer from "./store/reducers/orderReducer";
import authReducer from "./store/reducers/auth";
import { watchAuth, watchBurgerBuilder, watchOrder } from "./store/sagas";

const rootReducer = combineReducers({
    burgerBuilder: burgerBuildReducer,
    order: orderReducer,
    auth: authReducer
});

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(sagaMiddleware),
    )
);

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchBurgerBuilder);
sagaMiddleware.run(watchOrder)

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

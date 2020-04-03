import {
    FETCH_ORDERS_FAIL,
    FETCH_ORDERS_START,
    FETCH_ORDERS_SUCCESS,
    PURCHASE_BURGER_FAIL,
    PURCHASE_BURGER_INIT,
    PURCHASE_BURGER_SUCCESS
} from "../actions/types";

import {updateObject} from "../util";

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const purchaseInit = (state) => {
    return updateObject(state, {purchased: false});
};

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, {
        id: action.orderId
    });
    return updateObject(state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
    });
};

const purchaseBurgerFail = (state) => {
    return updateObject(state, {loading: false});
};

const fetchOrdersStart = (state) => {
    return updateObject(state, {loading: true});
};

const fetchOrdersSuccess = (state, action) => {
    return updateObject(state, {
        orders: action.payload,
        loading: false
    });
};

const fetchOrdersFail = (state) => {
    return updateObject(state, {loading: false});
};

const orderReducer = (state = initialState, action) => {
    switch(action.type){
        case PURCHASE_BURGER_INIT: return purchaseInit(state);
        case PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
        case PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state);
        case FETCH_ORDERS_START: return fetchOrdersStart(state);
        case FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);
        case FETCH_ORDERS_FAIL: return fetchOrdersFail(state);
        default: return state
    }
};

export default orderReducer;
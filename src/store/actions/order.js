import {
    FETCH_ORDERS_FAIL, FETCH_ORDERS_START,
    FETCH_ORDERS_SUCCESS,
    PURCHASE_BURGER_FAIL,
    PURCHASE_BURGER_INIT,
    PURCHASE_BURGER_START,
    PURCHASE_BURGER_SUCCESS
} from "./types";
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData
    }
};

export const purchaseBurgerFail = (err) => {
    return {
        type: PURCHASE_BURGER_FAIL,
        err
    }
};

export const purchaseBurgerStart = () => {
    return {
        type: PURCHASE_BURGER_START
    }
};

export const purchaseBurger = (orderData) => dispatch => {
    dispatch(purchaseBurgerStart());
    axios.post('/orders.json', orderData)
        .then(res => {
            dispatch(purchaseBurgerSuccess(res.data.name, orderData))
        })
        .catch (err => {
            dispatch(purchaseBurgerFail(err))
        })
};

export const purchaseInit = () => {
    return {
        type: PURCHASE_BURGER_INIT
    }
};

export const fetchOrdersSuccess = (orders) => {
    return {
        type: FETCH_ORDERS_SUCCESS,
        payload: orders
    }
};

export const fetchOrdersFail = (err) => {
    return {
        type: FETCH_ORDERS_FAIL,
        error: err
    }
};

export const fetchOrdersStart = () => {
    return {
        type: FETCH_ORDERS_START
    }
};

export const fetchOrders = () => dispatch => {
    dispatch(fetchOrdersStart());
    axios.get('/orders.json')
        .then(res => {
            const fetchedOrders = [];
            for (let key in res.data){
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                });
            }
            dispatch(fetchOrdersSuccess(fetchedOrders))
        }).catch(err => {
        dispatch(fetchOrdersFail(err));
    })
};
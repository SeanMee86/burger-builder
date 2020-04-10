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

export const purchaseBurger = (orderData, token) => dispatch => {
    dispatch(purchaseBurgerStart());
    axios.post(`/orders.json?auth=${token}`, orderData)
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

export const fetchOrders = (token, userId) => dispatch => {
    dispatch(fetchOrdersStart());
    const queryParams = '?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"';
    axios.get(`/orders.json${queryParams}`)
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
import {
    FETCH_ORDERS,
    FETCH_ORDERS_FAIL, FETCH_ORDERS_START,
    FETCH_ORDERS_SUCCESS, PURCHASE_BURGER,
    PURCHASE_BURGER_FAIL,
    PURCHASE_BURGER_INIT,
    PURCHASE_BURGER_START,
    PURCHASE_BURGER_SUCCESS
} from "./types";

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

export const purchaseBurger = (orderData, token) => {
    return {
        type: PURCHASE_BURGER,
        token,
        orderData
    }
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

export const fetchOrders = (token, userId) => {
    return {
        type: FETCH_ORDERS,
        token,
        userId
    }
};
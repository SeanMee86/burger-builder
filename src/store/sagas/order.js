import { put } from 'redux-saga/effects';
import axios from "../../axios-orders";
import {
    fetchOrdersFail,
    fetchOrdersStart,
    fetchOrdersSuccess,
    purchaseBurgerFail,
    purchaseBurgerStart,
    purchaseBurgerSuccess
} from "../actions/order";

export function* purchaseBurgerSaga(action) {
    yield put(purchaseBurgerStart());
    try {
        const res = yield axios.post(`/orders.json?auth=${action.token}`, action.orderData)
        yield put(purchaseBurgerSuccess(res.data.name, action.orderData))
    }catch(err) {
        yield put(purchaseBurgerFail(err))
    }
}

export function* fetchOrdersSaga(action) {
    yield put(fetchOrdersStart());
    const queryParams = yield '?auth='+action.token+'&orderBy="userId"&equalTo="'+action.userId+'"';
    try {
        const res = yield axios.get(`/orders.json${queryParams}`)
        const fetchedOrders = [];
        for (let key in res.data) {
            fetchedOrders.push({
                ...res.data[key],
                id: key
            });
        }
        yield put(fetchOrdersSuccess(fetchedOrders))
    }catch(err) {
        yield put(fetchOrdersFail(err));
    }
}
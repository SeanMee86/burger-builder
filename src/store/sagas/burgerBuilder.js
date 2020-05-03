import { put } from 'redux-saga/effects'
import axios from "../../axios-orders";
import {fetchIngredientsFailed, setIngredients} from '../actions/burgerBuilder'

export function* initIngredientsSaga(action) {
    try {
        const res = yield axios.get('/ingredients.json')
        yield put(setIngredients(res.data));
    }catch(err) {
        yield put(fetchIngredientsFailed())
    }
}
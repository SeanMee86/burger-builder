import {combineReducers} from "redux";
import ingReducer from './reducers/ingReducer'
import priceReducer from "./reducers/priceReducer";

export default combineReducers({
    ingredients: ingReducer,
    price: priceReducer
})
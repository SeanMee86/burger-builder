import {
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    GET_INGREDIENTS,
    GET_INGREDIENTS_FAILED
} from "./types";
import axios from '../../axios-orders';

const setIngredients = (ingredients) => ({
    type: GET_INGREDIENTS,
    payload: ingredients
});

export const getIngredients = () => dispatch => {
    axios.get('/ingredients.json')
        .then(res => {
            dispatch(setIngredients(res.data));
        }).catch(err => {
            dispatch({
                type: GET_INGREDIENTS_FAILED
            })
    })
};

export const addIngredient = name => {
    return {
        type: ADD_INGREDIENT,
        ingredientName: name
    }
};

export const removeIngredient = name => {
    return {
        type: REMOVE_INGREDIENT,
        ingredientName: name
    }
};
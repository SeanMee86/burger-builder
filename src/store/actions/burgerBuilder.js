import {
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    GET_INGREDIENTS,
    GET_INGREDIENTS_FAILED, INIT_INGREDIENTS
} from "./types";

export const setIngredients = (ingredients) => ({
    type: GET_INGREDIENTS,
    payload: ingredients
});

export const getIngredients = () => {
    return {
        type: INIT_INGREDIENTS
    }
};

export const fetchIngredientsFailed = () => ({
    type: GET_INGREDIENTS_FAILED
})

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
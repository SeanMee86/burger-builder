import {
    ADD_INGREDIENT,
    GET_INGREDIENTS,
    REMOVE_INGREDIENT,
    GET_INGREDIENTS_FAILED
} from "../actions/types";

import {updateObject} from "../util";

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.8
};

const addIngredient = (state, action) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName]+1 }
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    };
    return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
    const updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName]-1 };
    const updatedIngs = updateObject(state.ingredients, updatedIng);
    const updatedSt = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    };
    return updateObject(state, updatedSt);
};

const getIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: {
            salad: action.payload.salad,
            bacon: action.payload.bacon,
            cheese: action.payload.cheese,
            meat: action.payload.meat
        },
        totalPrice: 4,
        error: false
    });
};

const getIngredientsFailed = (state,action) => {
    return updateObject(state, {error: true});
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case GET_INGREDIENTS: return getIngredients(state, action);
        case GET_INGREDIENTS_FAILED: return getIngredientsFailed(state, action);
        case ADD_INGREDIENT: return addIngredient(state, action);
        case REMOVE_INGREDIENT: return removeIngredient(state, action);
        default: return state;
    }
};

export default reducer;
import {ADD_INGREDIENT, GET_INGREDIENTS, REMOVE_INGREDIENT} from "../actions";

const initialState = {
    ingredients: {}
};

const ingReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    ...action.payload
                }
            };
        case ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    ...action.payload
                }
            };
        case REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    ...action.payload
                }
            };
        default:
            return state;
    }
};

export default ingReducer
import React, {useState, useEffect, Fragment } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import Aux from '../../hoc/Auxiliary/Auxiliary'
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls"
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {
    addIngredient,
    getIngredients,
    removeIngredient,
    purchaseInit,
    setAuthRedirectPath
} from "../../store/actions/";

const BurgerBuilder = props => {

    const [purchasing, setPurchasing] = useState(false);
    const [loading] = useState(false);

    const {getIngredients} = props;

    useEffect(() => {
        getIngredients();
    }, [getIngredients])

    const {ingredients, totalPrice, error, isAuthenticated} = useSelector(state => {
        return {
            ingredients: state.burgerBuilder.ingredients,
            totalPrice: state.burgerBuilder.totalPrice,
            error: state.order.error,
            isAuthenticated: state.auth.token !==null
        }
    })


    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => ingredients[igKey])
            .reduce((sum, el) => {return sum + el}, 0);
        return sum > 0;
    };

    const purchaseHandler = () => {
        if(isAuthenticated) {
            setPurchasing(true);
        }else{
            props.setAuthRedirectPath('/checkout');
            props.history.push('/auth')
        }
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    };

    const purchaseContinueHandler = () => {
        props.purchaseInit();
        props.history.push({
            pathname: '/checkout',
        });
    };

    const disabledInfo = {
        ...ingredients
    };
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = error ? <p>Ingredients Can't Be Loaded</p> : <Spinner/>;
    if(ingredients !== null) {
        burger =
            <Fragment>
                <Burger ingredients={ingredients}/>
                <BuildControls
                    ingredientAdded={props.addIngredient}
                    ingredientRemoved={props.removeIngredient}
                    disabled={disabledInfo}
                    price={totalPrice}
                    purchasable={updatePurchaseState(ingredients)}
                    ordered={purchaseHandler}
                    isAuth={isAuthenticated}
                />
            </Fragment>
        orderSummary =
            <OrderSummary
            price={totalPrice}
            purchaseCancelled={purchaseCancelHandler}
            purchaseContinued={purchaseContinueHandler}
            ingredients={ingredients}/>;
    }
    if(loading) {
        orderSummary = <Spinner/>;
    }
    return (
        <Aux>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    )

}

// const mapStateToProps = state => ({
//     ingredients: state.burgerBuilder.ingredients,
//     totalPrice: state.burgerBuilder.totalPrice,
//     error: state.order.error,
//     isAuthenticated: state.auth.token !==null
// });

export default connect(
    null,
    {
        addIngredient,
        removeIngredient,
        getIngredients,
        purchaseInit,
        setAuthRedirectPath
    }
)(withErrorHandler(BurgerBuilder, axios));
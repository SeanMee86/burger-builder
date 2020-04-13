import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
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

export class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        this.props.getIngredients();
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => ingredients[igKey])
            .reduce((sum, el) => {return sum + el}, 0);
        return sum > 0;
    };

    addIngredientHandler = (type) => {
        // const oldCount = this.state.ingredients[type];
        // const updatedCount = oldCount + 1;
        // const updatedIngredients = {
        //     ...this.state.ingredients
        // };
        // updatedIngredients[type] = updatedCount;
        // const priceAddition = INGREDIENT_PRICES[type];
        // const oldPrice = this.state.totalPrice;
        // const newPrice = oldPrice + priceAddition;
        // this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
        // this.updatePurchaseState(updatedIngredients)
    };

    removeIngredientHandler = (type) => {
        // const oldCount = this.state.ingredients[type];
        //         // if(oldCount <= 0){
        //         //     return;
        //         // }
        //         // const updatedCount = oldCount - 1;
        //         // const updatedIngredients = {
        //         //     ...this.state.ingredients
        //         // };
        //         // updatedIngredients[type] = updatedCount;
        //         // const priceAddition = INGREDIENT_PRICES[type];
        //         // const oldPrice = this.state.totalPrice;
        //         // const newPrice = oldPrice - priceAddition;
        //         // this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
        //         // this.updatePurchaseState(updatedIngredients)
    };

    purchaseHandler () {
        if(this.props.isAuthenticated) {
            this.setState({purchasing: true});
        }else{
            this.props.setAuthRedirectPath('/checkout');
            this.props.history.push('/auth')
        }
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    };

    purchaseContinueHandler = () => {
        // alert('You Continued');
        // const {salad, meat, cheese, bacon} = this.state.ingredients;
        // const queryParams = [];
        // for (let i in this.props.ingredients){
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ingredients[i]));
        // }
        // queryParams.push('price='+this.props.totalPrice);
        // const queryString = queryParams.join('&');
        this.props.purchaseInit();
        this.props.history.push({
            pathname: '/checkout',
            // search: `?salad=${salad}&meat=${meat}&cheese=${cheese}&bacon=${bacon}`
            // search: `?${queryString}`
        });
    };

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients Can't Be Loaded</p> : <Spinner/>;
        if(this.props.ingredients !== null) {
            burger =
                <Fragment>
                    <Burger ingredients={this.props.ingredients}/>
                    <BuildControls
                        ingredientAdded={this.props.addIngredient}
                        ingredientRemoved={this.props.removeIngredient}
                        disabled={disabledInfo}
                        price={this.props.totalPrice}
                        purchasable={this.updatePurchaseState(this.props.ingredients)}
                        ordered={this.purchaseHandler.bind(this)}
                        isAuth={this.props.isAuthenticated}
                    />
                </Fragment>
            orderSummary =
                <OrderSummary
                price={this.props.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                ingredients={this.props.ingredients}/>;
        }
        if(this.state.loading) {
            orderSummary = <Spinner/>;
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = state => ({
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.order.error,
    isAuthenticated: state.auth.token !==null
});

// const mapDispatchToProps = dispatch => ({
//     onAddIngredient: (ingName) => dispatch(addIngredient(ingName)),
//     onRemoveIngredient: (ingName) => dispatch(removeIngredient(ingName)),
//     onGetIngredients: () => dispatch(getIngredients())
// });

export default connect(
    mapStateToProps,
    {
        addIngredient,
        removeIngredient,
        getIngredients,
        purchaseInit,
        setAuthRedirectPath
    }
)(withErrorHandler(BurgerBuilder, axios));
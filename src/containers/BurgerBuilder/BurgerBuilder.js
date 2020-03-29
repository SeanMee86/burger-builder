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
import {ADD_INGREDIENT, REMOVE_INGREDIENT} from "../../store/actions";

class BurgerBuilder extends Component {

    // constructor(props) {
    //     super(props)
    //     this.state = {...}
    // }

    state = {
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        // axios.get('/ingredients.json')
        //     .then(res => {
        //         this.setState({ingredients: res.data})
        //     }).catch(err => {
        //         this.setState({error: true});
        // })
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
        this.setState({purchasing: true});
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
        let burger = this.state.error ? <p>Ingredients Can't Be Loaded</p> : <Spinner/>;
        if(this.props.ingredients !== null) {
            burger =
                <Fragment>
                    <Burger ingredients={this.props.ingredients}/>
                    <BuildControls
                        ingredientAdded={this.props.onAddIngredient}
                        ingredientRemoved={this.props.onRemoveIngredient}
                        disabled={disabledInfo}
                        price={this.props.totalPrice}
                        purchasable={this.updatePurchaseState(this.props.ingredients)}
                        ordered={this.purchaseHandler.bind(this)}
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
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
});

const mapDispatchToProps = dispatch => ({
    onAddIngredient: (ingName) => dispatch({type: ADD_INGREDIENT, ingredientName: ingName}),
    onRemoveIngredient: (ingName) => dispatch({type: REMOVE_INGREDIENT, ingredientName: ingName})
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
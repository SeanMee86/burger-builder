import React, {Component} from "react";
import {Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
    // state = {
    //     ingredients: null,
    //     price: 0
    // };

    componentWillMount() {
        // const ingredients = new URLSearchParams(this.props.location.search);
        // const query = new URLSearchParams(this.props.location.search);
        // let price;
        //
        // const ingredients = {};
        // for (let param of query.entries()){
        //     if(param[0] === 'price'){
        //         price = param[1];
        //     }else {
        //         ingredients[param[0]] = +param[1]
        //     }
        // }
        // this.setState({ingredients, price})
        // this.setState({
        //     ingredients: {
        //         salad: +ingredients.get('salad'),
        //         meat: +ingredients.get('meat'),
        //         cheese: +ingredients.get('cheese'),
        //         bacon: +ingredients.get('bacon')
        //     }
        // })
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    render(){
        let summary = <Redirect to={'/'}/>;
        if(this.props.ingredients){
            const purchasedRedirect = this.props.purchased ? <Redirect to={'/'}/> : null;
            summary =(
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                    ingredients={this.props.ingredients}/>
                    <Route
                        path={this.props.match.url + '/contact-data'}
                        component={ContactData}/>
                </div>
            )
        }
        return summary;
    }
}

const mapStateToProps = state => ({
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
});


export default connect(mapStateToProps)(Checkout);
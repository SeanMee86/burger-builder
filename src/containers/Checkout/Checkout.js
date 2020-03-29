import React, {Component} from "react";
import {Route} from 'react-router-dom';
import {connect} from "react-redux";
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from "./ContactData/ContactData";
import mapStateToProps from "react-redux/lib/connect/mapStateToProps";

class Checkout extends Component {
    state = {
        price: 0
    };

    componentWillMount() {
        // const ingredients = new URLSearchParams(this.props.location.search);
        const query = new URLSearchParams(this.props.location.search);
        let price;

        const ingredients = this.props.ingredients;
        for (let param of query.entries()){
            if(param[0] === 'price'){
                price = param[1];
            }
            // else {
            //     ingredients[param[0]] = +param[1]
            // }
        }
        this.setState({price})
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

        return(
            <div>
                <CheckoutSummary
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                    ingredients={this.props.ingredients}/>
                    <Route
                        path={this.props.match.url + '/contact-data'}
                        render={(props) => <ContactData price={this.state.price} ingredients={this.props.ingredients} {...props}/>}/>
            </div>
        )
    }
}

const mapStateToPropsCheckout = state => ({
    ingredients: state.ingredients.ingredients,
    price: state.price.price
});

export default connect(mapStateToPropsCheckout)(Checkout);
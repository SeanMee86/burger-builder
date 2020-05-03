import React  from "react";
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from "./ContactData/ContactData";

const Checkout = props => {
    // state = {
    //     ingredients: null,
    //     price: 0
    // };

    // componentWillMount() {
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
    // }

    const checkoutCancelledHandler = () => {
        props.history.goBack();
    };

    const checkoutContinuedHandler = () => {
        props.history.replace('/checkout/contact-data');
    };


    let summary = <Redirect to={'/'}/>;
    if(props.ingredients){
        const purchasedRedirect = props.purchased ? <Redirect to={'/'}/> : null;
        summary =(
            <div>
                {purchasedRedirect}
                <CheckoutSummary
                checkoutCancelled={checkoutCancelledHandler}
                checkoutContinued={checkoutContinuedHandler}
                ingredients={props.ingredients}/>
                <Route
                    path={props.match.url + '/contact-data'}
                    component={ContactData}/>
            </div>
        )
    }
    return summary;

}

const mapStateToProps = state => ({
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
});


export default connect(mapStateToProps)(Checkout);
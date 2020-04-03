import React, {Component, Fragment} from "react";
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {
    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log('[Order Summary] will update')
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map((igKey, i) => {
                return (
                    <li key={i}><span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}</li>
                )
            });

        return (
            <Fragment>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button clicked={this.props.purchaseCancelled} btnType={'Danger'}>CANCEL</Button>
                <Button clicked={this.props.purchaseContinued} btnType={'Success'}>CONTINUE</Button>
            </Fragment>
        )
    }
}

export default OrderSummary;
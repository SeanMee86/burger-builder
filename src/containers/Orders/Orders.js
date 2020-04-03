import React, {Component} from "react";

import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {fetchOrders} from "../../store/actions";
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner'


class Orders extends Component{

    componentDidMount() {
        this.props.fetchOrders();
    }

    render(){
        let orders = <Spinner/>;
        if(!this.props.loading){
            orders = this.props.orders.map(order => (
                    <Order
                        ingredients = {order.ingredients}
                        price = {order.price}
                        key={order.id} />
                ))
        }
        return(
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    orders: state.order.orders,
    loading: state.order.loading
});

export default connect(mapStateToProps, {fetchOrders})(withErrorHandler(Orders, axios));
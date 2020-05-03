import React, {useEffect} from "react";

import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {fetchOrders} from "../../store/actions";
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner'


const Orders = props => {

    const { fetchOrders, token, userId } = props;

    useEffect(() => {
        fetchOrders(token, userId);
    }, [fetchOrders, token, userId])

    let orders = <Spinner/>;
    if(!props.loading){
        orders = props.orders.map(order => (
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

const mapStateToProps = state => ({
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
});

export default connect(mapStateToProps, {fetchOrders})(withErrorHandler(Orders, axios));
import React, { Component } from "react";

import CheckoutSummary from "../../components/CheckoutSummary/CheckoutSummary";

class Checkout extends Component {
    state = {
        ingredients: null,
        totalPrice: 0
    }

    componentWillMount () {
        const query = new URLSearchParams( this.props.location.search );
        const ingredients = {};
        let price = 0;
        for ( let param of query.entries() ) {
            if (param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState( { ingredients: ingredients, totalPrice: price } );
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutOrderedHandler = () => {
        this.props.history.replace( '/' );
        alert('Done! Thank You For Your Order. Please Wait!'); 
    }

    render(){
        return(
            <div>
                <CheckoutSummary 
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                checkoutCancelled={this.checkoutCancelledHandler}
                checkoutOrdered={this.checkoutOrderedHandler}/>
            </div>
        );
    };
};

export default Checkout;
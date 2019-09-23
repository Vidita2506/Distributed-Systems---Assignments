import React from 'react';
import CartItem from './CartItem';
import cookie from 'react-cookies';
import axios from 'axios';
import { Redirect } from 'react-router';

export default class Cart extends React.Component {
    constructor() {
        super();
        this.state = {
            total: 0
        }
    }

    componentWillMount() {
        let cartStr = localStorage.getItem('cart');
        if (!cartStr) return;
        let cart = JSON.parse(cartStr);
        let total = 0;
        for (var i = 0; i < cart.length; i++) {
            total += cart[i].price * cart[i].quantity;
        }
        this.setState({
            total: total
        });
    }

    removeFromCart = (removeItem) => {
        let cart = JSON.parse(localStorage.getItem('cart'));
        cart = cart.filter((item) => item.id !== removeItem.id);
        localStorage.setItem('cart', JSON.stringify(cart));
        if (cart.length == 0) {
            localStorage.removeItem('cart_restid');
        }
        let total = this.state.total - (removeItem.quantity * removeItem.price)
        this.setState({
            total: total,
            msg: ''
        });
    }

    checkOut = () => {
        let buyer_email = localStorage.getItem('grubhub_user');
        let cart = JSON.parse(localStorage.getItem('cart'));
        if (cart == null || cart.length < 1) {
            return;
        }
        let restid = localStorage.getItem('cart_restid');
        let order = {
            "buyer_email": buyer_email,
            "cart": cart,
            "restid": restid,
            "total": this.state.total
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/checkout', order)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    this.setState({
                        msg: 'Order is placed'
                    })
                    localStorage.removeItem('cart');
                    localStorage.removeItem('cart_restid');
                } else {
                    this.setState({
                        msg: response.data
                    })
                }
            }).catch(error => {
                this.setState({
                    msg: 'Error occured. Please try again!'
                })
            })
    }

    clearCart = () => {
        localStorage.removeItem('cart');
        localStorage.removeItem('cart_restid');
        this.setState({ total: 0 });
    }

    render() {
        let redirectVar = null;
        if (!(cookie.load('cookie') === 'buyer')) {
            redirectVar = <Redirect to="/login" />
        }
        const total = this.state.total;
        let cart = JSON.parse(localStorage.getItem('cart'));
        if (cart) {
            cart = Array.from(cart);
        } else {
            cart = [];
        }
        return (
            <div className=" container">
                {redirectVar}
                <div className="orderplaced">{this.state.msg}</div>
                <table className="table">
                    <tbody>
                        <tr>
                            <td><b>Item Name</b></td>
                            <td><b>Price</b></td>
                            <td><b>Quantity</b></td>
                        </tr>
                        {
                            cart.map((cartItem, index) => <CartItem cartItem={cartItem} remove={this.removeFromCart} key={index} />)
                        }
                    </tbody>
                </table>            
                {cart.length ? <div><h4><small>Total Amount:</small><span className="float-right text-primary">${total}</span></h4><hr /></div> : ''}
                <button className="btn btn-success float-right" onClick={this.checkOut} style={{ marginRight: "10px" }}> Checkout</button>
                <button className="btn btn-danger float-right" onClick={this.clearCart} style={{ marginRight: "10px" }}>Clear Cart</button>
                <br /><br /><br />
            </div>
        );
    }
}

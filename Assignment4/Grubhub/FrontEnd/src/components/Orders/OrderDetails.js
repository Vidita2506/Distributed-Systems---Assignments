import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import cookie from 'react-cookies';

//Define a Login Component
class OrderDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderdetails: []
        }
    }

    componentWillMount() {
        const { orderId } = this.props.match.params
        const data = {
            orderId: orderId
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/orderdetails', data)
            .then((response) => {
                //update the state with the response data
                this.setState({
                    orderdetails: response.data
                });
            });
    }

    render() {
        let redirectVar = null;
        if (!(cookie.load('cookie'))) {
            redirectVar = <Redirect to="/login" />
        }
       
        const { orderId, status } = this.props.match.params;
        const username = localStorage.getItem('grubhub_user');

        let orderdetails = '';
        if (this.state.orderdetails.length > 0) {
            orderdetails = this.state.orderdetails.map(result => {
                return (
                    <tr key={result.name}>
                        <td>{result.name}</td>
                        <td>{result.quantity}</td>
                        <td>{result.price}</td>
                        <td>{parseInt(result.price * result.quantity)}</td>
                    </tr> 
                )
            })
        }
        return (
            <div className=" container">
                {redirectVar}
                <div className="container">
                    <h4>Order Details</h4>
                    <table className="table">
                        <tbody>
                            <tr>
                                <td><b>Item Name</b></td>
                                <td><b>Quantity</b></td>
                                <td><b>Price</b></td>
                                <td><b>Total Price</b></td>
                            </tr>
                            {orderdetails}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default OrderDetails;
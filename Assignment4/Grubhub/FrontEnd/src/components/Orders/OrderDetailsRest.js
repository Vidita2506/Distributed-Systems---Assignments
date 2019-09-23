import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import cookie from 'react-cookies';

//Define a Login Component
class OrderDetailsRest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg : '',
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

    handleUpdate = (e) => {
        e.preventDefault();
        const { orderId } = this.props.match.params;
        const data = {
            status: e.target.elements.status.value,
            order_id: orderId
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/updateorderstatus', data)
            .then((response) => {
                this.setState({
                    msg: 'Status updated succesfully'
                })
            });
    }

    render() {
        let redirectVar = null;
        if (!(cookie.load('cookie'))) {
            redirectVar = <Redirect to="/login" />
        }

        const { orderId, status } = this.props.match.params;

        let orderdetails = '';
        if (this.state.orderdetails.length > 0) {
            orderdetails = this.state.orderdetails.map(result => {
                return (
                    <tr key={result.name}>
                        <td>{result.name}</td>
                        <td>{result.quantity}</td>
                        <td>{result.price}</td>
                        <td>{parseInt(result.price * result.quantity, 10)}</td>
                    </tr>
                )
            })
        }
        return (
            <div className=" container">
                {redirectVar}
                <div className="container">
                    <div className="info">{this.state.msg}</div>
                    <form onSubmit={this.handleUpdate}>
                    <table className="table">
                        <tbody>
                            <tr>
                                <td><b>Order Id</b></td>
                                <td><b>Status</b></td>
                            </tr>
                            <tr>
                                <td>{orderId}</td>
                                <td><input size="35" type="text" name="status" defaultValue={status}></input></td>
                            </tr>
                            <tr>
                                <td><button className="btn btn-success" type="submit">Update Status</button></td>
                            </tr>                            
                            <tr>
                                <td><b>Item Name</b></td>
                                <td><b>Quantity</b></td>
                                <td><b>Price</b></td>
                                <td><b>Total Price</b></td>
                            </tr>
                            {orderdetails}
                        </tbody>
                    </table>
                    </form>
                </div>
            </div>
        );
    }
}

export default OrderDetailsRest;
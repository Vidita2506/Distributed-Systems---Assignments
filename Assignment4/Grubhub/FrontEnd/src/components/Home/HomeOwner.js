import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';

class HomeOwner extends Component {
    constructor() {
        super();
        this.state = {
            orders: []
        }
    }

    componentWillMount = () => {
        const data = {
            owner_email: localStorage.getItem('grubhub_user')
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/orderbyrestowner', data)
            .then((response) => {
                this.setState({
                    orders: response.data
                });
        });
    }

    handleUpdate = (e) => {
        e.preventDefault();
        const data = {
            status: e.target.elements.status.value,
            order_id: e.target.elements.order_id.value
        }  
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/updateorderstatus', data)
            .then((response) => {
               // 
            });
    }

    render() {
        let redirectVar = null;
        if (!(cookie.load('cookie') === 'owner')) {
            redirectVar = <Redirect to="/login" />
        }
    
        let orderdata = this.state.orders.map(order => {
            return (
                <tr key={order.order_id} id={order.order_id}>
                    <td><Link to={'/orderdetailsrest/' + order.order_id + '/' + order.status}>{order.order_id}</Link></td>
                    <td><input size="35" type="text" name="username" readOnly defaultValue={order.buyer_email} /></td>
                    <td><input size="35" type="text" name="date" readOnly defaultValue={order.order_date} /></td>
                    <td><input size="35" type="text" name="status" readOnly defaultValue={order.status} /></td>
                    <td><input size="35" type="text" name="total_price" readOnly defaultValue={order.total_price} /></td>
                </tr>
            )
        })

        return (
            <div>
                {redirectVar}
                <div className="container">
                    <form onSubmit={this.handleUpdate}>
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td><b>Order ID</b></td>
                                    <td><b>User Email</b></td>
                                    <td><b>Date</b></td>
                                    <td><b>Status</b></td>
                                    <td><b>Total Price</b></td>
                                </tr>
                                {orderdata}
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        )
    }
}
//export Home Component
export default HomeOwner;
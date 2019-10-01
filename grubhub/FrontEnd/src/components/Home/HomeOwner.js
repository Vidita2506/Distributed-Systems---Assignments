import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import { properties } from '../../properties';

class HomeOwner extends Component {
    constructor() {
        super();
        this.state = {
            orders: []
        }
    }

    componentDidMount = () => {
        const data = {
            owner_email: localStorage.getItem('grubhub_user')
        }
        axios.defaults.withCredentials = true;
        const backendurl = 'http://' + properties.backendhost + ':3001/order/orderbyrestowner';
        let token = localStorage.getItem('token');
        axios.post(backendurl, data, {
            headers: {
                'Authorization': "bearer " + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
                this.setState({
                    orders: response.data
                });
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
                    <td colSpan="3"><Link to={'/orderdetailsrest/' + order.order_id + '/' + order.status}>{order.order_id}</Link></td>
                    <td><Link to={'/userdetails/' + order.buyer_email}>{order.buyer_email}</Link></td>
                    <td>{order.order_date.split('T')[0]}</td>
                    <td>{order.status}</td>
                    <td>${order.total_price}</td>
                </tr>
            )
        })

        return (
            <div>
                {redirectVar}
                <div className="container">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td colSpan="3"><b>Order ID</b></td>
                                    <td><b>User Email</b></td>
                                    <td><b>Date</b></td>
                                    <td><b>Status</b></td>
                                    <td><b>Total Price</b></td>
                                </tr>
                                {orderdata}
                            </tbody>
                        </table>
                </div>
            </div>
        )
    }
}
//export Home Component
export default HomeOwner;
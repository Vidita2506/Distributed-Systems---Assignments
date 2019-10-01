import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import cookie from 'react-cookies';
import { properties } from '../../properties';

//Define a Login Component
class UpcomingOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: []
        }
    }

    componentWillMount() {
        // restname hardcoded
        const data = {
            email: localStorage.getItem('grubhub_user')
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        const backendurl = 'http://' + properties.backendhost + ':3001/order/upcomingorders';
        let token = localStorage.getItem('token');
        axios.post(backendurl, data, {
            headers: {
                'Authorization': "bearer " + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
                //update the state with the response data
                this.setState({
                    orders: response.data
                });
            });
    }

    render() {
        let redirectVar = null;
        if (!(cookie.load('cookie') === 'buyer')) {
            redirectVar = <Redirect to="/login" />
        }
        let upcomingorders = this.state.orders.map(order => {
            return (
                <tr key={order.order_id}>
                    <td><Link to={'/orderdetails/' + order.order_id + '/' + order.status}>{order.order_id}</Link></td>
                    <td>{order.rest_name}</td>
                    <td>{order.status}</td>
                    <td>{order.order_date.split('T')[0]}</td>
                    <td>${order.total_price}</td>
                </tr>
            )
        })
        return (
            <div className=" container">
                <div className="container">
                    {redirectVar}
                    <table className="table">
                        <tbody>
                            <tr>
                                <td><b>Order Id</b></td>
                                <td><b>Restaurant</b></td>
                                <td><b>Status</b></td>
                                <td><b>Date</b></td>
                                <td><b>Total Price</b></td>
                            </tr>
                            {upcomingorders}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default UpcomingOrders;
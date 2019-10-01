import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import cookie from 'react-cookies';
import { properties } from '../../properties';

class FoodSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sections: []
        }
    }

    componentDidMount() {
        const data = {
            owner_email: localStorage.getItem('grubhub_user')
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        const backendurl = 'http://' + properties.backendhost + ':3001/restaurant/getFoodSections';
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
        let pastorders = this.state.orders.map(order => {
            return (
                <tr key={order.order_id}>
                    <td><Link to={'/orderdetailsrest/' + order.order_id + '/' + order.status}>{order.order_id}</Link></td>
                    <td>{order.status}</td>
                    <td>{order.order_date}</td>
                    <td>{order.total_price}</td>
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
                                <td><b>Status</b></td>
                                <td><b>Date</b></td>
                                <td><b>Total Price</b></td>
                            </tr>
                            {pastorders}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default FoodSection;
import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import cookie from 'react-cookies';
import { properties } from '../../properties';

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
        const backendurl = 'http://' + properties.backendhost + ':3001/order/orderdetails';
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
        const backendurl = 'http://' + properties.backendhost + ':3001/order/updateorderstatus';
        let token = localStorage.getItem('token');
        axios.post(backendurl, data, {
            headers: {
                'Authorization': "bearer " + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
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
                        <td>${result.price}</td>
                        <td>${parseInt(result.price * result.quantity, 10)}</td>
                    </tr>
                )
            })
        }
        let showstatus = ''
        if (status == 'New') {
            showstatus = (
                <select name="status">
                <option value="New" selected>New</option>
                <option value="Preparing">Preparing</option>
                <option value="Ready">Ready</option>
                <option value="Delivered">Delivered</option>
                </select>)
        } else if (status == 'Preparing') {
            showstatus = (<select name="status">
                <option value="New">New</option>
                <option value="Preparing" selected>Preparing</option>
                <option value="Ready">Ready</option>
                <option value="Delivered">Delivered</option>
            </select>)
        } else if (status == 'Ready') {
            showstatus = (<select name="status">
                <option value="New">New</option>
                <option value="Preparing">Preparing</option>
                <option value="Ready" selected>Ready</option>
                <option value="Delivered">Delivered</option>
            </select>)
        } else if (status == 'Delivered') {
            showstatus = (<select name="status">
                <option value="New">New</option>
                <option value="Preparing">Preparing</option>
                <option value="Ready">Ready</option>
                <option value="Delivered" selected>Delivered</option>
            </select>)
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
                                <td>{showstatus}</td>           
                            </tr> 
                            <tr>
                                <td><button className="btn btn-success" type="submit">Update Status</button></td>
                            </tr>
                            <tr height= "50px"></tr>    
                            <h4>Items in this order</h4>  
                            <tr height="10px"></tr>       
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
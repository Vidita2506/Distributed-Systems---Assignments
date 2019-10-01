import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import cookie from 'react-cookies';
import { properties } from '../../properties';

//Define a Login Component
class UserDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userdetails: []
        }
    }

    componentDidMount() {
        const { buyeremail } = this.props.match.params
        const data = {
            buyeremail: buyeremail
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        const backendurl = 'http://' + properties.backendhost + ':3001/order/userdetails';
        let token = localStorage.getItem('token');
        axios.post(backendurl, data, {
            headers: {
                'Authorization': "bearer " + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
                this.setState({
                    userdetails: response.data
                });
            });
    }

    render() {
        let redirectVar = null;
        if (!(cookie.load('cookie'))) {
            redirectVar = <Redirect to="/login" />
        }
        let userdetails = this.state.userdetails[0];
        if (userdetails == undefined) {
            return (<div></div>);
        }
        return (
            <div className=" container">
                {redirectVar}
                <div className="container">
                    <h4>User Details</h4>
                    <table className="table">
                        <tbody>
                            <tr>
                                <td><b>Name</b></td>
                                <td>{userdetails.name}</td>
                            </tr>
                            <tr>
                                <td><b>Email</b></td>
                                <td>{userdetails.email}</td>
                            </tr>
                            <tr>
                                <td><b>Contact</b></td>
                                <td>{userdetails.phone}</td>
                            </tr>
                            <tr>
                                <td><b>Street Address</b></td>
                                <td>{userdetails.streetaddress}</td>
                            </tr>
                            <tr>
                                <td><b>Apt / Floor / Suite</b></td>
                                <td>{userdetails.apt}</td>
                            </tr>
                            <tr>
                                <td><b>City</b></td>
                                <td>{userdetails.city}</td>
                            </tr>
                            <tr>
                                <td><b>State</b></td>
                                <td>{userdetails.state}</td>
                            </tr>
                            <tr>
                                <td><b>Zip Code</b></td>
                                <td>{userdetails.zipcode}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default UserDetails;
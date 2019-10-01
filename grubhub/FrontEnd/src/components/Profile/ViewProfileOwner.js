import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import cookie from 'react-cookies';
import { properties } from '../../properties';

class ViewProfileOwner extends Component {
    constructor() {
        super();
        this.state = {
            profile: '',
            image: ''
        }
    }

    componentDidMount = () => {
        const data = {
            useremail: localStorage.getItem('grubhub_user')
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        const backendurl = 'http://' + properties.backendhost + ':3001/profile/viewprofileowner';
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
                    profile: response.data,
                    image: 'http://' + properties.backendhost + ':3001/' + response.data.owner_image
                });
            });
    }

    render() {
        //if not logged in go to login page
        let redirectVar = null;
        if (!(cookie.load('cookie') === 'owner')) {
            redirectVar = <Redirect to="/login" />
        }
        let profiledetails = this.state.profile;
        return (
            <div>
                {redirectVar}
                <div className="container">
                    <table className="table">
                        <tbody>
                            <tr>
                                <td><b>Restaurant ID</b></td>
                                <td>{profiledetails.rest_id}</td>
                            </tr>
                            <tr>
                                <td><b>Owner Name</b></td>
                                <td>{profiledetails.owner_name}</td>
                            </tr>
                            <tr>
                                <td><b>Email</b></td>
                                <td>{profiledetails.owner_email}</td>
                            </tr>
                            <tr>
                                <td><b>Restaurant Name</b></td>
                                <td>{profiledetails.rest_name}</td>
                            </tr>
                            <tr>
                                <td><b>Restaurant Zip</b></td>
                                <td>{profiledetails.rest_zip}</td>
                            </tr>
                            <tr>
                                <td><b>Cuisine</b></td>
                                <td>{profiledetails.cuisine}</td>
                            </tr>
                            <tr>
                                <td><b>Image</b></td>
                                <td><img width="100" height="100" src={this.state.image} className="process_image" /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
//export ViewProfile Component
export default ViewProfileOwner;
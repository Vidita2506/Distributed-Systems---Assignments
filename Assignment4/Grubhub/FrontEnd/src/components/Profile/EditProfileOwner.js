import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import cookie from 'react-cookies';

class EditProfileOwner extends Component {
    constructor() {
        super();
        this.state = {
            msg: '',
            profile: ''
        }
    }

    componentDidMount = () => {
        const data = {
            useremail: localStorage.getItem('grubhub_user')
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/viewprofileowner', data)
            .then((response) => {
                //update the state with the response data
                this.setState({
                    profile: response.data
                });
            });
    }

    handleUpdateProfile = (event) => {
        //prevent page from refresh
        event.preventDefault();
        const data = {
            name: event.target.elements.owner_name.value,
           // phone: event.target.elements.phone.value,
            email: event.target.elements.owner_email.value,
            rest_name: event.target.elements.rest_name.value,
            rest_zip: event.target.elements.rest_zip.value,
            cuisine: event.target.elements.cuisine.value
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/updateprofileowner', data)
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        msg: 'Profile updated succesfully'
                    })
                } else {
                    this.setState({
                        msg: response.data
                    })
                }
            }).catch(error => {
                this.setState({
                    msg: error.response.data
                })
            })
    }

    render() {
        let msg = this.state.msg;
        let redirectVar = null;
        if (!(cookie.load('cookie') === 'owner')) {
            redirectVar = <Redirect to="/login" />
        }
        let profiledetails = this.state.profile;
        return (
            <div>
                {redirectVar}
                <div className="container">
                    <div className="info">{msg}</div>
                    <div className="container">
                        <form onSubmit={this.handleUpdateProfile}>
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <td><b>Restaurant ID</b></td>
                                        <td><input size="35 " type="text" name="rest_id" defaultValue={profiledetails.rest_id} readOnly/></td>
                                    </tr>
                                    <tr>
                                        <td><b>Owner Name</b></td>
                                        <td><input size="35 " type="text" name="owner_name" defaultValue={profiledetails.owner_name} /></td>
                                    </tr>
                                    <tr>
                                        <td><b>Owner Email</b></td>
                                        <td><input size="35" type="email" name="owner_email" defaultValue={profiledetails.owner_email} readOnly /></td>
                                    </tr>
                                    <tr>
                                        <td><b>Restaurant Name</b></td>
                                        <td><input size="35 " type="text" name="rest_name" defaultValue={profiledetails.rest_name} /></td>
                                    </tr>
                                    <tr>
                                        <td><b>Restaurant Zip</b></td>
                                        <td><input size="35 " type="text" name="rest_zip" defaultValue={profiledetails.rest_zip} /></td>
                                    </tr>
                                    <tr>
                                        <td><b>Cuisine</b></td>
                                        <td><input size="35" type="text" name="cuisine" defaultValue={profiledetails.cuisine} /></td>
                                    </tr>
                                    <tr>
                                        <td><b>Image</b></td>
                                        <td>{profiledetails.image}</td>
                                    </tr>
                                    <tr>
                                        <button className="btn btn-success" type="submit">Update profile</button>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
//export ViewProfile Component
export default EditProfileOwner;
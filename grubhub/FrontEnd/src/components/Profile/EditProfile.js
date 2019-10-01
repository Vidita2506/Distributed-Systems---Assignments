import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import cookie from 'react-cookies';
import { connect } from "react-redux";
import { properties } from '../../properties';

class EditProfile extends Component {
    constructor() {
        super();
        this.state = {
            msg: '',
            profile: '',
            image: '',
            imagePath: ''
        }
        this.uploadImage = this.uploadImage.bind(this);
        this.handleUpdateProfile = this.handleUpdateProfile.bind(this);
    }

    componentDidMount = () => {
        let useremail = localStorage.getItem('grubhub_user');
        const data = {
            useremail: useremail
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        const backendurl = 'http://' + properties.backendhost + ':3001/profile/viewprofile';
        let token = localStorage.getItem('token');
        axios.post(backendurl, data, {
            headers: {
                'Authorization': "bearer " + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
                this.setState({
                    profile: response.data,
                    imagePath: response.data.image
                });
            });
    }

    uploadImage = (e) => {
        let image = e.target.files[0];
        this.setState({
            image: image
        })
    }

    handleUpdateProfile = (event) => {
        //prevent page from refresh
        event.preventDefault();
        let formData = new FormData();
        formData.append('name', event.target.elements.name.value);
        formData.append('phone', event.target.elements.phone.value);
        formData.append('email', event.target.elements.email.value);
        formData.append('streetaddress', event.target.elements.streetaddress.value);
        formData.append('apt', event.target.elements.apt.value);
        formData.append('city', event.target.elements.city.value);
        formData.append('state', event.target.elements.state.value);
        formData.append('zipcode', event.target.elements.zipcode.value);
        formData.append('userimage', this.state.image);
      
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        const backendurl = 'http://' + properties.backendhost + ':3001/profile/updateprofile';
        let token = localStorage.getItem('token');
        axios.post(backendurl, formData, {
            headers: {
                'Authorization': "bearer " + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
                if (response.status === 200) {
                    this.setState({
                        msg: 'Profile updated succesfully',
                        imagePath: response.data.imagePath
                    })
                } else {
                    this.setState({
                        msg: response.data.message
                    })
                }
            }).catch(error => {
                this.setState({
                    msg: error.response.data.message
                })
            })
    }

    render() {
        let msg = this.state.msg;
        let redirectVar = null;
        if (!(cookie.load('cookie') === 'buyer')) {
            redirectVar = <Redirect to="/login" />
        }
        let profiledetails = this.state.profile;
        return (
            <div>
                {redirectVar}
                <div className="container">
                    <div className="info">{msg}</div>
                    <div className="split left">
                        <img width="300" height="250" src={this.state.imagePath} className="process_image" />
                    </div>
                    <div className="split right">
                    <div className="container">
                        <form onSubmit={this.handleUpdateProfile}>
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <td><b>Name</b></td>
                                        <td><input size="35 " type="text" pattern='[a-zA-Z\s]+' required title="Valid Name" name="name" defaultValue={profiledetails.name} /></td>
                                    </tr>
                                    <tr>
                                        <td><b>Email</b></td>
                                        <td><input size="35" type="email" name="email" defaultValue={profiledetails.email} readOnly /></td>
                                    </tr>
                                    <tr>
                                        <td><b>Phone</b></td>
                                        <td><input size="35" type="text" name="phone" required defaultValue={profiledetails.phone} /></td>
                                    </tr>
                                    <tr>
                                        <td><b>Street Address</b></td>
                                        <td><input size="35" type="text" name="streetaddress" required defaultValue={profiledetails.streetaddress} /></td>
                                    </tr>
                                    <tr>
                                        <td><b>Apt/ Suite/ Floor</b></td>
                                        <td><input size="35" type="text" name="apt" required defaultValue={profiledetails.apt} /></td>
                                    </tr>
                                    <tr>
                                        <td><b>City</b></td>
                                        <td><input size="35" type="text" name="city" required defaultValue={profiledetails.city} /></td>
                                    </tr>
                                    <tr>
                                        <td><b>State</b></td>
                                        <td><input size="35" type="text" name="state" required defaultValue={profiledetails.state} /></td>
                                    </tr>
                                    <tr>
                                        <td><b>Zip Code</b></td>
                                        <td><input size="35" type="text" name="zipcode" required defaultValue={profiledetails.zipcode} /></td>
                                    </tr>
                                    <tr>
                                        <td><b>Change Profile Picture</b></td>
                                        <td><input type="file" name="userimage" className="process_upload-btn" onChange={(e) => {this.uploadImage(e)}}/>
                                        </td>                    
                                    </tr>
                                    <tr>
                                        <td><button className="btn btn-success" type="submit">Update profile</button></td>
                                    </tr>
                                </tbody>
                            </table>         
                        </form>
                        </div>
                    </div>   
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    if (state) {
        return { email: state.email };
    }
};
const EditProfileForm = connect(mapStateToProps)(EditProfile);
export default EditProfileForm;
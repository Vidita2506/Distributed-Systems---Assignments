import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import cookie from 'react-cookies';
import { properties } from '../../properties';

class EditProfileOwner extends Component {
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
        const data = {
            useremail: localStorage.getItem('grubhub_user')
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        let token = localStorage.getItem('token');
        const backendurl = 'http://' + properties.backendhost + ':3001/profile/viewprofileowner'
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
                    imagePath: response.data.owner_image
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
        formData.append('name', event.target.elements.owner_name.value);
        formData.append('email', event.target.elements.owner_email.value);
        formData.append('rest_name', event.target.elements.rest_name.value);
        formData.append('rest_zip', event.target.elements.rest_zip.value);
        formData.append('cuisine', event.target.elements.cuisine.value);
        formData.append('userimage', this.state.image);

        axios.defaults.withCredentials = true;
        const backendurl = 'http://' + properties.backendhost + ':3001/profile/updateprofileowner';
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
        if (!(cookie.load('cookie') === 'owner')) {
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
                                        <td><b>Change Profile Picture</b></td>
                                        <td><input type="file" name="userimage" className="process_upload-btn" onChange={(e) => { this.uploadImage(e) }} />
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

export default EditProfileOwner;
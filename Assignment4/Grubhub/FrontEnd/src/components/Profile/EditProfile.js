import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import cookie from 'react-cookies';
import { connect } from "react-redux";

class EditProfile extends Component {
    constructor() {
        super();
        this.state = {
            msg: '',
            profile: '',
            image: ''
        }
    }

    componentDidMount = () => {
        const data = {
            useremail: this.props.email
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/viewprofile', data)
            .then((response) => {
                //update the state with the response data
                this.setState({
                    profile: response.data,
                    image: response.data.image
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
        formData.append('userimage', this.state.image);
      
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/updateprofile', formData)
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
        if (!(cookie.load('cookie') === 'buyer')) {
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
                                        <td><b>Name</b></td>
                                        <td><input size="35 "type="text" name="name" defaultValue={profiledetails.name} /></td>
                                    </tr>
                                    <tr>
                                        <td><b>Email</b></td>
                                        <td><input size="35" type="email" name="email" defaultValue={profiledetails.email} readOnly /></td>
                                    </tr>
                                    <tr>
                                        <td><b>Phone</b></td>
                                        <td><input size="35" type="text" name="phone" defaultValue={profiledetails.phone} /></td>
                                    </tr>
                                    <tr>
                                        <td><b>Image</b></td>
                                        <td><input type="file" name="userimage" className="process_upload-btn" onChange={(e) => {this.uploadImage(e)}}/>
                                            <img width="100" height="100" src={this.state.image} alt="upload-image" className="process_image"/>
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
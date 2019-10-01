import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import cookie from 'react-cookies';
import { connect } from "react-redux";
import { properties } from '../../properties';

class ViewProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: '',
            image: ''
        }
    }

    componentDidMount = () => {
        let useremail = localStorage.getItem('grubhub_user');
        const data = {
            useremail: useremail
        }
        axios.defaults.withCredentials = true;
        let token = localStorage.getItem('token');
        const backendurl = 'http://' + properties.backendhost + ':3001/profile/viewprofile'
        axios.post(backendurl, data, {
            headers: {
                'Authorization': "bearer " + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
                this.setState({
                    profile: response.data,
                    image: 'http://' + properties.backendhost + ':3001/' + response.data.image
                });
            });
    }

    render() {
        //if not logged in go to login page
        let redirectVar = null;
        if (!(cookie.load('cookie') === 'buyer')) {
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
                                <td><b>Name</b></td>
                                <td>{profiledetails.name}</td>
                            </tr>
                            <tr>
                                <td><b>Email</b></td>
                                <td>{profiledetails.email}</td>
                            </tr>
                            <tr>
                                <td><b>Phone</b></td>
                                <td>{profiledetails.phone}</td>
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

const mapStateToProps = state => {
    if (state) {
        return { email: state.email };
    }
};

const ViewProfileForm = connect(mapStateToProps)(ViewProfile);
export default ViewProfileForm;
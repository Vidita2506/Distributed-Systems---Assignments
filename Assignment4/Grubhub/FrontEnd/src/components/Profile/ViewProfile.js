import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import cookie from 'react-cookies';
import { connect } from "react-redux";
import store from "../../store/index";

class ViewProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
                                <td><img width="100" height="100" src={this.state.image} alt="upload-image" className="process_image" /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(store.getState())
    if (state) {
        return { email: state.email };
    }
};

const ViewProfileForm = connect(mapStateToProps)(ViewProfile);
export default ViewProfileForm;
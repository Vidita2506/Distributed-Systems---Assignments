import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { properties } from '../../properties';

//Define a Login Component
class SignUpOwner extends Component {
    //call the constructor method
    constructor() {
        //Call the constrictor of Super class i.e The Component
        super();
        //maintain the state required for this component
        this.state = {
            msg: "",
            errorMsg: ""
        }
        this.handleSignUpOwner = this.handleSignUpOwner.bind(this);
    }

    // submit singup request to backend
    handleSignUpOwner = (event) => {
        console.log(this);
        //prevent page from refresh
        event.preventDefault();

        const data = {
            name: event.target.elements.name.value,
            password: event.target.elements.password.value,
            email: event.target.elements.email.value,
            restname: event.target.elements.restname.value,
            restzip: event.target.elements.restzip.value
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        const backendurl = 'http://' + properties.backendhost + ':3001/signup/signupowner'
        axios.post(backendurl, data)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    this.setState({
                        msg: 'Account created succesfully'
                    })
                } else {
                    this.setState({
                        errorMsg: response.data
                    })
                }
            }).catch(error => {
                this.setState({
                    errorMsg: error.response.data
                })
            })
    }

    render = () => {
        let msg = this.state.msg;
        let errorMsg = this.state.errorMsg;
        let redirectVar = null;
        if (cookie.load('cookie') === 'buyer') {
            redirectVar = <Redirect to="/home" />
        } else if (cookie.load('cookie') === 'owner') {
            redirectVar = <Redirect to="/homeowner" />
        }
        return (
            <div>
                {redirectVar}
                <div className="container">
                    <div className="login-form">
                        <div className="info">{msg}</div>
                        <div className="error">{errorMsg}</div>
                        <div className="main-div">
                            <div className="panel">
                                <h2>Create your account</h2>
                            </div>
                            <div className="form-group">
                                <form onSubmit={this.handleSignUpOwner}>
                                    <div className="form-group">
                                        Name:<br />
                                        <input type="text" name="name" className="form-control" />
                                    </div>
                                    Email: <br />
                                    <div className="form-group">
                                        <input type="email" className="form-control" name="email" />
                                    </div>
                                    Password: <br />
                                    <div className="form-group">
                                        <input type="password" className="form-control" name="password" />
                                    </div>
                                    <div className="form-group">
                                        Restaurant Name:<br />
                                        <input type="text" name="restname" className="form-control" />
                                    </div>
                                        Restaurant Zip:<br />
                                    <div className="form-group">
                                        <input type="text" className="form-control" name="restzip" />
                                    </div>
                                    <br />
                                    <div className="form-group">
                                        <button className="btn btn-success" type="submit">Create your account</button>
                                    </div>
                                    <br />
                                    <div className="form-group">
                                        <Link to="/login">Have an account? Sign in</Link>
                                    </div> 
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
//export SignUp Component
export default SignUpOwner;
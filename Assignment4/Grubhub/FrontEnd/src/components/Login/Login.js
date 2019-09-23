import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { loginuser } from "../../actions/index";

//Define a Login Component
class Login extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            errorMsg: "",
            redirect: ""
        }
        this.handleLogin = this.handleLogin.bind(this);
    }

    //submit Login handler to send a request to the node backend
    handleLogin = (e) => {
        //prevent page from refresh
        e.preventDefault();
        const data = {
            email: e.target.elements.email.value,
            password : e.target.elements.password.value
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/login',data)
            .then(response => {
                if(response.status === 200){
                    this.setState({
                        errorMsg: "No error"
                    });
                    this.props.loginuser({ email: data.email });
                    localStorage.setItem('grubhub_user', data.email);
                }else{
                    this.setState({
                        errorMsg: "Invalid Login credentials"
                    })
                }
            }).catch(error => {
                this.setState({
                    errorMsg: error.response ? error.response.data : 'Error occured'
                })
            })
    }

    render = () => {
        let errorMsg = this.state.errorMsg;
        let redirect = this.state.redirect;
        if(cookie.load('cookie') === 'buyer') {
            redirect = <Redirect to= "/home"/>
        } else if (cookie.load('cookie') === 'owner') {
            redirect = <Redirect to="/homeowner" />
        }
        return(
            <div>
                {redirect}
            <div className="info">{errorMsg}</div>
            <div className="container">   
                <div className="login-form">
                    <div className="main-div">
                        <div className="panel">
                            <h2>Sign in with your GRUBHUB account</h2>
                        </div>
                        <div className="form-group">
                            <form onSubmit={this.handleLogin}>
                                <div className="form-group">
                                    Email:<br />
                                    <input type="email" name="email" className="form-control" />
                                </div>
                                    Password: <br />
                                <div className="form-group">
                                    <input type="password" name="password" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-success" type="submit">Sign In</button>
                                </div>
                                <div className="form-group">
                                    <Link to="/signup">Sign up as Buyer</Link>
                                </div>
                                <div className="form-group">
                                    <Link to="/signupowner">Sign up as Restaurant Owner</Link>
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

function mapDispatchToProps(dispatch) {
    return {
        loginuser: user => dispatch(loginuser(user))
    };
}
const LoginForm = connect(null, mapDispatchToProps)(Login);
export default LoginForm;
import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

//Define a Login Component
class SignUp extends Component{
    //call the constructor method
    constructor(){
        //Call the constrictor of Super class i.e The Component
        super();
        //maintain the state required for this component
        this.state = {
            msg: '',
            name: '',
            email: '',
            password: ''
        }
        this.handleSignUp = this.handleSignUp.bind(this);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
   
    // submit singup request to backend
    handleSignUp = (event) => {
        console.log(this.state);
        //prevent page from refresh
        event.preventDefault();

        const data = {
            name: event.target.elements.name.value,
            password: event.target.elements.password.value,
            email: event.target.elements.email.value
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/signupbuyer',this.state)
            .then(response => {
                console.log("Status Code : ",response.status);
                if (response.status === 200) {
                    this.setState({
                        msg: 'Account created succesfully'
                    })
                }else{
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

    render = () => {
        let msg = this.state.msg;
        let redirectVar = null;
        if (cookie.load('cookie') === 'buyer') {
            redirectVar = <Redirect to="/home" />
        } else if (cookie.load('cookie') === 'owner') {
            redirectVar = <Redirect to="/homeowner" />
        }
        return(
            <div>
                {redirectVar}
                <div className="container">   
                    <div className="login-form">
                        <div className="info">{msg}</div>
                        <div className="main-div">
                            <div className="panel">
                            <h2>Create your account</h2>
                        </div>
                            <div className="form-group">
                                <form onSubmit={this.handleSignUp}>
                                    <div className="form-group">
                                         Name:<br />
                                        <input type="text" name="name" onChange={this.handleChange} className="form-control"/>
                                    </div>
                                         Email: <br />
                                    <div className="form-group">
                                        <input type="email" className="form-control" name="email" onChange={this.handleChange}/>
                                    </div>
                                         Password [Min 8 chars]: <br />
                                    <div className="form-group">
                                        <input type="password" className="form-control" name="password" onChange={this.handleChange}/>
                                    </div>
                                    <br />
                                    <div>
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

export default SignUp;
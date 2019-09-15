import React, { Component } from 'react';
import cookie from 'react-cookies';
import axios from 'axios';
import { Redirect } from 'react-router';
import '../../App.css';

class Delete extends Component{
    constructor() {
        super();
        this.state = {
            msg: "",
            redirect: ""
        }
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete = (event) => {
        event.preventDefault();
        console.log(event.target);
        let bookId = event.target.elements.BookID.value;
        const data = {
            "BookID": bookId,
        }

        axios.post('http://localhost:3001/delete', data)
            .then(response => {
                this.setState({
                    msg: response.data,
                    redirect: <Redirect to="/home" />
                });
            }).catch(error => {
                this.setState({
                    msg: error.response.data
                })
            })
    }

    render = () => {
        let msg = this.state.msg;
        if (!cookie.load('cookie')) {
            this.state.redirect = <Redirect to="/login" />
        }
        let redirectVar = this.state.redirect;
        return (
            <div>
             {redirectVar}
                <div class="error_create_delete">{msg}</div>
            <div style={{ marginTop: "40px" }} class="container">
                <form onSubmit={this.handleDelete}>
                    <div style={{width: "50%",float: "left"}} class="form-group">
                        <input  type="text" class="form-control" name="BookID" placeholder="Search a Book by Book ID"/>
                    </div>
                    <div style={{width: "50%", float: "right"}}>
                            <button class="btn btn-success" type="submit">Delete</button>
                    </div> 
                </form>
            </div>
            </div>
        )
    }
}

export default Delete;
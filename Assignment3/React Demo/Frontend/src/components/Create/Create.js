import React, {Component} from 'react';
import cookie from 'react-cookies';
import axios from 'axios';
import { Redirect } from 'react-router';

class Create extends Component{
    constructor() {
        super();
        this.state = {
            msg: ""
        }
        this.handleCreate = this.handleCreate.bind(this);
    }
    handleCreate = (event) => {
        event.preventDefault();
        console.log(event.target);
        let bookId = event.target.elements.BookID.value;
        let title = event.target.elements.Title.value;
        let author = event.target.elements.Author.value
        const data = {
            "BookID": bookId,
            "Title": title,
            "Author": author
        }

        axios.post('http://localhost:3001/create', data)
            .then(response => {
                this.setState({
                    msg: response.data
                });
            }).catch(error => {
                this.setState({
                    msg: error.response.data
                })
            })
    }

    render = () => {
        //if not logged in go to login page
        let redirectVar = null;
        let msg = this.state.msg;
        if (!cookie.load('cookie')) {
            redirectVar = <Redirect to="/login" />
        }
        return (
            <div>
                {redirectVar}
                <br />
                <div class="info">{msg}</div>
                <div style={{ marginTop: "30px" }} class="container">
                        <form onSubmit={this.handleCreate}>
                        <div style={{width: '30%'}} class="form-group">
                            <input  type="text" class="form-control" name="BookID" placeholder="Book ID"/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}} class="form-group">
                                <input  type="text" class="form-control" name="Title" placeholder="Book Title"/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}} class="form-group">
                                <input  type="text" class="form-control" name="Author" placeholder="Book Author"/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}}>
                            <button class="btn btn-success" type="submit">Create</button>
                        </div> 
                        </form>
                </div>
            </div>
        )
    }
}

export default Create;
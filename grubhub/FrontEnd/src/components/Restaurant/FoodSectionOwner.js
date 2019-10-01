import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import cookie from 'react-cookies';
import { properties } from '../../properties';

class FoodSectionOwner extends Component {
    constructor() {
        super();
        this.state = {
            msg: '',
            newsection: '',
            sections: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount = () => {
        let owner_email = localStorage.getItem('grubhub_user');
        const data = {
            owner_email: owner_email
        }
        axios.defaults.withCredentials = true;
        const backendurl = 'http://' + properties.backendhost + ':3001/restaurant/getsections';
        let token = localStorage.getItem('token');
        axios.post(backendurl, data, {
            headers: {
                'Authorization': "bearer " + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
                this.setState({
                    sections: response.data
                });
            });
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            newsection : e.target.value
        })
    }

    handleUpdate = (e) => {
        //prevent page from refresh
        e.preventDefault();
        const data = {
            oldsectionname: e.target.id,
            newsectionname: this.state.newsection
        }

        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        const backendurl = 'http://' + properties.backendhost + ':3001/restaurant/updatesection';
        let token = localStorage.getItem('token');
        axios.post(backendurl, data, {
            headers: {
                'Authorization': "bearer " + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
                if (response.status === 200) {
                    this.setState({
                        msg: 'Section updated succesfully'
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

    handleDelete = (e) => {
        //prevent page from refresh
        e.preventDefault();
        const data = {
            section: e.target.id,
        }

        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        const backendurl = 'http://' + properties.backendhost + ':3001/restaurant/deletesection';
        let token = localStorage.getItem('token');
        axios.post(backendurl, data, {
            headers: {
                'Authorization': "bearer " + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
                if (response.status === 200) {
                    this.setState({
                        msg: 'Section deleted succesfully'
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
        if (!(cookie.load('cookie') === 'owner')) {
            redirectVar = <Redirect to="/login" />
        }
        let sections = this.state.sections.map(section => {
            return (
                <tr key={section.section}>
                    <td><input size="35" type="text" name={section.section} required defaultValue={section.section} onChange={this.handleChange}/></td>
                    <td><button id={section.section} onClick={this.handleUpdate} className="btn btn-success" type="submit">Update Section</button></td>
                    <td><button id={section.section} onClick={this.handleDelete} className="btn btn-danger" type="submit">Delete Section</button></td>
                </tr>
            )
        })
        return (
            <div>
                {redirectVar}
                <div className="container">
                    <div className="info">{msg}</div>
                    <div className="container">
                        <form>
                            <table className="table">
                                <tbody>
                                    {sections}
                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default FoodSectionOwner;
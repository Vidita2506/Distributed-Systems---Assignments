import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            results: [],
            restname: ""
        }
        this.handleSearch = this.handleSearch.bind(this);
    }
   
    handleSearch = (e) => {
        e.preventDefault();
        const data = {
            item: e.target.elements.Search.value
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/searchitem', data)
            .then((response) => {
                //update the state with the response data
                this.setState({
                    results: response.data
                });
            });
    }

    render() {
        //if not logged in go to login page
        let redirectVar = null;
        if (!(cookie.load('cookie') === 'buyer')) {
            redirectVar = <Redirect to="/login" />
        }
        let restaurants = '';
        if (this.state.results.length > 0) {
            restaurants = this.state.results.map(result => {
                return (
                    <tr key={result.rest_id}>
                        <td><Link to={'/restaurant/' + result.rest_id}>{result.rest_name}</Link></td>
                        <td>{result.cuisine}</td>
                    </tr>
                )
            })
        }

        return (
            <div>
                {redirectVar}
                <div className ="container">
                    <form className="form-group" onSubmit={this.handleSearch} >
                        <input type="text" placeholder="Pizza..." name="Search" />
                        <br />
                        <br />
                        <button type="submit">Search</button>
                    </form>
                </div>

                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Restaurant</th>
                                <th>Cuisine</th>
                            </tr>
                        </thead>
                        <tbody>{restaurants}</tbody>
                    </table>
                </div> 
            </div>
        )
    }
}
//export Home Component
export default Home;
import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import { properties } from '../../properties';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            results: [],
            restname: "",
            showFilter: false,
            cuisines: []
        }
        this.handleSearch = this.handleSearch.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
    }
   
    handleSearch = (e) => {
        e.preventDefault();
        const data = {
            item: e.target.elements.Search.value
        }
        axios.defaults.withCredentials = true;
        const backendurl = 'http://' + properties.backendhost + ':3001/restaurant/searchitem'
        let token = localStorage.getItem('token');
        axios.post(backendurl, data, {
            headers: {
                'Authorization': "bearer " + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
                let cuisines = response.data.map(item => item.cuisine);
                let uniqueCuisines = [...new Set(cuisines)];
                this.setState({
                    results: response.data,
                    showFilter: true,
                    cuisines: uniqueCuisines
                });
            });
    }

    handleFilter = (e) => {
        e.preventDefault();
        let inputCuisine = e.target.id;
        let results = this.state.results;
        let filteredResults = results.filter(item => item.cuisine.toLowerCase() == inputCuisine.toLowerCase())
        this.setState({
            results: filteredResults
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

        let cuisine = this.state.cuisines.map(cuisine => {
            return (
                <tr key={cuisine}>
                    <td><button className ="btn" id={cuisine} onClick={this.handleFilter}>{cuisine}</button></td>
                </tr>
            )
        })

        let showfilter = '';
        if (this.state.showFilter) {
            showfilter = (<div className="container">
                <b>Filter By Cuisine:</b>
                <table>
                    <tbody>
                        {cuisine}
                    </tbody>   
                </table>
                </div>)
        }

        return (
            <div>
                <div className="split left">
                    {showfilter}
                </div>  
            <div className="split right">
                {redirectVar}
                <div className="container">
                    <form className="form-group" onSubmit={this.handleSearch} >
                        <input className="search" size="100" type="text" placeholder="Pizza..." name="Search" />
                        <button className="btnsearch" type="submit">Find Food</button>
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
            </div>      
        )
    }
}
//export Home Component
export default Home;
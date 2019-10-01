import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import FoodItem from './FoodItem';
import { Redirect } from 'react-router';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import { properties } from '../../properties';

class Restaurant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            foodmenu: [],
            errormsg: ''
        }
    }

    componentDidMount() {
        const { restid } = this.props.match.params;
        const data = {
            restid: restid
        }
        axios.defaults.withCredentials = true;
        const backendurl = 'http://' + properties.backendhost + ':3001/restaurant/restaurantmenubysection';
        let token = localStorage.getItem('token');
        axios.post(backendurl, data, {
            headers: {
                'Authorization': "bearer " + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
                this.setState({
                    foodmenu: response.data
                });
            });
    }

    render() {
        let redirectVar = null;
        if (!(cookie.load('cookie') === 'buyer')) {
            redirectVar = <Redirect to="/login" />
        }
        const { foodmenu } = this.state; 
        const { restid } = this.props.match.params
        return (
            <div className=" container">
                {redirectVar}
                <div className="container">
                    {
                        foodmenu.map((menu, index) => {
                            let sectionname = menu[0];
                            let fooditems = menu[1];
                            return (<div key={index}>
                            <h4 style={{ backgroundColor: '#FFDAB9' }}>{sectionname.toUpperCase()}</h4>
                            <form>    
                            <table className="table">
                                <tbody>
                                        <tr key={index}>
                                        <td><b>Item Name</b></td>
                                        <td><b>Price</b></td>
                                        <td><b>Quantity</b></td>
                                        <td></td>    
                                    </tr>
                                    {
                                        fooditems.map((fooditem, index) => <FoodItem fooditem={fooditem} restid={restid} key={index} />)
                                    }
                                </tbody>
                                </table>
                            </form>
                            </div>)
                        })
                    }
                   
                    <Link to={'/cart'}><button className="btn btn-primary float-right" style={{ marginRight: "10px" }}>View Cart</button></Link>
                </div>
            </div>
        );
    }
}

export default Restaurant;
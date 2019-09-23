import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import FoodItem from './FoodItem';
import { Redirect } from 'react-router';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';

class Restaurant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            foodmenu: []
        }
    }

    componentDidMount() {
        const { restid } = this.props.match.params;
        const data = {
            restid: restid
        }
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/restaurantmenubysection', data)
            .then((response) => {
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
                            return (<div>
                            <h4 style={{ backgroundColor: '#ADD8E6' }}>{sectionname}</h4>
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <td><b>Item Name</b></td>
                                        <td><b>Price</b></td>
                                        <td><b>Quantity</b></td>
                                    </tr>
                                    {
                                        fooditems.map((fooditem, index) => <FoodItem fooditem={fooditem} restid={restid} key={index} />)
                                    }
                                </tbody>
                                </table>
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
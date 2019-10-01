import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import { properties } from '../../properties';

class FoodMenuOwner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            foodmenu: []
        }
    }

    componentDidMount() {
        const owner_email = localStorage.getItem('grubhub_user')
        const data = {
            owner_email: owner_email
        }
        axios.defaults.withCredentials = true;
        let token = localStorage.getItem('token');
        const backendurl = 'http://' + properties.backendhost + ':3001/restaurant/restaurantmenubysectionforowner'
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
        if (!(cookie.load('cookie') === 'owner')) {
            redirectVar = <Redirect to="/login" />
        }
        const { foodmenu } = this.state;
        return (
            <div className=" container">
                {redirectVar}
                <div className="container">
                    <table className="table">
                    <tr key='Add Item'>
                        <td><Link to={'/addfooditem'}>Add New Item</Link></td>
                    </tr>
                    </table>    
                    {
                        foodmenu.map((menu, index) => {
                            let sectionname = menu[0];
                            let fooditems = menu[1];
                            return (<div>   
                                <h4 style={{ backgroundColor: '#FFDAB9' }}>{sectionname.toUpperCase()}</h4>
                                <table className="table">
                                    <tbody>
                                        <tr key={sectionname}>
                                            <td><b>Item Id</b></td>
                                            <td><b>Item Name</b></td>
                                            <td><b>Price</b></td>
                                        </tr>
                                        {
                                            fooditems.map((fooditem, index) => { 
                                            let imagepath = 'http://' + properties.backendhost + ':3001/' + fooditem.item_image;
                                               return( 
                                                <tr key={fooditem.item_id}>
                                                    <td><Link to={'/fooditemdetails/' + fooditem.item_id}>{fooditem.item_id}</Link></td>
                                                    <td>{fooditem.name}</td>
                                                    <td>${fooditem.price}</td>
                                                    <td><img width="40" height="40" src={imagepath}/></td> 
                                                </tr> 
                                               )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>)
                        })
                    }
                </div>
            </div>
        );
    }
}

export default FoodMenuOwner;
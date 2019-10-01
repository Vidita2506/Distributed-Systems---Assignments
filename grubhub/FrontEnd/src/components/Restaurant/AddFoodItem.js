import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import cookie from 'react-cookies';
import { properties } from '../../properties';

//Define a Login Component
class FoodItemDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: '',
        }
        this.uploadImage = this.uploadImage.bind(this);
        this.addItem = this.addItem.bind(this);
    }

    uploadImage = (e) => {
        let image = e.target.files[0];
        this.setState({
            image: image
        })
    }

    addItem = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('price', e.target.elements.price.value);
        formData.append('name', e.target.elements.name.value);
        formData.append('section', e.target.elements.section.value);
        formData.append('owner_email', localStorage.getItem('grubhub_user'));
        formData.append('item_image', this.state.image);
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        const backendurl = 'http://' + properties.backendhost + ':3001/restaurant/addfooditem';
        let token = localStorage.getItem('token');
        axios.post(backendurl, formData, {
            headers: {
                'Authorization': "bearer " + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
                this.setState({
                    msg: 'Item added succesfully'
                })
            });
    }

    render() {
        let redirectVar = null;
        if (!(cookie.load('cookie'))) {
            redirectVar = <Redirect to="/login" />
        }
    
        return (
            <div className=" container">
                {redirectVar}
                <div className="container">
                    <div className="info">{this.state.msg}</div>
                    <form onSubmit={this.addItem}>
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td><b>Name</b></td>
                                    <td><b>Section</b></td>
                                    <td><b>Price</b></td>
                                </tr>
                                <tr>
                                    <td><input size="25" type="text" name="name" ></input></td>
                                    <td><input size="25" type="text" name="section"></input></td>
                                    <td><input size="10" type="text" name="price"></input></td>
                                </tr>
                                <tr key='Image'>
                                    <td><input type="file" name="item_image" className="process_upload-btn" onChange={(e) => { this.uploadImage(e) }} />
                                    </td>
                                </tr>
                                <tr>
                                    <td><button className="btn btn-success" type="submit">Add Item</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        );
    }
}

export default FoodItemDetails;
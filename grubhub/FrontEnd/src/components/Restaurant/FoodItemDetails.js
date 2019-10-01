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
            itemdetails: {},
            image: ''
        }
        this.deleteItem = this.deleteItem.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
    }

    componentDidMount() {
        const { item_id } = this.props.match.params
        const data = {
            item_id: item_id
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        let token = localStorage.getItem('token');
        const backendurl = 'http://' + properties.backendhost + ':3001/restaurant/fooditembyid'
        axios.post(backendurl, data, {
            headers: {
                'Authorization': "bearer " + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
                //update the state with the response data
                this.setState({
                    itemdetails: response.data[0]
                });
            });
    }

    uploadImage = (e) => {
        let image = e.target.files[0];
        this.setState({
            image: image,
        })
    }

    handleUpdate = (e) => {
        e.preventDefault();
        const { item_id } = this.props.match.params;
        let formData = new FormData();
        formData.append('price', e.target.elements.price.value);
        formData.append('name', e.target.elements.name.value);
        formData.append('section', e.target.elements.section.value);
        formData.append('item_id', item_id);
        formData.append('item_image', this.state.image);
       
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        const backendurl = 'http://' + properties.backendhost + ':3001/restaurant/updatefooditem';
        let token = localStorage.getItem('token');
        axios.post(backendurl, formData, {
            headers: {
                'Authorization': "bearer " + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
                this.setState({
                    msg: 'Item updated succesfully'
                })
            });
    }

    deleteItem = (e) => {
        e.preventDefault();
        const { item_id } = this.props.match.params;
        const data = {
            item_id: item_id
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        const backendurl = 'http://' + properties.backendhost + ':3001/restaurant/deletefooditem';
        let token = localStorage.getItem('token');
        axios.post(backendurl, data, {
            headers: {
                'Authorization': "bearer " + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
                this.setState({
                    msg: 'Item deleted succesfully'
                })
            });
    }

    render() {
        let redirectVar = null;
        if (!(cookie.load('cookie'))) {
            redirectVar = <Redirect to="/login" />
        }
        const { item_id } = this.props.match.params;
        let itemdetails = this.state.itemdetails
        let imagepath = 'http://' + properties.backendhost + ':3001/' + itemdetails.item_image;
        return (
            <div className=" container">
                {redirectVar}
                <div className="container">
                    <div className="info">{this.state.msg}</div>
                    <form onSubmit={this.handleUpdate}>
                        <table className="table">
                            <tbody>
                                <tr key = 'Labels'>
                                    <td><b>Item Id</b></td>
                                    <td><b>Name</b></td>
                                    <td><b>Section</b></td>
                                    <td><b>Price</b></td>
                                </tr>
                                <tr key = 'Input'>
                                    <td><input size="10" type="text" name="id" readOnly defaultValue={item_id}></input></td>
                                    <td><input size="25" type="text" name="name" defaultValue={itemdetails.name}></input></td>
                                    <td><input size="25" type="text" name="section" defaultValue={itemdetails.section}></input></td>
                                    <td><input size="10" type="text" name="price" defaultValue={itemdetails.price}></input></td>
                                </tr>
                                <tr key = 'Image'>
                                    <td><input type="file" name="item_image" className="process_upload-btn" onChange={(e) => { this.uploadImage(e) }} />
                                        <img width="100" height="100" src={imagepath} className="process_image" />
                                    </td>      
                                </tr>
                                <tr>
                                    <td><button className="btn btn-success" type="submit">Update Item</button></td>
                                </tr>
                                <tr>
                                    <td><button className="btn btn-danger" onClick={this.deleteItem}>Delete Item</button></td>
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
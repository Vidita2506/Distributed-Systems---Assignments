import React from 'react';

class FoodItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 0,
            errorMsg: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange = (event) => {
        this.setState({
            quantity: event.target.value
        })
    }

    addToCart = () => {
        /* let restname = this.props.restname;
        if (localStorage.getItem('grubhubrestname') && restname !== localStorage.getItem('grubhubrestname')) {
            // handle error here
        }
        localStorage.setItem('grubhubrestname', restname);*/
        let cartItem = {
            id: this.props.fooditem.item_id.toString(),
            name: this.props.fooditem.name,
            quantity: this.state.quantity,
            price: this.props.fooditem.price
        };
        
        let existing_cart_rest_id = localStorage.getItem('cart_restid');
        let current_cart_rest_id = this.props.restid;
        if (existing_cart_rest_id != current_cart_rest_id) {
            /*
            this.setState({
                errorMsg: 'You can only place order for 1 restaurant at a time. Please clear cart before adding items from another restaurant'
            });
            return;*/
            localStorage.removeItem('cart');
            localStorage.removeItem('cart_restid');
        }

        let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
        if (cart.length > 0) {
            let existingCartItem = cart.find(element => element.id === this.props.fooditem.item_id.toString());
            if (existingCartItem) {
                existingCartItem.quantity = parseInt(cartItem.quantity, 10);
            } else {
                cart.push(cartItem);
            }
        } else {
            cart.push(cartItem);
        }
        this.setState({
            quantity: cartItem.quantity
        }) 
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('cart_restid', current_cart_rest_id);
    }

    render() {
        const { fooditem } = this.props;
        return (
            <tr>
                <td>{fooditem.name}</td>
                <td>${fooditem.price}</td>
                <td> 
                    <input type="number" min="0" max="100" value={this.state.quantity} name="quantity" onChange={this.handleInputChange} />
                </td>
                <td>
                <button className="btn btn-success" onClick={this.addToCart}>Add to cart</button>
                </td>
            </tr>
        )
    }
}

export default FoodItem;

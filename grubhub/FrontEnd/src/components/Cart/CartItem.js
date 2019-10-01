import React from 'react';

export default class CartItem extends React.Component {

	constructor(props) {
		super(props);
	}

	render(){
		const { cartItem } = this.props;
		return (
			<tr key={cartItem.name}>
				<td>{cartItem.name}</td>
				<td>${cartItem.price}</td>
				<td>
					<input type="number" value={cartItem.quantity} name="quantity" readOnly/>
				</td>
				<td><button className="btn btn-sm btn-warning float-right" onClick={() => this.props.remove(cartItem)}>Remove from cart</button></td>
			</tr>
		)
	}
}

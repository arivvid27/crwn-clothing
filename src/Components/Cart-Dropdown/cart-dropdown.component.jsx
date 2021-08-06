import React from 'react';
import { connect } from 'react-redux';

import CustomButton from '../Custom-Button/custom-button.component';
import CartItem from '../Cart-Item/cart-item.component';
import { selectCartItems } from '../../Redux/Cart/cart.selectors'; 

import './cart-dropdown.styles.scss';

const CartDropdown = ({ cartItems }) => (
    <div className='cart-dropdown'>
        <div className='cart-items'>
            {cartItems.map(cartitem => (
                <CartItem key={cartitem.id} item={cartitem} />
            ))}
        </div>
        <CustomButton>GO TO CHECKOUT</CustomButton>
    </div>
);

const mapStateToProps = ({ cart: {cartItems} }) => ({
    cartItems
});

export default connect(mapStateToProps)(CartDropdown);
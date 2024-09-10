import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items); // Get items from the Redux store
  const dispatch = useDispatch();

  // 1. Calculate the total amount for all items in the cart
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const itemCost = parseFloat(item.cost.replace('$', '')); // Convert string cost to number
      return total + (itemCost * item.quantity);
    }, 0).toFixed(2); // Keep two decimal places
  };

  // 2. Handle incrementing the item quantity
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // 3. Handle decrementing the item quantity
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      handleRemove(item); // If quantity reaches 1, remove the item from the cart
    }
  };

  // 4. Handle removing an item from the cart
  const handleRemove = (item) => {
    dispatch(removeItem(item.name)); // Dispatch removeItem action using the item's name
  };

  // 5. Calculate the total cost of each item based on its quantity
  const calculateTotalCost = (item) => {
    const itemCost = parseFloat(item.cost.replace('$', '')); // Convert string cost to number
    return (itemCost * item.quantity).toFixed(2); // Return the total cost for the item
  };

  // 6. Continue shopping handler
  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping(); // Call the parent function to return to the plant listing page
  };

  // 7. Optional: Checkout handler (for future functionality)
  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Subtotal: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={handleCheckoutShopping}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;

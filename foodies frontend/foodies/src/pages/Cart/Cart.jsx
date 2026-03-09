import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./Cart.css";
import { Link, useNavigate } from "react-router-dom";
import { calculateCartTotals } from "../../util/cartUtils";

const Cart = () => {
  const navigate = useNavigate();
  const { foodList, increaseQty, decreaseQty, quantities, removeFromCart } =
    useContext(StoreContext);
  const cartItems = foodList.filter((food) => quantities[food.id] > 0);
  const { subtotal, shipping, tax, total } = calculateCartTotals(cartItems, quantities);

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Your Shopping Cart</h1>
        {cartItems.length === 0 && <p className="empty-cart-message">Your cart is empty</p>}
      </div>

      <div className="cart-content">
        <div className="cart-items-section">
          {cartItems.length > 0 && (
            <div className="cart-items-card">
              {cartItems.map((food) => (
                <div key={food.id} className="cart-item">
                  <div className="cart-item-image">
                    <img
                      src={food.imageUrl}
                      alt={food.name}
                      className="food-image"
                    />
                  </div>
                  <div className="cart-item-details">
                    <h3 className="food-name">{food.name}</h3>
                    <p className="food-category">{food.category}</p>
                  </div>
                  <div className="cart-item-quantity">
                    <button
                      className="quantity-btn"
                      onClick={() => decreaseQty(food.id)}
                      disabled={quantities[food.id] <= 1}
                    >
                      −
                    </button>
                    <span className="quantity-value">{quantities[food.id]}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => increaseQty(food.id)}
                    >
                      +
                    </button>
                  </div>
                  <div className="cart-item-price">
                    <span className="price">${(food.price * quantities[food.id]).toFixed(2)}</span>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(food.id)}
                      aria-label="Remove item"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <Link to="/" className="continue-shopping-btn">
            <i className="bi bi-arrow-left"></i> Continue Shopping
          </Link>
        </div>

        {cartItems.length > 0 && (
          <div className="order-summary">
            <div className="summary-card">
              <h2>Order Summary</h2>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button
                className="checkout-btn"
                onClick={() => navigate("/order")}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
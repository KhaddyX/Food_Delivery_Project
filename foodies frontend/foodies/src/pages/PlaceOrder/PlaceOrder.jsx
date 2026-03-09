import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { calculateCartTotals } from "../../util/cartUtils";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../service/orderService";
import { clearCartItems } from "../../service/cartService";

const PlaceOrder = () => {
  const { foodList, quantities, setQuantities, token } = useContext(StoreContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    state: "",
    city: "",
    zip: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const orderData = {
      userAddress: `${data.firstName} ${data.lastName}, ${data.address}, ${data.city}, ${data.state}, ${data.zip}`,
      phoneNumber: data.phoneNumber,
      email: data.email,
      orderedItems: cartItems.map((item) => ({
        foodId: item.foodId,
        quantity: quantities[item.id],
        price: item.price * quantities[item.id],
        category: item.category,
        imageUrl: item.imageUrl,
        description: item.description,
        name: item.name,
      })),
      amount: total.toFixed(2),
      orderStatus: "Preparing",
    };

    try {
      const response = await createOrder(orderData, token);
      if (response.authorizationUrl && response.paymentReference) {
        try {
          await clearCartItems(token, setQuantities);
        } catch (clearError) {
          toast.warn("Order placed, but we couldn't clear your cart. Please refresh.");
        }
        initiatePaystackPayment(response);
      } else {
        toast.error("Unable to place order. Please try again.");
      }
    } catch (error) {
      toast.error("Unable to place order. Please try again.");
    }
  };

  const initiatePaystackPayment = (order) => {
    setLoading(true);
    // Open Paystack checkout in a new tab
    window.location.href = order.authorizationUrl;
    // Optionally: You can use Paystack inline script here instead if you want popup
  };

  const cartItems = foodList.filter((food) => quantities[food.id] > 0);
  const { subtotal, shipping, tax, total } = calculateCartTotals(cartItems, quantities);

  return (
    <div className="place-order-container">
      <div className="order-header">
        <img src={assets.logo} alt="Logo" className="order-logo" />
        <h1>Checkout</h1>
      </div>

      <div className="order-content">
        {/* Billing Address Form */}
        <div className="order-form-section">
          <div className="form-card">
            <h2>Billing Information</h2>
            <form onSubmit={onSubmitHandler}>
              <div className="form-grid">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={data.firstName}
                    onChange={onChangeHandler}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={data.lastName}
                    onChange={onChangeHandler}
                    required
                  />
                </div>
                <div className="form-group full-width">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={onChangeHandler}
                    required
                  />
                </div>
                <div className="form-group full-width">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={data.phoneNumber}
                    onChange={onChangeHandler}
                    required
                  />
                </div>
                <div className="form-group full-width">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={data.address}
                    onChange={onChangeHandler}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    value={data.city}
                    onChange={onChangeHandler}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>State</label>
                  <input
                    type="text"
                    name="state"
                    value={data.state}
                    onChange={onChangeHandler}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>ZIP Code</label>
                  <input
                    type="text"
                    name="zip"
                    value={data.zip}
                    onChange={onChangeHandler}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="checkout-btn" disabled={cartItems.length === 0 || loading}>
                {loading ? 'Redirecting...' : 'Proceed to Payment'}
              </button>
            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div className="order-summary-section">
          <div className="summary-card">
            <h2>Order Summary</h2>
            <div className="order-items">
              {cartItems.map((item) => (
                <div key={item.id} className="order-item">
                  <div className="item-info">
                    <span className="item-name">{item.name}</span>
                    <span className="item-quantity">Qty: {quantities[item.id]}</span>
                  </div>
                  <span className="item-price">${(item.price * quantities[item.id]).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>${subtotal === 0 ? 0.0 : shipping.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Tax (10%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;

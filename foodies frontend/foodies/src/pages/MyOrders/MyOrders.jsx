import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";
import { fetchUserOrders } from "../../service/orderService";
import { FaCheckCircle, FaTimesCircle, FaRedo } from "react-icons/fa";
import "./MyOrders.css"; // Import the provided CSS

const MyOrders = () => {
  const { token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await fetchUserOrders(token);
    setData(response);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders-container">
      <div className="orders-card">
        <div className="orders-header">
          <h2>My Orders</h2>
          <p>View your order history and status</p>
        </div>

        {data.length === 0 ? (
          <div className="empty-orders">
            <img
              src={assets.empty_cart}
              alt="Empty Cart"
              className="empty-icon animate-shake"
            />
            <h3>No Orders Yet</h3>
            <p>Your order history will appear here</p>
          </div>
        ) : (
          <div className="orders-table-container">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Items Count</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((order, index) => (
                  <tr key={index} className="order-row">
                    <td className="order-items">
                      {order.orderedItems.map((item, idx) => (
                        <span key={idx}>
                          {item.name} × {item.quantity}
                          {idx < order.orderedItems.length - 1 && ", "}
                        </span>
                      ))}
                    </td>
                    <td className="order-total">${order.amount.toFixed(2)}</td>
                    <td className="item-count">{order.orderedItems.length}</td>
                    <td>
                      <span
                        className={`status-badge ${order.orderStatus.toLowerCase()}`}
                      >
                        {order.orderStatus === "Delivered" ? (
                          <FaCheckCircle className="status-icon" />
                        ) : order.orderStatus === "Pending" ? (
                          <FaRedo className="status-icon animate-spin-slow" />
                        ) : (
                          <FaTimesCircle className="status-icon" />
                        )}
                        {order.orderStatus}
                      </span>
                    </td>
                    <td>
                      <button className="refresh-btn" onClick={fetchOrders}>
                        <FaRedo className="refresh-icon animate-spin-slow" />
                        Refresh
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { fetchAllOrders, updateOrderStatus } from "../../services/orderService";
import { toast } from "react-toastify";
import "./Orders.css"; // Create this CSS file

const Orders = () => {
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await fetchAllOrders();
      setData(response);
    } catch (error) {
      toast.error("Unable to display the orders. Please try again.");
    }
  };

  const updateStatus = async (event, orderId) => {
    const success = await updateOrderStatus(orderId, event.target.value);
    if (success) await fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="orders-container">
      <div className="row justify-content-center py-4">
        <div className="col-12 col-lg-11">
          <div className="orders-card">
            <h3 className="orders-header">Orders Management</h3>
            <div className="table-responsive">
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Details</th>
                    <th>Amount</th>
                    <th>Items</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 ? (
                    data.map((order, index) => (
                      <tr key={index} className="order-row">
                        <td>
                          <img 
                            src={assets.parcel} 
                            alt="Order" 
                            className="order-icon"
                          />
                        </td>
                        <td>
                          <div className="order-items">
                            {order.orderedItems.map((item, idx) => (
                              <span key={idx}>
                                {item.name} × {item.quantity}
                                {idx !== order.orderedItems.length - 1 && ", "}
                              </span>
                            ))}
                          </div>
                          <div className="order-address">
                            {order.userAddress}
                          </div>
                        </td>
                        <td className="order-amount">
                          ${order.amount.toFixed(2)}
                        </td>
                        <td className="item-count">
                          {order.orderedItems.length}
                        </td>
                        <td>
                          <select
                            className={`status-select ${order.orderStatus.toLowerCase().replace(/\s+/g, '-')}`}
                            onChange={(event) => updateStatus(event, order.id)}
                            value={order.orderStatus}
                          >
                            <option value="Food Preparing">Food Preparing</option>
                            <option value="Out for delivery">Out for delivery</option>
                            <option value="Delivered">Delivered</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="no-orders">
                      <td colSpan="5" className="text-center py-5">
                        <img src={assets.parcel} alt="No orders" className="empty-icon" />
                        <p className="mt-3">No orders found</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
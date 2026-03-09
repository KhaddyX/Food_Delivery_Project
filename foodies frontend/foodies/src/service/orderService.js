import axios from "axios";

const API_URL = "http://localhost:9090/api/orders";

export const fetchUserOrders = async (token) => {
    try {
        const response = await axios.get(API_URL, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error('Error occurred while fetching the orders', error);
        throw error;
    }
}

export const createOrder = async (orderData, token) => {
    try {
        const response = await axios.post(
            API_URL + "/create",
            orderData,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        // Paystack: Return authorization URL & reference from backend
        return {
            authorizationUrl: response.data.authorizationUrl,
            paymentReference: response.data.paymentReference
        };
    } catch (error) {
        console.error('Error occurred while creating the order', error);
        throw error;
    }
}

// You don’t need to verify on frontend with Paystack like you did with Razorpay
// Instead, Paystack sends a webhook to backend, and backend updates order status

export const deleteOrder = async (orderId, token) => {
    try {
        await axios.delete(API_URL + "/" + orderId, {
            headers: { Authorization: `Bearer ${token}` },
        });
    } catch (error) {
        console.error('Error occurred while deleting the order', error);
        throw error;
    }
}

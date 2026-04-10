import React, { useEffect, useState } from 'react';
import API from '../api';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const userId = localStorage.getItem('userId'); // Retrieve the saved User ID

    useEffect(() => {
        const fetchOrders = async () => {
            console.log('Fetching orders for userId:', userId);
            try {
                const res = await API.get(`/orders/user/${userId}`);
                console.log('Orders response:', res.data);
                setOrders(res.data);
            } catch (err) {
                console.error("Error fetching orders:", err);
                console.error("Error response:", err.response?.data);
            }
        };
        if (userId) {
            fetchOrders();
        } else {
            console.log('No userId found in localStorage');
        }
    }, [userId]);

    // Inside the Orders component
    const cancelOrder = async (orderId) => {
        if (window.confirm("Are you sure you want to cancel this order?")) {
            try {
                await API.delete(`/orders/${orderId}`);
                // Filter out the deleted order from the screen so it disappears instantly
                setOrders(orders.filter(order => order._id !== orderId));
                alert("Order cancelled.");
            } catch (err) {
                alert("Could not cancel order.");
            }
        }
    };

    return (
        <div className="container py-4">
            <h2 className="mb-4 fw-bold">My Order History</h2>
            {orders.length === 0 ? (
                <div className="alert alert-info">
                    You haven't placed any orders yet. <a href="/" className="alert-link">Go to Menu</a> to order some food!
                </div>
            ) : (
                <div className="row g-3">
                    {orders.map(order => (
                        <div key={order._id} className="col-12">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                        <div>
                                            <h5 className="card-title mb-1">Order #{order._id.slice(-6).toUpperCase()}</h5>
                                            <small className="text-muted">{new Date(order.createdAt).toLocaleDateString()}</small>
                                        </div>
                                        <span className={`badge ${order.status === 'Pending' ? 'bg-warning text-dark' : 'bg-success'}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    
                                    <p className="card-text">
                                        <strong>Total:</strong> <span className="text-danger fw-bold fs-5">₹{order.totalAmount}</span>
                                    </p>
                                    
                                    <hr />
                                    
                                    <h6 className="mb-2">Items:</h6>
                                    <ul className="list-unstyled mb-3">
                                        {order.items.map((item, index) => (
                                            <li key={index} className="d-flex justify-content-between py-1 border-bottom">
                                                <span>{item.name}</span>
                                                <span className="text-muted">₹{item.price}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    
                                    {order.status === 'Pending' && (
                                        <button 
                                            onClick={() => cancelOrder(order._id)}
                                            className="btn btn-danger btn-sm"
                                        >
                                            Cancel Order
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;

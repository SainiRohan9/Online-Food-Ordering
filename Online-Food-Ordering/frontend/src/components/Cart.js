import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import API from '../api';

const Cart = () => {
    const { cart, addToCart, removeFromCart } = useCart();
    const navigate = useNavigate();
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('COD');
    
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const userId = localStorage.getItem('userId');

    const handleCheckout = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert("Please login first to place an order!");
            navigate('/login');
            return;
        }

        if (!address) {
            return alert("Please enter a delivery address");
        }

        const orderData = {
            userId: userId,
            items: cart.map(item => ({ foodId: item._id, name: item.name, price: item.price })),
            totalAmount: total,
            address: address,
            paymentMethod: paymentMethod,
            status: "Pending"
        };

        try {
            console.log('Sending order data:', orderData);
            const response = await API.post('/orders/place', orderData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Order response:', response.data);
            alert(`Order Placed! Payment via ${paymentMethod}`);
            navigate('/orders');
        } catch (err) {
            console.error('Checkout error:', err);
            console.error('Error response:', err.response?.data);
            alert("Checkout Failed: " + (err.response?.data?.error || err.message));
        }
    };

    return (
        <div className="container py-4">
            <h2 className="mb-4 fw-bold">Your Shopping Cart</h2>
            {cart.length === 0 ? (
                <div className="alert alert-info">
                    Your cart is empty. <a href="/home" className="alert-link">Browse menu</a> to add items!
                </div>
            ) : (
                <div className="row">
                    <div className="col-md-8">
                        <div className="card shadow-sm p-3 mb-3">
                            {cart.map((item) => (
                                <div key={item._id} className="d-flex align-items-center justify-content-between border-bottom py-3">
                                    <div className="d-flex align-items-center">
                                        <img src={item.image} alt={item.name} className="rounded" width="60" height="60" />
                                        <div className="ms-3">
                                            <h6 className="mb-0">{item.name}</h6>
                                            <small className="text-muted">₹{item.price} each</small>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <button className="btn btn-sm btn-outline-secondary" onClick={() => removeFromCart(item._id)}>-</button>
                                        <span className="mx-3 fw-bold">{item.quantity}</span>
                                        <button className="btn btn-sm btn-outline-secondary" onClick={() => addToCart(item)}>+</button>
                                        <span className="ms-4 fw-bold text-dark">₹{item.price * item.quantity}</span>
                                    </div>
                                </div>
                            ))}
                            <div className="mt-3 text-end">
                                <h5>Subtotal: <span className="text-danger">₹{total}</span></h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card shadow-sm p-3">
                            <h5 className="mb-3">Delivery Details</h5>
                            <textarea 
                                className="form-control mb-3" 
                                rows="3"
                                placeholder="Enter full address in Rajkot..." 
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            
                            <h5 className="mb-3">Payment Method</h5>
                            <select 
                                className="form-select mb-3" 
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            >
                                <option value="COD">Cash on Delivery</option>
                                <option value="UPI">UPI / QR Code</option>
                                <option value="Card">Credit/Debit Card</option>
                            </select>

                            <button 
                                className="btn btn-success w-100 btn-lg" 
                                onClick={handleCheckout}
                            >
                                Pay ₹{total} & Place Order
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
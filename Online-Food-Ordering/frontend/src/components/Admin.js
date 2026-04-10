import React, { useState, useEffect } from 'react';
import API from '../api';

const Admin = () => {
    const [stats, setStats] = useState({ totalOrders: 0, totalEarnings: 0, statusCounts: {} });
    const [food, setFood] = useState({ name: '', description: '', price: '', image: '', category: '' });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await API.get('/orders/admin/stats');
                setStats(res.data);
            } catch (err) {
                console.error('Failed to fetch stats:', err);
            }
        };
        fetchStats();
    }, []);

    const handleAddFood = async (e) => {
        e.preventDefault();
        try {
            await API.post('/food/add', food);
            alert("New Food Item Added!");
            setFood({ name: '', description: '', price: '', image: '', category: '' }); // Clear form
        } catch (err) {
            alert("Failed to add food");
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4 fw-bold text-primary">Admin Dashboard</h2>

            {/* Stats Overview */}
            <div className="row mb-5">
                <div className="col-md-4 mb-3">
                    <div className="card bg-primary text-white shadow-sm p-3">
                        <h6>Total Revenue</h6>
                        <h3>₹{stats.totalEarnings}</h3>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card bg-success text-white shadow-sm p-3">
                        <h6>Total Orders</h6>
                        <h3>{stats.totalOrders}</h3>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card bg-warning text-dark shadow-sm p-3">
                        <h6>Pending Orders</h6>
                        <h3>{stats.statusCounts.Pending || 0}</h3>
                    </div>
                </div>
            </div>

            {/* Add Food Form (Restyled) */}
            <div className="card shadow-sm p-4 mb-5">
                <h4 className="mb-3">Add New Menu Item</h4>
                <form className="row g-3" onSubmit={handleAddFood}>
                    <div className="col-md-6">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Food Name" 
                            value={food.name}
                            onChange={(e) => setFood({...food, name: e.target.value})}
                            required 
                        />
                    </div>
                    <div className="col-md-6">
                        <input 
                            type="number" 
                            className="form-control" 
                            placeholder="Price (₹)" 
                            value={food.price}
                            onChange={(e) => setFood({...food, price: e.target.value})}
                            required 
                        />
                    </div>
                    <div className="col-12">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Description" 
                            value={food.description}
                            onChange={(e) => setFood({...food, description: e.target.value})}
                            required 
                        />
                    </div>
                    <div className="col-12">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Image URL" 
                            value={food.image}
                            onChange={(e) => setFood({...food, image: e.target.value})}
                            required 
                        />
                    </div>
                    <div className="col-12">
                        <select 
                            className="form-select"
                            value={food.category} 
                            onChange={(e) => setFood({...food, category: e.target.value})} 
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="Pizza">Pizza</option>
                            <option value="Burger">Burger</option>
                            <option value="Chinese">Chinese</option>
                            <option value="Gujarati">Gujarati</option>
                        </select>
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-dark w-100">Add Item</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Admin;

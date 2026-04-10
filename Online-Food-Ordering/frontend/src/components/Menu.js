import React, { useEffect, useState } from 'react';
import API from '../api';
import { useCart } from '../context/CartContext';

const Menu = () => {
    const [foods, setFoods] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const { addToCart } = useCart();
    
    // Review form state
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [selectedFood, setSelectedFood] = useState(null);
    const [reviewData, setReviewData] = useState({ rating: 5, comment: '' });

    useEffect(() => {
        const fetchMenu = async () => {
            const res = await API.get('/food/menu');
            setFoods(res.data);
        };
        fetchMenu();
    }, []);

    // 2. Powerful Double-Filter Logic
    const filteredFoods = foods.filter(item => {
        const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const openReviewForm = (food) => {
        setSelectedFood(food);
        setShowReviewForm(true);
        setReviewData({ rating: 5, comment: '' });
    };

    const submitReview = async () => {
        const username = localStorage.getItem('userId') || 'Anonymous';
        try {
            await API.post(`/food/${selectedFood._id}/reviews`, {
                username,
                rating: Number(reviewData.rating),
                comment: reviewData.comment
            });
            alert("Review Submitted!");
            setShowReviewForm(false);
            const res = await API.get('/food/menu');
            setFoods(res.data);
        } catch (err) {
            alert("Failed to submit review");
        }
    };

    const renderStars = (rating) => {
        const stars = Math.round(rating || 0);
        return '★'.repeat(stars) + '☆'.repeat(5 - stars);
    };

    return (
        <div className="container py-4">
            <h2 className="mb-4 text-center fw-bold">Our Menu</h2>

            {/* Search Input */}
            <div className="mb-4">
                <input 
                    type="text" 
                    className="form-control form-control-lg"
                    placeholder="Search for food (e.g. Pizza)..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Category Buttons */}
            <div className="d-flex gap-2 mb-4 flex-wrap justify-content-center">
                {['All', 'Pizza', 'Burger', 'Chinese', 'Gujarati'].map(cat => (
                    <button 
                        key={cat} 
                        className={`btn ${activeCategory === cat ? 'btn-danger' : 'btn-outline-secondary'}`}
                        onClick={() => setActiveCategory(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Food Grid - Bootstrap Cards */}
            <div className="row g-4">
                {filteredFoods.length > 0 ? filteredFoods.map(item => (
                    <div key={item._id} className="col-md-4 col-lg-3">
                        <div className="card h-100 shadow-sm">
                            <img src={item.image} alt={item.name} className="card-img-top" style={{ height: '180px', objectFit: 'cover' }} />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title fw-bold">{item.name}</h5>
                                <div className="mb-2">
                                    <span className="text-warning fs-5">{renderStars(item.rating)}</span>
                                    <small className="text-muted ms-2">({item.numReviews || 0} reviews)</small>
                                </div>
                                <p className="card-text text-muted flex-grow-1">{item.description}</p>
                                <p className="card-text fs-5 fw-bold text-success">₹{item.price}</p>
                                <div className="d-grid gap-2">
                                    <button onClick={() => addToCart(item)} className="btn btn-success">Add to Cart</button>
                                    <button onClick={() => openReviewForm(item)} className="btn btn-outline-primary btn-sm">Write Review</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="col-12 text-center py-5">
                        <p className="text-muted fs-5">No food found matching your search.</p>
                    </div>
                )}
            </div>

            {showReviewForm && selectedFood && (
                <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Review: {selectedFood.name}</h5>
                                <button type="button" className="btn-close" onClick={() => setShowReviewForm(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Rating</label>
                                    <select className="form-select" value={reviewData.rating} onChange={(e) => setReviewData({...reviewData, rating: e.target.value})}>
                                        {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Stars</option>)}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Comment</label>
                                    <textarea className="form-control" rows="3" value={reviewData.comment} onChange={(e) => setReviewData({...reviewData, comment: e.target.value})} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowReviewForm(false)}>Cancel</button>
                                <button className="btn btn-primary" onClick={submitReview}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Menu;

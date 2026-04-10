import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import Menu from './components/Menu';
import Cart from './components/Cart';
import Admin from './components/Admin';
import Orders from './components/Orders';
import Profile from './components/Profile';

function AppContent() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
    window.location.reload();
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-danger shadow-sm mb-4">
        <div className="container">
          <Link className="navbar-brand fw-bold" to={token ? "/home" : "/"}>🍕 Rajkot Eats</Link>
          <div className="navbar-nav ms-auto">
            {token ? (
              <>
                <Link className="nav-link" to="/home">Menu</Link>
                <Link className="nav-link" to="/cart">Cart</Link>
                <Link className="nav-link" to="/orders">My Orders</Link>
                <Link className="nav-link" to="/profile">👤 Profile</Link>
                <button className="btn btn-sm btn-outline-light ms-2" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <Link className="nav-link" to="/">Login / Register</Link>
            )}
          </div>
        </div>
      </nav>

      <div className="container-fluid p-0">
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/home" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

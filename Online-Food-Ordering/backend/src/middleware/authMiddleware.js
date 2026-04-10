const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Get token from "Bearer <token>"
    
    if (!token) return res.status(401).json({ message: "Not authorized, no token" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id; // Add user ID to the request object
        next();
    } catch (error) {
        res.status(401).json({ message: "Token failed" });
    }
};

module.exports = { protect };

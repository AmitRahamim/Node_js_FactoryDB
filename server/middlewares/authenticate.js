// authenticate.js
const User = require('../models/user'); // ו

async function authenticate(req, res, next) {
    
    const userId = req.headers['x-user-id']; 
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized: User ID is missing" });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }

        req.user = user; 
        next();
    } catch (error) {
        console.error("Error in authenticate middleware:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = authenticate;

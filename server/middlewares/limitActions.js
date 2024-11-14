const User = require('../models/user');

async function limitActions(req, res, next) {
    try {
        // Make sure the user ID exists
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: "Unauthorized: User ID is missing" });
        }

        const userId = req.user._id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if we need to reset the daily action count
        const currentDate = new Date();
        if (user.lastActionDate) {
            const lastActionDate = new Date(user.lastActionDate);
            // If 24 hours have passed since the last action, reset the actions count
            if (currentDate - lastActionDate >= 24 * 60 * 60 * 1000) { // 24 hours
                user.NumOfActionsLeft = user.NumOfActions; // Reset actions
                user.lastActionDate = currentDate; // Update the last action date to now
            }
        }

        // If the daily action limit is reached, reject the request
        if (user.NumOfActionsLeft <= 0) {
            return res.status(403).json({ message: "Daily action limit reached. Please try again tomorrow." });
        }

        // If allowed, reduce the number of actions left and update last action date
        user.NumOfActionsLeft -= 1;
        user.lastActionDate = currentDate; // Update the date of the last action
        await user.save();

        next(); // Proceed with the next middleware or action
    } catch (error) {
        console.error("Error in limitActions middleware:", error.message);
        res.status(500).json({ message: error.message });
    }
}

module.exports = limitActions;

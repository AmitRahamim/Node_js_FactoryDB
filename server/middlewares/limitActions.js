// limitActions.js
const User = require('../models/user');

async function limitActions(req, res, next) {
    try {
        // ודא שה- userId קיים
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: "Unauthorized: User ID is missing" });
        }

        const userId = req.user._id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // בדוק אם יש לאפס את כמות הפעולות
        const currentDate = new Date();
        if (user.lastActionDate) {
            const lastActionDate = new Date(user.lastActionDate);
            // אם חלף יום מאז הפעולה האחרונה, איפס את מספר הפעולות
            if (currentDate - lastActionDate >= 24 * 60 * 60 * 1000) { // 24 שעות
                user.NumOfActionsLeft = user.NumOfActions; // איפוס
            }
        }

        // בדוק אם כמות הפעולות היומיות נגמרה
        if (user.NumOfActionsLeft <= 0) {
            return res.status(403).json({ message: "Daily action limit reached. Please try again tomorrow." });
        }

        // אם הפעולה מותרת, עדכן את כמות הפעולות ואת תאריך הפעולה האחרונה
        user.NumOfActionsLeft -= 1;
        user.lastActionDate = currentDate; // עדכון לתאריך הנוכחי
        await user.save();

        next(); // המשך לפעולה הבאה אם לא הגעת למגבלה
    } catch (error) {
        console.error("Error in limitActions middleware:", error.message);
        res.status(500).json({ message: error.message });
    }
}

module.exports = limitActions;

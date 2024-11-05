// authenticate.js
const User = require('../models/user'); // ודא שהמיקום נכון

async function authenticate(req, res, next) {
    // במקרה שלך, נוכל לבדוק את ה-userId שמגיע מהבקשה
    const userId = req.headers['x-user-id']; // נניח שה-userId יגיע מכותרת הבקשה
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized: User ID is missing" });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }

        req.user = user; // הוספת המשתמש ל-req כדי לאפשר גישה ב-limitActions
        next();
    } catch (error) {
        console.error("Error in authenticate middleware:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = authenticate;

// auth.js
const loginUrl = 'https://jsonplaceholder.typicode.com/users';
const userUrl = 'http://localhost:3000/User';
const tokenKey = 'jwtToken';
const userKey = 'userInfo';

// auth.js
async function login(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;

    try {
        // בקשה ל-API החיצוני
        const response = await fetch(loginUrl);
        const users = await response.json();
        console.log("Users from external API:", users);

        // בקשה למסד הנתונים המקומי
        const responsedb = await fetch(userUrl);
        const usersdb = await responsedb.json();
        console.log("Users from local database:", usersdb);

        // בדיקת קרדיטנשלס מול ה-API החיצוני
        const user = users.find(user => user.username === username && user.email === email);
        console.log("User found in external API:", user);

        if (user) {
            // חיפוש במסד הנתונים המקומי לפי שם מלא
            const tempuser = usersdb.find(x => x.FullName === user.name);
            console.log("User found in local database:", tempuser);

            if (!tempuser) {
                showError("User not found in local database.");
                return;
            }

            // בקשת סטטוס הפעולות מהשרת המקומי לפי ObjectId
            const userStatusResponse = await fetch(`http://localhost:3000/User/status/${tempuser._id}`);
            const statusData = await userStatusResponse.json();
            console.log("Status data:", statusData);

            if (!statusData.canLogin) {
                alert("You've reached your daily action limit. Please try again tomorrow.");
                return;
            }

            // שמירת המידע על המשתמש ב-sessionStorage
            const userInfo = {
                id: tempuser._id, // שים לב שמירה של ה-userId
                name: tempuser.FullName
            };
            sessionStorage.setItem(tokenKey, generateToken({ id: tempuser._id, name: tempuser.FullName }));
            sessionStorage.setItem(userKey, JSON.stringify(userInfo)); // שמירת המידע על המשתמש

            // ניתוב לעמוד הבית
            window.location.href = './home.html';
        } else {
            showError("Invalid credentials, please try again.");
        }
    } catch (error) {
        console.error("Error during login:", error);
        showError("Error connecting to the server.");
    }
}

function generateToken(payload) {
    // Generate a simple base64 token for demo purposes
    return btoa(JSON.stringify(payload));
}

function showError(message) {
    document.getElementById('error').textContent = message;
}

function logOut() {
    sessionStorage.removeItem(tokenKey);
    sessionStorage.removeItem(userKey);
    window.location.href = 'login.html';
}

function isAuthenticated() {
    return !!sessionStorage.getItem(tokenKey);
}

function displayUserFullName() {
    const user = JSON.parse(sessionStorage.getItem(userKey));
    if (user && user.name) {
        document.getElementById('userFullName').textContent = `Welcome, ${user.name}`;
    }
}

// Call displayUserFullName on pages where the user's name should be displayed.

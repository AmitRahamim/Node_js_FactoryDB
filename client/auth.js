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
<<<<<<< HEAD
        // Fetch users from the external API
        const response = await fetch(loginUrl);
        const users = await response.json();

        // Fetch users from the local database
=======
        const response = await fetch(loginUrl);
        const users = await response.json();

>>>>>>> origin/main
        const responsedb = await fetch(userUrl);
        const usersdb = await responsedb.json();

        const user = users.find(user => user.username === username && user.email === email);

        if (user) {
            const tempuser = usersdb.find(x => x.FullName === user.name);

            if (!tempuser) {
                showError("User not found in local database.");
                return;
            }

<<<<<<< HEAD
            // Fetch user status (canLogin) from the server
            const userStatusResponse = await fetch(`http://localhost:3000/User/status/${tempuser._id}`);
            const statusData = await userStatusResponse.json();

            console.log("Status data:", statusData);
=======
            // Fetch the status of the user
            const userStatusResponse = await fetch(`http://localhost:3000/User/status/${tempuser._id}`);
            const statusData = await userStatusResponse.json();
>>>>>>> origin/main

            // Check if the user can log in
            if (!statusData.canLogin) {
                alert("You've reached your daily action limit. Please try again tomorrow.");
                return;
            }

<<<<<<< HEAD
            const userInfo = {
                id: tempuser._id, 
                name: tempuser.FullName
            };

            // Store token and user information in sessionStorage
            sessionStorage.setItem(tokenKey, generateToken({ id: tempuser._id, name: tempuser.FullName }));
            sessionStorage.setItem(userKey, JSON.stringify(userInfo));

=======
            // Store user information in session storage
            const userInfo = {
                id: tempuser._id,
                name: tempuser.FullName
            };
            sessionStorage.setItem(tokenKey, generateToken({ id: tempuser._id, name: tempuser.FullName }));
            sessionStorage.setItem(userKey, JSON.stringify(userInfo));

>>>>>>> origin/main
            // Redirect to home page
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

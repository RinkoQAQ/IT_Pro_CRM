// Define the API endpoint for authentication
const API_ENDPOINT = 'https://personalcrmbackend-042e5db40ee3.herokuapp.com';

// Login form submission event handler
document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    try {
        const response = await fetch(`${API_ENDPOINT}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        if (response.status === 200) {
            // Login successful, perform page redirection
            alert("Login successful :)");
            window.location.href = "contacts-list.html"; // Redirect to contacts-list.html
        } else if (response.status === 401) {
            alert("Username not found or incorrect password");
        } else {
            alert("Login failed");
        }
    } catch (error) {
        console.error("Error:", error);
    }
});

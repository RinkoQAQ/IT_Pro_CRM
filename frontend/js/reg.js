// Define the API endpoint for user registration
const API_ENDPOINT = 'https://personalcrmbackend-042e5db40ee3.herokuapp.com';

// Registration form submission event handler
document.getElementById("registration-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("registration-username").value;
    const password = document.getElementById("registration-password").value;

    try {
        const response = await fetch(`${API_ENDPOINT}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        if (response.status === 201) {
            // Registration successful, perform page redirection
            alert("Registration successful");
            window.location.href = "contacts-list.html"; // Redirect to contacts-list.html
        } else if (response.status === 400) {
            alert("Username already exists");
        } else {
            alert("Registration failed");
        }
    } catch (error) {
        console.error("Error:", error);
    }
});

// const API_ENDPOINT = 'https://personalcrm-8904b53adc96.herokuapp.com';

const API_ENDPOINT = 'https://personalcrmbackend-042e5db40ee3.herokuapp.com';

// 注册表单提交事件处理程序
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
            alert("Registration successful");
            window.location.href = "contacts-list.html";
        } else if (response.status === 400) {
            alert("Username already exists");
        } else {
            alert("Registration failed");
        }
    } catch (error) {
        console.error("Error:", error);
    }
});
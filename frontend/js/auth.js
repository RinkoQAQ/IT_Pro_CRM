const API_ENDPOINT = 'https://personalcrm-8904b53adc96.herokuapp.com';

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

// 登录表单提交事件处理程序
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
            // 登录成功，执行页面重定向
            alert("Login successful :)");
            window.location.href = "contacts-list.html"; // 重定向到 contacts-list.html
        } else if (response.status === 401) {
            alert("Username not found or incorrect password");
        } else {
            alert("Login failed");
        }
    } catch (error) {
        console.error("Error:", error);
    }
});

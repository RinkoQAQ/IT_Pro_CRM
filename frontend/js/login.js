// const API_ENDPOINT = 'https://personalcrm-8904b53adc96.herokuapp.com';

const API_ENDPOINT = 'https://personalcrmbackend-042e5db40ee3.herokuapp.com/';

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
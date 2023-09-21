$(document).ready(function() {
    // const API_ENDPOINT = 'http://localhost:3000/customers';
    // const API_ENDPOINT = 'https://personalcrm-8904b53adc96.herokuapp.com/customers';
    const API_ENDPOINT = 'https://personalcrmbackend-042e5db40ee3.herokuapp.com/customers';

    // 使用此函数从URL中提取参数
    function getParameterByName(name, url = window.location.href) {
        name = name.replace(/[\[\]]/g, '\\$&');
        const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    const customerId = getParameterByName('customerId');

    if (customerId) {
        // 使用这个ID从你的后端API获取数据
        fetch(`${API_ENDPOINT}/${customerId}`)
            .then(response => response.json())
            .then(customer => {
                // 使用返回的客户数据填充表单字段
                // 假设你的表单字段的ID分别是nameField, phoneField等...
                document.getElementById('nameField').value = customer.name || '';
                document.getElementById('phoneField').value = customer.phone || '';
                document.getElementById('emailField').value = customer.email || '';
                // document.getElementById('addressField').value = customer.address || ''; // 还没有做address！
                document.getElementById('notesField').value = customer.notes || '';
                document.getElementById('groupField').value = customer.group || '';
                document.getElementById('birthdayField').value = customer.birthday || '';
                document.getElementById('companyField').value = customer.company || '';

                // // 处理图片预览？
                // if (customer.profilePicture) {
                //     // 显示已存在的图片
                //     $('#previewImage').attr('src', customer.profilePicture);
                // }
            })
            .catch(error => {
                console.error("Error fetching customer data:", error);
            });

        
        
    }
    
    // 表单提交事件的监听器
    $('form').on('submit', function(event) {
        event.preventDefault(); // 防止默认提交行为

        const formData = {
            name: $('#nameField').val(),
            email: $('#emailField').val(),
            phone: $('#phoneField').val(),
            // address: $('#addressField').val(),  // 注释掉，因为没有这个字段
            notes: $('#notesField').val(),
            group: $('#groupField').val(),
            birthday: $('#birthdayField').val(),
            company: $('#companyField').val(),
            // profilePicture: $('#profilePictureField').val() // 需要其他方法处理文件上传
        };

        if (customerId) {
            // 更新现有客户
            fetch(`${API_ENDPOINT}/${customerId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Customer updated:', data);
                alert('Customer updated successfully!'); // 显示提示
                window.location.href = "contacts-list.html";
                // setTimeout(() => { // 延迟2秒
                //     window.location.href = "contacts-list.html";
                // }, 2000);
            })
            .catch(error => {
                console.error('Error updating customer:', error);
            });
        } else {
            // 创建新客户
            fetch(API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                // 创建成功，可以在此显示一些通知或消息
                console.log('New customer created:', data);
                alert('Customer create successfully!'); // 显示提示
                window.location.href = "contacts-list.html";
                
            })
            .catch(error => {
                console.error('Error creating customer:', error);
            });
        }

        $('#submission-msg').fadeIn().delay(2000).fadeOut(function() {
            window.location.href = "contacts-list.html";
        });
    });



});


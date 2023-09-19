var addressBook = (function() {
    // const API_ENDPOINT = 'http://localhost:3000/customers';
    const API_ENDPOINT = 'https://personalcrm-8904b53adc96.herokuapp.com/customers';
    
    var table = $('#table1');
    const tbody = document.querySelector('tbody');

    table.on('click', '#remove', deletePerson); // remove按钮 -> deletePerson
    table.on('click', '#edit', editPerson); // edit按钮 -> editPerson
    
    function renderCustomers() {
        fetch(API_ENDPOINT)
            .then(response => response.json())
            .then(customers => {
                tbody.innerHTML = ''; // 清空tbody内容
    
                for (let i = customers.length - 1; i >= 0; i--) {
                    const customer = customers[i];
    
                    const imgHtml = customer.profilePicture 
                    ? `<img src="${customer.profilePicture}" alt="${customer.name}" width="50" height="50">`
                    : 'No Image';
                    
                    const customerId = customer._id
                    // 使用字段或默认值"N/A"
                    const name = customer.name || "N/A";
                    const phone = customer.phone || "N/A";
                    const email = customer.email || "N/A";
                    // const address = customer.address || "N/A";
                    const notes = customer.notes || "N/A";
                    const group = customer.group || "N/A"; 
                    const birthday = customer.birthday || "N/A"; 
                    const company = customer.company || "N/A";
    
                    // // 根据格式插入新行
                    // tbody.insertAdjacentHTML('afterbegin',
                    //     `<tr>
                    //         <td>${customerId}</td>
                    //         <td>${imgHtml}</td>
                    //         <td>${name}</td>
                    //         <td>${phone}</td>
                    //         <td>${email}</td>
                    //         <td>${group}</td>
                    //         <td>${notes}</td>
                    //         <td>${birthday}</td>
                    //         <td>${company}</td>
                    //         <td><button id="edit" class="btn btn-info">Edit</button><button id="remove" class="btn btn-danger">X</button></td>
                    //     </tr>`
                    // );
                    // 根据你的格式插入新行
                    tbody.insertAdjacentHTML('afterbegin',
                    `<tr data-id="${customerId}">
                        <td>${imgHtml}</td>
                        <td>${name}</td>
                        <td>${group}</td>
                        <td><button id="edit" class="btn btn-info">Edit</button><button id="remove" class="btn btn-danger">X</button></td>
                    </tr>`
                );                
                
                }
            })
            .catch(error => {
                console.error("Error fetching customers:", error);
            });
    }

    function deletePerson(event) {
        const row = event.target.closest('tr');  // 获取点击按钮所在的行
        const customerId = row.dataset.id;

        fetch(`${API_ENDPOINT}/${customerId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                alert('Customer deleted successfully');
                renderCustomers();  // 删除后重新渲染表格
            } else {
                alert('Error deleting customer');
            }
        })
        .catch(error => {
            console.error('Error deleting customer:', error);
        });
    }

    // 将_id添加为URL参数传递给script.js
    function editPerson(event) {
        const row = event.target.closest('tr');
        const customerId = row.dataset.id;
        window.location.href = `new_contact.html?customerId=${customerId}`;
    }
    
    
    
    // 搜索函数，搜索列表中的任意字符
    $("#search").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("table tr").filter(function(index) {
            if (index > 0) {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
            }
        });
    });
    
    // 当页面加载完成后调用此函数
    window.onload = renderCustomers;
    
    
})();

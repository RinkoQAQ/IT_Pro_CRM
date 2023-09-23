var addressBook = (function() {
    const API_ENDPOINT = 'https://personalcrmbackend-042e5db40ee3.herokuapp.com/customers';

    // Get references to HTML elements
    var table = $('#table1');
    const tbody = document.querySelector('tbody');

    // Add event listeners for remove and edit buttons
    table.on('click', '#remove', deletePerson);
    table.on('click', '#edit', editPerson);
    
    // Function to render the list of customers
    function renderCustomers() {
        fetch(API_ENDPOINT)
            .then(response => response.json())
            .then(customers => {
                tbody.innerHTML = ''; // Clear tbody content
    
                for (let i = customers.length - 1; i >= 0; i--) {
                    const customer = customers[i];
    
                    const imgHtml = customer.profilePicture 
                    ? `<img src="${customer.profilePicture}" alt="${customer.name}" width="50" height="50">`
                    : 'No Image';
                    
                    const customerId = customer._id
                    // Using fields or default value "N/A"
                    const name = customer.name || "N/A";
                    const phone = customer.phone || "N/A";
                    const email = customer.email || "N/A";
                    // const address = customer.address || "N/A";
                    const notes = customer.notes || "N/A";
                    const group = customer.group || "N/A"; 
                    const birthday = customer.birthday || "N/A"; 
                    const company = customer.company || "N/A";
    
                    // Insert a new row based on your format
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

    // Function to delete a customer
    function deletePerson(event) {
        const row = event.target.closest('tr');  // Get the row containing the clicked button
        const customerId = row.dataset.id;

        fetch(`${API_ENDPOINT}/${customerId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                alert('Customer deleted successfully');
                renderCustomers();  // Re-render the table after deletion
            } else {
                alert('Error deleting customer');
            }
        })
        .catch(error => {
            console.error('Error deleting customer:', error);
        });
    }

    // Function to edit a customer
    function editPerson(event) {
        const row = event.target.closest('tr');
        const customerId = row.dataset.id;
        window.location.href = `new_contact.html?customerId=${customerId}`;
    }
    
    // Search function to filter rows by customer name
    $("#search").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("table tr").filter(function(index) {
            if (index > 0) { // Skip the table header row
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
            }
        });
    });
    
    // Call renderCustomers when the page loads
    window.onload = renderCustomers;
})();

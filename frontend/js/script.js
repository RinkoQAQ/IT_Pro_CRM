$(document).ready(function() {
    const API_ENDPOINT = 'https://personalcrmbackend-042e5db40ee3.herokuapp.com/customers';

    // Function to extract parameters from the URL
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
        // Fetch data from your backend API using the customer ID
        fetch(`${API_ENDPOINT}/${customerId}`)
            .then(response => response.json())
            .then(customer => {
                // Populate form fields with the retrieved customer data
                $('#nameField').val(customer.name || '');
                $('#phoneField').val(customer.phone || '');
                $('#emailField').val(customer.email || '');
                $('#notesField').val(customer.notes || '');
                $('#groupField').val(customer.group || '');
                $('#birthdayField').val(customer.birthday || '');
                $('#companyField').val(customer.company || '');

                // // Handle image preview
                // if (customer.profilePicture) {
                //     // Display the existing image
                //     $('#previewImage').attr('src', customer.profilePicture);
                // }
            })
            .catch(error => {
                console.error("Error fetching customer data:", error);
            });
    }

    // Form submission event listener
    $('form').on('submit', function(event) {
        event.preventDefault(); // Prevent the default submission behavior

        const formData = {
            name: $('#nameField').val(),
            email: $('#emailField').val(),
            phone: $('#phoneField').val(),
            // address: $('#addressField').val(),  // Commented out as this field doesn't exist
            notes: $('#notesField').val(),
            group: $('#groupField').val(),
            birthday: $('#birthdayField').val(),
            company: $('#companyField').val(),
            // profilePicture: $('#profilePictureField').val() // Needs another method for handling file upload
        };

        if (customerId) {
            // Update an existing customer
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
                alert('Customer updated successfully!');
                window.location.href = "contacts-list.html";
            })
            .catch(error => {
                console.error('Error updating customer:', error);
            });
        } else {
            // Create a new customer
            fetch(API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                console.log('New customer created:', data);
                alert('Customer created successfully!');
                window.location.href = "contacts-list.html";
            })
            .catch(error => {
                console.error('Error creating customer:', error);
            });
        }

        // Show a submission message, then navigate to the contacts list page
        $('#submission-msg').fadeIn().delay(2000).fadeOut(function() {
            window.location.href = "contacts-list.html";
        });
    });
});

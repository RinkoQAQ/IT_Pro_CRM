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
                // $('#groupField').val(customer.group || '');
                $('#birthdayField').val(customer.birthday || '');
                $('#companyField').val(customer.company || '');
                
                // Handle the group field
                const groupField = $('#groupField');
                if (customer.group) {
                    // Check if the group exists in the options
                    let groupExists = false;
                    groupField.find('option').each(function() {
                        if (this.value == customer.group) {
                            groupExists = true;
                            return false; // exit loop
                        }
                    });

                    // If the group doesn't exist, add it
                    if (!groupExists) {
                        const option = new Option(customer.group, customer.group);
                        groupField.append(option);
                    }

                    // Set the group field value
                    groupField.val(customer.group);
                }

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

    let profilePicBase64 = "test";

    document.getElementById('profilePictureField').addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = function() {
                // profilePicBase64 = reader.result.replace('data:', '').replace(/^.+,/, ''); // Update the global variable with the base64 string
                // console.log(profilePicBase64);
            }
            reader.readAsDataURL(file);
        }
    });


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
            profilePicture: profilePicBase64 || undefined
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


    (function() {
        'use strict';
        window.addEventListener('load', function() {
            var forms = document.getElementsByClassName('needs-validation');
            var validation = Array.prototype.filter.call(forms, function(form) {
                form.addEventListener('submit', function(event) {
                    if (form.checkValidity() === false) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    form.classList.add('was-validated');
                }, false);
            });
        }, false);
    })();

    // New script for adding group
    document.getElementById('addGroupBtn').addEventListener('click', function() {
        document.getElementById('newGroupInput').style.display = 'block';
    });

    document.getElementById('saveGroupBtn').addEventListener('click', function() {
        const newGroupName = document.getElementById('newGroupName').value.trim();
        if (newGroupName) {
            // Add the new group to the select element
            const option = new Option(newGroupName, newGroupName);
            document.getElementById('groupField').add(option);
            
            // Reset and hide the new group input
            document.getElementById('newGroupName').value = '';
            document.getElementById('newGroupInput').style.display = 'none';
        } else {
            alert('Please enter a valid group name.');
        }
    });


});

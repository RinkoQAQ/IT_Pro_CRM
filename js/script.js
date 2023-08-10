$(document).ready(function() {
    var editIndex = localStorage.getItem('editContactIndex');  // Get the index from local storage
if (editIndex !== null) {  // If there's an index in local storage, it means we're editing a contact
    $('#editIndex').val(editIndex);  // Set the hidden input field's value to this index
    localStorage.removeItem('editContactIndex');  // Clear the index from local storage so it's not mistakenly used later
}

    $('form').submit(function(e) {
        e.preventDefault();

        if (!this.checkValidity()) {
            alert("Input is invalid. Please correct and submit again.");
            return;
        }

        var data = $(this).serializeFormJSON();
        var profilePictureFile = $('#profilePictureField')[0].files[0];
        if (profilePictureFile) {
            var reader = new FileReader();
            reader.readAsDataURL(profilePictureFile);
            reader.onload = function() {
                data.profilePicture = reader.result; // Base64 encoded image string
                saveContact(data);
            };
        } else {
            data.profilePicture = null;
            saveContact(data);
        }
    });

    // Check if the form is in edit mode and load data if necessary
    var editIndex = $('#editIndex').val();
    if (editIndex !== undefined && editIndex !== null && editIndex !== '') {
        var contacts = JSON.parse(localStorage.getItem('itemsArray'));
        loadContactForEdit(contacts[editIndex]);
    }
});

function saveContact(contact) {
    var oldItems = JSON.parse(localStorage.getItem('itemsArray')) || [];
    var editIndex = $('#editIndex').val();

    if (editIndex !== undefined && editIndex !== null && editIndex !== '') {
        oldItems[editIndex] = contact; // Update existing contact
    } else {
        oldItems.push(contact); // Add new contact
    }
    
    localStorage.setItem('itemsArray', JSON.stringify(oldItems));

    $('#submission-msg').fadeIn().delay(3000).fadeOut(function() {
        window.location.href = "contacts-list.html";
    });
}

function loadContactForEdit(contact) {
    $('#name').val(contact.name);
    $('#phone').val(contact.phone);
    $('#email').val(contact.email);
    $('#group').val(contact.group);
    $('#notes').val(contact.notes);
    $('#birthday').val(contact.birthday);
    $('#company').val(contact.company);

    // Optionally, set the photo if it exists
    if (contact.profilePicture) {
        $('#profilePicturePreview').attr('src', contact.profilePicture);
    }
    // Change the submit button to "Update" or something to indicate it's in edit mode
    $('form button[type="submit"]').text('Update');
}

(function($) {
    $.fn.serializeFormJSON = function() {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
})(jQuery);

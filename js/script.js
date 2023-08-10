$(document).ready(function() {

    // Check if in edit mode and populate form with existing data
    var editIndex = localStorage.getItem('editContactIndex');
    if (editIndex !== null) {
        $('#editIndex').val(editIndex); // Set the hidden input value to indicate edit mode
// Check if in edit mode and populate form with existing data
var editIndex = localStorage.getItem('editContactIndex');
if (editIndex !== null) {
    $('#editIndex').val(editIndex); // Set the hidden input value to indicate edit mode

    // Load the contact data and pre-fill the form
    var myContacts = JSON.parse(localStorage.getItem('itemsArray'));
    var contactToEdit = myContacts[editIndex];

    $('input[name="name"]').val(contactToEdit.name);
    $('input[name="email"]').val(contactToEdit.email);
    $('input[name="phone"]').val(contactToEdit.phone);
    $('input[name="birthday"]').val(contactToEdit.birthday);
    $('input[name="company"]').val(contactToEdit.company);
    $('textarea[name="notes"]').val(contactToEdit.notes);  // Add this line for the notes field

    // For the profile picture:
    if (contactToEdit.profilePicture) {
        // Assuming you might want to show the existing image somewhere on the form:
        $('#previewImage').attr('src', contactToEdit.profilePicture);
    }

    localStorage.removeItem('editContactIndex'); // Clear it after using
}

    }

    // Form submission logic
    $('form').submit(function(e) {
        e.preventDefault();

        if (!this.checkValidity()) {
            alert("Input is invalid. Please correct and submit again.");
            return;
        }

        var data = $(this).serializeFormJSON();

        var profilePictureFile = $('#profilePictureField')[0].files[0];
        if(profilePictureFile){
            var reader = new FileReader();
            reader.readAsDataURL(profilePictureFile);
            reader.onload = function () {
                data.profilePicture = reader.result; // Base64 encoded image string

                processFormSubmission(data);
            };
        } else {
            data.profilePicture = contactToEdit ? contactToEdit.profilePicture : null;  // Use the existing image if in edit mode.
            
            processFormSubmission(data);
        }
    });

    function processFormSubmission(data) {
        var oldItems = JSON.parse(localStorage.getItem('itemsArray')) || [];
        
        if (editIndex !== null) { 
            oldItems[editIndex] = data;  // Update the existing contact
        } else {
            oldItems.push(data);  // Add a new contact
        }
        
        localStorage.setItem('itemsArray', JSON.stringify(oldItems));

        $('#submission-msg').fadeIn().delay(3000).fadeOut(function() {
            window.location.href = "contacts-list.html";
        });
    }
});

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

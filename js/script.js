$(document).ready(function() {
  $('form').submit(function(e) {
    e.preventDefault();
    var data = $(this).serializeFormJSON();
  
    var oldItems = JSON.parse(localStorage.getItem('itemsArray')) || [];
  
    var editIndex = localStorage.getItem('editIndex');
    if (editIndex !== null) {
        oldItems[editIndex] = data; // update the existing entry
        localStorage.removeItem('editIndex'); // clear the edit index after updating
    } else {
        oldItems.push(data); // Add as a new entry
    }
  
    localStorage.setItem('itemsArray', JSON.stringify(oldItems));
  
    // Clear the form fields
    $(this).trigger('reset');
  
    // Display the message bar and hide after 3 seconds
    $('#submission-msg').fadeIn().delay(3000).fadeOut();
  
    // Redirect to contacts-list.html
  setTimeout(function() {
    window.location.href = "contacts-list.html";
  }, 3200);
  });
  // Check if we are editing an entry
  var editIndex = localStorage.getItem('editIndex');
  if (editIndex !== null) {
      var contacts = JSON.parse(localStorage.getItem('itemsArray'));
      var editContact = contacts[editIndex];
      
      // Populate the form fields
      $('input[name="name"]').val(editContact.name);
      $('input[name="nickname"]').val(editContact.nickname);
      $('input[name="phone"]').val(editContact.phone);
      $('input[name="email"]').val(editContact.email);
      $('input[name="gender"][value="'+editContact.gender+'"]').prop('checked', true);
  }
});



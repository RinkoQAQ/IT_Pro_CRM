$(document).ready(function() {
    // Check if in edit mode
    var urlParams = new URLSearchParams(window.location.search);
    var itemsArray = JSON.parse(localStorage.getItem('itemsArray')) || [];
    var editedContactIndex = null;

    if(urlParams.has('edit')) {
        editedContactIndex = localStorage.getItem('editedContactIndex');
        var editedContact = itemsArray[editedContactIndex];
        
        // Pre-fill the form
        $("input[name='name']").val(editedContact.name);
        $("input[name='email']").val(editedContact.email);
        $("input[name='phone']").val(editedContact.phone);
        $("input[name='birthday']").val(editedContact.birthday);
        $("input[name='company']").val(editedContact.company);
        $("select[name='group']").val(editedContact.group);
        $("textarea[name='notes']").val(editedContact.notes);
    }

    $('form').submit(function(e) {
        e.preventDefault();
        var data = $(this).serializeFormJSON();

        if(urlParams.has('edit')) {
            // If in edit mode, update the existing contact instead of adding new
            itemsArray[editedContactIndex] = data;
        } else {
            itemsArray.push(data);
        }

        localStorage.setItem('itemsArray', JSON.stringify(itemsArray));

        $('#submission-msg').fadeIn().delay(3000).fadeOut(function() {
            window.location.href = "contacts-list.html";
        });
    });
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

var addressBook = (function() {
    var myContacts = JSON.parse(localStorage.getItem('itemsArray'));
    var table = $('#table1');
    var tbody = table.find('tbody');

    table.on('click', '#remove', deletePerson);
    table.on('click', '#edit', editPerson);
    _render();

    function _render() {
        tbody.html('');
        var length = myContacts.length;
        for (var i = length - 1; i >= 0; i--) {
            var imgHtml = myContacts[i].profilePicture 
                ? '<img src="' + myContacts[i].profilePicture + '" alt="' + myContacts[i].name + '" width="50" height="50">'
                : 'No Image';
            
            var group = myContacts[i].group || "N/A"; // If 'group' is not defined, use "N/A"
            var notes = myContacts[i].notes || "N/A"; // If 'notes' is not defined, use "N/A"
            var birthday = myContacts[i].birthday || "N/A"; // If 'birthday' is not defined, use "N/A"
            var company = myContacts[i].company || "N/A"; // If 'company' is not defined, use "N/A"
    
            table.prepend('<tr><td>' + i + '</td><td>' + imgHtml + '</td><td>' + myContacts[i].name + '</td><td>' + myContacts[i].phone + '</td><td>' + myContacts[i].email + '</td><td>' + group + '</td><td>' + notes + '</td><td>' + birthday + '</td><td>' + company + '</td><td><button id="edit" class="btn btn-info">Edit</button><button id="remove" class="btn btn-danger">X</button></td></tr>');
        }
    }
    
    
    

    function deletePerson(event) {
        var i = $('#table1 tr').index($(this).closest('tr')) - 1;
        myContacts.splice(i, 1);
        _render();
        localStorage.setItem('itemsArray', JSON.stringify(myContacts));
    }

    function editPerson(event) {
    var i = $('#table1 tr').index($(this).closest('tr')) - 1;  // Find out which row was clicked
    localStorage.setItem('editContactIndex', i);  // Store that row number in local storage
    window.location.href = "index.html";  // Redirect to the contact form page
}

    

    $("#search").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("table tr").filter(function(index) {
            if (index > 0) {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
            }
        });
    });

    return {
        deletePerson: deletePerson
    };
})();

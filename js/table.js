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
          table.prepend('<tr><td>' + i + '</td><td>' + myContacts[i].name + '</td><td>' + myContacts[i].nickname + '</td><td>' + myContacts[i].phone + '</td><td>' + myContacts[i].email + '</td><td>' + myContacts[i].gender + '</td><td><button id="edit" class="btn btn-info">Edit</button><button id="remove" class="btn btn-danger">X</button></td></tr>');
      }
  }

  function deletePerson(event) {
      var i = $('#table1 tr').index($(this).closest('tr')) - 1;
      myContacts.splice(i, 1);
      _render();
      localStorage.clear();
      localStorage.setItem('itemsArray', JSON.stringify(myContacts));
  }

  function editPerson(event) {
      var i = $('#table1 tr').index($(this).closest('tr')) - 1;
      var editedContact = myContacts[i];
      // Here you can integrate your logic to edit the contact.
      // e.g., redirect to the contact form pre-filled with 'editedContact' data
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

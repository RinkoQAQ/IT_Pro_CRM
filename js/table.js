var addressBook = (function() {
  var myContacts = JSON.parse(localStorage.getItem('itemsArray'));
  var table = $('#table1');
  var tbody = table.find('tbody');

  //bind events
  table.on('click', '#remove', deletePerson);
  _render();

  //render
  function _render() {
      tbody.html('');
      var length = myContacts.length;
      for (var i = length - 1; i >= 0; i--) {
          table.prepend('<tr><td>' + i + '</td><td>' + myContacts[i].name + '</td><td>' + myContacts[i].email + '</td><td>' + myContacts[i].phone + '</td><td>' + myContacts[i].birthday + '</td><td>' + myContacts[i].company + '</td><td>' + myContacts[i].group + '</td><td>' + myContacts[i].notes + '</td><td><button id="remove" class="btn btn-danger">X</button></td></tr>');
      }
  }

  function deletePerson(event) {
      var i = $('#table1 tr').index($(this).closest('tr')) - 1;
      myContacts.splice(i, 1);
      _render();
      localStorage.clear();
      localStorage.setItem('itemsArray', JSON.stringify(myContacts));
  }

  //search function
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

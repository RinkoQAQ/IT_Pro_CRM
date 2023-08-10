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

$('form').submit(function(e) {
  e.preventDefault();
  var data = $(this).serializeFormJSON();

  var oldItems = JSON.parse(localStorage.getItem('itemsArray')) || [];

  oldItems.push(data);

  localStorage.setItem('itemsArray', JSON.stringify(oldItems));

  // Show the toast notification
  $('.toast').toast('show');
});

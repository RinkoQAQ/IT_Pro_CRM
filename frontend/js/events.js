document.addEventListener('DOMContentLoaded', function() {
    const API_ENDPOINT = 'https://personalcrmbackend-042e5db40ee3.herokuapp.com/events';
    
    var calendarEl = document.getElementById('calendar');
  
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      events: function(fetchInfo, successCallback, failureCallback) {
        fetch(API_ENDPOINT)
          .then(res => res.json())
          .then(events => {
            successCallback(events);
          })
          .catch(err => {
            failureCallback(err);
          });
      }
    });
  
    calendar.render();
  });
  
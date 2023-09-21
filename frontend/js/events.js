var eventManager = (function() {
    const API_ENDPOINT = 'https://personalcrmbackend-042e5db40ee3.herokuapp.com/events';  // Replace with your API Endpoint
    const calendarElement = $('#calendar');

    $(document).ready(function() {
        initCalendar();
        fetchAndRenderEvents();
    });

    function initCalendar() {
        calendarElement.fullCalendar({
            // Your FullCalendar options here
        });
    }

    function fetchAndRenderEvents() {
        fetch(API_ENDPOINT)
            .then(response => response.json())
            .then(events => {
                calendarElement.fullCalendar('removeEvents');
                calendarElement.fullCalendar('addEventSource', events);
            })
            .catch(error => {
                console.error('Error fetching events:', error);
            });
    }

    return {
        initCalendar: initCalendar,
        fetchAndRenderEvents: fetchAndRenderEvents
    };
})();

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the scheduler with specified date format and view
    scheduler.config.xml_date = "%Y-%m-%d %H:%i";
    scheduler.init('scheduler_here', new Date(), "month");

    // Define the API endpoint for fetching events
    const API_ENDPOINT = 'https://personalcrmbackend-042e5db40ee3.herokuapp.com';

    // Fetch events data from the API
    fetch(`${API_ENDPOINT}/events`)
        .then(response => response.json())
        .then(data => {
            // Map API data to scheduler events format
            const schedulerEvents = data.map(event => {
                return {
                    start_date: new Date(event.time),
                    end_date: new Date(new Date(event.time).getTime() + 60 * 60 * 1000), // Assuming event duration is 1 hour
                    text: event.content + ' (' + event.customerName + ')'
                };
            });

            // Parse and display events on the scheduler
            scheduler.parse(schedulerEvents, "json");
        })
        .catch(error => {
            console.error('Error fetching events:', error);
        });
});

document.addEventListener('DOMContentLoaded', function() {
    scheduler.config.xml_date = "%Y-%m-%d %H:%i";
    scheduler.init('scheduler_here', new Date(), "month");

    const API_ENDPOINT = 'https://personalcrmbackend-042e5db40ee3.herokuapp.com';

    fetch(`${API_ENDPOINT}/events`)
        .then(response => response.json())
        .then(data => {
            const schedulerEvents = data.map(event => {
                return {
                    start_date: new Date(event.time),
                    end_date: new Date(new Date(event.time).getTime() + 60 * 60 * 1000), // 假设事件时长为1小时
                    text: event.content + ' (' + event.customerName + ')'
                };
            });

            scheduler.parse(schedulerEvents, "json");
        })
        .catch(error => {
            console.error('Error fetching events:', error);
        });
});

var myEvents = (function() {
    const API_ENDPOINT = 'https://personalcrmbackend-042e5db40ee3.herokuapp.com/events'; // 替换为你的后端API地址
    const calendarElement = $('#calendar');

    function renderEvents() {
        fetch(API_ENDPOINT)
            .then(response => response.json())
            .then(events => {
                const formattedEvents = events.map(event => ({
                    title: event.content,
                    start: event.time,
                    allDay: false
                }));
                
                // 初始化FullCalendar
                calendarElement.fullCalendar({
                    events: formattedEvents
                });
            })
            .catch(error => {
                console.error("Error fetching events:", error);
            });
    }

    // 当页面加载完成后调用此函数
    window.onload = renderEvents;

})();

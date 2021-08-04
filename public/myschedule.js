
document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay' },
        events: [
    {
      title  : 'event1',
      start  : '2021-01-01'
    },
    {
      title  : 'event2',
      start  : '2021-01-05',
      end    : '2021-01-07'
    },
    {
      title  : 'event3',
      start  : '2021-01-09T12:30:00',
      allDay : false // will make the time show
    }
  ]
    //   ,
    // headerToolbar: {
    //   center: 'addEventButton'
    // },
    // customButtons: {
    //   addEventButton: {
    //     text: 'add event...',
    //     click: function() {
    //       var dateStr = prompt('Enter a date in YYYY-MM-DD format');
    //       var date = new Date(dateStr + 'T00:00:00'); // will be in local time
    //
    //       if (!isNaN(date.valueOf())) { // valid?
    //         calendar.addEvent({
    //           title: 'dynamic event',
    //           start: date,
    //           allDay: true
    //         });
    //         alert('Great. Now, update your database...');
    //       } else {
    //         alert('Invalid date.');
    //       }
    //     }
    //   }
    // }
});

    calendar.on('dateClick', function(info) {
       var title = prompt("title of the event: ");
       var date = new Date(info.dateStr + 'T00:00:00');
       if (!isNaN(date.valueOf())) { //valid?
               calendar.addEvent({
                 title: title,
                 start: date,
                 allDay: true
               });
               alert('Great. Now, update your database...');
             } else {
               alert('Invalid date.');
             }
    });

    calendar.render();
  });


document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
  
    var today=new Date();
    if(today.getMonth()<'10'){
      if(today.getDate()<'10'){
        var date = today.getFullYear()+'-0'+(today.getMonth()+1)+'-0'+today.getDate();
      }
      else{
        var date = today.getFullYear()+'-0'+(today.getMonth()+1)+'-'+today.getDate();
      }
    }
    else{
      if(today.getDate()<'10'){
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-0'+today.getDate();
      }
      else{
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      }
    }
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      initialDate: date,
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
    });
  
    calendar.render();
  });
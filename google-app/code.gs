function main() {
  pushToFireBase('events', listCalendars())
}


function listCalendars() {
  var today = new Date()
  var events = CalendarApp.getCalendarById(CALENDAR_ID).getEventsForDay(today)

  return events.reduce((prev, current) => ({
    ...prev,
    [`${zeroPad(current.getStartTime().getHours(), 2)}${zeroPad(current.getStartTime().getMinutes(), 2)}`]: true,
    [`${zeroPad(current.getEndTime().getHours(), 2)}${zeroPad(current.getEndTime().getMinutes(), 2)}`]: true
  }), {})
}

function pushToFireBase(key, data) {
  var firebase = FirebaseApp.getDatabaseByUrl(DB_URL, DB_KEY)
  firebase.setData(key, data)
}

const zeroPad = (num, places) => String(num).padStart(places, '0')

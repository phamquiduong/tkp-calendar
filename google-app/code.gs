function main() {
  var [key, times] = listCalendars()
  pushToFireBase(key, times)
}


function listCalendars() {
  var today = new Date()
  var events = CalendarApp.getCalendarById(CALENDAR_ID).getEventsForDay(today)

  var times = events.reduce((prev, current) => [...prev,
  `${current.getStartTime().getHours()}:${current.getStartTime().getMinutes()}`,
  `${current.getEndTime().getHours()}:${current.getEndTime().getMinutes()}`
  ], [])

  var dayKey = `${today.getFullYear()}${today.getMonth()+1}${today.getDate()}`
  return [dayKey, times]
}

function pushToFireBase(key, data) {
  var firebase = FirebaseApp.getDatabaseByUrl(DB_URL, DB_KEY)
  firebase.setData(key, data)
}

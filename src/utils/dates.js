import moment from 'moment'

function getToday() {
  return moment.utc()
}

function formatDateTime(fecha) {
  const momentoLocal = moment.utc(fecha).local()
  return momentoLocal.format('DD/MM/YYYY HH:mm:ss')
}

function formatDate(fecha) {
  const momentoLocal = moment.utc(fecha).local()
  return momentoLocal.format('DD/MM/YYYY')
}

export const dateUtils = {
  getToday,
  formatDateTime,
  formatDate,
}

import moment from 'moment'

const urlParser = document.createElement('a')

export function domain (url) {
  urlParser.href = url
  return urlParser.hostname
}

export function count (arr) {
  return arr.length
}

export function prettyDate (date) {
  var a = new Date(date)
  return a.toDateString()
}

export function pluralize (time, label) {
  if (time === 1) {
    return time + label
  }

  // return time + label + 's'
  return `${time}${label}s`
}

export function toVND (number = 0) {
  let x = number
  x = x.toLocaleString('it-IT', {style: 'currency', currency: 'VND'})
  return x
}

export function fDate (value = new Date()) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY')
  }
}

export function fDateTime (value = new Date()) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY HH:mm')
  }
}

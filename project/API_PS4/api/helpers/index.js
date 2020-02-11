import moment from 'moment'
  
export function formatDate({date = new Date(), format = 'YYYY-MM-DD'}) {
    return moment(date).format(format)
}

/** Lấy số ngày trong 1 tháng */
export function getDaysInMonth(month, year) {
    // Here January is 1 based
    // Day 0 is the last day in the previous month
    return new Date(year, month, 0).getDate()
}

/** Trả về ngày cuối cùng tháng trước của ngày cần thực hiện  */
export function getPreviousMonth({date = new Date(), format = 'YYYY-MM-DD'}) {
    return moment(date).subtract(1, 'months').endOf('month').format(format)
}

/** Lấy ngày đầu tiên của tháng */
export function getFirstDayInMonth(date = null) {
    if (date) {
        date = new Date(date)
    } else {
        date = new Date()
    }

    return new Date(date.getFullYear(), date.getMonth(), 1)
}

/** Lấy ngày cuối cùng của tháng */
export function getLastDayInMonth(date = null) {
    if (date) {
        date = new Date(date)
    } else {
        date = new Date()
    }

    return new Date(date.getFullYear(), date.getMonth() + 1, 0)
}
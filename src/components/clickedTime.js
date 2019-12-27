const d = new Date()
const h = parseInt(d.getHours()) * 60 * 60
const m = parseInt(d.getMinutes()) * 60
const s = parseInt(d.getSeconds())
const time = h + m + s

export default time
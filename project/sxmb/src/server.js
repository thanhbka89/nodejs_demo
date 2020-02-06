const logger = require('morgan')
const express = require('express')
const cronjob = require('node-cron')
const fs = require('fs')

const { sendResponse } = require('./helpers')
const { fetchAuthorProfile } = require('./sites/scotch')

// Create an Express application
const app = express()

// Configure the app port
const port = process.env.PORT || 3000
app.set('port', port)

// Load middlewares
app.use(logger('dev'))

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

/* ==================================================== */
/* ===== Section 2: Configure express middlewares ===== */
/* ==================================================== */
function cron(ms, fn) {
    function cb() {
        clearTimeout(timeout)
        timeout = setTimeout(cb, ms)
        fn()
    }
    let timeout = setTimeout(cb, ms)

    return {}
}
cron(10000, () => {
    console.log('Anonystick in middleware ')
})

let counter = 1
cronjob.schedule('* * * * *', () => {
    console.log(`Running a task every minute ${counter}`)
    ++counter
})

// delete the log file from the server at 11:30 PM on the 21st of every month
cronjob.schedule("30 23 21 * *", () => {
    console.log("---------------------")
    console.log("Running Cron Job")
    fs.unlink("./error.log", err => {
      if (err) console.error('File not found')
      console.log("Error file successfully deleted")
    })
})

app.get('/', (req, res, next) => {
    res.json({ msg: 'Crawler!!!' })
})

// ex: `http://localhost:3000/scotch/reverentgeek`
app.get('/scotch/:author', (req, res, next) => {
    const author = req.params.author 
	sendResponse(res)(fetchAuthorProfile(author))
})

// Start the server and listen on the preconfigured port
app.listen(port, () => console.log(`App started on port ${port}.`))
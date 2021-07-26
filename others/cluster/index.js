const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello world! ')
})

app.get('/api/:n', (req, res) => {
  let n = parseInt(req.params.n)
  let count = 0
  if (n > 5000000000) n = 5000000000
  for (let i = 0; i <= n; i++) {
    count += i
  }
  res.send(`Final count is ${count}`)
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

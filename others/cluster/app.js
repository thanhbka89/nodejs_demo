const express = require('express')
const cluster = require('cluster')

// code to run if we're in the master process
if (cluster.isMaster) {
  const cpuCount = require('os').cpus().length
  console.log(`Number CPUs: ${cpuCount}`)
  console.log(`Master ${process.id} is running`)
  // create a worker for each CPU
  for (let i = 0; i < cpuCount; i += 1) {
    cluster.fork()
  }

  // listen for dying workers
  cluster.on('exit', (worker, code, signal) => {
    console.log('worker died:' + worker.id)
    cluster.fork()
  })
} else {
  // code to run if we're in a worker process
  const app = express()
  const port = 3000

  app.get('/', (req, res) => {
    res.send('Hello world! from Worker:' + cluster.worker.id)
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
  console.log(`worker started: ${cluster.worker.id}`)
}

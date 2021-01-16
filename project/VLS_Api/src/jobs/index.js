import cronjob from 'node-cron'
import * as GetflyService from '../services/getflyService'

export default () => {
  let counter = 1

  // every minute
  cronjob.schedule('* * * * *', () => {
    console.log(`Running a task every minute ${counter}`)
    ++counter
  })

  //********* GetflyCRM ***********/
  // Schedule run on 15:30 everyday
  cronjob.schedule('30 21 * * *', () => {
    GetflyService.syncUser().then((msg) => console.log(msg))
  })

  cronjob.schedule('10 23 * * *', async () => {
    console.time('[syncCustomer]')
    await GetflyService.syncCustomer()
    console.timeEnd('[syncCustomer]')
  })

  cronjob.schedule('30 22 * * *', async () => {
    console.time('[syncOrder]')
    await GetflyService.syncOrder()
    console.timeEnd('[syncOrder]')
  })

  cronjob.schedule('30 1 * * *', async () => {
    console.time('[syncProduct]')
    await GetflyService.syncProduct()
    console.timeEnd('[syncProduct]')
  })

}

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
  cronjob.schedule('30 15 * * *', () => {
    GetflyService.syncUser().then((msg) => console.log(msg))
  })

}

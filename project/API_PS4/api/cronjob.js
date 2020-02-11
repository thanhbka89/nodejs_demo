import cron from 'node-cron'
import shell from 'shelljs'
import { demo, runTonCuoiKy } from './services/cronService'

const cronOption = {
    scheduled: true,
    timezone: 'Asia/Bangkok'
}

function backupDB () {
    shell
        .pwd()
        .exec('mysql_backup.bat', {silent: true}, (code, stdout, stderr) => {
            console.log('[Backup MySQL done! Exit code]:', code)
        }) 
}

const main = async () => {

    // test
    cron.schedule('* * * * *', async () => {
        console.log(`Running a task every minute!`)
        // backupDB()
        demo().then(x => console.log(x))
          .catch(e => console.error(e))
    })

    // TonCuoiKy at 10:30 AM on 1st of every month
    cron.schedule("30 10 1 * *", async () => {
        console.log(`----- Running -----`)
        console.time('[runtime]:')
        await runTonCuoiKy({})
        console.timeEnd('[runtime]:')
    })

    // backupDB at 11:30 AM on Monday every week
    cron.schedule("30 11 * * 1", () => {
        console.log('Backup MySQL running ...')
        backupDB()
    })

    cron.schedule('* * * * *', async () => {
        console.log(`123456 Running ...`, new Date)
    }, cronOption)
 
    return 'done'
}

export default main
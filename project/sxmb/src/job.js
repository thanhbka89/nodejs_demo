import cronjob from 'node-cron'
import runSxmb from './sites/sxmb'

export default () => {
	let counter = 1
	cronjob.schedule('* * * * *', () => {
		// runSxmb()
		console.log(`Running a task every minute ${counter}`)
		++counter
	})

	// run at 20:30 on everyday
	cronjob.schedule('30 20 * * *', async () => {
		await runSxmb().catch(e => console.error(e))
	})
}

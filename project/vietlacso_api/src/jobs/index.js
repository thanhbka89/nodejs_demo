import cronjob from 'node-cron'

export default () => {
	let counter = 1

	cronjob.schedule('* * * * *', () => {
		console.log(`Running a task every minute ${counter}`)
		++counter
	})
}

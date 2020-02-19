const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')

// axios.get("https://idioms.thefreedictionary.com/light").then((response) => {

//     let $ = cheerio.load(response.data)

//     let idioms = []
//     let links = []
//     let listItems = $("ul.idiKw li a").each(function(i, elem) {
//         idioms.push($(elem).text())
//         links.push("https://thefreedictionary.com/" + $(elem).attr("href"))
//     })

//     console.log(idioms)
//     console.log(links)
// })

// axios.get('https://xosodaiphat.com/xsmb-02-02-2019.html').then((response) => {
//     console.log('===========')
//     let $ = cheerio.load(response.data)

//     const sxmb = []
//     $('table.table-xsmb tr').each((idx, el) => {
//         sxmb.push($(el).text())
//     })

//     console.log(sxmb)
// })

const fetchHTML = async url => {
	try {
		const { data } = await axios.get(url)

		return cheerio.load(data)
	} catch (err) {
		throw err
	}
}

// async function main() {
//     const $ = await fetchHTML("https://example.com")
//     // Print the full HTML
//     // console.log(`Site HTML: ${$.html()}\n\n`)
//     // Print some specific page content
//     console.log(`First h1 tag: ${$('h1').text()}`)
//     $('div p').each((i, e) => {
//         console.log(`tag p${i}:`, $(e).text())
//     })
// }
// main()

// async function sxmb() {
//     const url = 'https://xskt.com.vn/ket-qua-xo-so-theo-ngay/mien-bac-xsmb/26-1-2015.html'
//     const $ = await fetchHTML(url)

//     const sxmb = []
//     $('table#MB0 tbody > tr').each((idx, el) => {
//         sxmb.push($(el).text())
//     })

//     console.log(sxmb)
// }
// sxmb()

const premier = async () => {
	try {
		const url =
			'https://www.premierleague.com/stats/top/players/goals?se=-1&cl=-1&iso=-1&po=-1?se=-1'
		const $ = await fetchHTML(url)

		const statsTable = $('.statsTableContainer > tr')
		const topPremierLeagueScorers = []

		statsTable.each(function() {
			const rank = $(this)
				.find('.rank > strong')
				.text()
			const playerName = $(this)
				.find('.playerName > strong')
				.text()
			const nationality = $(this)
				.find('.playerCountry')
				.text()
			const goals = $(this)
				.find('.mainStat')
				.text()

			topPremierLeagueScorers.push({
				rank,
				name: playerName,
				nationality,
				goals,
			})
		})
		console.log(topPremierLeagueScorers)

		const topRatedMoviesMap = statsTable
			.map(async (idx, element) => {
				let moviePoster = $(element)
					.find('.rank > strong')
					.text()
				let movieName = $(element)
					.find('.playerName > strong')
					.text()
				let movieDate = $(element)
					.find('.playerCountry')
					.text()
				let movieRating = $(element)
					.find('.mainStat')
					.text()

				console.log('Created Promise for movie: ' + movieName)

				return {
					moviePoster,
					movieName,
					movieDate,
					movieRating,
				}
			})
			.get()
		console.log(topRatedMoviesMap)

		return Promise.all(topRatedMoviesMap)
	} catch (e) {
		// console.error('ERR: ', e.message)
		throw e
	}
}

const exportResults = (results, outputFile) => {
	try {
		fs.writeFile(outputFile, JSON.stringify(results, null, 4), err => {
			if (err) {
				console.log(err)
			}
			console.log(
				'\n' +
					results.length +
					' Results exported successfully to ' +
					outputFile
			)
		})
	} catch (error) {
		throw error
	}
}
// premier()
//     .then(results => {
//         console.log("number of results: " + results.length);
//         exportResults(results, "top-player.json")
//         // console.log(results)
//    })
//    .catch(err => {
//         console.log("Error while fetching data ::: " + err)
//    })

/**
 * Promise.all
 * https://anonystick.com/blog-developer/promiseall-javascript-than-thanh-2019052953224827.jsx
 */
// # Send Email
let users = [
	{
		username: 'anonystick',
		age: 1,
	},
	{
		username: 'anonystick',
		age: 2,
	},
	{
		username: 'anonystick',
		age: 3,
	},
	{
		username: 'anonystick',
		age: 4,
	},
	{
		username: 'anonystick',
		age: 5,
	},
	{
		username: 'anonystick',
		age: 6,
	},
	{
		username: 'anonystick',
		age: 7,
	},
	{
		username: 'anonystick',
		age: 8,
	},
	{
		username: 'anonystick',
		age: 9,
	},
	{
		username: 'anonystick',
		age: 10,
	},
	{
		username: 'anonystick',
		age: 11,
	},
]

// Async function to send mail to a list of users.
const sendMailForUsers = async users => {
	const usersLength = users.length

	for (let i = 0; i < usersLength; i += 2) {
		console.log(`${i}:requests>>`, users.slice(i, i + 2))
		const requests = users.slice(i, i + 2).map(user => {
			// The batch size is 100. We are processing in a set of 100 users.
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve(`Completed in ${user.age}`)
				}, 1000)
			})
			//triggerMailForUser(user) // Async function to send the mail.
			//.catch(e => console.log(`Error in sending email for ${user} - ${e}`)) // Catch the error if something goes wrong. So that it won't block the loop.
		})

		await Promise.all(requests).then(result => {
			console.log(`${i}:`, result)
		})
		// requests will have 100 or less pending promises.
		// Promise.all will wait till all the promises got resolves and then take the next 100.
	}
}
async function main() {
	console.time('[email]')
	await sendMailForUsers(users)
	console.timeEnd('[email]')
}
// main()

// #Get API
const fetchGithubInfo = async url => {
	console.log(`Fetching ${url}`)
	const githubInfo = await axios(url)
	// API call to get user info from Github.
	return {
		name: githubInfo.data.name,
		bio: githubInfo.data.bio,
		repos: githubInfo.data.public_repos,
	}
}

// Iterates all users and returns their Github info.
const fetchUserInfo = async names => {
	const requests = names.map(name => {
		const url = `https://api.github.com/users/${name}`

		return (
			fetchGithubInfo(url)
				// Async function that fetches the user info.
				.then(a => {
					return a // Returns the user info.
				})
		)
	})

	return Promise.all(requests)
	//Waiting for all the requests to get resolved.
}

// fetchUserInfo(['sindresorhus','yyx990803','gaearon','thanhbka89','lucduong','laurent22','brianc','aeneasr','aduth','gregberge','mikeal'])
//    .then(a => console.log(JSON.stringify(a)))
//    .catch(e => console.error('[github]: ', e.response.data.message))

// #serial Promise + do thoi gian thuc hien
function wait(waitTime) {
	return new Promise((resolve, reject) =>
		setTimeout(() => {
			console.log(`waited ${waitTime} ms`)
			waitTime ? resolve('Ok') : reject('Nope :S')
		}, waitTime)
	)
}
async function serial() {
	console.time('serial promise')
	await wait(1000)
	await wait(2000)
	await wait(3000)
	console.timeEnd('serial promise')
	return 'done'
}
async function parallel() {
	console.time('parallel promise')
	await Promise.all([
		wait(1200),
		wait(1500),
		wait(1100),
		//   wait().catch(e => e),
		//   wait()
	])
	console.timeEnd('parallel promise')
	return 'finish'
}
async function test() {
	await serial().then(x => console.log(x)) // async/await với Promise.then
	await parallel()
		.then(x => console.log(x))
		.catch(e => console.error('[parallel]:', e))

	// async/await với Promise.catch
	const data = await wait().catch(e => {
		console.error(e)
		return null
	})
	console.log('[data]:', data)

	return '===>>END'
}
// test().then(x => console.log('[test]:', x))

/**
 * Promise.all duyệt hết nhưng return ngay khi một Promise nào đó return về Rejected
 * Promise.allSettled duyệt hết và return ngay cả khi một Promise nào đó return về Rejected
 */
// const allRejectedPromises = [
// 	Promise.reject('🍏 #1'),
// 	Promise.reject('🍏 #2'),
// 	Promise.reject('🍏 #3'),
// ]

// Promise.allSettled(allRejectedPromises)
// 	.then(badApples =>
// 		console.log(`We can't sell any of these apples...`, badApples)
// 	)
// 	.catch(error => console.error('This should never occur'))

// const promisesWithoutReject = [
// 	Promise.resolve('🍎 #1'),
// 	'🍎 #2',
// 	new Promise((resolve, reject) => setTimeout(resolve, 100, '🍎 #3')),
// ]

// Promise.allSettled(promisesWithoutReject).then(apples =>
// 	console.log(
// 		`We can sell all these good apples`,
// 		apples.map(_ => _.value),
// 		apples
// 	)
// )

// const promisesWithOneReject = [
// 	Promise.resolve('🍎 #1'),
// 	new Promise((_, reject) => setTimeout(reject, 10, '🍏 #2')),
// 	'🍎 #3',
// 	new Promise((_, reject) => setTimeout(reject, 100, '🍏 #4')),
// ]

// const extractApples = apples => apples.map(_ => _.value)
// Promise.allSettled(promisesWithOneReject).then(apples => {
// 	console.log(apples)

// 	const badApples = apples
// 		.filter(apple => apple.status === 'rejected')
// 		.map(_ => _.reason)
// 	const goodApples = apples
// 		.filter(apple => apple.status === 'fulfilled')
// 		.map(_ => _.value)

// 	console.log(`Let's throw out`, badApples, `and sell the rest`, goodApples)
// })

/**
 * Promise.race return ngay khi một Promise đầu tiên nào đó return về bất kể (Rejected hay Fulfilled)
 * Promise.any return ngay khi một Promise có state Fulfilled bất kể có nhiều Promise sẽ return về Rejected
 */
// const promiseWillFulfill = [
// 	new Promise((resolve, reject) => setTimeout(reject, 250, '😈')),
// 	new Promise((resolve, reject) => setTimeout(resolve, 150, '😇')),
// 	new Promise((resolve, reject) => setTimeout(resolve, 1, '😇')),
// ]
// Promise.race(promiseWillFulfill)
// 	.then(value => console.log(`The humanity survives "${value}"`))
// 	.catch(error => console.log(`Won't be called as 😇 will win the race`))

// const promiseWillReject = [
// 	new Promise((resolve, reject) => setTimeout(resolve, 250, '😇')),
// 	new Promise((resolve, reject) => setTimeout(reject, 1, '😈')),
// 	new Promise((resolve, reject) => setTimeout(resolve, 250, '😇')),
// ]
// Promise.race(promiseWillReject)
// 	.then(value => console.log(`This won't be called...="${value}"`))
// 	.catch(error => console.log(`The humanity is doomed...="${error}"`))

// const promisesWithOUTReject = [
// 	new Promise(resolve => setTimeout(resolve, 350, 'one')),
// 	new Promise(resolve => setTimeout(resolve, 250, 'two')),
// 	new Promise(resolve => setTimeout(resolve, 150, 'three')),
// ]
// Promise.race(promisesWithOUTReject).then(value =>
// 	console.log(`Promise without reject="${value}"`)
// )

// Promise.any([
// 	Promise.reject('✗'),
// 	Promise.reject('✗'),
// 	Promise.resolve('✓'),
// 	Promise.reject('✗'),
// ]).then(function(value) {
// 	console.log(`You win at life`, value)
// })

// // Example #2
// // You get the first fulfilled value
// Promise.any([
// 	new Promise((_, reject) => setTimeout(reject, 10, '✗')),
// 	new Promise((_, reject) => setTimeout(reject, 20, '✗')),
// 	new Promise((_, reject) => setTimeout(reject, 30, '✗')),
// 	new Promise(resolve => setTimeout(resolve, 100, 'I got a job!')),
// 	new Promise(resolve =>
// 		setTimeout(resolve, 1000, 'I could have gotten a better job!')
// 	),
// ]).then(function(value) {
// 	console.log(value)
// })

// // Example #3
// // You get all rejection reasons
// Promise.any([Promise.reject('✗'), Promise.reject('✗')]).catch(function(
// 	reasons
// ) {
// 	console.log(`Didn't get any offers...`, reasons)
// })

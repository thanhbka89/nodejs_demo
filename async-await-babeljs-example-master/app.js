import request from 'request';
import cheerio from 'cheerio';

const URL = 'http://anythingjs.com/';

/* 
 * Get HTML of URL
 * This is a promise function
 */
const getHTML = (url) => {
	return new Promise((resolve, reject) => {
		request(url, (err, resp, body) => {
			if(err)
				return reject(err);
			if(resp.statusCode != 200)
				return reject('server AnythingJS has a fucking bug :3 ' + resp.statusCode);
			resolve(body);
		});
	});
}

/* 
 * Get html tag content 
 * This is a async function
 * In async function, you can use await to call a promise function
 */
const getTagContentInHTML = async (url, tag) => {
	try {
		let html = await getHTML(url),
				$ = cheerio.load(html),
				text = $(tag).text();
		console.log(text + '\n');
	}
	catch(err) {
		// if when call function getHTML has any problems, they will be catched here
		console.error(err);
	}
}

/*
 * Get site AnythingJS content
 * This is a async function
 * In async function, you can also use await call orther async functions
 */
const getAnythingJSContent = async () => {
	console.log(1);
	await getTagContentInHTML(URL, 'h1');
	console.log(2);
	await getTagContentInHTML(URL, '.page-description');
	console.log(3);
}

getAnythingJSContent();


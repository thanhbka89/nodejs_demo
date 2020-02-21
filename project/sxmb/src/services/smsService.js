const Nexmo = require('nexmo')

const nexmo = new Nexmo({
  apiKey: 'ac2626ae',
  apiSecret: 'MbebDNRT5wnsi9dR'
})

// conver Callback to Promise
const promiseSendSms = (data = {}) => {
  return new Promise((resolve, reject) => {
	const {fromPhone, toPhone, content, option = { type: 'unicode' }} = data
	nexmo.message.sendSms(fromPhone, toPhone, content, option, (err, responseData) => {
		if (err) {
			reject(`Error system`)
		} else {
		if (responseData.messages[0]['status'] === '0') 
			resolve('Message sent successfully')
		else 
			reject(`${responseData.messages[0]['error-text']}`)
		}
	})
  })
}

export const sendSMS = async (data = {}) => {
  let message = '',
    success = false

  try {
	const result = await promiseSendSms(data)
    message = result
    success = true
  } catch (e) {
    message = e
  }

  return { success, message }
}

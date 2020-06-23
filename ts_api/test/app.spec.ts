import server from '../src/server'
import chai from 'chai'
import chaiHttp = require('chai-http')

import 'mocha'

chai.use(chaiHttp)
const expect = chai.expect

describe('Hello API Request', () => {
	it('should return hello on call', async () => {
		return chai
			.request(server)
			.get('/')
			.then((res) => {
				chai.expect(res.text).to.eql('Hi2')
			})
	})
})

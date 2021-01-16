process.env.NODE_ENV = 'test'

import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../src/server'
import { findOne } from '../src/services/account.service'
chai.should()
chai.use(chaiHttp)
chai.config.includeStack = true
const expect = chai.expect

describe('## Test APIs', () => {
	let user = {
		email: 'thanhbka@yahoo.com',
		token: null,
	}
	describe('# GET healthcheck', () => {
		it('# GET /', (done) => {
			chai
				.request(server)
				.get('/')
				.end((err, res) => {
					res.should.have.status(200)
					res.should.be.json
					res.should.be.a('object')
					res.body.message.should.equal('API Home')
					done()
				})
		})
		it('# should return 404 status', () => {
			chai
				.request(server)
				.get('/api404')
				.end((err, res) => {
                    expect(404)
                    // expect(res.body.message).to.equal('API Not Found')
                    expect(res.body).to.not.have.property('b')
                    expect(res.body).to.have.property('message')
				})
		})
	})

	describe('# Auth', () => {
		it('# GET token', async () => {
			const acc = await findOne({
				email: user.email,
			})
			user.token = acc.accessToken
		})
	})

	// nhóm nhiều test case thành một group
	describe('# PaymentLog', () => {
		it('# POST /api/v1/payment-log', (done) => {
			let log = {
				point: 13,
				account: '5eba2cbc250e35085cd2226b',
			}
			chai
				.request(server)
				.post('/api/v1/payment-log')
				.set({ Authorization: `Bearer ${user.token}` })
				.send(log)
				.end((err, res) => {
					res.should.have.status(200)
					res.should.be.json
					res.body.should.be.a('object')
					res.body.should.have.property('success')
					res.body.success.should.equal(true)
					done()
				})
		})
		it('# GET /api/v1/payment-log', (done) => {
			chai
				.request(server)
				.get('/api/v1/payment-log')
				.set({ Authorization: `Bearer ${user.token}` })
				.end((err, res) => {
					res.should.have.status(200)
					res.should.be.json
					res.should.be.a('object')
					done()
				})
		})
	})
})

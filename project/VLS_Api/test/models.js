import { assert, should, expect } from 'chai'
import mongoose from 'mongoose'
import { DBMongo } from '../src/models/mongo'
import Account from '../src/models/account.model'
import { create } from '../src/services/account.service'

describe('# Account model', () => {
  before(() => {
    new DBMongo()
    // Account.collection.drop()
  })

  after(() => {
    // mongoose.connection.close()
  })

  it('# create new account', async () => {
    const acc = await create({
      fullname: 'trần văn a',
      email: 'test@abc.com',
      password: '123',
    })
    assert(acc)
    expect(acc.email).to.equal('test@abc.com', 'sao lại éo bằng')
    expect(acc.password).to.not.equal('123', 'có vấn đề với mongoose pre hook')
  })
})

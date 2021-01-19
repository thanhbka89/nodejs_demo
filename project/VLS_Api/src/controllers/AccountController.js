import { ForbiddenError, subject } from '@casl/ability'
import { packRules } from '@casl/ability/extra'
import * as AccountService from '@src/services/account.service'
import { PERMISSIONS, MODEL_NAMES } from '@src/abilities'
import { getRoleAbilityForUser } from '@src/helpers/acl'

// default error message
// ForbiddenError.setDefaultMessage(error => `You are not allowed to ${error.action} on ${error.subjectType}`)
ForbiddenError.setDefaultMessage('Not authorized')

module.exports = {
  create: async (req, res) => {
    const item = {
      ...req.body,
    }
    ForbiddenError.from(req.ability)      
      .throwUnlessCan('create', subject('Account', item))
    const data = await AccountService.create(item)

    res.json({ success: true, data })
  },

  update: async (req, res) => {
    const item = {
      ...req.body,
    }
    const account = await AccountService.getById(req.params.id)
    ForbiddenError.from(req.ability).throwUnlessCan('update', account) // check authorize CASL
    const data = await AccountService.update(req.params.id, item)

    res.json({ success: true, data })
  },

  get: async (req, res) => {
    const data = await AccountService.getById(req.params.id)

    ForbiddenError.from(req.ability).throwUnlessCan('read', data) // check authorize CASL

    res.json({ success: true, data })
  },

  delete: async (req, res) => {
    await AccountService._delete(req.params.id)

    res.json({ success: true })
  },

  deleteSoft: async (req, res) => {
    const account = await AccountService.getById(req.params.id)
    ForbiddenError.from(req.ability)
      .setMessage('You cannot')
      .throwUnlessCan('delete', account) // check authorize CASL
    
    await AccountService._deleteSoft(req.params.id)

    res.json({ success: true })
  },

  list: async (req, res) => {
    const user = req.decoded || {}    
    const ability = getRoleAbilityForUser({ user })
    ForbiddenError.from(ability).throwUnlessCan(
      PERMISSIONS.CREATE,
      MODEL_NAMES.POST
    ) 
    console.log('req.ability', req.ability, 'ability2:', ability)
    const data = await AccountService.getAll()

    res.json({ success: true, data })
  },

  paginate: async (req, res) => {
    const filter = {}
    const {
      search = '',
      select = '',
      page = 1,
      limit = 5,
      searchBy = 'fullname',
      order = 'desc',
      orderBy = 'createdAt',
    } = req.query

    if (search) filter[searchBy] = { $regex: `${search}`, $options: 'i' }

    const data = await AccountService.paginate(filter, {
      select,
      page,
      limit,
      sort: { [orderBy]: order },
      options: { zUseCache: true, zCacheExpire: 120, zCacheLean: true }
    })

    res.json({ success: true, data })
  },

  getProduct: async (req, res) => {
    const data = await AccountService.getProductBy(req.decoded.userId, req.query)

    res.json({ success: true, data: data.products })
  },

  getProfile: async (req, res) => {
    const data = await AccountService.getById(req.decoded.userId)

    res.json({ success: true, data })
  },

  getUserRoleAbility: async (req, res) => {
    const user = req.decoded || {}     
    try {      
      const ability = getRoleAbilityForUser({ user })      
      const packedRules = packRules(ability.rules)      
      return res.status(200).json({rbac: packedRules})    
    } catch (error) {  
      res.status(501).send(error)    
    }
  }

}

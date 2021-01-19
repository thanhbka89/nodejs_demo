// const { AbilityBuilder, Ability } = require('@casl/ability')
import { AbilityBuilder, Ability } from '@casl/ability'

export const PERMISSIONS = {
  MANAGE: 'manage',
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',
}

export const MODEL_NAMES = { POST: 'Account' }

export function defineAbilitiesForAdmin() {
  const { rules, can } = new AbilityBuilder()
  can(PERMISSIONS.MANAGE, MODEL_NAMES.POST)
  can(PERMISSIONS.CREATE, 'User')

  return new Ability(rules)
}

export function defineAbilitiesForPleb() {
  const { rules, can, cannot } = new AbilityBuilder()

  can(PERMISSIONS.MANAGE, MODEL_NAMES.POST) /* start with full permissions */
  
  cannot(PERMISSIONS.CREATE, MODEL_NAMES.POST).because(
    'Only Admins can create Posts'
  )
  
  cannot(PERMISSIONS.DELETE, MODEL_NAMES.POST).because(
    'Only Admins can delete Posts'
  )

  return new Ability(rules)
}

function defineAbilitiesFor(user) {
  const { can, cannot, rules } = new AbilityBuilder()

  can('read', 'all')
  can('read', ['Product', 'Comment'])
  can('create', 'Account')

  if (user) {
    can(['create', 'delete', 'update'], ['Product', 'Comment'], {
      created_by: user.userId,
    })
    can(['read', 'update'], 'Account', { _id: user.userId })

    if (user.role && user.role.includes('admin')) {
      can('manage', 'all')
    }
  }

  return new Ability(rules)
}

const ANONYMOUS_ABILITY = defineAbilitiesFor(null)

// middleware
export const createAbilities = (req, res, next) => {
  req.ability = req.decoded.userId
    ? defineAbilitiesFor(req.decoded)
    : ANONYMOUS_ABILITY

  next()
}

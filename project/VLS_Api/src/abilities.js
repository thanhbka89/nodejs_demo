// const { AbilityBuilder, Ability } = require('@casl/ability')
import { AbilityBuilder, Ability } from '@casl/ability'

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

export const createAbilities = (req, res, next) => {
  req.ability = req.decoded.userId
    ? defineAbilitiesFor(req.decoded)
    : ANONYMOUS_ABILITY

  next()
}

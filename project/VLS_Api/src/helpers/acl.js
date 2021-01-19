import { AbilityBuilder, Ability } from '@casl/ability'
import { defineAbilitiesForAdmin, defineAbilitiesForPleb } from '@src/abilities'

const USER_ROLES = {
  ADMIN: 'admin',
  PLEB: 2,
}

const DEFAULT_ABILITIES = new Ability() //defaults to no permissions

export function getRoleAbilityForUser({ user = {} }) {  
  let ability
  switch (user.role) {
    case USER_ROLES.ADMIN:
      ability = defineAbilitiesForAdmin()
      break

    case USER_ROLES.PLEB:
      ability = defineAbilitiesForPleb()
      break

    default:
      ability = DEFAULT_ABILITIES
      break
  }
  
  return ability
}

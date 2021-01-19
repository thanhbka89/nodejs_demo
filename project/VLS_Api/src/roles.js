import { AccessControl } from 'accesscontrol'

const ac = new AccessControl()

exports.roles = (function () {

  // ex 'profile' resource has attributes: id, title

  ac.grant('basic')
    .readOwn('profile') // equivalent to .readOwn('profile', ['*'])
    .updateOwn('profile')
    // .deleteOwn('profile')

  ac.grant('supervisor')
    .extend('basic')
    .readAny('profile', ['*', '!id']) // id attribute should not be read 

  ac.grant('admin')
    .extend('basic')
    .extend('supervisor')
    .updateAny('profile')
    .deleteAny('profile')

  return ac
})()


// grant list fetched from DB (to be converted to a valid grants object, internally)
// let grantList = [
//   { role: 'admin', resource: 'video', action: 'create:any', attributes: '*, !views' },
//   { role: 'admin', resource: 'video', action: 'read:any', attributes: '*' },
//   { role: 'admin', resource: 'video', action: 'update:any', attributes: '*, !views' },
//   { role: 'admin', resource: 'video', action: 'delete:any', attributes: '*' },

//   { role: 'user', resource: 'video', action: 'create:own', attributes: '*, !rating, !views' },
//   { role: 'user', resource: 'video', action: 'read:any', attributes: '*' },
//   { role: 'user', resource: 'video', action: 'update:own', attributes: '*, !rating, !views' },
//   { role: 'user', resource: 'video', action: 'delete:own', attributes: '*' }
// ];
// const ac = new AccessControl(grantList);


// What is a "resource"?
// For example:

// We have a database table called 'accounts'.
// The 'accounts' table has fields such as 'firstName', 'lastName', 'email' and 'pwd'.
// In our application context, a user can modify 'firstName' and 'lastName' freely. But we'll have a separate page for changing the password and/or email address; which will prompt for current password.
// In this scenario, we may have two resources: account and credentials

// ac.grant('user')
//   .createAny('account')                           // create new account with all attributes
//   .updateOwn('account', ['*', '!pwd', '!email'])  // update own account except password and email
//   .updateOwn('credentials')                       // update own credentials (password and email)

import { acl } from './index'

export default {
  /** Adds the given permissions to the given roles over the given resources.
   * @param: [{roles: {String|Array}, allows: [{resources: {String|Array}, permissions: {String|Array}]]
   */
  allow: (permissionsArray = []) => {
    return new Promise((resolve, reject) => {
      acl.allow(permissionsArray, (err) => {
        if (err) return reject(err)
        resolve(`Successful`)
      })
    })
  },

  /** Adds a parent or parent list to role.
   * @role     {String} Child role.
   * @parents  {String|Array} Parent role(s) to be added.
   */
  addRoleParents: (role, parents) => {
    return new Promise((resolve, reject) => {
      acl.addRoleParents(role, parents, (err) => {
        if (err) return reject(err)
        resolve(`Successful`)
      })
    })
  },

  /** Removes a parent or parent list from role.
   * @role     {String} Child role.
   * @parents  {String|Array} Parent role(s) to be removed [optional].
   */
  removeRoleParents: (role, parents) => {
    return new Promise((resolve, reject) => {
      acl.removeRoleParents(role, parents, (err) => {
        if (err) return reject(err)
        resolve(`Successful`)
      })
    })
  },

  /** Adds roles to a given user id.
   * @userId   {String|Number} User id.
   * @roles    {String|Array} Role(s) to add to the user id.
   */
  addUserRoles: (userId, roles) => {
    return new Promise((resolve, reject) => {
      acl.addUserRoles(userId, roles, (err) => {
        if (err) return reject(err)
        resolve(`Successful`)
      })
    })
  },

  /** Remove roles from a given user.
   * @userId   {String|Number} User id.
   * @roles    {String|Array} Role(s) to remove to the user id.
   */
  removeUserRoles: (userId, roles) => {
    return new Promise((resolve, reject) => {
      acl.removeUserRoles(userId, roles, (err) => {
        if (err) return reject(err)
        resolve(`Successful`)
      })
    })
  },

  /** Return all the roles from a given user.
   * @userId   {String|Number} User id.
   */
  userRoles: (userId) => {
    return new Promise((resolve, reject) => {
      acl.userRoles(userId, (err, roles) => {
        if (err) return reject(err)
        resolve(roles)
      })
    })
  },

  /** Return all users who has a given role.
   * @rolename   {String|Number} User id.
   */
  roleUsers: (rolename) => {
    return new Promise((resolve, reject) => {
      acl.roleUsers(rolename, (err, users) => {
        if (err) return reject(err)
        resolve(users)
      })
    })
  },

  /** Return boolean whether user has the role
   * @userId   {String|Number} User id.
   * @rolename {String|Number} role name.
   */
  hasRole: (userId, rolename) => {
    return new Promise((resolve, reject) => {
      acl.hasRole(userId, rolename, (err, hasRole) => {
        if (err) return reject(err)
        resolve(hasRole)
      })
    })
  },

  /** Removes a role from the system.
   * @role     {String} Role to be removed
   */
  removeRole: (role) => {
    return new Promise((resolve, reject) => {
      acl.removeRole(role, (err) => {
        if (err) return reject(err)
        resolve(`Successful`)
      })
    })
  },

  /** Remove permissions from the given roles owned by the given role.
   * @role        {String}
   * @resources   {String|Array}
   * @permissions {String|Array}
   */
  removeAllow: (role, resources, permissions) => {
    return new Promise((resolve, reject) => {
      acl.removeAllow(role, resources, permissions, (err) => {
        if (err) return reject(err)
        resolve(`Successful`)
      })
    })
  },

  /** Returns all the allowable permissions a given user have to access the given resources.
   * @userId    {String|Number} User id.
   * @resources {String|Array} resource(s) to ask permissions for.
   */
  allowedPermissions: (userId, resources) => {
    return new Promise((resolve, reject) => {
      acl.allowedPermissions(userId, resources, (err, obj) => {
        if (err) return reject(err)
        resolve(obj)
      })
    })
  },

  /** Checks if the given user is allowed to access the resource for the given permissions (note: it must fulfill all the permissions). 
   * @userId      {String|Number} User id.
     @resource    {String} resource to ask permissions for.
     @permissions {String|Array} asked permissions.
  */
  isAllowed: (userId, resource, permissions) => {
    return new Promise((resolve, reject) => {
      acl.isAllowed(userId, resource, permissions, (err, allowed) => {
        if (err) return reject(err)
        resolve(allowed)
      })
    })
  },

  /** Returns true if any of the given roles have the right permissions.
   * @roles       {String|Array} Role(s) to check the permissions for.
     @resource    {String} resource to ask permissions for.
     @permissions {String|Array} asked permissions.
   */
  areAnyRolesAllowed: (roles, resource, permissions) => {
    return new Promise((resolve, reject) => {
      acl.areAnyRolesAllowed(roles, resource, permissions, (err, allowed) => {
        if (err) return reject(err)
        resolve(allowed)
      })
    })
  },
}

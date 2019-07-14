export default {
  isAdmin: state => {
    return state.user && state.user.role === 1
  },
  isLoggedIn: state => !!state.token,
  authStatus: state => state.status,
  hasNetwork: state => state.network
}

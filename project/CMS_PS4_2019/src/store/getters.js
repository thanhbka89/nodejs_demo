export default {
  isAdmin: state => {
    return state.user && state.user.role === 1
  }
}

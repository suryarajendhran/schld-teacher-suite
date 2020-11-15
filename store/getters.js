export default {
  isLoggedIn: (state) => {
    try {
      return state.authUser.id !== null
    } catch {
      return false
    }
  },
  isLoading: (state) => {
    return state.isLoading
  },
}

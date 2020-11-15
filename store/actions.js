
export default {
  onAuthStateChanged({ commit }, { authUser }) {
    if (!authUser) {
      commit('RESET_STORE')
      return
    }
    if (process.browser) {
      localStorage.setItem('userId', authUser.uid)
    }
    commit('SET_AUTH_USER', { authUser })
  },
}

import initialState from './state'

export default {
  RESET_STORE: (state) => {
    Object.assign(state, initialState())
    state.isLoading = false
  },

  SET_AUTH_USER: (state, { authUser }) => {
    state.authUser = {
      uid: authUser.uid,
      email: authUser.email,
    }
    state.isLoading = false
  },
}

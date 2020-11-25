export const state = () => ({
  authenticated: localStorage.getItem('authenticated') === 'true' || false,
  user: null,
})

export const mutations = {
  SET_AUTH_USER: (state, { authUser }) => {
    if (!authUser) {
      state.user = null
      state.authenticated = false
      localStorage.setItem('authenticated', false)
    } else {
      const { uid, email, displayName } = authUser
      state.user = {
        uid: uid,
        email: email,
        displayName: displayName,
      }
      state.authenticated = true
      localStorage.setItem('authenticated', true)
    }
  },
  RESET_STORE: (state) => {
    state.user = null
  },
  switch(state) {
    state.authenticated = !state.authenticated
    localStorage.setItem('authenticated', state.authenticated)
  },
}

export const actions = {
  switchState(context) {
    console.log(context)
    context.commit('switch')
  },
  onAuthStateChanged({ commit }, { authUser }) {
    if (!authUser) {
      commit('RESET_STORE')
      return
    }
    commit('SET_AUTH_USER', { authUser })
  },
}

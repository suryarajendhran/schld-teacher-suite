export const state = () => ({
  authenticated: false,
  user: null,
})

export const mutations = {
  SET_AUTH_USER: (state, { authUser }) => {
    const { uid, email, displayName } = authUser
    state.user = {
      uid: uid,
      email: email,
      displayName: displayName,
    }
  },
  RESET_STORE: (state) => {
    state.user = null
  },
  switch(state) {
    state.authenticated = !state.authenticated
  },
  remove(state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1)
  },
  toggle(state, todo) {
    todo.done = !todo.done
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

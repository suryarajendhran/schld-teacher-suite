export const state = () => ({
  authenticated: localStorage.getItem('authenticated') === 'true' || false,
  userDataLoaded: false,
  user: null,
  department: localStorage.getItem('department'),
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
      state.userDataLoaded = true
      state.authenticated = true
      localStorage.setItem('authenticated', true)
    }
  },
  RESET_STORE: (state) => {
    state.user = null
  },
  switch(state) {
    state.authenticated = !state.authenticated
    if (state.authenticated == false) {
      state.department = null
      localStorage.removeItem('department')
    }
    localStorage.setItem('authenticated', state.authenticated)
  },
  setDepartment(state, { teacher_data }) {
    state.department = teacher_data.department
    localStorage.setItem('department', state.department)
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
  loadDepartment({ commit, state }) {
    console.log(state.user)
    try {
      this.$fire.database
        .ref(`teacher/${state.user.uid}`)
        .once('value')
        .then((snapshot) => {
          commit('setDepartment', { teacher_data: snapshot.val() })
        })
    } catch (err) {
      console.log('Error at loadDepartment', err)
    }
  },
}

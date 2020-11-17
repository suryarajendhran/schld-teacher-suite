export const state = () => ({
  authenticated: false,
  user: null,
})

export const mutations = {
  add(state, text) {
    state.list.push({
      text,
      done: false,
    })
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
}

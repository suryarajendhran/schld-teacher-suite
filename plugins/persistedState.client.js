import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  console.log('Starting persist store')
  createPersistedState({})(store)
  console.log('Finished persisting store')
}

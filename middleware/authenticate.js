export default function ({ store, redirect, route }) {
  if (route.name != 'login' && !store.state.auth.authenticated) {
    console.log(store.state.auth.authenticated)
    return redirect('/login')
  }

  if (route.name == 'login' && store.state.auth.authenticated) {
    return redirect('/')
  }
}

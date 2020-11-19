export default function ({ store, redirect, route }) {
  console.log('Starting authentication')
  if (route.name != 'login' && !store.state.auth.authenticated) {
    // console.log(store.state.auth.authenticated)
    console.log('Ending authentication')
    return redirect('/login')
  }

  if (route.name == 'login' && store.state.auth.authenticated) {
    console.log('Ending authentication')
    return redirect('/')
  }
}

export default function ({ store, redirect, route }) {
  console.log('Starting authentication')
  console.log(store.state.auth.authenticated == false)
  if (route.name != 'login' && route.name != 'register' && !store.state.auth.authenticated) {
    // console.log(store.state.auth.authenticated)
    console.log(
      `Ending authentication with token: ${store.state.auth.authenticated}`
    )
    return redirect('/login')
  }

  if (route.name == 'login' && store.state.auth.authenticated) {
    console.log('Ending authentication')
    return redirect('/')
  }
}

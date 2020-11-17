<template>
  <div class="section">
    <div class="columns">
      <div class="column is-three-quarters"></div>
      <div class="column is-one-quarter">
        <div class="title is-4">Log In</div>
        <div class="field">
          <label for="username">Email address</label>
          <div class="control has-icons-left has-icons-right">
            <input
              class="input is-primary"
              type="email"
              placeholder="E-mail"
              v-model="email"
              required
            />
            <span class="icon is-small is-left">
              <i class="fas fa-user"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-check"></i
            ></span>
          </div>
        </div>
        <div class="field">
          <label for="password">Password</label>
          <div class="control has-icons-left has-icons-right">
            <input
              class="input is-primary"
              type="password"
              placeholder="Your Password"
              v-model="password"
              required
            />
            <span class="icon is-small is-left">
              <i class="fas fa-key"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-check"></i
            ></span>
          </div>
        </div>
        <div class="field">
          <a href="#">Have trouble logging in?</a>
        </div>
        <div class="field">
          <button
            :class="{
              button: true,
              'is-primary': true,
              'is-fullwidth': true,
              'is-loading': loading,
            }"
            @click="logIn"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      loading: false,
    }
  },
  methods: {
    async logIn() {
      this.loading = true
      // this.$fire.auth.createUserWithEmailAndPassword(
      //   'cielograndesurya@gmail.com',
      //   '123456'
      // )
      console.log('Calling logIn')
      await this.$fire.auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$store.commit('auth/switch')
          this.$router.push('/')
        })
    },
    switchState() {
      this.$store.commit('auth/switch')
    },
  },
}
</script>

<style></style>

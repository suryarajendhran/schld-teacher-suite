<template>
  <div class="section">
    <div class="columns">
      <div class="column is-three-quarters"></div>
      <div class="column is-one-quarter">
        <div class="title is-4">Log In</div>
        <div class="field">
          <label for="username">E-mail</label>
          <div class="control has-icons-left has-icons-right">
            <input
              class="input is-primary"
              type="email"
              placeholder="E-mail"
              v-model="email"
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
          <button class="button is-primary is-fullwidth" @click="logIn">
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
    }
  },
  methods: {
    logIn() {
      this.$store.commit('auth/switch')
      this.$router.push('/')
    },
  },
}
</script>

<style></style>

<template>
  <div class="section">
    <div id="background"></div>
    <div class="columns">
      <div class="column is-two-third"></div>
      <div class="column is-one-third">
        <div class="title is-4">Register</div>
        <div class="field">
          <label for="displayname">Name</label>
          <div class="control has-icons-left has-icons-right">
            <input
              class="input is-primary"
              type="text"
              placeholder="Display Name"
              v-model="name"
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
              <i class="fas fa-at"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-check"></i
            ></span>
          </div>
        </div>
        <div class="field">
          <label for="phone">Phone</label>
          <div class="control has-icons-left has-icons-right">
            <input
              class="input is-primary"
              type="phone"
              placeholder="Phone Number"
              v-model="phone"
              required
            />
            <span class="icon is-small is-left">
              <i class="fas fa-phone"></i>
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
          <label for="username">Department</label>
          <div class="field">
            <div class="control has-icons-left">
              <div class="select is-primary">
                <select v-model="department">
                  <option disabled value="default">
                    Select your department
                  </option>
                  <option v-for="department in departments" :key="department">
                    {{ department }}
                  </option>
                </select>
              </div>
              <div class="icon is-small is-left">
                <i class="fas fa-globe"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="field">
          <label for="access_code">Access Code</label>
          <div class="control has-icons-left has-icons-right">
            <input
              class="input is-primary"
              type="text"
              placeholder="Access Code"
              v-model="access_code"
              required
            />
            <span class="icon is-small is-left">
              <i class="fas fa-hashtag"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-check"></i
            ></span>
          </div>
        </div>
        <div class="field">
          <a href="./login">Already have an account? Sign in</a>
        </div>
        <div class="field">
          <button
            :class="{
              button: true,
              'is-primary': true,
              'is-fullwidth': true,
              'is-loading': loading,
            }"
            @click="register"
          >
            Register
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
      phone: '',
      name: '',
      access_code: '',
      departments: ['ECE', 'Mechanical', 'EEE', 'IT', 'CSE', 'Civil', 'EIE'],
      department: 'default',
      loading: false,
    }
  },
  methods: {
    async register() {
      if (this.access_code === 'AccessCode') {
        this.loading = true
        await this.$fire.auth
          .createUserWithEmailAndPassword(this.email, this.password)
          .then((user) => {
            this.$fire.database
              .ref(`Teacher`)
              .child(user.uid)
              .set({
                uid: user.id,
                name: this.name,
                email: this.email,
                phone: this.phone,
                department: this.department,
              })
              .then((err) => {
                if (err) {
                  this.$buefy.toast.open({
                    duration: 2000,
                    message: `Something's not good, <b>error!</b>`,
                    position: 'is-bottom',
                    type: 'is-danger',
                  })
                } else {
                  this.$store.commit('auth/switch')
                  this.$router.push('/')
                }
              })
          })
          .catch((err) => {
            this.loading = false
            this.$buefy.toast.open({
              duration: 2000,
              message: `${err.message}</b>`,
              position: 'is-top',
              type: 'is-warning',
            })
          })
      }else{
          this.$buefy.toast.open({
              duration: 2000,
              message: `Wrong Access Code</b>`,
              position: 'is-top',
              type: 'is-warning',
            })
      }
    },
    switchState() {
      this.$store.commit('auth/switch')
    },
  },
}
</script>

<style>
#background {
  background-image: url('/register-bg.png');
  background-position: bottom left; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: 50%;
  z-index: -1;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>
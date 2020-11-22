<template>
  <div :class="{ modal: true, visible: display, 'fade-in-quick': true }">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="section" v-if="display">
        <h1 class="title">{{ title }}</h1>
        <div class="columns is-multiline">
          <div class="column is-half">
            <div class="field">
              <label class="label">Name</label>
              <div class="control has-icons-left has-icons-right">
                <input
                  class="input"
                  type="text"
                  placeholder="Enter your name"
                  v-model="name"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-user"></i>
                </span>
              </div>
              <!-- <p class="help is-danger">This email is invalid</p> -->
            </div>
          </div>
          <div class="column is-half">
            <div class="field">
              <label class="label">Phone Number</label>
              <div class="control has-icons-left has-icons-right">
                <input
                  class="input"
                  type="tel"
                  placeholder="Your Phone Number"
                  v-model="phone"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-mobile"></i>
                </span>
              </div>
            </div>
          </div>
          <div class="column is-half">
            <div class="field">
              <label class="label">Roll Number</label>
              <div class="control has-icons-left has-icons-right">
                <input
                  class="input"
                  type="text"
                  placeholder="Your Roll Number"
                  v-model="roll_number"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-id-card"></i>
                </span>
              </div>
            </div>
          </div>
          <div class="column is-half">
            <div class="field">
              <label class="label">Department</label>
              <div class="control">
                <div class="select is-fullwidth">
                  <select v-model="department">
                    <option disabled value="default">
                      Select your department
                    </option>
                    <option v-for="department in departments" :key="department">
                      {{ department }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="column is-half">
            <div class="field">
              <label class="label">Email</label>
              <div class="control has-icons-left has-icons-right">
                <input
                  class="input"
                  type="email"
                  placeholder="Enter your email address"
                  v-model="email"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-envelope"></i>
                </span>
              </div>
              <!-- <p class="help is-danger">This email is invalid</p> -->
            </div>
          </div>
          <div class="column is-half">
            <div class="field">
              <label class="label">Year</label>
              <div class="control">
                <div class="select is-fullwidth">
                  <select v-model="year">
                    <option disabled value="default">Select your year</option>
                    <option>1st Year</option>
                    <option>2nd Year</option>
                    <option>3rd Year</option>
                    <option>4th Year</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="column is-full">
            <div class="field is-grouped is-justify-content-center">
              <div class="control">
                <button class="button is-primary" @click="submit">
                  <span class="icon"> <i class="fas fa-check"></i> </span>
                  <span> Confirm </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button
      class="modal-close is-large"
      aria-label="close"
      @click="$emit('close')"
    ></button>
  </div>
</template>

<script>
export default {
  props: ['display', 'student'],
  data() {
    return {
      name: null,
      phone: null,
      roll_number: null,
      email: null,
      year: null,
      departments: ['ECE', 'Mechanical', 'EEE'],
      department: 'default',
      year: 'default',
      tweenedTitle: null,
    }
  },
  methods: {
    submit() {
      if (this.uid == null) {
        this.password = Math.random().toString(36).slice(2)
        // this.$fire
        //   .auth()
        //   .createUserWithEmailAndPassword(this.email, this.password)
        //   .then((user) => {
        //     this.uid = user.uid
        //   })
        //   .catch((error) => {
        //     var errorCode = error.code
        //     var errorMessage = error.message
        //   })
        this.$fire.database
          .ref('student')
          .child(uid)
          .set({
            uid: uid,
            name: this.name,
            year: this.year,
            department: this.department,
            email: this.email,
            password: this.password,
            phone: this.phone,
            roll_number: this.roll_number,
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
              this.$buefy.toast.open({
                message: 'Added successfully!',
                type: 'is-success',
              })
            }
            this.$emit('close')
            this.$emit('reload')
          })
      }
    },
  },
  computed: {
    title() {
      if (this.name) {
        return this.name
      }
      return 'Add Student'
    },
  },
}
</script>

<style scoped>
.title {
  transition: all 1s ease-in;
}
#table-container {
  margin-top: 20px;
  border-radius: 5px;
}
.visible {
  display: block;
}
.modal-content {
  background-color: white;
  margin-top: 10%;
  width: 80%;
  border-radius: 10px;
}
</style>

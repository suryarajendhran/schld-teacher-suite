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
                    <option>I</option>
                    <option>II</option>
                    <option>III</option>
                    <option>IV</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="column is-full">
            <div class="field is-grouped is-justify-content-center">
              <div class="control">
                <button
                  :class="{
                    button: true,
                    'is-primary': true,
                    'is-fullwidth': true,
                    'is-loading': loading,
                  }"
                  @click="submit"
                >
                  <span class="icon"> <i class="fas fa-check"></i> </span>
                  <span> Confirm </span>
                </button>
              </div>
              <div class="control">
                <button
                  :class="{
                    button: true,
                    'is-warning': true,
                    'is-fullwidth': true,
                    'is-loading': loading,
                  }"
                  @click="delete_user"
                >
                  <span class="icon"> <i class="fas fa-trash"></i> </span>
                  <span> Delete </span>
                </button>
              </div>
              <div class="control" v-if="locked">
                <button
                  :class="{
                    button: true,
                    'is-warning': true,
                    'is-fullwidth': true,
                    'is-loading': loading,
                  }"
                  @click="unlockStudent"
                >
                  <span class="icon"> <i class="fas fa-unlock"></i> </span>
                  <span> Unlock Student </span>
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
      departments: ['ECE', 'Mechanical', 'EEE', 'IT', 'CSE', 'Civil', 'EIE'],
      department: 'default',
      year: 'default',
      loading: false,
      locked: false,
    }
  },
  methods: {
    unlockStudent() {
      this.$fire.database
        .ref(`student/${this.uid}`)
        .update({
          locked: false,
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
              message: 'Unlocked Student successfully',
              type: 'is-success',
            })
          }
          this.$emit('close')
          this.$emit('reload')
        })
    },
    async delete_user() {
      this.loading = true
      if (this.uid !== null) {
        const student = {
          uid: this.uid,
        }
        await this.$axios
          .$post(
            'https://us-central1-scholared-f3d6d.cloudfunctions.net/deleteStudent',
            { student: student }
          )
          .then((response) => {
            this.$fire.database
              .ref('student')
              .child(this.uid)
              .remove()
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
                    message: 'Deleted Student successfully',
                    type: 'is-success',
                  })
                }
                this.$emit('close')
                this.$emit('reload')
              })
          })
          .catch((response) => {
            console.log(response)
          })
      }
      this.loading = false
    },
    async submit() {
      this.loading = true
      if (this.uid == null) {
        this.password = Math.random().toString(36).slice(2)
        console.log(this.password)
        const student = {
          email: this.email,
          password: this.password,
          phoneNumber: this.phone,
          displayName: this.name,
        }
        var groupId = this.year.toString() + ' - ' + this.department
        await this.$axios
          .$post(
            'https://us-central1-scholared-f3d6d.cloudfunctions.net/addStudent',
            { student: student }
          )
          .then((response) => {
            console.log(response)
            this.$fire.database
              .ref('student')
              .child(response.userRecord.uid)
              .set({
                uid: response.userRecord.uid,
                name: this.name,
                year: this.year,
                department: this.department,
                email: this.email,
                password: this.password,
                phone: this.phone,
                roll_number: this.roll_number,
                groupId: groupId,
                locked: false,
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
          })
          .catch((response) => {
            console.log(response)
          })
      } else {
        const student = {
          uid: this.uid,
          email: this.email,
          password: this.password,
          phoneNumber: this.phone,
          displayName: this.name,
        }
        var groupId = this.year.toString() + ' - ' + this.department
        await this.$axios
          .$post(
            'https://us-central1-scholared-f3d6d.cloudfunctions.net/updateStudent',
            { student: student }
          )
          .then((response) => {
            console.log(response)
            this.$fire.database
              .ref('student')
              .child(this.uid)
              .update({
                name: this.name,
                year: this.year,
                department: this.department,
                password: this.password,
                phone: this.phone,
                roll_number: this.roll_number,
                groupId: groupId,
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
                    message: 'Updated successfully!',
                    type: 'is-success',
                  })
                }
                this.$emit('close')
                this.$emit('reload')
              })
          })
          .catch((response) => {
            console.log(response)
          })
      }
      this.loading = false
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
  watch: {
    display: function (val) {
      console.log(this.student)
      if (val == true && this.student !== null) {
        this.uid = this.student.uid
        this.name = this.student.name
        this.password = this.student.password
        this.phone = this.student.phone
        this.email = this.student.email
        this.department = this.student.department
        this.year = this.student.year
        this.roll_number = this.student.roll_number
        if (this.student.locked) {
          this.locked = this.student.locked
        } else {
          this.locked = false
        }
      } else if (val === false) {
        this.$emit('reset')
      }
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

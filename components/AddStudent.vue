<template>
  <div class="section">
    <h1 class="title">{{ title }}</h1>
    <div class="columns is-multiline">
      <div class="column is-half">
        <div class="field">
          <label class="label">Name</label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="Your Name"
              v-model="name"
            />
          </div>
        </div>
      </div>
      <div class="column is-half">
        <div class="field">
          <label class="label">Phone Number</label>
          <div class="control">
            <input
              class="input"
              type="tel"
              placeholder="Your Phone Number"
              v-model="phone"
            />
          </div>
        </div>
      </div>
      <div class="column is-half">
        <div class="field">
          <label class="label">Roll Number</label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="Your Roll Number"
              v-model="roll_number"
            />
          </div>
        </div>
      </div>
      <div class="column is-half">
        <div class="field">
          <label class="label">Department</label>
          <div class="control">
            <div class="select is-fullwidth">
              <select v-model="department">
                <option disabled value="default">Select your department</option>
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
              Add Student
            </button>
          </div>
          <div class="control">
            <button class="button is-danger is-light">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
    }
  },
  methods: {
    submit() {
      alert('Submit clicked!')
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
  transition: all 0.2s ease-in;
}
</style>

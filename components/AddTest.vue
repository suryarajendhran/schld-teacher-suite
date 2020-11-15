<template>
  <div class="section">
    <h1 class="title">{{ title }}</h1>
    <div class="columns">
      <div class="column is-one-third">
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
        <div class="field">
          <label class="label">Assign To</label>
          <div class="control">
            <div class="select is-fullwidth">
              <select v-model="assignee">
                <option disabled value="default">
                  Select a year and department
                </option>
                <option v-for="assignee in assignees" :key="assignee">
                  {{ assignee }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-one-third">
        <label class="label">Duration</label>
        <div class="field has-addons is-fullwidth">
          <p class="control has-icons-left has-icons-right is-expanded">
            <input
              class="input"
              type="text"
              placeholder="Enter the duration"
              v-model="duration"
            />
            <span class="icon is-small is-left">
              <i class="fas fa-clock"></i>
            </span>
          </p>
          <p class="control">
            <a class="button is-static"> mins </a>
          </p>
        </div>
        <div class="field">
          <label class="label">Date</label>
          <div class="control">
            <input
              class="input"
              type="date"
              placeholder="Enter the test date"
              v-model="date"
            />
            <!-- <span class="icon is-small is-left">
              <i class="fas fa-calendar"></i>
            </span> -->
          </div>
          <!-- <p class="help is-danger">This email is invalid</p> -->
        </div>
      </div>
      <div class="column is-one-third">
        <label class="label">Unlock time</label>
        <div class="field has-addons">
          <div class="control is-expanded">
            <input
              class="input"
              type="time"
              placeholder="Enter the unlock window"
              v-model="start_time"
            />
          </div>
          <div class="control">
            <button class="button" disabled style="border: 0">
              <span class="icon is-small">
                <i class="fas fa-arrow-right"></i>
              </span>
            </button>
          </div>
          <div class="control is-expanded">
            <input
              class="input"
              type="time"
              placeholder="Enter the unlock window"
              v-model="end_time"
            />
          </div>
        </div>
      </div>
      <!-- <div class="column is-full">
        <table class="table">

        </table>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      assignees: ['Mechanical - I', 'ECE - I'],
      assignee: 'default',
    }
  },
  computed: {
    title() {
      return 'Add Test'
    },
  },
}
</script>

<style></style>

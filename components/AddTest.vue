<template>
  <div :class="{ modal: true, visible: display, 'fade-in-quick': true }">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="section" v-if="display">
        <h1 class="title">{{ title }}</h1>
        <div class="columns is-multiline">
          <div class="column is-one-third">
            <div class="field">
              <label class="label">Name</label>
              <div class="control has-icons-left has-icons-right">
                <input
                  class="input"
                  type="text"
                  placeholder="Enter the test name"
                  v-model="name"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-font"></i>
                </span>
              </div>
              <!-- <p class="help is-danger">This email is invalid</p> -->
            </div>
            <label class="label">Assign To</label>
            <div class="field has-addons">
              <div class="control">
                <div class="select is-fullwidth">
                  <select v-model="department" class="is-size-6">
                    <option disabled value="default">Department</option>
                    <option v-for="department in departments" :key="department">
                      {{ department }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="control">
                <div class="select is-fullwidth">
                  <select v-model="year" class="is-size-6">
                    <option disabled value="default">Year</option>
                    <option v-for="year in years" :key="year">
                      {{ year }}
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
          <div id="table-container" class="column is-full">
            <div id="table-level" class="level">
              <div class="level-left">
                <div class="level-item">
                  <h2 class="title is-size-3 is-bold">Questions</h2>
                </div>
              </div>
              <div class="level-right">
                <div class="level-item">
                  <button class="button is-primary">
                    <span class="icon"> <i class="fas fa-plus"></i> </span>
                    <span>Add Question</span>
                  </button>
                </div>
              </div>
            </div>
            <b-table
              :data="questions"
              :columns="columns"
              striped
              hoverable
              focusable
              @click="openQuestion"
            ></b-table>
          </div>
        </div>
        <div class="column is-full has-text-centered" @click="submit">
          <button class="button is-primary">
            <span class="icon"> <i class="fas fa-check"></i> </span>
            <span> Confirm </span>
          </button>
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
  props: ['display'],
  data() {
    return {
      tid: null,
      name: null,
      duration: null,
      date: null,
      start_time: null,
      end_time: null,
      departments: [
        'Mechanical',
        'ECE',
        'IT',
        'Civil',
        'Biotech',
        'EIE',
        'CSE',
      ],
      department: 'default',
      year: 'default',
      years: ['I', 'II', 'III', 'IV'],
      assignee: 'default',
      questions: [
        {
          qid: '123A',
          text: 'Some Text',
          weightage: '2',
          correct_choice: 'Option 1',
          choices: '1. Option 1, 2. Option 3, 4. Option 5',
        },
        {
          qid: '123B',
          text: 'Some Text',
          weightage: '2',
          correct_choice: 'Option 1',
          choices: '1. Option 1, 2. Option 3, 4. Option 5',
        },
        {
          qid: '123C',
          text: 'Some Text',
          weightage: '2',
          correct_choice: 'Option 1',
          choices: '1. Option 1, 2. Option 3, 4. Option 5',
        },
      ],
      columns: [
        {
          field: 'text',
          label: 'Text',
        },
        {
          field: 'weightage',
          label: 'Weightage',
        },
        {
          field: 'correct_choice',
          label: 'Correct Choice',
        },
        {
          field: 'choices',
          label: 'Choices',
        },
      ],
    }
  },
  methods: {
    openQuestion(data) {
      console.log(data)
      alert(`Opening question:  ${data} now!`)
    },
    submit() {
      if (this.tid == null) {
        const tid = this.$fire.database.ref('test').push().key
        this.$fire.database
          .ref('test')
          .child(tid)
          .set({
            tid: tid,
            status:
              this.date || this.year || this.department || this.duration
                ? 'Not started'
                : 'Not assigned',
            name: this.name,
            year: this.year,
            department: this.department,
            duration: this.duration,
            date: this.date,
            start_time: this.start_time,
            end_time: this.end_time,
            questions: this.questions,
          })
      }
    },
  },
  computed: {
    title() {
      if (this.name) {
        return this.name
      }
      return 'Add Test'
    },
  },
}
</script>

<style scoped>
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

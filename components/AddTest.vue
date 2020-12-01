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
                    <option disabled value="none">Department</option>
                    <option v-for="department in departments" :key="department">
                      {{ department }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="control">
                <div class="select is-fullwidth">
                  <select v-model="year" class="is-size-6">
                    <option disabled value="none">Year</option>
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
                  <button class="button is-primary" @click="addQuestions">
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
        <div class="has-text-centered">
          <button class="button is-primary" @click="submit(false)">
            <span class="icon"> <i class="fas fa-check"></i> </span>
            <span> {{ buttonLabel }} </span>
          </button>
          <button class="button is-warning" @click="removeTest" v-if="tid">
            <span class="icon"> <i class="fas fa-trash"></i> </span>
            <span> Remove Test </span>
          </button>
        </div>
      </div>
    </div>
    <button
      class="modal-close is-large"
      aria-label="close"
      @click="$emit('close')"
    ></button>
    <lazy-add-questions
      :display="questionModal"
      @close=";(questionModal = false), (index = null)"
      @reload="loadQuestions"
      :tid="tid"
      :originalQuestions="questions"
      :index="index"
    />
  </div>
</template>

<script>
import AddQuestions from './AddQuestions.vue'
export default {
  components: { AddQuestions },
  props: ['display', 'test'],
  data() {
    return {
      changed: false,
      index: null,
      tid: null,
      name: null,
      duration: null,
      date: null,
      start_time: null,
      end_time: null,
      department: 'none',
      year: 'none',
      departments: [
        'Mechanical',
        'ECE',
        'IT',
        'Civil',
        'Biotech',
        'EIE',
        'CSE',
      ],
      years: ['I', 'II', 'III', 'IV'],
      questionModal: false,
      assignee: 'none',
      questions: [],
      columns: [
        {
          field: 'text',
          label: 'Text',
        },
        {
          field: 'weightage',
          label: 'Weightage',
        },
        // {
        //   field: 'correct_choice',
        //   label: 'Correct Choice',
        // },
        {
          field: 'choices',
          label: 'Choices',
        },
      ],
    }
  },
  methods: {
    resetForm() {
      this.questions = []
      this.tid = null
    },
    openQuestion(question) {
      this.index = this.questions.indexOf(question)
      this.questionModal = true
    },
    removeAtLocation(location) {
      this.$fire.database
        .ref(location)
        .child(this.tid)
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
              message: 'Deleted Test successfully',
              type: 'is-success',
            })
          }
          this.$emit('close')
          this.$emit('reload')
        })
    },
    removeTest() {
      if (this.tid != null) {
        this.removeAtLocation('test')
        this.removeAtLocation('questions')
        this.removeAtLocation('answers')
        this.removeAtLocation('state')
        this.removeAtLocation('results')
        // this.$fire.database
        //   .ref('test')
        //   .child(this.tid)
        //   .remove()
        //   .then((err) => {
        //     if (err) {
        //       this.$buefy.toast.open({
        //         duration: 2000,
        //         message: `Something's not good, <b>error!</b>`,
        //         position: 'is-bottom',
        //         type: 'is-danger',
        //       })
        //     } else {
        //       this.$buefy.toast.open({
        //         message: 'Deleted Test successfully',
        //         type: 'is-success',
        //       })
        //     }
        //     this.$emit('close')
        //     this.$emit('reload')
        //   })
        // this.$fire.database
        //   .ref('questions')
        //   .child(this.tid)
        //   .remove()
        //   .then((err) => {
        //     if (err) {
        //       this.$buefy.toast.open({
        //         duration: 2000,
        //         message: `Something's not good, <b>error!</b>`,
        //         position: 'is-bottom',
        //         type: 'is-danger',
        //       })
        //     } else {
        //       this.$buefy.toast.open({
        //         message: 'Deleted Test successfully',
        //         type: 'is-success',
        //       })
        //     }
        //     this.$emit('close')
        //     this.$emit('reload')
        //   })
      }
    },
    submit(preventClose = false) {
      let tid
      if (this.tid == null) {
        tid = this.$fire.database.ref('test').push().key
        this.tid = tid
      } else {
        tid = this.tid
      }
      const assignedGroup = `${this.year} - ${this.department}`
      this.$fire.database
        .ref('test')
        .child(tid)
        .update({
          tid: tid,
          status:
            this.date || this.year || this.department || this.duration
              ? 'Not started'
              : 'Not assigned',
          name: this.name,
          year: this.year,
          department: this.department,
          assignedGroup: assignedGroup,
          duration: this.duration,
          date: this.date,
          start_time: this.start_time,
          end_time: this.end_time,
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
          if (preventClose == false) {
            this.$emit('close')
          }
          this.$emit('reload')
        })
    },
    addQuestions() {
      if (this.tid == null) {
        // Have to add test first then add questions
        this.submit(true)
      }
      this.questionModal = true
    },
    loadQuestions() {
      console.log('Loading questions')
      if (this.tid !== null) {
        this.$fire.database
          .ref(`questions/${this.tid}`)
          .once('value')
          .then((snapshot) => {
            if (snapshot.val() == null) {
              this.questions = []
            } else {
              this.questions = snapshot.val()
            }
            console.log(this.questions)
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
    buttonLabel() {
      if (this.test) {
        return 'Update'
      } else {
        return 'Add'
      }
    },
  },
  watch: {
    display: function (val) {
      if (val == true && this.test == null) {
        this.tid = null
        this.name = null
        this.duration = null
        this.date = null
        this.start_time = null
        this.end_time = null
        this.department = 'none'
        this.year = 'none'
        this.questions = []
        console.log('No Object found')
      } else if (val == true && this.test != null) {
        this.tid = null
        this.name = null
        this.duration = null
        this.date = null
        this.start_time = null
        this.end_time = null
        this.department = 'none'
        this.year = 'none'
        this.questions = []
        for (const property in this.test) {
          this[property] = this.test[property]
        }
        this.loadQuestions()
        this.$buefy.toast.open({
          message: 'Test object found!',
          type: 'is-warning',
        })
      } else if (val == false) {
        // Closing modal
        this.resetForm()
        this.$emit('reset')
      }
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
  margin-top: 50px;
  width: 80%;
  border-radius: 10px;
}
</style>

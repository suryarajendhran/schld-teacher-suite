<template>
  <div :class="{ modal: true, visible: display, 'fade-in-quick': true }">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="section" v-if="display">
        <h1 class="title is-size-4-mobile">{{ title }}</h1>
        <div class="columns is-multiline">
          <div class="column is-one-third">
            <div class="field">
              <label class="label has-text-grey-dark">Name</label>
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
            <label class="label has-text-grey-dark">Assign To</label>
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
            <label class="label has-text-grey-dark">Duration</label>
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
              <label class="label has-text-grey-dark">Date</label>
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
            <label class="label has-text-grey-dark">Unlock time</label>
            <div class="field">
              <div class="control is-expanded">
                <input
                  class="input"
                  type="time"
                  placeholder="Enter the unlock window"
                  v-model="start_time"
                />
              </div>
              <div class="control">
                <button
                  class="button"
                  disabled
                  style="border: 0; display: flex; margin: auto"
                >
                  <span class="icon is-small">
                    <i class="fas fa-arrow-down"></i>
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
          <b-tabs size="is-medium" type="is-toggle" expanded class="mt-2">
            <b-tab-item label="Questions">
              <div class="table-container column is-full">
                <div class="table-level level">
                  <div class="level-left">
                    <div class="level-item">
                      <h2 class="title is-size-3 is-size-4-mobile is-bold">
                        <!-- Questions -->
                      </h2>
                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <button
                        class="button is-primary is-size-6-mobile"
                        @click="addQuestions"
                      >
                        <span class="icon"> <i class="fas fa-plus"></i> </span>
                        <span class="is-size-6-mobile">Add Question</span>
                      </button>
                    </div>
                  </div>
                </div>
                <b-table
                  :data="questions"
                  :columns="columns"
                  :loading="!questions.length"
                  striped
                  hoverable
                  focusable
                  @click="openQuestion"
                  paginated
                  per-page="6"
                  sort-icon="arrow-up"
                ></b-table>
              </div>
            </b-tab-item>
            <b-tab-item label="Results">
              <div class="table-container column is-full">
                <div class="table-level level">
                  <div class="level-item">
                    <div class="level-item">
                      <h2
                        class="title is-size-3 is-size-4-mobile is-bold has-text-centered"
                      >
                        <!-- Results -->
                      </h2>
                    </div>
                  </div>
                </div>
                <b-table
                  :data="results"
                  :columns="result_columns"
                  :loading="!results.length"
                  striped
                  hoverable
                  focusable
                  paginated
                  per-page="6"
                  sort-icon="arrow-up"
                ></b-table>
              </div>
            </b-tab-item>
          </b-tabs>
        </div>
        <div class="has-text-centered is-flex is-justify-content-space-between">
          <button class="button is-primary mt-1" @click="submit(false)">
            <span class="icon"> <i class="fas fa-check"></i> </span>
            <span> {{ buttonLabel }} </span>
          </button>
          <button class="button is-warning mt-1" @click="removeTest" v-if="tid">
            <span class="icon"> <i class="fas fa-trash"></i> </span>
            <span> Remove </span>
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
    <lazy-result :result="activeResult" @close="activeResult=null'/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AddQuestions from './AddQuestions.vue'
export default {
  components: { AddQuestions },
  props: ['display', 'test'],
  data() {
    return {
      activeResult: null,
      changed: false,
      editing: false,
      index: null,
      tid: null,
      name: null,
      duration: null,
      date: null,
      start_time: null,
      end_time: null,
      department: 'none',
      year: 'none',
      departments: ['ECE', 'Mechanical', 'EEE', 'IT', 'CSE', 'Civil', 'EIE'],
      years: ['I', 'II', 'III', 'IV'],
      questionModal: false,
      assignee: 'none',
      questions: [],
      columns: [
        {
          field: 'qid',
          label: 'S.No.',
        },
        {
          field: 'text',
          label: 'Text',
        },
        {
          field: 'weightage',
          label: 'Weightage',
        },
        {
          field: 'choices',
          label: 'Choices',
        },
      ],
      results: [],
      result_columns: [
        {
          field: 'roll_number',
          label: 'Roll.No.',
        },
        {
          field: 'name',
          label: 'Name',
        },
        {
          field: 'correct',
          label: 'Correct Answers',
        },
        {
          field: 'score',
          label: 'Marks',
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
          owner: this.user.uid,
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
            let message = 'Added test'
            if (this.editing == true) {
              message = 'Updated test'
            }
            this.$buefy.toast.open({
              message: `${message} successfully!`,
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
    loadResults() {
      console.log('loading results')
      if (this.tid !== null) {
        this.$fire.database
          .ref(`results/${this.tid}`)
          .once('value')
          .then((snapshot) => {
            snapshot.forEach((user) => {
              console.log(user.val())
              console.log(this.tid)
              var data = user.val()
              this.results.push(data)
            })
          })
      }
    },
    loadQuestions() {
      this.loadResults()
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
    ...mapState({
      user: (state) => state.auth.user,
    }),
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
        this.editing = true
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
.table-container {
  margin-top: 20px;
  border-radius: 5px;
}
/* .table-level {
} */
.visible {
  display: block;
}
.modal-content {
  background-color: white;
  margin-top: 50px;
  width: 80%;
  border-radius: 10px;
  height: 90%;
}
</style>

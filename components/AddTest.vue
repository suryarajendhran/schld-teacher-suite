<template>
  <div :class="{ modal: true, visible: display, 'fade-in-quick': true }">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="section" v-if="display">
        <h1 class="title is-size-4-mobile">
          {{ title }}
        </h1>
        <div class="columns is-multiline">
          <div class="column is-one-quarter">
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
          <div class="column is-one-quarter">
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
          <div class="column is-one-quarter">
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
          <div class="column is-one-quarter">
            <label class="label has-text-grey-dark">Pass percentage</label>
            <div class="field has-addons is-fullwidth">
              <p class="control has-icons-left has-icons-right is-expanded">
                <input
                  class="input"
                  type="number"
                  placeholder="Enter the duration"
                  v-model="pass_percentage"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-check"></i>
                </span>
              </p>
              <p class="control">
                <a class="button is-static"> % </a>
              </p>
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
                      <b-dropdown
                        v-model="questionsPaginate"
                        aria-role="list"
                        class="mr-2"
                      >
                        <button
                          class="button is-warning"
                          type="button"
                          slot="trigger"
                        >
                          <span>{{ questionsPaginate }} per page</span>
                          <b-icon icon="menu-down"></b-icon>
                        </button>

                        <b-dropdown-item :value="5" aria-role="listitem">
                          <p>5</p>
                        </b-dropdown-item>

                        <b-dropdown-item :value="10" aria-role="listitem">
                          <p>10</p>
                        </b-dropdown-item>

                        <b-dropdown-item :value="20" aria-role="listitem">
                          <p>20</p>
                        </b-dropdown-item>

                        <b-dropdown-item :value="50" aria-role="listitem">
                          <p>50</p>
                        </b-dropdown-item>
                      </b-dropdown>
                      <button
                        class="button is-primary is-size-6-mobile"
                        @click="addQuestions"
                      >
                        <span class="icon"> <i class="fas fa-plus"></i> </span>
                        <span class="is-size-6-mobile">Add Question</span>
                      </button>
                      <div class="mx-2 file is-primary">
                        <label class="file-label">
                          <input
                            @change="importQuestions"
                            class="file-input"
                            type="file"
                            name="resume"
                            accept=".xls,.xlsx"
                          />
                          <span class="file-cta">
                            <span class="file-icon">
                              <i class="fas fa-upload"></i>
                            </span>
                            <span class="file-label"> Import Questions</span>
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <b-table
                  :data="questions"
                  :loading="!questions.length"
                  striped
                  hoverable
                  focusable
                  @click="openQuestion"
                  paginated
                  :per-page="questionsPaginate"
                  sort-icon="arrow-up"
                >
                  <template slot-scope="props" slot="header">
                    <div style="width: 100%" class="has-text-centered">
                      {{ props.column.label }}
                    </div>
                  </template>
                  <b-table-column label="Sl.No" v-slot="props"
                    >{{ props.index + 1 }}
                  </b-table-column>
                  <b-table-column label="Text" v-slot="props"
                    >{{ props.row.text }}
                  </b-table-column>
                  <b-table-column label="Weightage" v-slot="props"
                    >{{ props.row.weightage }}
                  </b-table-column>
                  <b-table-column label="Choices" v-slot="props"
                    >{{ props.row.choices[0] }}, {{ props.row.choices[1] }},
                    {{ props.row.choices[2] }}, {{ props.row.choices[3] }}
                  </b-table-column>
                </b-table>
              </div>
            </b-tab-item>
            <b-tab-item v-if="tid" label="Results">
              <div class="table-container column is-full">
                <div class="table-level level">
                  <div class="level-item">
                    <div class="level-item">
                      <h2
                        class="title is-size-3 is-size-4-mobile is-bold has-text-centered"
                      >
                        <!-- Results -->
                      </h2>
                      <button class="button is-success" @click="exportSheet">
                        Export to XLSX
                      </button>
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
                  @click="openResult"
                  paginated
                  per-page="6"
                  sort-icon="arrow-up"
                ></b-table>
              </div>
            </b-tab-item>
            <b-tab-item label="Status">
              <div class="table-container column is-full">
                <div class="table-level level">
                  <div class="level-item">
                    <div class="level-item"></div>
                  </div>
                </div>
                <b-table
                  :data="students_status"
                  :columns="status_column"
                  :loading="!students_status.length"
                  striped
                  paginated
                  per-page="50"
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
          <button
            class="button is-warning mt-1"
            @click="confirmRemoveTest"
            v-if="tid"
          >
            <span class="icon"> <i class="fas fa-trash"></i> </span>
            <span> Remove </span>
          </button>
        </div>
      </div>
    </div>
    <button
      class="modal-close is-large"
      aria-label="close"
      @click="resetForm"
    ></button>
    <lazy-add-questions
      :display="questionModal"
      @close=";(questionModal = false), (index = null)"
      @reload="loadQuestions"
      :tid="tid"
      :originalQuestions="questions"
      :index="index"
    />
    <lazy-result :result="activeResult" @close="activeResult = null" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
import { state } from '~/store/auth'
import AddQuestions from './AddQuestions.vue'
import Result from './Result.vue'
import XLSX from 'xlsx'

export default {
  components: { AddQuestions, Result },
  props: ['display', 'test'],
  data() {
    return {
      file: null,
      results: null,
      resultsRef: null,
      state: null,
      stateRef: null,
      questionsPaginate: 5,
      activeResult: null,
      changed: false,
      editing: false,
      pass_percentage: null,
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
      students_status: [],
      status_column: [
        {
          field: 'student',
          label: 'Student',
        },
        {
          field: 'status',
          label: 'Status',
        },
        {
          field: 'score',
          label: 'Score',
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
      this.results = []
      this.students_status = []
      this.$emit('close')
    },
    importQuestions(e) {
      var files = e.target.files,
        f = files[0]
      var reader = new FileReader()
      reader.onload = async (e) => {
        var data = new Uint8Array(e.target.result)
        var workbook = XLSX.read(data, { type: 'array' })
        var i = 2
        var questions = []
        var answers = []
        for (const key in this.questions) {
          questions.push(this.questions[key])
        }
        await this.$fire.database
          .ref(`answers/${this.tid}`)
          .once('value')
          .then((snapshot) => {
            snapshot.forEach((answer) => {
              answers.push(answer.val())
              console.log(answer.val())
            })
          })
        while (i != 0) {
          if (workbook.Sheets.Sheet1[`A${i}`] !== undefined) {
            const question = {
              qid: questions.length,
              text: workbook.Sheets.Sheet1[`A${i}`].v,
              weightage: workbook.Sheets.Sheet1[`B${i}`].v,
              choices: [
                workbook.Sheets.Sheet1[`C${i}`].v,
                workbook.Sheets.Sheet1[`D${i}`].v,
                workbook.Sheets.Sheet1[`E${i}`].v,
                workbook.Sheets.Sheet1[`F${i}`].v,
              ],
            }
            const answer = {
              value: workbook.Sheets.Sheet1[`G${i}`].v,
              weightage: workbook.Sheets.Sheet1[`B${i}`].v,
            }
            questions.push(question)
            answers.push(answer)
            i++
          } else {
            i = 0
          }
        }
        this.$fire.database
          .ref('questions')
          .child(this.tid)
          .set(questions)
          .then((err) => {
            if (err) {
              this.$buefy.toast.open({
                duration: 2000,
                message: `Something's not good, <b>error!</b>`,
                position: 'is-bottom',
                type: 'is-danger',
              })
            } else {
            }
          })
        this.$fire.database
          .ref('answers')
          .child(this.tid)
          .set(answers)
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
                duration: 2000,
                message: `Questions Imported</b>`,
                position: 'is-bottom',
                type: 'is-success',
              })
            }
          })
      }
      reader.readAsArrayBuffer(f)
    },
    openQuestion(question) {
      this.index = this.questions.indexOf(question)
      this.questionModal = true
    },
    exportSheet() {
      var sheet = XLSX.utils.book_new()
      sheet.Props = {
        Title: 'Results',
        Subject: 'Test Results',
        Author: 'Scholared',
        CreatedDate: new Date(),
      }
      sheet.SheetNames.push('Sheet 1')
      var sheetData = [
        [
          'Name',
          'Roll Number',
          'Attempted',
          'Correct',
          'Score',
          'Out of Total',
        ],
      ]
      this.results.forEach((result) => {
        sheetData.push([
          result.name,
          result.roll_number,
          result.attempted,
          result.correct,
          result.score,
          result.total,
        ])
      })
      sheet.Sheets['Sheet 1'] = XLSX.utils.aoa_to_sheet(sheetData)
      var file = XLSX.write(sheet, { bookType: 'xlsx', type: 'binary' })
      XLSX.writeFile(sheet, 'results.xlsx', { bookType: 'xlsx' })
    },
    openResult(result) {
      result.data = []
      let marks = 0
      for (let i = 0; i < result.question.length; i++) {
        if (result.answers[i]) {
          if (result.question[i] === 'correct') {
            marks = result.answers[i].weightage
          } else {
            marks = 0
          }
          try {
            result.data.push({
              qid: i + 1,
              result: result.question[i],
              correct_answer: result.answers[i].value,
              marks: marks,
            })
          } catch (err) {
            console.log('Error with data: ')
            console.log('Result is ', result)
            console.log('I is', i)
          }
        }
      }
      this.activeResult = result
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
    confirmRemoveTest() {
      this.$buefy.dialog.confirm({
        title: 'Deleting Test',
        message:
          'Are you sure you want to <b>delete</b> this Test? This action cannot be undone.',
        confirmText: 'Delete Test',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => this.removeTest(),
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
          pass_percentage: this.pass_percentage,
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
              var data = user.val()
              this.results.push(data)
            })
          })
      }
    },
    async loadStudents() {
      if (this.tid !== null) {
        this.students_status = []
        await this.$fire.database
          .ref(`student/`)
          .orderByChild('groupId')
          .equalTo(`${this.year} - ${this.department}`)
          .once('value')
          .then((snapshot) => {
            snapshot.forEach((user) => {
              this.students_status.push({
                uid: user.key,
                student: user.val().name,
                status: 'Not Started Exam',
              })
            })
          })
        var state_listener = this.$fire.database.ref(`state/${this.tid}`)
        student_listener.on('value').then((snapshot) => {
          var states = []
          snapshot.forEach((user) => {
            states.push(user.key)
          })
          for (let i = 0; i < this.students_status.length; i++) {
            if (states.includes(this.students_status[i].uid)) {
              this.students_status[i].status = 'Started Exam'
            }
          }
        })
      }
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
    students() {
      if (this.tid) {
        return this.studentsByGroupID(`${this.year} - ${this.department}`)
      }
      return []
    },
    ...mapState({
      user: (state) => state.auth.user,
    }),
    ...mapGetters({ studentsByGroupID: 'data/studentsByGroupID' }),
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
        this.pass_percentage = null
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
        this.pass_percentage = null
        for (const property in this.test) {
          this[property] = this.test[property]
        }
        // this.$fire.database
        //   .ref('student')
        //   .orderByChild('groupId')
        //   .equalTo(`${this.year} - ${this.department}`)
        //   .on('value', (snapshot) => {
        //     console.log('Updating students')
        //     let students = []
        //     snapshot.forEach((student) => {
        //       students.push(student)
        //     })
        //     this.students = students
        //   })
        this.loadQuestions()
        this.loadResults()
        this.loadStudents()
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

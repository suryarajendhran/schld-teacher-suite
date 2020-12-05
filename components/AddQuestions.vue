<template>
  <div :class="{ modal: true, visible: display, 'fade-in-quick': true }">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="section" v-if="display">
        <h1 class="title">{{ title }}</h1>
        <p class="subtitle is-5">
          Questions {{ current_question }}/{{ total_questions }}
        </p>
        <div class="columns is-multiline">
          <div class="column is-half">
            <div class="field">
              <label class="label">Text</label>
              <div class="control">
                <textarea
                  class="textarea"
                  placeholder="Enter the question"
                  v-model="text"
                ></textarea>
              </div>
            </div>
          </div>
          <div class="column is-half">
            <div class="field">
              <label class="label">Choice #1</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  v-model="choices[0]"
                  required
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Choice #2</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  v-model="choices[1]"
                  required
                />
              </div>
            </div>
          </div>
          <div class="column is-half">
            <label class="label">Correct Choice</label>
            <div class="buttons has-addons">
              <p class="control">
                <button
                  v-for="option in options"
                  :key="option"
                  :class="{
                    button: true,
                    'is-info': correct_choice == option,
                    'is-light': correct_choice == option,
                  }"
                  @click="correct_choice = option"
                >
                  {{ option + 1 }}
                </button>
              </p>
            </div>
            <div class="field">
              <label class="label">Weightage</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="Marks assigned for question"
                  v-model="weightage"
                  required
                />
              </div>
            </div>
          </div>
          <div class="column is-half">
            <div class="field">
              <label class="label">Choice #3</label>
              <div class="control">
                <input class="input" v-model="choices[2]" required />
              </div>
            </div>
            <div class="field">
              <label class="label">Choice #4</label>
              <div class="control">
                <input class="input" v-model="choices[3]" required />
              </div>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column has-text-centered">
            <button class="button is-primary mt-2" @click="submit">
              <span>{{ addQuestionLabel }}</span>
              <span class="icon">
                <i class="fas fa-check-circle"></i>
              </span>
            </button>
            <button class="button is-warning mt-2" @click="removeQuestion">
              <span>Remove Question</span>
              <span class="icon">
                <i class="fas fa-trash"></i>
              </span>
            </button>
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
  props: ['display', 'originalQuestions', 'index', 'tid'],
  data() {
    return {
      text: null,
      editing: false,
      questions: null,
      options: [0, 1, 2, 3],
      correct_choices: {},
      choice_1: null,
      choice_2: null,
      choice_3: null,
      choice_4: null,
      choices: ['', '', '', ''],
      correct_choice: null,
      weightage: null,
      current_question: null,
      total_questions: null,
    }
  },
  methods: {
    checkForm() {
      if (
        this.text == null ||
        this.correct_choice == null ||
        this.weightage == null ||
        this.choices[0] == null ||
        this.choices[1] == null ||
        this.choices[2] == null ||
        this.choices[3] == null
      ) {
        this.$buefy.dialog.alert({
          title: 'Error',
          message: 'Please enter all the details for the question',
          type: 'is-danger',
          hasIcon: true,
          icon: 'times-circle',
          iconPack: 'fa',
          ariaRole: 'alertdialog',
          ariaModal: true,
        })
        return false
      } else {
        return true
      }
    },
    resetForm() {
      console.log('Calling reset form')
      this.text = null
      this.editing = false
      this.questions = null
      this.correct_choices = {}
      this.choice_1 = null
      this.choice_2 = null
      this.choice_3 = null
      this.choice_4 = null
      this.choices = ['', '', '', '']
      this.correct_choice = null
      this.weightage = null
      this.current_question = null
      this.total_questions = null
    },
    addLatestToArray() {
      this.correct_choices[this.questions.length] = this.choices[
        this.correct_choice
      ]
      this.questions.push({
        text: this.text,
        choices: this.choices,
        weightage: this.weightage,
        qid: this.questions.length,
      })
    },
    removeQuestion() {
      if (this.editing == true) {
        this.questions.splice(this.index, 1)
        this.$fire.database
          .ref(`questions/${this.tid}`)
          .set(this.questions)
          .then((err) => {
            if (err) {
              this.$buefy.toast.open({
                duration: 2000,
                message: `Something's not good, <b>${err}</b>`,
                position: 'is-bottom',
                type: 'is-danger',
              })
            } else {
              this.$buefy.toast.open({
                message: 'Removed successfully!',
                type: 'is-success',
              })
              this.$emit('close')
              this.$emit('reload')
            }
          })
        for (const qid in this.correct_choices) {
          this.$fire.database
            .ref(`answers/${this.tid}`)
            .update({ [qid]: this.correct_choices[qid] })
        }
      }
    },

    submit() {
      if (this.checkForm() == false) {
        return
      }
      if (this.editing == false) {
        this.addLatestToArray()
      } else {
        this.correct_choices[this.index] = this.choices[this.correct_choice]
      }
      console.log(this.correct_choices)
      for (const qid in this.correct_choices) {
        this.$fire.database
          .ref(`answers/${this.tid}`)
          .update({
            [qid]: {
              value: this.correct_choices[qid],
              weightage: this.questions[qid].weightage,
            },
          })
          .catch((err) => {
            console.log('Some err ', err)
          })
      }
      this.$fire.database
        .ref(`questions/${this.tid}`)
        .set(this.questions)
        .then((err) => {
          if (err) {
            this.$buefy.toast.open({
              duration: 2000,
              message: `Something's not good, <b>${err}</b>`,
              position: 'is-bottom',
              type: 'is-danger',
            })
          } else {
            let message = 'Added question'
            if (this.editing == true) {
              message = 'Updated question'
            }
            this.$buefy.toast.open({
              message: `${message} successfully!`,
              type: 'is-success',
            })
            this.$emit('close')
            this.$emit('reload')
          }
        })
    },
  },
  computed: {
    title() {
      if (this.name) {
        return this.name
      }
      return 'Add Question'
    },
    addQuestionLabel() {
      if (this.editing == true) {
        return 'Update Question'
      } else {
        return 'Add Question'
      }
    },
  },
  watch: {
    display: function (val) {
      this.resetForm()
      this.questions = this.originalQuestions
      if (val == true && this.index == null) {
        // Clicked on add question
        this.editing = false
        this.total_questions = this.questions.length + 1
        this.current_question = this.total_questions
      } else if (val == true && this.index != null) {
        // Editing exiting question
        this.editing = true
        this.total_questions = this.questions.length
        this.current_question = this.index + 1
        this.$fire.database
          .ref(`answers/${this.tid}/${this.index}`)
          .once('value')
          .then((snapshot) => {
            console.log(snapshot.val())
            this.correct_choice = this.choices.indexOf(snapshot.val().value)
          })
        const question = this.questions[this.index]
        console.log(question)
        for (const key in question) {
          this[key] = question[key]
        }
      } else if (val == false) {
        // Closing the modal
        console.log('Modal closing')
      }
    },
    text(val) {
      if (this.editing) {
        this.questions[this.index].text = val
      }
    },
    choices(val) {
      if (this.editing) {
        this.questions[this.index].choices = val
      }
    },
    weightage(val) {
      if (this.editing) {
        this.questions[this.index].weightage = val
      }
    },
  },
}
</script>

<style scoped>
.title {
  transition: all 0.2s ease-in;
}
.visible {
  display: block;
}
.modal-content {
  background-color: white;
  margin-top: 40px;
  width: 80%;
  border-radius: 10px;
}
.radio {
  display: none;
}
</style>

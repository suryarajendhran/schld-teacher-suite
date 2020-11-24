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
            <div class="field">
              <div class="field">
                <label class="label">Correct Choice</label>
                <div class="control">
                  <input
                    class="input"
                    type="number"
                    v-model="correct_choice"
                    required
                  />
                </div>
              </div>
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
          <!-- <div class="column">
            <div class="field is-grouped is-grouped-centered">
              <div class="control is-expanded">
                <button class="button is-danger is-fullwidth">
                  <span class="icon">
                    <i class="fas fa-arrow-circle-left"></i>
                  </span>
                  <span>Previous</span>
                </button>
              </div>
              <div class="control is-expanded">
                <button class="button is-warning is-fullwidth">
                  <span>Next</span>
                  <span class="icon">
                    <i class="fas fa-arrow-circle-right"></i>
                  </span>
                </button>
              </div>
            </div>
          </div> -->
          <div class="column has-text-centered">
            <button class="button is-primary" @click="submit">
              <span>Finish Adding Question</span>
              <span class="icon">
                <i class="fas fa-check-circle"></i>
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
      questions: null,
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
    resetForm() {
      this.text = null
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
        this.correct_choice - 1
      ]
      this.questions.push({
        text: this.text,
        choices: this.choices,
        weightage: this.weightage,
        qid: this.questions.length,
      })
    },
    submit() {
      this.addLatestToArray()
      for (const qid in this.correct_choices) {
        this.$fire.database
          .ref(`answers/${this.tid}`)
          .update({ [qid]: this.correct_choices[qid] })
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
            this.$buefy.toast.open({
              message: 'Added successfully!',
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
  },
  watch: {
    display: function (val) {
      this.questions = this.originalQuestions
      if (val == true && this.index == null) {
        // Clicked on add question
        this.total_questions = this.questions.length + 1
        this.current_question = this.total_questions
      } else if (val == true && this.index != null) {
        // Editing exiting question
        this.total_questions = this.questions.length
        this.current_question = this.index + 1
        const question = this.questions[this.index]
        console.log(question)
        for (const key in question) {
          this[key] = question[key]
        }
      } else if (val == false) {
        // Closing the modal
        console.log('Modal closing')
        this.resetForm()
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
  margin-top: 10%;
  width: 80%;
  border-radius: 10px;
}
</style>

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
                  v-model="question"
                ></textarea>
              </div>
            </div>
          </div>
          <div class="column is-half">
            <div class="field">
              <label class="label">Choice #1</label>
              <div class="control">
                <input class="input" type="text" v-model="choice_1" required />
              </div>
            </div>
            <div class="field">
              <label class="label">Choice #2</label>
              <div class="control">
                <input class="input" type="text" v-model="choice_2" required />
              </div>
            </div>
          </div>
          <div class="column is-half">
            <div class="field">
              <label class="label">Correct Choice</label>
              <div class="control">
                <div class="select is-fullwidth">
                  <select v-model="correct_choice">
                    <option disabled value="default">
                      Select the correct choice
                    </option>
                    <option v-for="choice in choices" :key="choice">
                      {{ choice }}
                    </option>
                  </select>
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
                <input class="input" v-model="choice_3" required />
              </div>
            </div>
            <div class="field">
              <label class="label">Choice #4</label>
              <div class="control">
                <input class="input" v-model="choice_4" required />
              </div>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column">
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
          </div>
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
  props: ['display', 'questions', 'index', 'tid', 'qid'],
  data() {
    return {
      question: null,
      choice_1: null,
      choice_2: null,
      choice_3: null,
      choice_4: null,
      choices: ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4'],
      correct_choice: 'default',
      weightage: null,
      current_question: null,
      total_questions: null,
    }
  },
  methods: {
    submit() {
      alert('Submit clicked!')
      let qid
      if (this.qid == null) {
        qid = this.$fire.database.ref(`test/${this.tid}/questions`).push().key
      }
      const choices = [
        this.choice_1,
        this.choice_2,
        this.choice_3,
        this.choice_4,
      ]
      this.$fire.database.ref(`test/${this.tid}/questions`).child(qid).update({
        question: this.question,
        choices: choices,
        correct_choice: this.correct_choice,
        weightage: this.weightage,
        tid: this.tid,
        qid: this.qid,
      })
    },
  },
  computed: {
    title() {
      if (this.name) {
        return this.name
      }
      return 'Add Questions'
    },
  },
  watch: {
    display: function (val) {
      if (val == true && this.index == null) {
        // Clicked on add question
        this.total_questions = this.questions.length + 1
        this.current_question = this.total_questions
      } else if (val == true && this.index != null) {
        // Editing exiting question
        this.total_questions = this.questions.length
        this.current_question = this.index
        const question = this.questions[this.index]
        for (const key in question) {
          this[key] = question[key]
        }
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

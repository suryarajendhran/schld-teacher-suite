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
                <input class="input" type="text" v-model="choice_1" />
              </div>
            </div>
            <div class="field">
              <label class="label">Choice #2</label>
              <div class="control">
                <input class="input" type="text" v-model="choice_2" />
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
                />
              </div>
            </div>
          </div>
          <div class="column is-half">
            <div class="field">
              <label class="label">Choice #3</label>
              <div class="control">
                <input class="input" v-model="choice_3" />
              </div>
            </div>
            <div class="field">
              <label class="label">Choice #4</label>
              <div class="control">
                <input class="input" v-model="choice_4" />
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
            <button class="button is-primary">
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
  props: ['display', 'questionObj'],
  data() {
    return {
      question: null,
      choice_1: null,
      choice_2: null,
      choice_3: null,
      choice_4: null,
      choices: ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4'],
      correct_choice: 'default',
      year: 'default',
      weightage: null,
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
      return 'Add Questions'
    },
    current_question() {
      return 1
    },
    total_questions() {
      return 4
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

<template>
  <div class="section">
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
            <input class="input" type="text" v-model="opt1" />
          </div>
        </div>
        <div class="field">
          <label class="label">Choice #2</label>
          <div class="control">
            <input class="input" type="text" v-model="opt2" />
          </div>
        </div>
      </div>
      <div class="column is-half">
        <div class="field">
          <label class="label">Correct Choice</label>
          <div class="control">
            <div class="select is-fullwidth">
              <select v-model="correct_option">
                <option disabled value="default">Select Correct Option</option>
                <option v-for="choice in options" :key="choice">
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
            <input class="input" v-model="opt3" />
          </div>
        </div>
        <div class="field">
          <label class="label">Choice #4</label>
          <div class="control">
            <input class="input" v-model="opt4" />
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
</template>

<script>
export default {
  data() {
    return {
      question: null,
      opt1: null,
      opt2: null,
      opt3: null,
      opt4: null,
      options: ['opt1', 'opt2', 'opt3'],
      correct_option: 'default',
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
</style>

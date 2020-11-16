<template>
  <div class="section">
    <h1 class="title">{{ title }}</h1>
    <p class="subtitle is-5">Questions {{current_question}}/{{total_questions}}</p>
    <div class="columns is-multiline">
      <div class="column is-half">
        <div class="field">
          <label class="label">Text</label>
          <div class="control">
            <textarea
              class="textarea"
              placeholder="Textarea"
              v-model="question"
            ></textarea>
          </div>
        </div>
      </div>
      <div class="column is-half">
        <div class="field">
          <label class="label">Option 1</label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="Option 1"
              v-model="opt1"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Option 2</label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="Option 2"
              v-model="opt2"
            />
          </div>
        </div>
      </div>
      <div class="column is-half">
        <div class="field">
          <label class="label">Correct Option</label>
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
          <label class="label">Option 3</label>
          <div class="control">
            <input class="input" placeholder="Option 3" v-model="opt3" />
          </div>
        </div>
        <div class="field">
          <label class="label">Option 4</label>
          <div class="control">
            <input class="input" placeholder="Option 4" v-model="opt4" />
          </div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <div class="field is-grouped">
          <p class="control">
          <button class="button is-primary">Previous</button>
          </p>
          <p class="control">
          <button class="button is-primary">Next</button>
          </p>
        </div>
      </div>
      <div class="column">
        <div class="buttons">
          <button class="button is-primary is-fullwidth">Finish Adding Question</button>
        </div>
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

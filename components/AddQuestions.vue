<template>
  <div class="section">
    <h1 class="title">{{ title }}</h1>
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
        <div class="field is-horizontal">
          <label class="field-label">Correct Choice</label>
          <div class="control">
            <div class="select is-fullwidth">
              <select class="field-body" v-model="correct_choice">
                <option disabled value="default">
                  Select the Correct Choice
                </option>
                <option v-for="choice in choices" :key="choice">
                  {{ choice }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <label class="field-label">Weightage</label>
          <div class="control">
            <input
              class="input field-body"
              type="tel"
              placeholder="Option 1"
              v-model="weightage"
            />
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="control field-body">
            <button  class="button  is-primary">Previous</button>
          </div>
          <div class="control field-body">
            <button class="button  is-primary">Previous</button>
          </div>
        </div>
      </div>
      <div class="column is-half">
        <div class="field">
          <label class="label">Option 1</label>
          <div class="control">
            <input
              class="input"
              type="tel"
              placeholder="Option 1"
              v-model="opt1"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Option 2</label>
          <div class="control">
            <input class="input" placeholder="Option 2" v-model="opt2" />
          </div>
        </div>
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
        
        <div class="field">
          <div class="control">
            <button class="button is-primary">Finish</button>
          </div>
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
      choices: [],
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
  },
}
</script>

<style scoped>
.title {
  transition: all 0.2s ease-in;
}
</style>

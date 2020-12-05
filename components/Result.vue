<template>
  <div :class="{ modal: true, visible: result, 'fade-in-quick': true }">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="section" v-if="result">
        <h1>Hello</h1>
        <p>This is some sample text! {{ content}}</p>
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
  props: ['result'],
  computed: {
    content() {
      return result.roll_number
    },
  },
}
</script>

<style scoped>
.modal-content {
  background-color: white;
  margin-top: 50px;
  width: 80%;
  border-radius: 10px;
  height: 90%;
}
.visible {
  display: block;
}
</style>

<template>
  <div :class="{ modal: true, visible: result, 'fade-in-quick': true }">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="section" v-if="result">
        <h1>Hello</h1>
        <p>This is some sample text!</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['result'],
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
</style>

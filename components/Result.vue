<template>
  <div :class="{ modal: true, visible: result, 'fade-in-quick': true }">
    <div class="modal-background"></div>
    <div class="modal-content"></div>
  </div>
</template>

<script>
export default {
  props: ['result'],
}
</script>

<style></style>

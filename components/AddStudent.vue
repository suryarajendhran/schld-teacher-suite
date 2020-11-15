<template>
  <div>
    <div class="section">
      <h1 class="title">{{ title }}</h1>
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input class="input" type="text" placeholder="Text input" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    title() {
      return 'Add Student'
    },
  },
}
</script>

<style></style>

<template>
  <div :class="{ modal: true, visible: result, 'fade-in-quick': true }">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="section" v-if="result">
        <div class="title is-size-4 is-size-3-mobile">{{ result.name }}</div>
        <strong>Roll Number: </strong> {{result.roll_number}}
        <p><strong>Attempted:</strong>{{result.attempted}}</p>
        <p><strong>Score:</strong>{{result.score}}/{{ result.total }}</p>
        <div>
          <b-table
                  :data="result.data"
                  :columns="columns"
                  :loading="!result.data.length"
                  striped
                  paginated
                  per-page="10"
                  sort-icon="arrow-up"
                ></b-table>
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
  props: ['result'],
  data(){
    return {
      columns: [
        {
          field: 'qid',
          label: 'Sl.No',
        },
        {
          field: 'result',
          label: 'Status',
        },
        {
          field: 'correct_answer',
          label: 'Correct Answer',
        },
        {
          field: 'marks',
          label: 'Marks',
        },
      ],
    }
  }
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

<template>
  <section class="section">
    <!-- <add-student /> -->
    <!-- <add-test /> -->
    <div class="columns">
      <div class="column is-one-third">
        <h1 class="title">{{ greeting }}</h1>
        <div id="action-container">
          <button class="button is-primary">Broadcast Message</button>
          <button class="button is-warning">Settings</button>
          <button class="button is-danger">Sign Out</button>
        </div>
      </div>
      <div class="column is-two-thirds">
        <div id="table-container" class="column is-full">
          <div id="table-level" class="level">
            <div class="level-left">
              <div class="level-item">
                <h2 class="title is-size-3 is-bold">Students</h2>
              </div>
            </div>
            <div class="level-right">
              <div class="level-item">
                <button class="button is-primary">
                  <span class="icon"> <i class="fas fa-plus"></i> </span>
                  <span>Add Student</span>
                </button>
              </div>
            </div>
          </div>
          <b-table
            :data="students"
            :columns="columns"
            striped
            hoverable
            focusable
            @click="openStudent"
          ></b-table>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AddStudent from '~/components/AddStudent.vue'
import AddTest from '~/components/AddTest.vue'
export default {
  data() {
    return {
      students: [
        {
          uid: 'bvwbis',
          name: 'Surya Rajendhran',
          password: 'fu27fb9',
          dept: 'ECE',
          year: 'IV',
        },
        {
          uid: 'bv37is',
          name: 'Avinash MG',
          password: '18g7s1j',
          dept: 'IT',
          year: 'III',
        },
        {
          uid: 'rtig28',
          name: 'Murali Mohan Rao',
          password: 'f1uvj78',
          dept: 'EIE',
          year: 'II',
        },
        {
          uid: 'fut18',
          name: 'Kaillash Madhanraj',
          password: '479g7ehi',
          dept: 'Mech',
          year: 'I',
        },
      ],
      columns: [
        {
          field: 'uid',
          label: 'User ID',
          searchable: true,
        },
        {
          field: 'name',
          label: 'Name',
        },
        { field: 'password', label: 'Password' },
        { field: 'dept', label: 'Department' },
        { field: 'year', label: 'Year' },
      ],
    }
  },
  methods: {
    openStudent(student) {
      alert(student)
      console.log(student)
    },
  },
  components: { AddStudent, AddTest },
  computed: {
    greeting() {
      return 'Good Morning'
    },
  },
}
</script>

<style>
#action-container {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: #f1f1f1;
  border-radius: 5px;
  padding: 10px 30px;
  height: 250px;
}
#action-container .button {
  display: flex;
  height: 52px;
  font-weight: 500;
}
#table-container {
  border-radius: 5px;
  height: 100%;
  background-color: #f1f1f1;
}
</style>

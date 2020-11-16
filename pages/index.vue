<template>
  <section class="section">
    <!-- <add-student /> -->
    <!-- <add-test /> -->
    <div class="columns is-multiline">
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
            :columns="columns.students"
            striped
            hoverable
            focusable
            @click="openStudent"
          ></b-table>
        </div>
      </div>
      <div class="column is-one-third">
        <div id="activity-container" class="container">
          <h2 class="is-size-4 has-text-weight-semibold">Activity</h2>
          <div id="notifications">
            <div class="notification">
              <div class="time">3:00 PM:</div>
              Fluid Mechanics test has started
            </div>
          </div>
        </div>
      </div>
      <div class="column is-two-thirds">
        <div id="table-container" class="column is-full">
          <div id="table-level" class="level">
            <div class="level-left">
              <div class="level-item">
                <h2 class="title is-size-3 is-bold">Tests</h2>
              </div>
            </div>
            <div class="level-right">
              <div class="level-item">
                <button class="button is-primary">
                  <span class="icon"> <i class="fas fa-plus"></i> </span>
                  <span>Add Test</span>
                </button>
              </div>
            </div>
          </div>
          <b-table
            :data="tests"
            :columns="columns.tests"
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
      tests: [
        {
          name: 'Destructive Testing',
          dept: 'Mech',
          year: 'III',
          status: 'Not started',
          date: '12-12-2020',
          duration: '120 mins',
        },
        {
          name: 'Microcontrollers and System Design',
          dept: 'EIE',
          year: 'II',
          status: 'Completed',
          date: '11-11-2020',
          duration: '90 mins',
        },
        {
          name: 'Professional Ethics',
          dept: 'IT',
          year: 'III',
          status: 'Completed',
          date: '20-10-2020',
          duration: '150 mins',
        },
      ],
      columns: {
        students: [
          {
            field: 'uid',
            label: 'User ID',
            searchable: true,
          },
          {
            field: 'name',
            label: 'Name',
            searchable: true,
          },
          { field: 'password', label: 'Password' },
          { field: 'dept', label: 'Department' },
          { field: 'year', label: 'Year' },
        ],
        tests: [
          {
            field: 'name',
            label: 'Name',
            searchable: true,
          },
          {
            field: 'dept',
            label: 'Department',
          },
          {
            field: 'year',
            label: 'Year',
          },
          {
            field: 'status',
            label: 'Status',
          },
          {
            field: 'date',
            label: 'Date',
          },
          {
            field: 'duration',
            label: 'Duration',
          },
        ],
      },
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
#activity-container {
  border-radius: 5px;
  /* margin-top: 20px; */
  background-color: #f1f1f1;
  padding: 10px 10px;
  height: 100%;
}
#notifications {
  margin: 10px 5px 10px 5px;
}
.notification {
  border-radius: 5px;
  background-color: #444444;
  color: #dddddd;
  display: flex;
  justify-content: space-between;
}
.time {
  align-self: flex-end;
}
#table-container {
  border-radius: 5px;
  height: 100%;
  background-color: #f1f1f1;
}
</style>

<template>
  <section class="section">
    <div class="columns">
      <div class="column is-half is-justify-content-center mt-2">
        <h1
          class="title is-size-4 is-size-3-mobile has-text-left has-text-centered-mobile"
        >
          {{ greeting }}
        </h1>
      </div>
      <div class="column is-half has-text-right">
        <!-- <button class="button is-primary is-light mt-2">
          Broadcast Message
        </button> -->
        <!-- <button class="button is-warning mt-2">Settings</button> -->
        <button class="button is-danger mt-2" @click="signOut">Sign Out</button>
      </div>
    </div>
    <div class="columns">
      <div class="column is-8 is-offset-2">
        <b-tabs size="is-medium" type="is-toggle" expanded>
          <b-tab-item label="Students">
            <div class="columns">
              <div
                class="column is-two-fifths is-offset-three-fifths has-text-right"
              >
                <button class="button is-primary" @click="addStudent">
                  <span class="icon"> <i class="fas fa-plus"></i> </span>
                  <span>Add Student</span>
                </button>
              </div>
            </div>
            <b-table
              :data="students"
              :loading="!students.length"
              striped
              hoverable
              focusable
              @click="openStudent"
            >
              <template slot-scope="props" slot="header">
                <div style="width: 100%" class="has-text-centered">
                  {{ props.column.label }}
                </div>
              </template>
              <b-table-column
                field="name"
                label="Name"
                v-slot="props"
                searchable
                >{{ props.row.name }}
              </b-table-column>
              <b-table-column
                field="department"
                label="Department"
                v-slot="props"
                sortable
              >
                {{ props.row.department }}
              </b-table-column>
              <b-table-column field="year" label="Year" v-slot="props">
                {{ props.row.year }}
              </b-table-column>
              <b-table-column field="password" label="Password" v-slot="props">
                {{ props.row.password }}
              </b-table-column>

              <b-table-column field="locked" label="Status" v-slot="props">
                <div
                  :class="{
                    locked: props.row.locked,
                    unlocked: !props.row.locked,
                  }"
                >
                  {{ props.row.locked ? 'Locked' : 'Unlocked' }}
                </div>
              </b-table-column>
            </b-table>
          </b-tab-item>
          <b-tab-item label="Tests">
            <div class="columns">
              <div
                class="column is-one-quarter is-offset-three-quarters has-text-right"
              >
                <button class="button is-primary" @click="addTest">
                  <span class="icon"> <i class="fas fa-plus"></i> </span>
                  <span>Add Test</span>
                </button>
              </div>
            </div>
            <b-table
              :data="tests"
              :columns="columns.tests"
              :loading="!tests"
              striped
              hoverable
              focusable
              @click="openTest"
            >
            </b-table>
          </b-tab-item>
        </b-tabs>
      </div>
    </div>
    <lazy-add-student
      :display="studentModal"
      :student="activeStudent"
      @close="studentModal = false"
      @reload="$store.dispatch('data/loadData')"
      @reset="activeStudent = false"
    />
    <lazy-add-test
      :display="testModal"
      :test="activeTest"
      @close="testModal = false"
      @reload="$store.dispatch('data/loadData')"
      @reset="activeTest = null"
    />
  </section>
</template>

<script>
import AddQuestions from '~/components/AddQuestions.vue'
import AddStudent from '~/components/AddStudent.vue'
import AddTest from '~/components/AddTest.vue'
import { mapState } from 'vuex'

export default {
  head: {
    script: [
      {
        src: 'https://cdn.onesignal.com/sdks/OneSignalSDK.js',
        defer: true,
        async: true,
      },
    ],
  },
  mounted() {
    if (window.innerWidth <= 800 || window.innerHeight <= 600) {
      // alert('This is a mobile')
      this.$buefy.dialog.alert({
        message:
          'This portal is optimized for viewing on a desktop or PC so if possible open this page on your computer or laptop for a better experience',
      })
    }
    window.OneSignal = window.OneSignal || []
    window.OneSignal.push(function () {
      OneSignal.init({
        appId: 'a30feb88-935f-49e3-b952-4df3ffd7dbe8',
        notifyButton: {
          enable: true,
        },
      })
    })
    this.$store.dispatch('data/loadData')
    this.reloadDataInterval = setInterval(() => {
      this.$store.dispatch('data/loadData')
    }, 2000)
  },
  data() {
    return {
      testModal: false,
      activeTest: null,
      studentModal: false,
      activeStudent: null,
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
          { field: 'department', label: 'Department' },
          { field: 'year', label: 'Year' },
        ],
        tests: [
          {
            field: 'name',
            label: 'Name',
            searchable: true,
          },
          {
            field: 'department',
            label: 'Department',
          },
          {
            field: 'year',
            label: 'Year',
          },
          {
            field: 'start_time',
            label: 'Starting at',
          },
          {
            field: 'end_time',
            label: 'Ending at',
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
    isLater(time) {
      console.log(time)
      const timeNow = new Date()
      const convertedTime = new Date(time)
      console.log(timeNow)
      console.log(convertedTime)
      if (timeNow > convertedTime) {
        return 'Started'
      } else {
        return 'Not Started'
      }
    },
    openStudent(student) {
      this.studentModal = true
      this.activeStudent = student
      console.log(student)
    },
    openTest(test) {
      this.activeTest = test
      this.testModal = true
    },
    signOut() {
      this.$fire.auth.signOut()
      this.$store.commit('auth/switch')
      console.log('Signing out')
      this.$router.push('/login')
    },
    addTest() {
      this.testModal = true
    },
    addStudent() {
      this.studentModal = true
    },
  },
  components: { AddStudent, AddTest, AddQuestions },
  computed: {
    greeting() {
      let greeting
      const hoursNow = new Date().getHours()
      if (hoursNow < 10) {
        greeting = 'Good Morning'
      } else if (hoursNow >= 10 && hoursNow < 15) {
        greeting = 'Good Afternoon'
      } else {
        greeting = 'Good Evening'
      }
      try {
        greeting = greeting + ' ' + this.user.displayName.split(' ')[0]
      } catch (e) {
        console.log('No username defined for user!')
      }
      return greeting
    },
    isSignOutLoading() {},
    students() {
      if (this.$store.state.data.students == null) {
        return []
      } else {
        return this.$store.state.data.students
      }
    },
    tests() {
      if (this.$store.state.data.tests == null) {
        return []
      }
      return this.$store.state.data.tests
    },
    ...mapState({
      authErr: (state) => state.data.authError,
      user: (state) => state.auth.user,
    }),
  },
  watch: {
    authErr(val) {
      if (val == true) {
        this.signOut()
      }
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
  align-self: flex-start;
  margin-right: 5px;
}
#table-container {
  border-radius: 5px;
  height: 100%;
  background-color: #f1f1f1;
}
tbody tr {
  cursor: pointer;
}
.tab-content {
  background: #f1f1f1;
}
.locked {
  background-color: rgb(248, 60, 60);
  border-radius: 5px;
  text-align: center;
  padding: 2px 5px;
  color: white;
}
.unlocked {
  background-color: rgb(0, 207, 0);
  border-radius: 5px;
  text-align: center;
  padding: 2px 5px;
  color: rgb(85, 85, 85);
}
.b-table .table th .th-wrap {
  justify-content: center;
}
.table tbody td {
  text-align: center;
}
.modal-card {
  padding: 0px 10px;
}
</style>

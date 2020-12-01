<template>
  <section class="section">
    <div class="columns">
      <div class="column is-one-quarter">
        <h1 class="title has-text-left">{{ greeting }}</h1>
      </div>
      <div class="column is-half is-offset-one-quarter has-text-right">
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
              <!-- <div class="column is-two-fifths">
                <button
                  class="button is-primary"
                  @click="$store.dispatch('data/loadData')"
                >
                  <span class="icon"> <i class="fa fa-refresh"></i> </span>
                  <span>Reload Data</span>
                </button>
              </div> -->
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
              striped
              hoverable
              focusable
              @click="openStudent"
            >
              <template scope="props" slot="header">
                <div style="width: 100%" class="has-text-centered">
                  {{ props.column.label }}
                </div>
              </template>
              <!-- <b-table-column field="uid" label="User ID" v-slot="props">
                {{ props.row.uid }}
              </b-table-column> -->
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
              striped
              hoverable
              focusable
              @click="openTest"
            ></b-table>
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
    <!-- <add-questions /> -->
  </section>
</template>

<script>
import AddQuestions from '~/components/AddQuestions.vue'
import AddStudent from '~/components/AddStudent.vue'
import AddTest from '~/components/AddTest.vue'
import { mapState } from 'vuex'

export default {
  mounted() {
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
      return 'Good Morning'
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
    ...mapState({ authErr: (state) => state.data.authError }),
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
</style>

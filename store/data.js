export const state = () => ({
  tests: null,
  students: null,
  testLoaded: false,
  studentLoaded: false,
  authError: false,
})

export const mutations = {
  LOAD_TESTS: (state, { tests }) => {
    state.tests = tests
    state.testLoaded = true
  },
  LOAD_STUDENTS: (state, { students }) => {
    state.students = students
    state.studentLoaded = true
  },
  AUTH_ERR: (state) => {
    state.authError = true
  },
}

export const actions = {
  loadData({ commit }) {
    if (this.$fire.auth.currentUser.uid == 'pUV3qa27F9Rm5KKBDy0wyUuK9kh2') {
      this.$fire.database.ref('test').on('value', (snapshot) => {
        const testData = snapshot.val()
        let tests = []
        for (const key in testData) {
          tests.push(testData[key])
        }
        commit('LOAD_TESTS', { tests })
      })
      this.$fire.database.ref('student').on('value', (snapshot) => {
        const studentData = snapshot.val()
        let students = []
        for (const key in studentData) {
          students.push(studentData[key])
        }
        commit('LOAD_STUDENTS', { students })
      })
    } else {
      this.$fire.database
        .ref('test')
        .orderByChild('owner')
        .equalTo(this.$fire.auth.currentUser.uid)
        .on('value', (snapshot) => {
          const testData = snapshot.val()
          let tests = []
          for (const key in testData) {
            // console.log(testData[key]);
            tests.push(testData[key])
          }
          commit('LOAD_TESTS', { tests })
        })
      this.$fire.database.ref('student').on('value', (snapshot) => {
        const studentData = snapshot.val()
        let students = []
        for (const key in studentData) {
          students.push(studentData[key])
        }
        commit('LOAD_STUDENTS', { students })
      })
    }
  },
}

export const getters = {
  studentsByGroupID: (state) => (groupId) => {
    let filteredStudents = []
    state.students.forEach((student) => {
      if (student.groupId == groupId) {
        filteredStudents.push(student)
      }
    })
    return filteredStudents
  },
  studentsByDepartment: (state) => (department) => {
    console.log("Received value at home",department)
    let filteredStudents = []
    if (state.students == null) {
      return []
    }
    state.students.forEach((student) => {
      if (student.department == department) {
        filteredStudents.push(student)
      }
    })
    return filteredStudents
  },
}

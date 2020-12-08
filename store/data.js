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
      this.$fire.database
        .ref('test')
        .once('value')
        .then((snapshot) => {
          const testData = snapshot.val()
          let tests = []
          for (const key in testData) {
            // console.log(testData[key]);
            tests.push(testData[key])
          }
          commit('LOAD_TESTS', { tests })
        })
        .catch((err) => {
          if (err.message.includes('permission_denied')) {
            commit('AUTH_ERR')
          }
        })
    } else {
      this.$fire.database
        .ref('test')
        .orderByChild('owner')
        .equalTo(this.$fire.auth.currentUser.uid)
        .once('value')
        .then((snapshot) => {
          const testData = snapshot.val()
          let tests = []
          for (const key in testData) {
            // console.log(testData[key]);
            tests.push(testData[key])
          }
          commit('LOAD_TESTS', { tests })
        })
        .catch((err) => {
          if (err.message.includes('permission_denied')) {
            commit('AUTH_ERR')
          }
        })
    }
    this.$fire.database
      .ref('student')
      .once('value')
      .then((snapshot) => {
        const studentData = snapshot.val()
        let students = []
        for (const key in studentData) {
          // console.log(testData[key]);
          students.push(studentData[key])
        }
        commit('LOAD_STUDENTS', { students })
      })
      .catch((err) => {
        console.log('Error!!')
        // console.log(err.includes('permission_denied'))
        console.log(err.message)
        if (err.message.includes('permission_denied')) {
          commit('AUTH_ERR')
        }
      })
  },
}

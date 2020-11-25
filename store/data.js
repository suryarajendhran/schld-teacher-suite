export const state = () => ({
  tests: null,
  students: null,
  testLoaded: false,
  studentLoaded: false,
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
}

export const actions = {
  loadData({ commit }) {
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
  },
}

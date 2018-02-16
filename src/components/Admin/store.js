const store = {
  state: {
    jobRequestData: null,
  },

  setJobRequestData (newValue) {
    console.log('saving to store...', newValue)
    this.state.jobRequestData = newValue
  },

  clearJobRequestData () {
    this.state.jobRequestData = null
  }
}

export default store
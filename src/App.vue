<template>
  <div id="app" clas="container">
      <h1 id="title">a</h1>
      <input-payment></input-payment>
      <input-user></input-user>
      <user-list></user-list>
      <b-modal ref="modal" @ok="modalOk" @cancel="modalCancel">
          {{this.$store.state.modalMessage}}
      </b-modal>
  </div>
</template>

<script>
import InputPayment from './components/InputPayment'
import InputUser from './components/InputUser'
import UserList from './components/UserList'

export default {
  name: 'App',
  components: {
    InputPayment,
    InputUser,
    UserList
  },
  mounted () {
    // show modal
    this.$store.watch(
      (state) => {
        return state.modalMessage
      },
      (message) => {
        if (message) {
          this.$refs.modal.show(message)
        }
      }
    )
  },
  methods: {
    modalOk () {
      this.$store.commit('setModalMessage', null)
    },
    modalCancel () {
      this.$store.commit('setModalMessage', null)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 60px auto;
  color: #2c3e50;
  width: 600px;
}
#title {
    margin-bottom: 20px;
}
</style>

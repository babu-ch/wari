<template>
  <div id="app" clas="container">
      <h1 id="title">割り勘アプリ</h1>
      <input-payment></input-payment>
      <input-user></input-user>
      <user-list></user-list>
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

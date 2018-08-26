<template>
  <div class="hello">
      user
    <input type="text" v-model="userName" v-on:change="addUser">
  </div>
</template>

<script>
import {_} from 'vue-underscore'

export default {
  name: 'InputUser',
  data () {
    return {
      userName: ''
    }
  },
  methods: {
    addUser () {
      const users = this.$store.state.users
      const duplicateUser = _.findWhere(users, {name: this.userName})
      if (duplicateUser) {
        alert('duplicate user')
        return
      }
      this.$store.commit('addUser', this.userName)
      this.userName = ''
      this.$store.commit('updateUserPayments2')
    }
  }
}
</script>

<style scoped lang="scss">
</style>

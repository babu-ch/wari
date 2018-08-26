<template>
    <ul>
        <li v-for="user in this.$store.state.users">
            <user :user="user"></user>
        </li>
    </ul>
</template>

<script>
import User from './User'
export default {
  name: 'InputUser',
  components: {
    User
  }
}
</script>

<style scoped lang="scss">
    li {
        border: 1px solid #CCC;
    }
</style>

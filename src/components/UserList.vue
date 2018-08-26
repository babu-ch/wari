<template>
    <div class="list-group">
        <user v-for="user in this.$store.state.users" :user="user"></user>
    </div>
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

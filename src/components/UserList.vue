<template>
      <transition-group tag="ul" class="list-group" name="fade">
        <user v-for="user in this.$store.state.users" :user="user" :key="user.id"></user>
      </transition-group>
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
    .fade-enter-active, .fade-leave-active {
        transition: all 1s;
    }
    .fade-leave-active {
        position: absolute;
    }
    .fade-move {
        transition: all 1s;
    }
    .fade-enter {
        opacity: 0;
        transform: translateY(-30px);
    }
    .fade-leave-to {
        opacity: 0;
        transform: translateY(-30px);
    }
</style>

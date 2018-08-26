<template>
  <div class="hello">
    input
    <input type="number" v-model.number="totalPayment" v-on:change="changeTotalPayment">
  </div>
</template>

<script>
export default {
  name: 'InputPayment',
  data () {
    return {
      totalPayment: 0
    }
  },
  methods: {
    changeTotalPayment () {
      this.$store.commit('setTotalPayment', this.totalPayment)
      this.$store.commit('updateUserPayments2')
    }
  }
}
</script>

<style scoped lang="scss">
</style>

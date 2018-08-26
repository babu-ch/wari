<template>
  <div  class="input-group mb-3">
    <div class="input-group-prepend">
      <span class="input-group-text">総額入れろ</span>
    </div>
    <input type="number" v-model.number="totalPayment" v-on:change="changeTotalPayment" class="form-control">
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

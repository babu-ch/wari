<template>
    <li class="list-group-item">
        <div class="row">
            <div class="col-sm content">
                    {{user.name}}さん 支払額：{{payment|ceil}}
            </div>
            <div class="col-sm">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text">額を変更</span>
                    </div>
                    <input type="number" class="form-control" v-model.number="userPayment" v-on:change="changeUserPayment" placeholder="変更後の額を入力してね！">
                </div>
                <button type="button" class="btn btn-primary" v-on:click="toHalfPrice">半額にする</button>
                <button type="button" class="btn btn-primary" v-on:click="toFreePrice">タダにする</button>
            </div>
        </div>
    </li>
</template>

<script>
import {_} from 'vue-underscore'

export default {
  name: 'InputUser',
  props: ['user'],
  data () {
    return {
      userPayment: null
    }
  },
  computed: {
    payment () {
      return this.$store.state.userPayments[this.user.id]
    }
  },
  methods: {
    changeUserPayment () {
      try {
        this.validateUserPayment()
      } catch (e) {
        alert(e.message)
        this.userPayment = null
        return
      }

      this.$store.commit('changeUserInputPayment', {id: this.user.id, payment: this.userPayment})
      this.$store.commit('updateUserPayments2')
      this.userPayment = null
    },
    toHalfPrice () {
      this.userPayment = this.payment / 2
      this.changeUserPayment()
    },
    toFreePrice () {
      this.userPayment = 0
      this.changeUserPayment()
    },
    validateUserPayment () {
      if (this.userPayment >= this.$store.state.totalPayment) {
        throw new Error('それじゃおごりじゃねーか')
      }
      // 全員が支払額変更後されたら困るのでさせないようにする
      const otherUser = _.filter(this.$store.state.users, (user) => user.id !== this.user.id)
      const otherSpecialPaymentUser = _.filter(otherUser, (user) => user.inputPayment !== null)
      if (otherUser.length === otherSpecialPaymentUser.length) {
        throw new Error('全員の支払額いじってんじゃねーぞ')
      }
    }
  },
  filters: {
    ceil (value) {
      return Math.ceil(value)
    }
  }
}
</script>

<style scoped lang="scss">
    li {
        padding: 30px;
    }
</style>

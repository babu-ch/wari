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
                    <input
                        type="number"
                        class="form-control"
                        v-model.number="userPayment"
                        v-on:change="changeUserPayment"
                        placeholder="変更後の額を入力してね！"
                    >
                </div>
                <button type="button" class="btn btn-primary" v-on:click="toHalfPrice">半額にする</button>
                <button type="button" class="btn btn-primary" v-on:click="toFreePrice">タダにする</button>
            </div>
            <button type="button" class="close" aria-label="閉じる" v-on:click="deleteUser">
                <span aria-hidden="true">&times;</span>
            </button>
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
      return this.user.payment
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
      if (this.userPayment < 0) {
        throw new Error('負数入れてんじゃねーぞ')
      }
      // 入力値が総額を超えている
      if (this.userPayment >= this.$store.state.totalPayment) {
        throw new Error('それじゃおごりじゃねーか')
      }
      const otherUser = _.reject(this.$store.state.users, {id: this.user.id});
      // 自分がタダの時に支払うユーザが一人しかいない
      if (this.userPayment === 0) {
        const payUsers = _.filter(otherUser, (user) => user.payment !== 0)
        if (payUsers.length === 1) {
          throw new Error('おごりになっちまうぞ')
        }
      }
      const otherSpecialPaymentUser = _.filter(otherUser, (user) => user.inputPayment !== null)
      // 自分以外の全員のpaymentが編集されている
      if (otherUser.length === otherSpecialPaymentUser.length) {
        const otherPayment = _.reduce(otherSpecialPaymentUser, (sum, user) => sum + user.payment, 0)
        if ((otherPayment + this.userPayment) <= this.$store.state.totalPayment) {
          throw new Error('お金足りてねええ！！！！！！１１１')
        }
      }
    },
    deleteUser () {
      // 他のユーザーが一人しかいない場合支払い情報をクリア
      const otherUsers = this.$store.getters.otherUsers(this.user.id)
      if (otherUsers.length === 1) {
        this.$store.commit('clearAllUserInputPayment')
      }
      this.$store.commit('removeUser', this.user.id);
      this.$store.commit('updateUserPayments2')
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

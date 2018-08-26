import Vue from 'vue'
import Vuex from 'vuex'
import {_} from 'vue-underscore'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [],
    userPayments: [],
    totalPayment: null
  },
  mutations: {
    addUser (state, userName) {
      const user = {}
      const id = state.users.length
      Vue.set(user, 'id', id)
      Vue.set(user, 'name', userName)
      Vue.set(user, 'inputPayment', null)
      state.users.unshift(user)
    },
    removeUser (state, id) {
      const otherUsers = _.reject(state.users, {id})
      state.users = otherUsers
    },
    changeUserInputPayment(state, payload) {
      const user = _.findWhere(state.users, {id: payload.id})
      console.log(user)
      Vue.set(user, 'inputPayment', payload.payment)
    },
    setTotalPayment(state, payment) {
      state.totalPayment = payment
      console.log('ttlPayment', payment)
    },
    updateUserPayments2(state) {
      const users = state.users
      if (users.length === 0) {
        return
      }
      const userPay = []
      const [normalPaymentUsers, specialPaymentUsers] = _.partition(users, (user) => user.inputPayment == null)
      const specialPayment = _.reduce(specialPaymentUsers, (sum, user) => sum + user.inputPayment, 0)
      const remainingPayment = this.state.totalPayment - specialPayment
      const normalUserPayment = remainingPayment / normalPaymentUsers.length
      normalPaymentUsers.forEach((user) => {
        userPay[user.id] = normalUserPayment
      })
      specialPaymentUsers.forEach((user) => {
        userPay[user.id] = user.inputPayment
      })
      state.userPayments = userPay
    }
  }
})

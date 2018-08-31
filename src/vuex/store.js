import Vue from 'vue'
import Vuex from 'vuex'
import {_} from 'vue-underscore'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 各要素にユーザー情報が入る 追加されるレコードはaddUser参照
    users: [],
    // 支払い総額
    totalPayment: null,
    // ユーザー作成時のid 作成ごとにインクリメントする
    // もしかしたらusersのmax id+1で済むかも
    autoIncrementId: 0,
    // 値が変化した時にモーダルを表示する
    modalMessage: ''
  },
  mutations: {
    // ユーザーを追加
    addUser (state, userName) {
      const user = {}
      const id = this.state.autoIncrementId++
      Vue.set(user, 'id', id)
      Vue.set(user, 'name', userName)
      // 入力された支払い情報
      Vue.set(user, 'inputPayment', null)
      // 計算して設定する実際の支払い情報
      Vue.set(user, 'payment', null)
      state.users.unshift(user)
    },
    // idのユーザーを削除
    removeUser (state, id) {
      const otherUsers = _.reject(state.users, {id})
      state.users = otherUsers
    },
    // payload.idのユーザーの支払い情報を設定
    changeUserInputPayment (state, payload) {
      const user = _.findWhere(state.users, {id: payload.id})
      Vue.set(user, 'inputPayment', payload.payment)
    },
    // 全員の支払い情報をクリア
    clearAllUserInputPayment (state) {
      state.users.forEach((user) => {
        user.inputPayment = null
      })
    },
    // 総額を設定
    setTotalPayment (state, payment) {
      state.totalPayment = payment
    },
    /**
     * 計算してpaymentを設定する
     * @param state
     */
    updateUserPayments2 (state) {
      const users = state.users
      if (users.length === 0) {
        return
      }
      // 割り勘ユーザーと支払額が入力されているユーザーを分けて取得
      const [normalPaymentUsers, specialPaymentUsers] = _.partition(users, (user) => user.inputPayment == null)
      const specialPayment = _.reduce(specialPaymentUsers, (sum, user) => sum + user.inputPayment, 0)
      const remainingPayment = this.state.totalPayment - specialPayment
      const normalUserPayment = remainingPayment / normalPaymentUsers.length
      normalPaymentUsers.forEach((user) => {
        user.payment = normalUserPayment
      })
      specialPaymentUsers.forEach((user) => {
        user.payment = user.inputPayment
      })
    },
    setModalMessage (state, message) {
      state.modalMessage = message
    }
  },
  getters: {
    otherUsers: (state) => (id) => {
      return _.reject(state.users, {id})
    }
  }
})

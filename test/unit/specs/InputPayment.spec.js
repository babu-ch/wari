import Vue from 'vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'


import InputPayment from '@/components/InputPayment'
import Vuex from 'vuex'
const localVue = createLocalVue()

localVue.use(Vuex)

describe('InputPayment.vue', () => {
  let store, mutations
  beforeEach(() => {
    mutations = {
      setModalMessage: jest.fn(),
      setTotalPayment: jest.fn(),
      updateUserPayments2: jest.fn()
    }
    store = new Vuex.Store({
      state: {},
      mutations
    })
  })
  it('１以下の値が入力された時にモーダルメッセージが設定されていること', () => {
    const wrapper = shallowMount(InputPayment, { store, localVue })
    const input = wrapper.find('input')
    input.setValue(0)
    input.trigger('change')
    expect(mutations.setModalMessage).toHaveBeenCalled()
  })
  it('一以上の値が入力された時にストアの値が更新されていること', () => {
    const wrapper = shallowMount(InputPayment, { store, localVue })
    const input = wrapper.find('input')
    input.setValue(1)
    input.trigger('change')
    expect(mutations.setTotalPayment).toHaveBeenCalled()
    // Modalは呼ばれていないこと
    expect(mutations.setModalMessage).not.toHaveBeenCalled()
  })
})

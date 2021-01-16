import { getArea } from '@/api/common'


const state = {
  cityList:[]
}

const mutations = {
  SET_CITY: (state, list) => {
    state.cityList = list
  }
}

const actions = {
  getCityList({ commit }, id) {
    let params = {
      id: id
    }
    return new Promise( (resolve, reject) => {
      getArea(params)
        .then( res => {
          let data = res.data.items
          commit('SET_CITY', data)
          resolve()
        })
        .catch( err => {
          console.log(err)
          reject(err)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

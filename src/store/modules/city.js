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
  getCityList({ commit }) {
    let params = {
      id: '1338353936444280803'
    }
    return new Promise( (resolve, reject) => {
      getArea(params)
        .then( res => {
          let data = res.data.items
          console.log(res)
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

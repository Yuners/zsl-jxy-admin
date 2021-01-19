import { getArea } from '@/api/common'

const getDetailsState = () => {
  return {
    cityList:[]
  }
}

const state = getDetailsState()

const mutations = {
  SET_CITY: (state, list) => {
    state.cityList = list
  },
  RESET_CITY: (state) => {
    Object.assign(state, getDetailsState())
  },
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
  },
  resetCity( { commit } ) {
    commit('RESET_CITY')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

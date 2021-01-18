import { login, logout, getInfo } from '@/api/user'
import { getUsers } from '@/api/Role/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    user:{
      userId:null,//用户id
      userName:null,//用户姓名
      userNickName:null,//用户昵称
      userOwnershipSystemId:null,//归属系统
      userOwnershipSystemName:null,//归属系统名称
      userPhone:null,//用户手机号
      userPhoto:null,//头像url
      userSecurityQuestionId:null,//密保问题id
      userSecurityQuestionName:null,//密保问题名称
      userSex:null,//用户性别0男1女
      userAccountId:null,//归属商铺
      userAccountName:null,//归属商铺名称
      userFrameworkId:null,//组织机构id
      userFrameworkName:null,//组织机构名称
    },
    roleList:[{
      userRoleId:null,//角色用户绑定id
      userRoleRoleId:null,//角色id
      userRoleRoleName:null,//角色name
      userRoleUserId:null,//用户id
    }],
    directoryTree:[{
      directoryTreeAbbreviation: null,//目录简称
      directoryTreeAccordingPath: null,//显示路径
      directoryTreeIcon: null,//图标
      directoryTreeId: null,//目录id
      directoryTreeName:null,//目录名称
      directoryTreeOwnershipSystemId:null,//归属系统
      directoryTreePath: null,//跳转路径
      directoryTreeRedirectPath:null,//重定向路径
      directoryTreePpId: null,//上级目录
      directoryTreeRank: null,//级别
      directoryTreeType: 1,//类型 1目录 2页面
      items:null,//子目录
    }],
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USER: (state, user) => {
    state.user = user
  },
  SET_ROLELIST: (state,  roleList) => {
    state.roleList =  roleList
  },
  SET_DIRECTORYTREE: (state, directoryTree) => {
    state.directoryTree =  directoryTree
  },
 SET_DIRECTORYTREE: (state, directoryTree) => {
    state.directoryTree =  directoryTree
  },
}

const actions = {
  getToken({ commit }, tokenDate){
    // console.log(token)
     return new Promise((resolve, reject) => {
       try {
          commit('SET_TOKEN', tokenDate.token);
          commit('SET_USER', tokenDate.user);
          commit('SET_ROLELIST', tokenDate.roleList);
          commit('SET_DIRECTORYTREE', tokenDate.directoryTree);
          setToken(tokenDate.token);
          resolve()
       } catch(err) {
         reject(err)
       }
      
     })
  },
    // user logout
  logout({ commit, state }) {
    removeToken();
    resetRouter();
    commit('RESET_STATE');
  },
  // // user login
  // login({ commit }, userInfo) {
  //   const { username, password } = userInfo
  //   return new Promise((resolve, reject) => {
  //     login({ username: username.trim(), password: password }).then(response => {
  //       const { data } = response
  //       commit('SET_TOKEN', data.token)
  //       setToken(data.token)
  //       resolve()
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getUsers().then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        commit('SET_USER', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  // logout({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     logout(state.token).then(() => {
  //       removeToken() // must remove  token  first
  //       resetRouter()
  //       commit('RESET_STATE')
  //       resolve()
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}


import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import { userOauth } from '@/api/auth'
NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login','/test'] // no redirect whitelist

let loading=false;

router.beforeEach(async(to, from, next) => {
  console.log(from)
  // next()
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      if(!loading){
        if (from.path != '/login'){
          await userOauth().then( async v=>{
            await store.dispatch('user/logout');
            store.dispatch('city/resetCity')
            let date=v.data;
            if(date.userFlag){
              if(date.directoryTree===null||date.directoryTree.length===0||date.directoryTree===undefined){
                next(`/login?redirect=${to.path}`)
                // this.$message.error("您没有后端管理权限,请联系管理员");
              }
              else{
                // console.log(date.token)
                let tokenDate={
                  roleList:date.roleList,
                  token:date.token,
                  user:date.user,
                  directoryTree:date.directoryTree
                }
                await store.dispatch('user/getToken', tokenDate);
                next()
              }
              loading = true;
            }
            else{
              next(`/login?redirect=${to.path}`)
              loading = true;
            }
          })
            .catch(err => {
              store.dispatch('user/logout');
              // console.log(err)
              loading = true;
              next(`/login?redirect=${to.path}`)
            })
        }
      }
      const hasGetUserInfo = store.getters.user
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // get user info
          // await store.dispatch('user/getInfo')
          await store.dispatch('user/getInfo')
          next()
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /!* has no token*!/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach((to, from) => {
  if (to.path != "/login" && !store.state.city.cityList.length){
    let cityId = store.getters.user.userFrameworkId
    store.dispatch('city/getCityList', cityId)
  }

  // finish progress bar
  NProgress.done()
})

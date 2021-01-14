<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import store from '@/store'
import { userOauth } from '@/api/auth' 
export default {
  name: 'App',
  data() {
    return {
      loading: true,
    }
  },
  created() {
     // 网络断开
    window.addEventListener('offline', () => {
      this.$message.error('网络已经断开，请检查网络！');
    })
    // 网络重连
    window.addEventListener('online', () => {
      this.$message.success('网络已连接');
    })
    this.initAuth();
  },
  methods: {
    initAuth(){
        console.log(store.getters.token)
        this.loading = true;
        if (store.getters.token!=null||store.getters.token!=undefined){
          console.log("sss")
          userOauth().then(v=>{
            this.$store.dispatch('user/logout');
            let date=v.data;
            if(date.userFlag){
              if(date.directoryTree===null||date.directoryTree.length===0||date.directoryTree===undefined){
                this.$router.push({
                  path:'/login',
                })
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
                  this.$store.dispatch('user/getToken', tokenDate);
                  this.$router.push({ path: this.redirect || '/' })
              }
              this.loading = false;
            }
            else{
              this.$router.push({
                path:'/login',
              })
              this.loading = false;
            }
          })
          .catch(err => {
            this.$store.dispatch('user/logout');
            // console.log(err)
            this.loading = false;
            this.$router.push({
              path:'/login',
            })
          })
        }
        else{
          console.log("sss")
          this.loading = false;
          console.log("sss")
          this.$router.push({
            path:'/login',
           })
        }
    }
  },
  
}
</script>

<template>
    <div class="header">
      <div class="logo">
          <img :src="logo" alt="">
          <h1>{{ systemName }}</h1>
      </div>

      <div class="systemName">
        <template v-for="(route, index) of routes" >
          <app-link v-if="!route.hidden" :to="route.path"  :key="index">{{ route.meta.title }}</app-link>
          <div style="width: 10px;" :key="route.path"/>
        </template>
      </div>

      <div class="right-menu">
        <el-dropdown class="avatar-container" trigger="click">
          <div class="avatar-wrapper">
            <img :src="$store.getters.user.userPhoto" class="user-avatar" onerror="this.src='../../../state/jxy.jpg';this.οnerrοr=null">
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <router-link to="/sysManage/platform/setting/compile">
              <el-dropdown-item>
                 个人信息
              </el-dropdown-item>
            </router-link>
             <router-link to="/sysManage/platform/password/compile">
              <el-dropdown-item>
                 修改密码
              </el-dropdown-item>
            </router-link>
            <el-dropdown-item divided @click.native="logout" >
              <span style="display:block;color:red">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import AppLink from '../Sidebar/Link'
  import { userEnd } from '@/api/auth'

  export default {
    data(){
      return{
        title: '众森联数字乡村管理云平台',
        logo: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png',
        systemName: '众森联数字乡村管理云平台'
      }
    },
    components: {
      AppLink
    },
    computed: {
      ...mapGetters([
        'avatar'
      ]),
      routes() {
        return this.$router.options.routes
      },
    },
    methods: {
      logout(){
        userEnd().then(v=>{
            if(v.data.userFlag){
              this.$message.success(v.data.msg);
              this.$store.dispatch('user/resetToken');
              this.$router.push({
                path:'/login',
              })
            }
            else{
              this.$message.error(v.data.msg)
            }
        })
        .catch( err => {
          console.log(err)
        })
      },
    }
  }
</script>

<style scoped lang="scss">
  @import "~@/styles/variables.scss";


  .header{
    width: 100%;
    height: $headHeight;
    position: fixed;
    display: flex;
    top: 0;
    justify-content: space-between;
    align-items: center;
    background-color: $headBg;
    z-index: 999;

    .logo{
      margin-left: 20px;
      display: flex;

      img{
        width: 50px;
        height: 50px;
      }

      h1{
        padding-left: 15px;
        font-size: 24px;
        color: #ffffff;
        height: 50px;
        line-height: 50px;
      }
    }

    .systemName{
      display: flex;
      h1{
        color: #ffffff;
        font-size: 18px;
        margin-right: 8px;
      }
    }

    .right-menu {

      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background .3s;

          &:hover {
            background: rgba(0, 0, 0, .025)
          }
        }
      }

      .avatar-container {
        margin-right: 30px;

        .avatar-wrapper {
          position: relative;

          .user-avatar {
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }

          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
            color: #ffffff;
          }
        }
      }
    }
  }
</style>

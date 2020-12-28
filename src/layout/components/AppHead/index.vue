<template>
    <div class="header">
      <div class="logo">
          <img :src="logo" alt="">
          <h1>{{ systemName }}</h1>
      </div>

      <div class="systemName">
        <template v-for="route of routes">
          <app-link v-if="!route.hidden" :to="route.path">{{ route.meta.title }}</app-link>
        </template>
      </div>

      <div class="right-menu">
        <el-dropdown class="avatar-container" trigger="click">
          <div class="avatar-wrapper">
            <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item>
                Home
              </el-dropdown-item>
            </router-link>
            <a target="_blank" href="https://github.com/PanJiaChen/vue-admin-template/">
              <el-dropdown-item>Github</el-dropdown-item>
            </a>
            <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
              <el-dropdown-item>Docs</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click.native="logout">
              <span style="display:block;">Log Out</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import AppLink from '../Sidebar/Link'


  export default {
    data(){
      return{
        title: 'Vue Admin Template',
        logo: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png',
        systemName: '数字乡村管理系统'
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

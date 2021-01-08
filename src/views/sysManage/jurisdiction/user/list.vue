<template>
  <div class="list">
    <div class="tableHead">
      <div class="search">
        <el-input class="coverStyle" v-model="userName" placeholder="用户名称"></el-input>
        <el-input class="coverStyle" v-model="phone" placeholder="用户手机号"></el-input>
        <el-button type="info" size="medium" plain @click="clear()">重置</el-button>
        <el-button class="coverBut" type="primary" size="medium" @click="fetchData">查询</el-button>
      </div>
      <el-button
        class="coverBut"
        type="success"
        size="medium"
        @click="routingHop('/sysManage/jurisdiction/user/compile')"
      >添加</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="用户昵称">
        <template slot-scope="scope">
          <span style="cursor: pointer" >{{ scope.row.userNickName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户姓名">
        <template slot-scope="scope">
          <span style="cursor: pointer" >{{ scope.row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户手机号">
        <template slot-scope="scope">
          <span style="cursor: pointer" >{{ scope.row.userPhone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="归属机构">
        <template slot-scope="scope">
          <span style="cursor: pointer" >{{ scope.row.userFrameworkName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="150"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="updatePassword(scope.row)">密码重置</el-button>
          <!-- <el-button type="text" size="small">角色分配</el-button> -->
          <el-button type="text" size="small" @click="editScenery(scope.row.userId)">编辑</el-button>
          <el-button type="text" size="small" @click="delScenery(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="page"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pages.pageIndex"
      layout="sizes, total, prev, pager, next, jumper"
      :total="pages.total"
    >
    </el-pagination>
  </div>
</template>

<script>
  import { selectRolePage,delectRole} from '@/api/Role/role'
  import { findPage,password,deleteUser} from '@/api/Role/user'
  export default {

    data() {
      return {
        list: null, // 渲染列表
        listLoading: true, // 加载
        pages:{
          pageSize: 10, // 每页多少条
          pageCount: 1, // 一共多少页
          pageIndex: 1, // 当前页数
          total: 0, // 总页数
        },
        userName: null, // 用户昵称
        phone: null, // 手机号
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      //清空
      clear(){
        this.userName = null;
        this.phone =null;
      },
      //重置密码
      updatePassword(date){
        this.$confirm(`此操作将重置用户'${date.userName}', 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then( () => {
            password(date.userId).then(v=>{
                 this.$message({
                    type: 'success',
                    message: '密码重置成功,已重置成用户手机号'
                  });
            })
            .catch( err => {
              this.$message.error(err)
           })
        })

      },
      //分页数据查询
      fetchData() {
        this.listLoading = true
        let params = {
          curPage: this.pages.pageIndex,
          pageSize: this.pages.pageSize,
        }
        if(this.userName!=null&&this.userName!=''){
          params.userName=this.userName;
        }
        if(this.phone!=null&&this.phone!=''){
          params.phone=this.phone;
        }
        findPage(params)
          .then( res => {
            let data = res.data
            this.list = data.items
            this.pages.total = data.page.total
            this.listLoading = false
          })
          .catch( err => {
            this.$message.error('服务器错误')
            this.listLoading = false
          })
      },
      // 删除
      delScenery(date){
        this.$confirm(`此操作将删除用户'${date.userName}', 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then( () => {
          deleteUser(date.userId)
            .then( res => {
              this.$message.success(res.msg)
                setTimeout( () => {
                  this.fetchData()
                })
            })
            .catch( err => {
               this.$message.error(err)
            })
        })
      },
      // 切换页数
      handleCurrentChange(val) {
        this.pages.pageIndex = val
        this.fetchData()
      },
      // 切换每页条数
      handleSizeChange(val) {
        this.pages.pageSize = val
        this.fetchData()
      },
      // 添加
      routingHop(path){
         this.$router.push({
          path
        });
      },
      //编辑
      editScenery(userId){
        this.$router.push({
          path:'/sysManage/jurisdiction/user/compile',
          query:{
            userId
          }
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .list{

    .page{
      text-align: center;
      padding-top: 30px;
    }

    .tableHead{
      width: 100%;
      height: 60px;
      border: 1px solid #EBEEF5;
      border-bottom: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      padding: 0 30px;

      .search{


        .coverStyle{
          width: 200px;
          margin-right: 20px;
        }
        .coverBut{
          width: 100px;

          &:first-child{
            margin-left: 20px;
          }
        }
      }
    }
  }

</style>

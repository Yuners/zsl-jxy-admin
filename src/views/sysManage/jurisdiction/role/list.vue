<template>
  <div class="list">
    <div class="tableHead">
      <div class="search">
        <el-input class="coverStyle" v-model="sceneryName" placeholder="角色名称"></el-input>
        <el-button type="info" size="medium" plain @click="clear()">重置</el-button>
        <el-button class="coverBut" type="primary" size="medium">查询</el-button>
      </div>
      <el-button
        class="coverBut"
        type="success"
        size="medium"
        @click="routingHop('/jinSwim/releases/scenery/compile')"
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
      <el-table-column label="角色名称">
        <template slot-scope="scope">
          <span style="cursor: pointer" >{{ scope.row.roleName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="归属机构">
        <template slot-scope="scope">
          <span style="cursor: pointer" >{{ scope.row.frameworkName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="150"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small">分配权限</el-button>
          <el-button type="text" size="small" @click="editScenery(scope.row.sceneryId)">编辑</el-button>
          <el-button type="text" size="small" @click="delScenery(scope.row.sceneryId)">删除</el-button>
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
  import { getScenery, delScenery} from '@/api/Releases/scenery'
  import { selectFrameworkPage} from '@/api/Role/Jurisdiction/role'
  export default {
    filters: {
      statusFilter(status) {
        switch (status) {
          case 0:
            return '未提交'
            break;
          case 1:
            return '待审核'
            break;
          case 2:
            return '通过'
            break;
          case 3:
            return '不通过'
            break;
        }
      },
      statusType(status) {
        switch (status) {
          case 0:
            return ''
            break;
          case 1:
            return 'warning'
            break;
          case 2:
            return 'success'
            break;
          case 3:
            return 'danger'
            break;
        }
      }
    },
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
        sceneryName: null, // 角色名称
        showStateList: ['未提交','待审核','通过','不通过'],//状态类型
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      clear(){
        this.sceneryName = ''
      },
      handleChange(value) {
        console.log(value);
      },
      fetchData() {
        this.listLoading = true
        let params = {
          curPage: this.pages.pageIndex,
          pageSize: this.pages.pageSize,
        }
        if(this.sceneryName!=null&&this.sceneryName!=''){
          params.roleName=this.sceneryName;
        }
        selectFrameworkPage(params)
          .then( res => {
            let data = res.data
            console.log(data);
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
      delScenery(id){
        this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then( () => {
          let params = {
            sceneryId: id
          }
          delScenery(params)
            .then( res => {
              if (res.data.code == '1') {
                this.$message.success(res.data.msg)
                setTimeout( () => {
                  this.fetchData()
                })
              }else {
                this.$message.error(res.data.msg)
              }
            })
            .catch( err => {
              console.log(err)
            })
        })
      },
      // 切换页数
      handleCurrentChange(val) {
        this.pageIndex = val
        this.fetchData()
      },
      // 切换每页条数
      handleSizeChange(val) {
        this.pageSize = val
        this.fetchData()
      },
      // 跳转
      routingHop(path){
        this.$router.push({
          path
        })
      },
      editScenery(sceneryId){
        this.$router.push({
          path:'/jinSwim/releases/scenery/compile',
          query:{
            sceneryId
          }
        })
      },
      sceneryDetails(sceneryId){
        this.$router.push({
          path:'/jinSwim/releases/scenery/details',
          query:{
            sceneryId
          }
        })
      }
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

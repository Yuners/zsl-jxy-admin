<template>
  <div class="list">
    <div class="tableHead">
      <div class="search">
        <el-input class="coverStyle" v-model="sceneryName" placeholder="角色名称"></el-input>
        <el-button type="info" size="medium" plain @click="clear()">重置</el-button>
        <el-button class="coverBut" type="primary" size="medium" @click="fetchData">查询</el-button>
      </div>
      <el-button
        class="coverBut"
        type="success"
        size="medium"
        @click="routingHop('/sysManage/jurisdiction/role/compile')"
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
          <el-button type="text" size="small" @click="editScenery(scope.row.roleId)">编辑</el-button>
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
  import { selectRolePage} from '@/api/Role/Jurisdiction/role'
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
        sceneryName: null, // 角色名称
        addShow:false,
        addItems:{
            flag:1,
            roleName:null,
            sort:null,
            frameworkName:null,
            roleFrameworkId:null,
        },
        tree:{},
        isframework:false,
        frameworkItems:{
          frameworkName:null,
          frameworkId:null,
          frameworkAdministrative:null,
        }
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      search(){
         let params = {
        ids:111
      };
      selectFramework(params).then(v=>{
            this.listLoading = false;
            this.tree=[];
            this.tree.push(v.data);
            if(!show){
              if(v.data!=null){
                let p={
                ...v.data
                };
                this.items=p;
              }
            }
        })
        .catch( err => {
          this.$message.error('服务器错误')
        })
      },
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
        selectRolePage(params)
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
               this.$message.error('服务器错误')
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
      frameworkShow(){
        let frameworkItems={
          frameworkName:null,
          frameworkId:null,
          frameworkAdministrative:null,
        };
        this.frameworkItems=frameworkItems;
        this.isframework=true;
      },
      // 添加
      routingHop(path){
         this.$router.push({
          path
        });
      },
      editScenery(roleId){
        this.$router.push({
          path:'/sysManage/jurisdiction/role/compile',
          query:{
            roleId
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

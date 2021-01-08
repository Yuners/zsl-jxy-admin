<template>
  <div class="list">
    <div class="tableHead">
      <div class="search">
        <el-input class="coverStyle" v-model="userName" placeholder="用户名称"></el-input>
        <el-input class="coverStyle" v-model="phone" placeholder="用户手机号"></el-input>
        <el-select v-model="ownershipSystemId" placeholder="请选择系统模块" class="coverStyle" clearable>
          <el-option
            v-for="item in ownershipSystemList"
            :key="item.ownershipSystemId"
            :label="item.ownershipSystemName"
            :value="item.ownershipSystemId">
          </el-option>
        </el-select>
        <el-button type="info" size="medium" plain @click="clear()">重置</el-button>
        <el-button class="coverBut" type="primary" size="medium" @click="fetchData">查询</el-button>
      </div>
      <!-- <el-button
        class="coverBut"
        type="success"
        size="medium"
        @click="routingHop('/sysManage/jurisdiction/user/compile')"
      >添加</el-button> -->
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
      
      <el-table-column label="用户头像"  align="center">
        <template slot-scope="scope">
          <span style="cursor: pointer" >
            <el-image 
              style="border-radius: 50%;height:60px;width:60px;"
              :src="scope.row.userPhoto" 
              :preview-src-list="getSrcList(scope.row.userPhoto)">
            </el-image>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="用户昵称"  align="center">
        <template slot-scope="scope">
          <span style="cursor: pointer" >{{ scope.row.userNickName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户姓名"  align="center">
        <template slot-scope="scope">
          <span style="cursor: pointer" >{{ scope.row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户性别"  align="center">
        <template slot-scope="scope">
          <span style="cursor: pointer" >
            <div v-if="scope.row.userSex===0?true:false"  style="color:blue;font-size:20px;">
              
              <svg-icon icon-class="male"></svg-icon>
            </div>
            <div v-else-if="scope.row.userSex==1?true:false" style="color:pink;font-size:20px;">
              <svg-icon icon-class="female"></svg-icon>
            </div>
            <div v-else>
              无
            </div>
          </span>
        </template>
      </el-table-column>
      
      <el-table-column label="用户手机号"  align="center">
        <template slot-scope="scope">
          <span style="cursor: pointer" >{{ scope.row.userPhone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="归属机构" align="center">
        <template slot-scope="scope">
          <span style="cursor: pointer" :style="{'color':(scope.row.userFrameworkName?'green':'')}">{{ scope.row.userFrameworkName?scope.row.userFrameworkName:'无' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="归属系统"  align="center">
        <template slot-scope="scope">
          <span style="cursor: pointer" >{{ scope.row.userOwnershipSystemName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否禁用"  align="center">
        <template slot-scope="scope">
          <span style="cursor: pointer" :style="{'color':(scope.row.isDisabled===1?'red':'green')}">{{ scope.row.isDisabled===1?'禁用':'未禁用' }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column
        align="center"
        label="操作"
        width="150"
      >
        <template slot-scope="scope">
      <el-button type="text" size="small" @click="editScenery(scope.row)" :style="{'color':(scope.row.isDisabled===1?'green':'red')}">{{ scope.row.isDisabled===1?'未禁用':'禁用' }}</el-button>
        </template>
      </el-table-column> -->
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
  import { find,disabledUser} from '@/api/Role/user'
  import {selectListOwnershipSystem} from '@/api/Role/ownershipSystem'
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
        ownershipSystemId:null,//归属系统
        ownershipSystemList:[],//归属系统列表
      }
    },
    created() {
      this.fetchData();
      this.ownershipSystemDate();
    },
    methods: {
      //图片预览
      getSrcList(url){
        let srcList=[];
        srcList.push(url);
        return srcList;
      },
      //清空
      clear(){
        this.userName = null;
        this.phone =null;
      },
      //重置密码
      // updatePassword(date){
      //   this.$confirm(`此操作将重置用户'${date.userName}', 是否继续?`, '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   })
      //   .then( () => {
      //       password(date.userId).then(v=>{
      //            this.$message({
      //               type: 'success',
      //               message: '密码重置成功,已重置成用户手机号'
      //             });
      //       })
      //       .catch( err => {
      //         this.$message.error(err)
      //      })
      //   })

      // },
      //分页数据查询
      ownershipSystemDate(){
        selectListOwnershipSystem().then(v=>{
          this.ownershipSystemList=v.data;
        })
      },
      fetchData() {
        this.listLoading = true
        let params = {
          curPage: this.pages.pageIndex,
          pageSize: this.pages.pageSize,
        }
        if(this.userName!=null&&this.userName!=''&&this.userName!=undefined){
          params.userName=this.userName;
        }
        if(this.phone!=null&&this.phone!=''&&this.phone!=undefined){
          params.phone=this.phone;
        }
        if(this.ownershipSystemId!=null&&this.ownershipSystemId!=''&&this.ownershipSystemId!=undefined){
          params.ownershipSystemId=this.ownershipSystemId;
        }
        find(params)
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
      //禁用与解禁
      editScenery(date){
        this.$confirm(`此操作将${date.isDisabled===1?'解禁':'禁用'}用户'${date.userName}', 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then( () => {
          disabledUser(date.userId).then(
              this.$message({
                message: "操作成功",
                type: "success",
              })
          )
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

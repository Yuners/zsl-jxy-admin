<template>
  <div class="list">
    <div class="tableHead">
      <div class="search">
          <el-date-picker class="coverStyle"
            style="width: 350px"
            v-model="param.villageYear"
            type="year"
            value-format='yyyy'
            placeholder="选择年份">
          </el-date-picker>
        <el-button type="info" size="medium" plain @click="clear()">重置</el-button>
        <el-button class="coverBut" type="primary" size="medium" @click="search()">查询</el-button>
      </div>
      <el-button
        class="coverBut"
        type="success"
        size="medium"
        @click="handleVillageFlag()"
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
      <el-table-column label="乡村名称">
        <template slot-scope="scope">
          <span style="cursor: pointer;color:blue" @click="details(scope.row.villageId)">{{ scope.row.villageName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属地区" width="150" align="center">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>{{ scope.row.villageLocationName }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.villageLocationName !='' && scope.row.villageLocationName !=null?scope.row.villageLocationName.substring(0,6)+'...':'暂无' }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="记录年份">
        <template slot-scope="scope" >
          <span style="cursor: pointer;" >{{ scope.row.villageYear }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          <span style="cursor: pointer;" >{{scope.row.createdOn|formatDate}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="150"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="edit(scope.row.villageId,scope.row.villageYear)">编辑</el-button>
          <!-- <el-button type="text" size="small" @click="delVallage(scope.row.villageId)">删除</el-button> -->
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
  import { formatDate } from '@/utils/index.js'
  import { getFreightList, delFreight} from '@/api/Operation/carriage'
  import { getVillagePage, delVillage, getVillageFlag} from '@/api/infoMng/basics/vallage'
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
        param:{
          villageYear:null
        },
        landLocationId:null,
        pages:{
          pageSize: 10, // 每页多少条
          pageCount: 1, // 一共多少页
          pageIndex: 1, // 当前页数
          total: 0, // 总页数
        },
      }
    },
    created() {
      this.landLocationId = this.$store.getters.user.userFrameworkId
      this.search()
    },
    filters: {
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
        }
    },
    methods: {
      clear(){
        this.param.villageYear = null
      },
      handleVillageFlag(){
        let params = {
          villageYear: new Date().getFullYear(),
          villageLocationId: this.landLocationId // 测试
        }
        console.info(params)
        getVillageFlag(params)
          .then( res => {
            let data = res.data.data
            console.info(data)
            if(data != null){
              this.$message.error("该年记录已被录入,有问题请去编辑")
            }else{
              this.routingHop('/infoManage/basics/vallage/compile')
            }
            
          })
      },
      search() {
        this.listLoading = true
        let params = {
          villageYear: this.param.villageYear,
          curPage: this.pages.pageIndex,
          pageSize: this.pages.pageSize,
          isDeleted: 0,
          isDisabled: 0
        }
        getVillagePage(params)
          .then( res => {
            let data = res.data
            if (data.code == '1'){
              if (data.data.length){
                this.list = data.data
                this.pages.total = data.page.total
              }
            } else {
              this.$message.error(data.msg)
            }
            this.listLoading = false
          })
          .catch( err => {
            this.listLoading = false
          })
      },
      // 删除
      delVallage(id){
        this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then( () => {
          let params = {
            villageId: id
          }
          delVillage(params)
            .then( res => {
              if (res.data.code == '1') {
                this.$message.success(res.data.msg)
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
        console.info(val)
        this.pages.pageIndex = val
        this.search()
      },
      // 切换每页条数
      handleSizeChange(val) {
        this.pages.pageSize = val
        this.search()
      },
      // 跳转
      routingHop(path){
        this.$router.push({
          path
        })
      },
      //判断是否是当年信息。修改只能修改当年的，或者去年的，前提是本年3月份之前。
      handelYear(villageYear){
        let dayYear = new Date().getFullYear();
        let dayMonth = new Date().getMonth()+1;
        if(villageYear == dayYear){
          return true;
        }else if(villageYear-0+1 == dayYear){// 判断是否为去年的
          return dayMonth <3?true:false;
        }else{
          return false;
        }
      },
      //修改
      edit(villageId, villageYear){
        if(!this.handelYear(villageYear)){
          this.$message.error("当年记录已不满足修改条件")
          return;
        }
        this.$router.push({
          path:'/infoManage/basics/vallage/compile',
          query:{
            villageId
          }
        })
      },
      //乡村详细页面
      details(villageId){
        this.$router.push({
          path:'/infoManage/basics/vallage/details',
          query:{
            villageId
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
      justify-content: flex-end;
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

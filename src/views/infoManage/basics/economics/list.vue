<template>
  <div class="list">
    <div class="tableHead">
      <div class="search">
          <el-input class="coverStyle" v-model="param.economicsVillageName" placeholder="乡村名称"></el-input>
          <!-- 可以存一个级别 判断为省市县镇 -->
          <el-cascader
            ref="cascader"
            class="coverStyle"
            clearable
            v-model="param.economicsLocationId"
            placeholder="选择所属地区"
            :options="$store.state.city.cityList"
            :props="props"
            filterable
            @change="selected"
            >
          </el-cascader>
          <el-date-picker class="coverStyle"
            style="width: 350px"
            v-model="param.economicsYear"
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
        <template slot-scope="scope" >
          <span style="cursor: pointer;color:blue" @click="details(scope.row.economicsSummaryId)">{{ scope.row.economicsVillageName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属地区" width="150" align="center" show-overflow-tooltip prop="economicsLocationName">
      </el-table-column>
      <el-table-column label="记录年份" prop="economicsYear"></el-table-column>
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
          <el-button type="text" size="small" @click="edit(scope.row.economicsSummaryId,scope.row.economicsYear)">编辑</el-button>
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
  import { getEconomicsPage, delEconomics, getEconomicsFlag} from '@/api/infoMng/basics/economics'
  import { getArea } from '@/api/common' 
  export default {
    data() {
      return {
        list: null, // 渲染列表
        listLoading: true, // 加载
        param:{
          economicsYear:null,
          economicsVillageName:'',
          economicsLocationId:[]
        },
        pages:{
          pageSize: 10, // 每页多少条
          pageCount: 1, // 一共多少页
          pageIndex: 1, // 当前页数
          total: 0, // 总页数
        },
        landLocationId:null,
        props:{ 
          children: "items",
          label:"frameworkName",
          value:"frameworkId",
          checkStrictly: true,
          // lazy: true, //懒加载
          // lazyLoad (node, resolve) {
          //   console.info(node, resolve)
          //   const { level } = node;
          //   setTimeout(() => {
          //     const nodes = node.children
          //     // 通过调用resolve将子节点数据返回，通知组件数据加载完成
          //     resolve(nodes);
          //   }, 500);
          // }
        }, 
        cityList:[] // 地址选择表
      }
    },
    created() {
      this.search()
      this.getCity()
      this.landLocationId = this.$store.getters.user.userFrameworkId
    },
    filters: {
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
        }
    },
    methods: {
      clear(){
        this.param.economicsYear = null
        this.param.economicsVillageName = null
        this.param.economicsLocationId = []
      },
      handleChange(value) {
        console.log(value);
      },
      selected(a){
        console.info(a)
        const obj = this.$refs['cascader'].getCheckedNodes()
        console.log(obj[0].data)  // 打印出当前选择的value所对应的对象
      },
      getCity(){
        this.listLoading = true
        let params = {
          id: "1338353936444280819" // 该人登录之后获取 去该人最后级别组织机构id
        }
        getArea(params)
        .then( res => {
          this.cityList = res.data.items
          console.info(this.cityList)
        })
        .catch( err => {
          console.log(err)
        })
      },
      handleVillageFlag(){
        let params = {
          economicsYear: new Date().getFullYear(),
          economicsLocationId: this.landLocationId // 测试
        }
        console.info(params)
        getEconomicsFlag(params)
        .then( res => {
          let data = res.data.data
          console.info(data)
          if(data != null){
            this.$message.error("该年记录已被录入,有问题请去编辑")
          }else{
            this.routingHop('/infoManage/basics/economics/compile')
          }
        })
      },
      search() {
        this.listLoading = true
        let params = {
          economicsYear: this.param.economicsYear,
          economicsVillageName: this.param.economicsVillageName,
          economicsLocationId: this.param.economicsLocationId[this.param.economicsLocationId.length-1],// 选择的是一个数组
          curPage: this.pages.pageIndex,
          pageSize: this.pages.pageSize,
          isDeleted: 0,
          isDisabled: 0,
        }
        console.info(params)
        this.list = null
        getEconomicsPage(params)
          .then( res => {
            let data = res.data
            console.info(data)
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
      handelYear(economicsYear){
        let dayYear = new Date().getFullYear();
        let dayMonth = new Date().getMonth()+1;
        if(economicsYear == dayYear){
          return true;
        }else if(economicsYear-0+1 == dayYear){// 判断是否为去年的
          return dayMonth <3?true:false;
        }else{
          return false;
        }
      },
      //修改
      edit(economicsSummaryId, economicsYear){
        if(!this.handelYear(economicsYear)){
          this.$message.error("当年记录已不满足修改条件")
          return;
        }
        this.$router.push({
          path:'/infoManage/basics/economics/compile',
          query:{
            economicsSummaryId
          }
        })
      },
      //乡村详细页面
      details(economicsSummaryId){
        this.$router.push({
          path:'/infoManage/basics/economics/details',
          query:{
            economicsSummaryId
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

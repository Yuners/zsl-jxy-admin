<template>
  <div class="list">
    <div>
        <el-tabs v-model="param.status" @tab-click="search">
          <el-tab-pane v-for="(item,index) in status" :key="index" :label="item.text" :name="item.value+''"></el-tab-pane>
        </el-tabs>
    </div>
    <div class="tableHead" style="justify-content: flex-start">
      <div class="search">
        <el-input class="coverStyle" v-model="param.orderId" placeholder="订单号"></el-input>
        <el-input class="coverStyle" v-model="param.realName" placeholder="邮寄用户名"></el-input>
        <el-input class="coverStyle" v-model="param.userPhone" placeholder="邮寄电话"></el-input>
        <el-date-picker class="coverStyle"
          style="width: 350px"
          v-model="param.orderYear"
          type="year"
          value-format='yyyy'
          placeholder="日期">
        </el-date-picker>
        <el-button type="info" size="medium" plain @click="clear()">重置</el-button>
        <el-button class="coverBut" type="primary" size="medium" @click="search()">查询</el-button>
      </div>
      <!-- <el-button
        class="coverBut"
        type="success"
        size="medium"
        @click="handleorderFlag()"
      >添加</el-button> -->
    </div>
    <div class="tableHead" v-if="total" style="justify-content: flex-start">
      <el-tag >订单数:{{total.allOrder}}</el-tag><div style="padding-left:20px"></div>
      <el-tag >商品数:{{total.allGoodTotal}}</el-tag><div style="padding-left:20px"></div>
      <el-tag >订单金额:{{total.allPrice}}</el-tag><div style="padding-left:20px"></div>
      <el-tag >客户数:{{total.allCustTotal}}</el-tag>
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
      <el-table-column label="订单号">
        <template slot-scope="scope">
          <span style="cursor: pointer;color:blue" @click="details(scope.row.id)">{{ scope.row.orderId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户昵称">
        <template slot-scope="scope" >
          <span style="cursor: pointer;" >{{ scope.row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="邮寄姓名">
        <template slot-scope="scope" >
          <span style="cursor: pointer;" >{{ scope.row.realName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="邮寄电话">
        <template slot-scope="scope" >
          <span style="cursor: pointer;" >{{ scope.row.userPhone }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="商品信息">
        <template slot-scope="scope" >
          <span style="cursor: pointer;" >{{ scope.row.orderYear }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="数量">
        <template slot-scope="scope" >
          <span style="cursor: pointer;" >{{ scope.row.totalNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="实际支付">
        <template slot-scope="scope" >
          <span style="cursor: pointer;" >{{ scope.row.payPrice }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单状态">
        <template slot-scope="scope" >
          <span style="cursor: pointer;" >{{ statusMap[scope.row.status].text }}</span>
        </template>
      </el-table-column>
      <el-table-column label="下单时间">
        <template slot-scope="scope" >
          <span style="cursor: pointer;" >{{ scope.row.addTime*1000|formatDate }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="150"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addDelivery(scope.row.id)">添加订单号</el-button>
          <el-button type="text" size="small" @click="edit(scope.row.id,scope.row.orderYear)">修改地址</el-button>
          <el-button type="text" size="small" @click="edit(scope.row.id,scope.row.orderYear)">取消订单</el-button>
          <!-- <el-button type="text" size="small" @click="delVallage(scope.row.orderId)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-dialog style="text-align:center"
      title="添加快递单号"
      :visible.sync="ifDelivery"
      width="80%">
      <el-form class="flex-item" ref="treeFrom" inline label-width="120px" >
        <el-form-item  label="快递单号" >
          <el-input v-model="query.deliveryId" show-word-limit ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="addDeliveryId">确定</el-button>
        <el-button @click="clearDialog">关闭</el-button>
      </span>
    </el-dialog>
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
  import { getOrderList, delOrder, updateAdress, addDeliveryId} from '@/api/Operation/order'
  import status from "@/views/jinSwim/operation/order/order/order.js";
  export default {
    data() {
      return {
        list: null, // 渲染列表
        listLoading: true, // 加载
        ifDelivery:false,
        param:{
          orderId:'',
          status:'100',
          realName:'',
          userPhone:''
        },
        query:{
          deliveryId:null,
          id:null
        },
        pages:{
          pageSize: 10, // 每页多少条
          pageCount: 1, // 一共多少页
          pageIndex: 1, // 当前页数
          total: 0, // 总页数
        },
        statusMap:{
          ...status
        },
        status: [
          {
              type: 4, 
              text: '全部订单',
              value: 100,
          },
          {
              type: 4, // 代表支付状态
              text: '未支付',
              value: 5,
          },
          {
              type: 1,// 代表订单状态
              text: '待发货',
              value: 0,
          },
          {
              type: 1,
              text: '待收货',
              value: 1,
          },
          {
              type: 1,
              text: '待评价',// 目前没有评价系统 暂时单做订单完成
              value: 3,
          },
          {
              type: 1,
              text: '已收货',
              value: 2,
          },
          {
              type: 1,
              text: '订单完成',
              value: 6,
          },
          {
              type: 1,
              text: '退货申请',
              value: -1,
          },
          {
              type: 1,
              text: '退款中',
              value: -3,
          },
          {
              type: 1,// 退款状态
              text: '已退款',
              value: -4,
          },
          {
              type: 1,//删除状态
              text: '失效订单',
              value: 4,
          }
        ],
        total:null
      }
    },
    created() {
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
        this.param = {
          orderId:'',
          status:'100',
          realName:'',
          userPhone:''
        }
      },
      clearDialog(){
        this.ifDelivery = false
        this.query.deliveryId = null
      },
      addDelivery(id){
        this.query.id =id
        this.ifDelivery = true
      },
      addDeliveryId(){
        if(this.query.deliveryId == null || this.query.deliveryId == ''){
          this.$message.error("请添加快递单号")
          return;
        }
        addDeliveryId(this.query)
          .then( res => {
            let data = res.data
            if (data.code == '1'){
              if (data.date){
                this.$message.error("添加快递单号成功")
              }else{
                this.$message.error("添加快递单号失败")
              }
            } else {
              this.$message.error(data.msg)
            }
            this.ifDelivery = false
          })
      },
      search() {
        this.listLoading = true
        let params = {
          status: this.param.status,
          curPage: this.pages.pageIndex,
          pageSize: this.pages.pageSize,
          orderId: this.param.orderId,
          realName: this.param.realName,
          userPhone: this.param.userPhone,
          isDel: 0,
          isShop: 0
          // isDisabled: 0
        }
        getOrderList(params)
          .then( res => {
            console.info(res)
            let data = res.data
            this.list = null
            this.total = null
            if (data.code == '1'){
              if (data.data.items.length){
                this.list = data.data.items
                this.total = data.total
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
      delOrder(id){
        this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then( () => {
          let params = {
            orderId: id
          }
          delOrder(params)
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
      handelYear(orderYear){
        let dayYear = new Date().getFullYear();
        let dayMonth = new Date().getMonth()+1;
        if(orderYear == dayYear){
          return true;
        }else if(orderYear-0+1 == dayYear){// 判断是否为去年的
          return dayMonth <3?true:false;
        }else{
          return false;
        }
      },
      //乡村详细页面
      details(orderId){
        this.$router.push({
          path:'/jinSwim/operation/order/details',
          query:{
            orderId
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

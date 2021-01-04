<template>
  <div class="list">
    <div class="tableHead">
      <div class="search">
          <el-input class="coverStyle" v-model="param.villageName" placeholder="乡村名称"></el-input>
          <el-cascader
            class="coverStyle"
            clearable
            v-model="affiliatingArea"
            placeholder="选择所属地区"
            :options="AreaList"
            @change="handleChange">
          </el-cascader>

          <el-date-picker class="coverStyle"
            style="width: 350px"
            v-model="param.infrastructureYear"
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
          <span style="cursor: pointer;color:blue" @click="details(scope.row.infrastructureSummaryId)">{{ scope.row.infrastructureVillageName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属地区" width="150" align="center" show-overflow-tooltip prop="infrastructureLocationName">
      </el-table-column>
      <el-table-column label="记录年份" prop="infrastructureYear"></el-table-column>
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
          <el-button type="text" size="small" @click="edit(scope.row.infrastructureSummaryId,scope.row.infrastructureYear)">编辑</el-button>
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
  import { getInfrastructurePage, delInfrastructure, getInfrastructureFlag} from '@/api/infoMng/basics/infrastructure'
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
          infrastructureYear:null,
          villageName:''
        },
        pages:{
          pageSize: 10, // 每页多少条
          pageCount: 1, // 一共多少页
          pageIndex: 1, // 当前页数
          total: 0, // 总页数
        },
        affiliatingArea:'',
        AreaList: [
          {
            value: 'zhinan',
            label: '指南',
            children: [{
              value: 'shejiyuanze',
              label: '设计原则',
              children: [{
                value: 'yizhi',
                label: '一致'
              }, {
                value: 'fankui',
                label: '反馈'
              }, {
                value: 'xiaolv',
                label: '效率'
              }, {
                value: 'kekong',
                label: '可控'
              }]
            }, {
              value: 'daohang',
              label: '导航',
              children: [{
                value: 'cexiangdaohang',
                label: '侧向导航'
              }, {
                value: 'dingbudaohang',
                label: '顶部导航'
              }]
            }]
          }, {
            value: 'zujian',
            label: '组件',
            children: [{
              value: 'basic',
              label: 'Basic',
              children: [{
                value: 'layout',
                label: 'Layout 布局'
              }, {
                value: 'color',
                label: 'Color 色彩'
              }, {
                value: 'typography',
                label: 'Typography 字体'
              }, {
                value: 'icon',
                label: 'Icon 图标'
              }, {
                value: 'button',
                label: 'Button 按钮'
              }]
            }, {
              value: 'form',
              label: 'Form',
              children: [{
                value: 'radio',
                label: 'Radio 单选框'
              }, {
                value: 'checkbox',
                label: 'Checkbox 多选框'
              }, {
                value: 'input',
                label: 'Input 输入框'
              }, {
                value: 'input-number',
                label: 'InputNumber 计数器'
              }, {
                value: 'select',
                label: 'Select 选择器'
              }, {
                value: 'cascader',
                label: 'Cascader 级联选择器'
              }, {
                value: 'switch',
                label: 'Switch 开关'
              }, {
                value: 'slider',
                label: 'Slider 滑块'
              }, {
                value: 'time-picker',
                label: 'TimePicker 时间选择器'
              }, {
                value: 'date-picker',
                label: 'DatePicker 日期选择器'
              }, {
                value: 'datetime-picker',
                label: 'DateTimePicker 日期时间选择器'
              }, {
                value: 'upload',
                label: 'Upload 上传'
              }, {
                value: 'rate',
                label: 'Rate 评分'
              }, {
                value: 'form',
                label: 'Form 表单'
              }]
            }, {
              value: 'data',
              label: 'Data',
              children: [{
                value: 'table',
                label: 'Table 表格'
              }, {
                value: 'tag',
                label: 'Tag 标签'
              }, {
                value: 'progress',
                label: 'Progress 进度条'
              }, {
                value: 'tree',
                label: 'Tree 树形控件'
              }, {
                value: 'pagination',
                label: 'Pagination 分页'
              }, {
                value: 'badge',
                label: 'Badge 标记'
              }]
            }, {
              value: 'notice',
              label: 'Notice',
              children: [{
                value: 'alert',
                label: 'Alert 警告'
              }, {
                value: 'loading',
                label: 'Loading 加载'
              }, {
                value: 'message',
                label: 'Message 消息提示'
              }, {
                value: 'message-box',
                label: 'MessageBox 弹框'
              }, {
                value: 'notification',
                label: 'Notification 通知'
              }]
            }, {
              value: 'navigation',
              label: 'Navigation',
              children: [{
                value: 'menu',
                label: 'NavMenu 导航菜单'
              }, {
                value: 'tabs',
                label: 'Tabs 标签页'
              }, {
                value: 'breadcrumb',
                label: 'Breadcrumb 面包屑'
              }, {
                value: 'dropdown',
                label: 'Dropdown 下拉菜单'
              }, {
                value: 'steps',
                label: 'Steps 步骤条'
              }]
            }, {
              value: 'others',
              label: 'Others',
              children: [{
                value: 'dialog',
                label: 'Dialog 对话框'
              }, {
                value: 'tooltip',
                label: 'Tooltip 文字提示'
              }, {
                value: 'popover',
                label: 'Popover 弹出框'
              }, {
                value: 'card',
                label: 'Card 卡片'
              }, {
                value: 'carousel',
                label: 'Carousel 走马灯'
              }, {
                value: 'collapse',
                label: 'Collapse 折叠面板'
              }]
            }]
          }, {
            value: 'ziyuan',
            label: '资源',
            children: [{
              value: 'axure',
              label: 'Axure Components'
            }, {
              value: 'sketch',
              label: 'Sketch Templates'
            }, {
              value: 'jiaohu',
              label: '组件交互文档'
            }]
          }], // 地址选择表
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
        this.param.villageYear = null
      },
      handleChange(value) {
        console.log(value);
      },
      handleVillageFlag(){
        this.routingHop('/infoManage/basics/infrastructure/compile')
        // let params = {
        //   villageYear: new Date().getFullYear(),
        //   villageLocationId: '1338353936444280822' // 测试
        // }
        // console.info(params)
        // getVillageFlag(params)
        //   .then( res => {
        //     let data = res.data.data
        //     console.info(data)
        //     if(data != null){
        //       this.$message.error("该年记录已被录入")
        //     }else{
        //       this.routingHop('/infoManage/basics/infrastructure/compile')
        //     }
            
        //   })
      },
      search() {
        this.listLoading = true
        let params = {
          infrastructureYear: this.param.infrastructureYear,
          curPage: this.pages.pageIndex,
          pageSize: this.pages.pageSize,
          isDeleted: 0,
          isDisabled: 0
        }
        getInfrastructurePage(params)
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
      handelYear(villageYear){
        let dayYear = new Date().getFullYear();
        let dayMonth = new Date().getMonth()+1;
        if(villageYear == dayYear){
          return true;
        }else if(villageYear+1 == dayYear){// 判断是否为去年的
          return dayMonth <3?true:false;
        }else{
          return false;
        }
      },
      //修改
      edit(infrastructureSummaryId, villageYear){
        // if(!this.handelYear(villageYear)){
        //   this.$message.error("当年记录已不满足修改条件")
        //   return;
        // }
        this.$router.push({
          path:'/infoManage/basics/infrastructure/compile',
          query:{
            infrastructureSummaryId
          }
        })
      },
      //乡村详细页面
      details(villageId){
        this.$router.push({
          path:'/infoManage/basics/infrastructure/details',
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

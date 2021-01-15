<template>
  <div class="list">
    <div class="tableHead">
      <div class="search">
        <el-input class="coverStyle" v-model="applyItemName" placeholder="发布名称"></el-input>
        <el-cascader
          ref="cascader"
          class="coverStyle"
          clearable
          v-model="affiliatingArea"
          placeholder="选择地区"
          :props="props"
          :options="$store.state.city.cityList"
          @change="handleChange"></el-cascader>
        <el-select
          class="coverStyle"
          v-model="status"
          clearable
          placeholder="选择状态"
        >
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button type="info" size="medium" plain @click="clear()">重置</el-button>
        <el-button class="coverBut" type="primary" size="medium" @click="submit">查询</el-button>
      </div>
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
      <el-table-column label="发布名称">
        <template slot-scope="scope">
          <span style="cursor: pointer" @click="getDetailByType(scope.row)">{{ scope.row.applyItemName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发布类型" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.applyItemType | applyItemType}}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属地区" align="center">
        <template slot-scope="scope">
          {{ scope.row.provinceName+scope.row.cityName+scope.row.countyName+scope.row.townName+scope.row.villageName || '暂无' }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.applyResult | statusType">{{ scope.row.applyResult | statusFilter}}</el-tag>
          <!-- <el-tag :type="scope.row.applyResult | statusFilter">{{ scope.row.applyResult }}</el-tag> -->
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="反馈信息" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.applyDescribe || '暂无'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="150"
      >
        <template slot-scope="scope">
          <el-button type="text" @click="getDetailByType(scope.row)" size="small">查看</el-button>
          <el-button v-if="scope.row.applyResult === '1'" type="text" @click="openDialog(scope.row.applyId)" size="small">审核</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="发布审核" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="商铺名称" :label-width="formLabelWidth">
          <el-input v-model="form.applayShopName" disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="审核结果" :label-width="formLabelWidth">
          <template>
            <el-radio v-model="form.applyResult" label="2">通过</el-radio>
            <el-radio v-model="form.applyResult" label="3">不通过</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="审核意见" :label-width="formLabelWidth">
          <el-input maxlength="200" show-word-limit type="textarea" v-model="form.applyDescribe" ></el-input>
        </el-form-item>
      </el-form>
      <div class="handleSave">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateApply()">确 定</el-button>
      </div>
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
  import { getScenery} from '@/api/Releases/scenery'
  import { issue,getApplyList,updateApply } from '@/api/Releases'

  export default {
    filters: {
      statusFilter(status) {
        switch (status) {
          case '0':
            return '未提交'
            break;
          case '1':
            return '待审核'
            break;
          case '2':
            return '通过'
            break;
          case '3':
            return '不通过'
            break;
        }
      },
      statusType(status) {
        switch (status) {
          case '0':
            return ''
            break;
          case '1':
            return 'warning'
            break;
          case '2':
            return 'success'
            break;
          case '3':
            return 'danger'
            break;
        }
      },
      applyItemType(type) {
        switch (type) {
          case 'village':
            return '简介'
            break;
          case 'scenery':
            return '风景'
            break;
          case 'food':
            return '美食'
            break;
          case 'bed':
            return '民宿'
            break;
          case 'specialty':
            return '特产'
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
        props:{
          expandTrigger: 'hover',
          checkStrictly: true,
          value:'frameworkId',
          label:'frameworkName',
          children:'items',
          emitPath: false,
        },
        applyItemName: '', // 申请对象名称
        affiliatingArea: '' ,// 所属地区
        status: '', // 状态
        dialogFormVisible:false, //默认隐藏审核页面
        showStateList: ['未提交','待审核','通过','不通过'],//状态类型
        applyTypeList: ['简介','风景','美食','民宿','特产'], //发布类型
        statusList: [
          {
            value: '0',
            label: '未提交'
          }, {
            value: '1',
            label: '待审核'
          }, {
            value: '2',
            label: '通过'
          }, {
            value: '3',
            label: '不通过'
          }
        ],
        form:{
          applayId:'',
          applayShopName:'',
          applyResult:'2',
          applyDescribe:''
        },
        formLabelWidth: '100px'
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      //打开审核页面
      openDialog(id){
        this.form.applyId = id;
        this.dialogFormVisible = true;
      },
      //审核
      updateApply(){
        updateApply(this.form)
          .then( res => {
            if (res.data.code == '1'){
              this.$message({
                type: 'success',
                message: '审核成功!'
              });
              this.dialogFormVisible = false;
              setTimeout( () => {
                this.fetchData()
              })
            }
          })
          .catch( err => {
            console.log(err)
          })
      },
      // 查询
      submit(){
        this.pages = {
          pageSize: 10,
          pageCount: 1,
          pageIndex: 1,
          total: 0,
        }
        this.fetchData()
      },
      clear(){
        this.applyItemName = ''
        this.affiliatingArea = ''
        this.status = ''
      },
      handleChange(value) {
        this.$refs.cascader.toggleDropDownVisible(false)
      },
      fetchData() {
        this.listLoading = true
        let params = {
          curPage: this.pages.pageIndex,
          pageSize: this.pages.pageSize,
          isDeleted: 0,
          isDisabled: 0,
          applyType: '1341987374394466306', //发布申请
          applyItemLocationId: this.affiliatingArea,
          applyItemName: this.applyItemName,
          applyResult:this.status
        }
        getApplyList(params)
          .then( res => {
            let data = res.data
            if (data.code == '1'){
                this.list = data.data
                this.pages.total = data.page.total
            } else {
              this.$message.error(data.msg)
            }
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
      getDetailByType(apply){
        //风景
        if(apply.applyItemType == 'scenery'){
          this.sceneryDetails(apply.applyItemId)
        }
        //美食
        if(apply.applyItemType == 'food'){
          this.foodDetails(apply.applyItemId)
        }
        //民宿
        if(apply.applyItemType == 'bed'){
          this.bedDetails(apply.applyItemId)
        }
        //特产
        if(apply.applyItemType == 'specialty'){
          this.specialtyDetails(apply.applyItemId)
        }
      },
      //风景详情
      sceneryDetails(sceneryId){
        this.$router.push({
          path:'/jinSwim/releases/scenery/details',
          query:{
            sceneryId
          }
        })
      },
      //美食详情
      foodDetails(foodId){
        this.$router.push({
          path:'/jinSwim/releases/gourmet/details',
          query:{
            foodId
          }
        })
      },
      //民宿详情
      bedDetails(bedId){
        this.$router.push({
          path:'/jinSwim/releases/homeStay/details',
          query:{
            bedId
          }
        })
      },
      //特产详情
      specialtyDetails(specialtyId){
        this.$router.push({
          path:'/jinSwim/releases/specialty/details',
          query:{
            specialtyId
          }
        })
      },
      //简介详情

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

  .handleSave {
    flex: 1;
    text-align: center;
  }

</style>

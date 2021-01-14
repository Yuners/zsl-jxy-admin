<template>
  <div class="list">
    <div class="tableHead">
      <div class="search">
        <el-input class="coverStyle" v-model="specialtyName" placeholder="特产名称"></el-input>
        <el-cascader
          class="coverStyle"
          clearable
          v-model="affiliatingArea"
          placeholder="选择所属地区"
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
      <!-- <el-button
        class="coverBut"
        type="success"
        size="medium"
        @click="routingHop('/jinSwim/releases/specialty/compile')"
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
      <el-table-column label="特产名称">
        <template slot-scope="scope">
          <span style="cursor: pointer" @click="specialtyDetails(scope.row.specialtyId)">{{ scope.row.specialtyName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="特产类别" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.specialtyTypeName || '暂无'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属地区" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.specialtyLocationName || '暂无' }}
        </template>
      </el-table-column>
       <!-- <el-table-column label="商品价格" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.specialtyShowPrice || '暂无' }}
        </template>
      </el-table-column> -->
      <el-table-column label="运费模板" width="150" align="center">
        <template slot-scope="scope">
          <span style="cursor: pointer" @click="freightDetails(scope.row.specialtyFreightId)">{{ scope.row.specialtyFreightName || '暂无' }}</span>
          
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.specialtyPutaway | statusType">{{ scope.row.specialtyPutaway | statusFilter}}</el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" prop="created_at" label="反馈信息" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.applyDescribe || '暂无'}}</span>
        </template>
      </el-table-column> -->
      <el-table-column
        align="center"
        label="操作"
        width="150"
      >
        <template slot-scope="scope">
          <el-button style="color:green" v-if="scope.row.specialtyPutaway === 0" type="text" @click="issue(scope.row,1)" size="small">上架</el-button>
          <el-button style="color:red" v-if="scope.row.specialtyPutaway !=0" type="text" @click="issue(scope.row,0)" size="small">取消上架</el-button>
          <el-button type="text" size="small" @click="specialtyDetails(scope.row.specialtyId)">查看详情</el-button>
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
  import { getSpecialty, delSpecialty,putawaySpecialty} from '@/api/Releases/specialty'
  import {issue} from "@/api/Releases";


  export default {
    filters: {
      statusFilter(status) {
        switch (status) {
          case 0:
            return '未上架'
            break;
          case 1:
            return '已上架'
            break;
         
        }
      },
      statusType(status) {
        switch (status) {
          case 0:
            return ''
            break;
          case 1:
            return 'success'
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
        specialtyName: '', // 特产名称
        affiliatingArea: '' ,// 所属地区
        status: '', // 状态
        showStateList: ['未提交','待审核','通过','不通过'],//状态类型
        statusList: [
          {
            value: 0,
            label: '未上架'
          }, {
            value: 1,
            label: '已上架'
          }
        ]
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      // 发布
      issue(date,index){
        this.$confirm(`是否${index===0?'下架':'上架'}特产:  ${date.specialtyName} ?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let pages={
            specialtyId:date.specialtyId,
            specialtyPutaway:index
          };
          console.log(pages)
          putawaySpecialty(pages)
            .then(v=>{
              let data = v.data
              if (data.code == '1'){
                // console.log("ss")
               this.fetchData()
              } else {
                this.$message.error(data.msg)
              }
            })
            .catch( err => {
            })
        }).catch((e) => {
          console.log(e)
          this.$message({
            type: 'info',
            message: `已取消${index===0?'下架':'上架'}特产:  ${date.specialtyName}`
          });
        });
      },
      // 查询
      submit(){
        this.pages.pageIndex=1;
        // this.pages = {
        //   pageSize: 10,
        //   pageCount: 1,
        //   pageIndex: 1,
        //   total: 0,
        // }
        this.fetchData()
      },
      clear(){
        this.specialtyName = ''
        this.affiliatingArea = ''
        this.status = ''
      },
       freightDetails(freightId){
        this.$router.push({
          path:'/jinSwim/operation/carriage/details',
          query:{
            freightId
          }
        })
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
          specialtyLocationId: this.affiliatingArea,
          specialtyName: this.specialtyName,
          specialtyState:2
        }
        if (this.status){
          params.specialtyPutaway = this.status
        }
        getSpecialty(params)
          .then( res => {
            let data = res.data
            if (data.code == '1'){
              // if (data.data.length){
                this.list = data.data
                this.pages.total = data.page.total
              // }
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
      delSpecialty(id){
        this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then( () => {
          let params = {
            specialtyId: id
          }
          delSpecialty(params)
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
        this.pages.pageIndex = val
        this.fetchData()
      },
      // 切换每页条数
      handleSizeChange(val) {
        this.pages.pageSize = val
        this.fetchData()
      },
      // 跳转
      routingHop(path){
        this.$router.push({
          path
        })
      },
      editSpecialty(specialtyId){
        this.$router.push({
          path:'/jinSwim/releases/specialty/compile',
          query:{
            specialtyId
          }
        })
      },
      specialtyDetails(specialtyId){
        this.$router.push({
          path:'/jinSwim/releases/specialty/details',
          query:{
            specialtyId
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

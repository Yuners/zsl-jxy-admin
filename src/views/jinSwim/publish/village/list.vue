<template>
  <div class="list">
    <div class="tableHead">
      <div class="search">
        <el-input class="coverStyle" v-model="villageName" placeholder="乡村简介"></el-input>
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
      <el-button
        class="coverBut"
        type="success"
        size="medium"
        @click="routingHop('/jinSwim/releases/village/compile')"
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
          <span style="cursor: pointer" @click="villageDetails(scope.row.villageId)">{{ scope.row.villageName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属地区" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.villageLocationName || '暂无'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="宣传片类型" width="250" align="center">
        <template slot-scope="scope">
          {{ scope.row.villagePropagandaType || '暂无' }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.villageState | statusType">{{ scope.row.villageState | statusFilter}}</el-tag>
          <!-- <el-tag :type="scope.row.villageState | statusFilter">{{ scope.row.villageState }}</el-tag> -->
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
          <el-button v-if="scope.row.villageState === '0'" type="text" @click="issue(scope.row.villageId)" size="small">发布</el-button>
          <el-button v-if="scope.row.villageState !== '1'" type="text" size="small" @click="editVillage(scope.row.villageId)">编辑</el-button>
          <el-button v-if="scope.row.villageState !== '1'" type="text" size="small" @click="delVillage(scope.row.villageId)">删除</el-button>
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
  import { getVillageList, delVillage } from '@/api/Releases/village'
  import {issue} from "@/api/Releases";

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
        props:{
          expandTrigger: 'hover',
          checkStrictly: true,
          value:'frameworkId',
          label:'frameworkName',
          children:'items',
          emitPath: false,
        },
        villageName: '', // 美食名称
        affiliatingArea: '' ,// 所属地区
        status: '', // 状态
        showStateList: ['未提交','待审核','通过','不通过'], // 状态类型
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
        ]
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      // 发布
      issue(id){
        this.$confirm('是否确认发布审核此信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            applyItemId: id,
            applyType: '1341987374394466306',
            applyItemType: 'village'
          }
          issue(params)
            .then( res => {
              if (res.data.code == '1'){
                this.$message({
                  type: 'success',
                  message: '发布成功!'
                });
                setTimeout( () => {
                  this.fetchData()
                })
              }
            })
            .catch( err => {
              console.log(err)
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消发布'
          });
        });
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
        this.villageName = ''
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
          villageLocationId: this.affiliatingArea,
          villageName: this.villageName
        }
        if (this.status){
          params.villageState = this.status
        }
        getVillageList(params)
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
            this.$message.error('服务器错误')
            this.listLoading = false
          })
      },
      // 删除
      delVillage(id){
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
      editVillage(villageId){
        this.$router.push({
          path:'/jinSwim/releases/village/compile',
          query:{
            villageId
          }
        })
      },
      villageDetails(villageId){
        this.$router.push({
          path:'/jinSwim/releases/village/details',
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

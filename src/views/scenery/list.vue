<template>
  <div class="list">
    <div class="tableHead">
      <el-input class="coverStyle" v-model="sceneryName" placeholder="风景名称"></el-input>
      <el-input class="coverStyle" v-model="affiliatingArea" placeholder="所属地区"></el-input>
      <el-button class="coverBut" type="primary" size="medium">查询</el-button>
      <el-button
        class="coverBut"
        type="primary"
        size="medium"
        @click="routingHop('/releases/scenery/compile')"
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
      <el-table-column label="景点名称">
        <template slot-scope="scope">
          {{ scope.row.sceneryName }}
        </template>
      </el-table-column>
      <el-table-column label="景点类别" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sceneryTypeName || '暂无'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属地区" width="250" align="center">
        <template slot-scope="scope">
          {{ scope.row.sceneryLocationName || '暂无' }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sceneryStateName || '暂无'}}</span>
          <!-- <el-tag :type="scope.row.sceneryState | statusFilter">{{ scope.row.sceneryState }}</el-tag> -->
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
          <el-button v-if="scope.row.sceneryRelease === 0" type="text" size="small">发布</el-button>
          <el-button type="text" size="small" @click="editScenery(scope.row.sceneryId)">编辑</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="page"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      layout="sizes, total, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
  import { getList } from '@/api/table'
  import { getScenery, getDictionary} from '@/api/Releases'
  export default {
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'gray',
          deleted: 'danger'
        }
        return statusMap[status]
      }
    },
    data() {
      return {
        list: null, // 渲染列表
        listLoading: true, // 加载
        pageSize: 10, // 每页多少条
        pageCount: 1, // 一共多少页
        pageIndex: 1, // 当前页数
        total: 0, // 总页数
        sceneryName: '', // 风景名称
        affiliatingArea: '' ,// 所属地区
        showStateList: ['未提交','待审核','通过','不通过'],//状态类型
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.listLoading = true
        let params = {
          curPage: this.pageIndex,
          pageSize: this.pageSize,
          isDeleted: 0,
          isDisabled: 0
        }
        getScenery(params).then( res => {
          if (res.code == 1){
            let data = res.data
            this.list = data.data
            for(let i = 0;i<this.list.length;i++){
              this.list[i].sceneryStateName = this.showStateList[this.list[i].sceneryState]
            }
            this.total = data.page.total
            this.listLoading = false
          }
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
          path:'/releases/scenery/compile',
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
      justify-content: center;
      align-items: center;

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

</style>

<template>
    <el-container style="border: 1px solid #eee">
      <el-aside width="200px">
        <!-- <el-tree
          ref="tree2"
          node-key="dictionaryId"
          :props="props"
          :data="tree"
          show-checkbox
          default-expand-all
          :default-checked-keys="checkedIdList"
          @check-change="handleCheckChange">
        </el-tree> -->
      </el-aside>
      <el-container >
        <div>
          <el-form class="flex-item" ref="treeFrom" inline :model="form" label-width="150px" >
            <el-form-item  label="乡村名称" >
              <el-input v-model="summary.villageName" disabled show-word-limit ></el-input>
            </el-form-item>
            <el-form-item  label="年份" >
              <el-input v-model="summary.landYear" disabled show-word-limit ></el-input>
            </el-form-item>
            <el-form-item  :label="item.dictionaryName" v-for="item in showLIst" :key="item.dictionaryId">
              <el-input v-model="item.landNumber" show-word-limit disabled></el-input>
            </el-form-item>
            <el-form-item style="width:100%;text-align:right;padding-right:150px">
              <el-button type="info" @click="resetForm">返回</el-button>
             </el-form-item>
          </el-form>
        </div>
      </el-container>
    </el-container>
</template>

<script>
// import { selectDirectoryTree,updateDirectoryTree, addDirectoryTree,delectDirectoryTree} from '@/api/Role/Jurisdiction/directoryTree'
import { isPathName } from '@/utils/validate'
import { addLand, getLandById, updateLand } from '@/api/infoMng/basics/land'
import { getDictionaryAllByPCode } from '@/api/dictionary'
export default {

  data() {
    return {
      listLoading: true, // 加载
      tree:[],
      show:true,
      props: {
          label: 'dictionaryName',
          id:'dictionaryId',
          children: 'item'
        },
      count: 1,
      items:{},
      checkedIdList:[],
      showLIst:[],
      summaryId:null,
      form:null,
      summary:{
        landYear:new Date().getFullYear(),
        villageName:'丈河村'
      }
    }
  },
  watch: {
    // showLIst(n,o){
    //   console.info(n,o)
    // }
  },
  mounted() {
    this.search();
    this.init()
  },
  methods: {
    init(){
      this.summaryId = this.$route.query.landSummaryId
      
      if(this.summaryId){
        this.getDetails(this.summaryId)
      }
    },
    search(){
      let params = {
        dictionaryPcode: 'BASICS_LAND',
      };
      getDictionaryAllByPCode(params).then(v=>{
        this.listLoading = false;
        let data = v.data.data
        this.tree = [{"dictionaryId":1,"dictionaryName":"土地管理","item":data}]
        // 右边显示列处理
        if(this.summaryId == null){
          data.forEach(res => {
            // 在后台将月份与组织机构代码添加进去 land_location_id
            this.showLIst.push(res)
            this.checkedIdList.push(res.dictionaryId)
          });
          console.info(this.checkedIdList)
        }
        this.listLoading = false
      })
      .catch( err => {
        this.$message.error('服务器错误')
        this.listLoading = false;
      })
    },
    // 获取乡村详情
      getDetails(id) {
        let params = {
          landSummaryId: id
        }
        getLandById(params)
          .then(res => {
            if (res.data.code == '1'){
              let data = res.data.data
              this.summary.villageName = data.landVillageName
              this.summary.landYear = data.landYear
              // this.showLIst = data
              data.landList.forEach(res => {
                // 在后台将月份与组织机构代码添加进去 land_location_id
                this.showLIst.push(res)
                this.checkedIdList.push(res.dictionaryId)
                
              });
              console.info(this.showLIst)
              console.info(this.checkedIdList)
            } else {
              this.$message.error(res.data.msg)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
    //左侧树的处理
    //树点勾选事件
    handleCheckChange(data, checked, indeterminate) {
      if(data.dictionaryLevel>1){
        //如果是选中
        if(checked){
          this.showLIst.push(data)
          this.showLIst.sort(function(a,b){
              return a.sort - b.sort;
          });
          debugger
          this.checkedIdList.push(data.dictionaryId)
        }else{
          for(let i=0;i<this.showLIst.length;i++){
            if(this.showLIst[i].dictionaryId == data.dictionaryId){
              this.showLIst.splice(i,1)
            }
          }
        }
      }
    },
    //树点击事件
    handleNodeClick(data) {
      console.log(data);
    },
    // 提交 todo 需要获取所属地区码与村名
    submitForm(formName) {
      if (this.summaryId){
            this.editSummary()
          }else {
            this.addSummary()
          }
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     if (this.summaryId){
      //       this.editSummary()
      //     }else {
      //       this.addSummary()
      //     }
      //   } else {
      //     console.log('error submit!!');
      //     return false;
      //   }
      // });
    },
    //选中的元素，不能为空/null
    validateCheckout(){
      console.info(this.showLIst)
      let flag = true;
      this.showLIst.forEach(v => {
        if(!v.landNumber){
          console.info(v.landNumber)
          flag = false;
          return;
        }
      })
      if(flag){
        return this.showLIst.some(item =>{
        console.info(item.landNumber)
        item.landNumber == null || item.landNumber =='' || item.landNumber =='undefined'
        });
      }else{
        return true;
      }
    },
    // 发送新增请求
      addSummary() {
        // let data = JSON.parse(JSON.stringify(this.form))
        console.info(this.validateCheckout())
        if(this.validateCheckout()){
          this.$message({
            message: '选中的元素不能为空，请填写对应数量',
            type: 'error'
          })
          return;
        }
        let data = {
          landList:null,
          landYear:this.summary.landYear,
          landVillageName:this.summary.villageName
        };
        data.landList = this.showLIst
        // data.foodRelease = this.form.foodRelease ? '1' : '0'
        addLand(data)
          .then(res => {
            let data = res.data
            if (data.code == '1') {
              this.$message({
                message: data.msg,
                type: 'success'
              })
              this.$router.back()
            } else {
              this.$message.error(data.msg)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      editSummary(){
        // let data = JSON.parse(JSON.stringify(this.form))
        let data = {
          landList:null,
          landSummaryId:this.summaryId
        };
        data.landList = this.showLIst
        // data.foodRelease = this.form.foodRelease ? '1' : '0'
        updateLand(data)
          .then(res => {
            let data = res.data
            if (data.code == '1') {
              this.$message({
                message: data.msg,
                type: 'success'
              })
              this.$router.back()
            } else {
              this.$message.error(data.msg)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
    // 取消乡村添加
    resetForm(formName) {
      this.$router.back()
      // this.$refs[formName].resetFields();
    },
  }
}
</script>
<style lang="scss" scoped>
  .custom-tree-node {
    position:relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;

  }
  .flex-item{
    display: flex;
    flex-flow: wrap;
    justify-content: left;
  }
  .block{
    width: 40%;
    height: 100%;

    border-right-style: solid;
    border-right-width: 1px;
  }
  .item-table {
    position:relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>

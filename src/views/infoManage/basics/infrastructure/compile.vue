<template>
    <el-container style="border: 1px solid #eee">
      <el-aside width="300px" style="background-color: rgb(238, 241, 246)">
        <el-tree
          ref="tree2"
          node-key="dictionaryId"
          :props="props"
          :data="tree"
          show-checkbox
          default-expand-all
          :default-checked-keys="checkedIdList"
          @check-change="handleCheckChange">
        </el-tree>
      </el-aside>
      <el-container >
        <div>
          <el-form class="flex-item" ref="treeFrom" inline :model="form" label-width="120px" >
            <el-form-item  label="乡村名称" >
              <el-input v-model="summary.villageName" disabled show-word-limit ></el-input>
            </el-form-item>
            <el-form-item  label="年份" >
              <el-input v-model="summary.infrastructureYear" disabled show-word-limit ></el-input>
            </el-form-item>
            <el-form-item  :label="item.dictionaryName" v-for="item in showLIst" :key="item.dictionaryId">
              <el-input v-model="item.infrastructureNumber" show-word-limit ></el-input>
            </el-form-item>
            <el-form-item style="width:100%;text-align:center">
              <el-button type="primary" style="margin-left: 50px;" @click="submitForm">保存</el-button>
              <el-button type="danger" @click="resetForm">取消</el-button>
             </el-form-item>
          </el-form>
        </div>
      </el-container>
    </el-container>
</template>

<script>
// import { selectDirectoryTree,updateDirectoryTree, addDirectoryTree,delectDirectoryTree} from '@/api/Role/Jurisdiction/directoryTree'
import { isPathName } from '@/utils/validate'
import { addInfrastructure, getInfrastructureById, updateInfrastructure } from '@/api/infoMng/basics/infrastructure'
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
        infrastructureYear:new Date().getFullYear(),
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
    this.init()
    this.search()
  },
  methods: {
    init(){
      this.summaryId = this.$route.query.infrastructureSummaryId
      
    },
    search(){
      let params = {
        dictionaryPcode: 'BASICS_INFRASTRUCTURE',
      };
      getDictionaryAllByPCode(params).then(v=>{
        this.listLoading = false;
        let data = v.data.data
        this.tree = [{"dictionaryId":1,"dictionaryLevel":1,"dictionaryName":"基础设施","item":data}]
        // 右边显示列处理
        if(this.summaryId == null){
          data.forEach(res => {
            // 在后台将月份与组织机构代码添加进去 infrastructure_location_id
            this.showLIst.push(res)
            this.checkedIdList.push(res.dictionaryId)
          });
          console.info(this.checkedIdList)
        }else{
          this.getDetails(this.summaryId)
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
          infrastructureSummaryId: id
        }
        // this.checkedIdList = [];
        getInfrastructureById(params)
          .then(res => {
            if (res.data.code == '1'){
              let data = res.data.data
              // this.showLIst = data
              data.infrastructureList.forEach(res => {
                // 在后台将月份与组织机构代码添加进去 infrastructure_location_id
                this.showLIst.push(res)
                this.checkedIdList.push(res.dictionaryId)
                // this.$nextTick(() => {
                //   this.$refs.tree2.setCheckedKeys(this.checkedIdList);
                // });

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
    handleCheckChange(data, checked, indeterminate) {//组件默认点击上级的选择框，默认循环处理该方法
      console.info(data.dictionaryLevel)
      if(data.dictionaryLevel>1){// 为了不让一级数据加入到右面的显示中
        //如果是选中
        if(checked){
          this.showLIst.push(data)
          this.showLIst.sort(function(a,b){
              return a.sort - b.sort;
          });
          this.checkedIdList.push(data.dictionaryId)
        }else{
          for(let i=0;i<this.showLIst.length;i++){
            if(this.showLIst[i].dictionaryId == data.dictionaryId){
              this.showLIst.splice(i,1)
            }
          }
          for(let i=0;i<this.checkedIdList.length;i++){
            if(this.checkedIdList[i] == data.dictionaryId){
              this.checkedIdList.splice(i,1)
            }
          }
        }
      }
      console.info(this.checkedIdList)
    },
    //树点击事件
    handleNodeClick(data) {
      console.log(data);
    },
    // 提交 todo 需要获取所属地区码与村名
    submitForm(formName) {
      if(this.validateCheckout()){
        this.$message({
          message: '选中的元素不能为空，请填写对应数量',
          type: 'error'
        })
        return;
      }
      
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
        if(!v.infrastructureNumber){
          console.info(v.infrastructureNumber)
          flag = false;
          return;
        }
      })
      if(flag){
        return this.showLIst.some(item =>{
        console.info(item.infrastructureNumber)
        item.infrastructureNumber == null || item.infrastructureNumber =='' || item.infrastructureNumber =='undefined'
        });
      }else{
        return true;
      }
    },
    // 发送新增请求
      addSummary() {
        // if(this.validateCheckout()){
        //   this.$message({
        //     message: '选中的元素不能为空，请填写对应数量',
        //     type: 'error'
        //   })
        //   return;
        // }
        let data = {
          infrastructureList:null,
          infrastructureYear:this.summary.infrastructureYear,
          infrastructureVillageName:this.summary.villageName
        };
        data.infrastructureList = this.showLIst
        // data.foodRelease = this.form.foodRelease ? '1' : '0'
        addInfrastructure(data)
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
          infrastructureList:null,
          infrastructureSummaryId:this.summaryId
        };
        data.infrastructureList = this.showLIst
        // data.foodRelease = this.form.foodRelease ? '1' : '0'
        updateInfrastructure(data)
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
    justify-content: center;
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

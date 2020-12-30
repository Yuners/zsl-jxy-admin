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
          <el-form class="flex-item" ref="treeFrom" inline :model="items" label-width="120px" >
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
      showLIst:[]
    }
  },
  watch: {
    // showLIst(n,o){
    //   console.info(n,o)
    // }
  },
  mounted() {
    this.search();
  },
  methods: {
    search(){
      console.info("sss")
      let params = {
        dictionaryPcode: 'BASICS_INFRASTRUCTURE',
      };
      getDictionaryAllByPCode(params).then(v=>{
        this.listLoading = false;
        let data = v.data.data
        this.tree = [{"dictionaryId":1,"dictionaryName":"基础设施","item":data}]
        // 右边显示列处理
        data.forEach(res => {
          this.showLIst.push(res)
          this.checkedIdList.push(res.dictionaryId)
        });
        console.info(this.showLIst)
        this.listLoading = false  
      })
      .catch( err => {
        this.$message.error('服务器错误')
        this.listLoading = false;
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
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.villageId){
            this.editVillage()
          }else {
            this.addVillage()
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 提交
    bySaving(data) {
      if (this.graphicData.type === 'add') {
        this.form.foodDescribeList.push(data)
        this.$message({
          type: 'success',
          message: '添加成功!'
        });
      } else if (this.graphicData.type === 'edit') {
        // this.form.foodDescribeList[this.graphicData.index] = data
        this.$set(this.form.foodDescribeList, this.graphicData.index, data)
        this.$message({
          type: 'success',
          message: '修改成功!'
        });
      }
      this.addShow = false
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

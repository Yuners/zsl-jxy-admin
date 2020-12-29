<template>
    <el-container style="height: 700px; border: 1px solid #eee">
      <el-aside width="300px" style="background-color: rgb(238, 241, 246)">
        <el-tree
          ref="tree2"
          :data="tree"
          :props="defaultProps"
          :filter-node-method="filterNode"
          class="filter-tree"
          default-expand-all
          @node-click="handleNodeClick"
        />
      </el-aside>
      <el-container >
        <div>
          <el-form ref="treeFrom" :model="items" label-width="80px" >
            <el-form-item label="页面名称" >
              <el-input v-model="items.directoryTreeName" :disabled="tabShow" maxlength="17" show-word-limit ></el-input>
            </el-form-item>
            
            <el-form-item label="页面简称" >
              <el-input v-model="items.directoryTreeAbbreviation" :disabled="tabShow" maxlength="17" show-word-limit></el-input>
            </el-form-item>
             <el-form-item label="页面路径" >
              <el-input v-model="items.directoryTreePath" :disabled="tabShow" maxlength="250" show-word-limit></el-input>
            </el-form-item>
             <el-form-item label="显示路径" >
              <el-input v-model="items.directoryTreeAccordingPath" :disabled="tabShow" maxlength="250" show-word-limit></el-input>
            </el-form-item>
             <el-form-item label="重定向" >
              <el-input v-model="items.directoryTreeRedirectPath" :disabled="tabShow" maxlength="250" show-word-limit></el-input>
            </el-form-item>
             <el-form-item label="图标" >
              <el-input v-model="items.directoryTreeIcon" :disabled="tabShow" maxlength="50" show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="目录类型" >
              <el-input :value="items.typeName" disabled ></el-input>
            </el-form-item>
            <el-form-item v-if="this.items.directoryTreeId>=0">
                <el-button type="warning" v-if="tabShow"  @click="isUpdate">修改</el-button>
                <el-button type="primary" v-if="items.directoryTreeType===1&&tabShow" >添加下一级</el-button>
                <el-button type="danger" v-if="tabShow">删除</el-button>
                <el-button type="danger" v-if="!tabShow" style="margin-left: 20px;" @click="onSubmit">保存</el-button>
             </el-form-item>
          </el-form>
          <div v-if="items.directoryTreeId>=0">
             
              
            </div>
        </div>
      </el-container>
    </el-container>
</template>

<script>
import { selectDirectoryTree,updateDirectoryTree } from '@/api/Role/Jurisdiction/directoryTree'
import { isPathName } from '@/utils/validate'
export default {

  data() {
     
    return {
      listLoading: true, // 加载
      tree:[],
      defaultProps: {
        children: 'items',
        label: 'directoryTreeName'
      },
      items:{},
      treeHight:100,
      tabShow:true
    }
  },
  watch: {
    
  },
  mounted() {
    this.search();
  },
  methods: {
    search(show){
      this.listLoading = true;
      let params = {
        isDisable: true,
        isPage:true
      };
      selectDirectoryTree(params).then(v=>{
        // console.log("yes");
        console.log(v);
        this.listLoading = false;
        // for(let i=0;i<v.data.length;i++){
        //   this.tree.push(v.data[i]);
        // }
        // for(let i=0;i<v.data.length;i++){
        //   this.tree.push(v.data[i]);
        // }
        
        this.tree=v.data;
        if(!show){
          if(v.data!=null){
          if(v.data.length>0){
            let p={
              ...v.data[0]
            };
            this.items=p;
            console.log(this.items)
            if(this.items.directoryTreeId<0){
              this.items.typeName="系统级";
            }
            else{
              if(this.items.directoryTreeType===1){
                this.items.typeName="目录";
              }
              else{
                this.items.typeName="页面";
              }
            }
          }
        }
        }
        
        // console.log(this.tree)
      })
      .catch( err => {
        this.$message.error('服务器错误')
        this.listLoading = false;
      })
    },
    isUpdate(){
      this.tabShow=false;
    },
    filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
    },
    handleNodeClick(data){
       let p={
          ...data
       };
       this.items=p;
       if(this.items.directoryTreeId<0){
          this.items.typeName="系统级";
       }
       else{
          if(this.items.directoryTreeType===1){
             this.items.typeName="目录";
          }
          else{
            this.items.typeName="页面";
          }
       }
       this.tabShow=true;
       
    },
    onSubmit(){
      if(this.items.directoryTreeId<0){
        this.$message.error('系统级不能修改')
      }
      else{
        this.$confirm('是否确认修改页面信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then( () => {
          let path={
              directoryTreeId:this.items.directoryTreeId,
              directoryTreePath:this.items.directoryTreePath,
              directoryTreeName:this.items.directoryTreeName,
              directoryTreeRedirectPath:this.items.directoryTreeRedirectPath,
              directoryTreeIcon:this.items.directoryTreeIcon,
              directoryTreeAbbreviation:this.items.directoryTreeAbbreviation,
              directoryTreeAccordingPath:this.items.directoryTreeAccordingPath,
          };
          updateDirectoryTree(path).then(v=>{
              // console.log(v);
              this.tabShow=true;
              this.search(true);
              this.$message({
                type: 'success',
                message: '修改成功!'
              });
              
          })
          .catch( err => {
            this.$message.error('服务器错误')
          
          })
        })
        

      }
    
    }
  }
}
</script>
<style>
  .custom-tree-node {
    position:relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
   
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

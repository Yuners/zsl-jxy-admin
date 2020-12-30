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
            <el-form-item label="区划名称" >
              <el-input v-model="items.frameworkName" :disabled="tabShow" maxlength="17" show-word-limit ></el-input>
            </el-form-item>
            <el-form-item label="行政编号" >
              <el-input v-model="items.frameworkAdministrative" :disabled="tabShow" maxlength="12" show-word-limit></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="warning" v-if="tabShow" :disabled="this.items.frameworkRank<=1"  @click="isUpdate">修改</el-button>
                <el-button type="primary" v-if="tabShow" @click="addTree" >添加下一级</el-button>
                <el-button type="danger" v-if="tabShow" :disabled="this.items.frameworkRank<=1" @click="delect">删除</el-button>
                <el-button type="primary" v-if="!tabShow&&this.items.frameworkRank>1" style="margin-left: 20px;" @click="onSubmit">保存</el-button>
             </el-form-item>
          </el-form>
        </div>
        <el-dialog
          title="添加页面"
          :visible.sync="addShow"
          width="40%"
        >
            <el-form ref="addTreeFrom" :model="addItems" label-width="80px" >
              <el-form-item label="上级组织" >
                <el-input v-model="addItems.frameworkPpIdName"  disabled></el-input>
              </el-form-item>
               <el-form-item label="区划名称" >
                <el-input v-model="addItems.frameworkName"  maxlength="17" show-word-limit ></el-input>
              </el-form-item>
              <el-form-item label="行政编号" >
                <el-input v-model="addItems.frameworkAdministrative"  maxlength="12" show-word-limit></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                  <el-button type="danger" @click="noAddCanl">取消</el-button>
                  <el-button type="primary" @click="add">提交</el-button>
                
             </span>
          
        </el-dialog>
      </el-container>
    </el-container>
</template>

<script>
import { selectFramework,updateFramework, addFramework,delectFramework} from '@/api/Role/Jurisdiction/framework'
import { isPathName,isAdministrative } from '@/utils/validate'
export default {

  data() {
    return {
      listLoading: true, // 加载
      tree:[],
      defaultProps: {
        children: 'items',
        label: 'frameworkName'
      },
      items:{},
      treeHight:100,
      tabShow:true,
      addShow:false,
      addItems:{
        frameworkAdministrative:null, //页面路径
        frameworkName:null, //页面图标
        frameworkPpId:null,//页面名称
        frameworkPpIdName:null,//页面名称
      }
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
        ids:111
      };
     selectFramework(params).then(v=>{
        // console.log("yes");
        // console.log(v);
        // if (v.data.code == '1'){
          this.listLoading = false;
          this.tree=[];
          this.tree.push(v.data);
          if(!show){
            if(v.data!=null){
              let p={
              ...v.data
              };
              this.items=p;
              console.log(this.items)
              console.log(this.items)
            }
          }
        // }
        // else{
        //   this.$message.error(v.data.msg)
        // }
        
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
      
       this.tabShow=true;
       
    },
    addTree(){        
      let addItems={
        frameworkAdministrative:null, //行政编码
        frameworkName:null, //区划名称
        frameworkPpId:null,//上级组织
        frameworkPpIdName:null,//上级组织名称
      };
      addItems.frameworkPpId=this.items.frameworkId;
      addItems.frameworkPpIdName=this.items.frameworkName;
      this.addItems=addItems;
      this.addShow=true;
    },
    delect(){
      if(this.items.frameworkRank<=1){
        this.$message.error('平台不能删除')
      }
        this.$confirm(`是否确认删除组织'${this.items.frameworkName}'?(注:删除该组织机构后,其下属组织机构也会删除)`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(()=>{
           
            let treeItems={
              id:this.items.frameworkId,
            };
            delectFramework(treeItems).then(v=>{
              // if (v.data.code == '1'){
                this.search(true);
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              // }
              // else{
              //    this.$message.error(v.data.msg)
              // }
                
            })
            .catch( err => {
              this.$message.error('服务器错误')
            })
        })
    },
    add(){
      if(!isPathName(this.addItems.frameworkName)){
        this.$message.error('页面名称应在2-17之间')
      }
      else if(!isAdministrative(this.addItems.frameworkAdministrative)){
        this.$message.error('请输入12位行政编码')
      }
      else{
        this.$confirm(`是否确认添加该组织?${this.addItems.frameworkName}`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(()=>{
            addFramework(this.addItems).then(v=>{ 
              // if (v.data.code == '1'){
                this.addShow=false;
                this.search(true);
                this.$message({
                  type: 'success',
                  message: '添加成功!'
                });
              // }
              // else{
              //   this.$message.error(v.data.msg)
              // }
            })
            .catch( err => {
              this.$message.error('服务器错误')
            
            })
            
        })
      }
       
        
    },
    noAddCanl() {
        this.addShow=false;
    },
    onSubmit(){
     
      if(!isPathName(this.items.frameworkName)){
        this.$message.error('页面名称应在2-17之间')
      }
      else if(!isAdministrative(this.items.frameworkAdministrative)){
        this.$message.error('请输入12位行政编码')
      }
      else{
        this.$confirm('是否确认修改组织信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then( () => {
          
            let path={
              frameworkId:this.items.frameworkId,
              frameworkAdministrative:this.items.frameworkAdministrative,
              frameworkName:this.items.frameworkName
            };
            updateFramework(path).then(v=>{
              // if (v.data.code == '1'){
                // console.log(v);
                this.tabShow=true;
                this.search(true);
                this.$message({
                  type: 'success',
                  message: '修改成功!'
                });
              // }
              // else{
              //     this.$message.error(v.data.msg)
              // }
                
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
  .filter-tree{
    color:cornflowerblue;
    font-size: 14px;
  }
</style>

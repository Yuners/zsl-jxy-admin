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
            <!-- <el-form ref="addTreeFrom" :model="addItems" label-width="80px" >
              <el-form-item label="上级页面" >
                <el-input v-model="addItems.directoryTreePpIdName"  disabled></el-input>
              </el-form-item>
              <el-form-item label="页面名称" >
                <el-input v-model="addItems.directoryTreeName"  maxlength="17" show-word-limit ></el-input>
              </el-form-item>
              <el-form-item label="页面简称" >
                <el-input v-model="addItems.directoryTreeAbbreviation"  maxlength="17" show-word-limit></el-input>
              </el-form-item>
              <el-form-item label="页面路径" >
                <el-input v-model="addItems.directoryTreePath"  maxlength="250" show-word-limit></el-input>
              </el-form-item>
              <el-form-item label="显示路径" >
                <el-input v-model="addItems.directoryTreeAccordingPath"  maxlength="250" show-word-limit></el-input>
              </el-form-item>
              <el-form-item label="重定向" >
                <el-input v-model="addItems.directoryTreeRedirectPath"  maxlength="250" show-word-limit></el-input>
              </el-form-item>
              <el-form-item label="图标" >
                <el-input v-model="addItems.directoryTreeIcon" maxlength="50" show-word-limit></el-input>
              </el-form-item>
              <el-form-item label="页面类型" >
                <el-radio v-model="addItems.directoryTreeType" label='1'>目录</el-radio>
                <el-radio v-model="addItems.directoryTreeType" label='2'>页面</el-radio>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              
                  <el-button type="danger" @click="noAddCanl">取消</el-button>
                  <el-button type="primary" @click="add">提交</el-button>
                
             </span> -->
          
        </el-dialog>
      </el-container>
    </el-container>
</template>

<script>
import { selectFramework,updateFramework, addFramework,delectFramework} from '@/api/Role/Jurisdiction/framework'
import { isPathName } from '@/utils/validate'
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
        directoryTreeAccordingPath:null, //页面路径
        directoryTreeAbbreviation:null, //页面简称
        directoryTreeIcon:null, //页面图标
        directoryTreeName:null,//页面名称
        directoryTreeOwnershipSystemId:null,//归属系统
        directoryTreePath:null,//页面路径
        directoryTreePpId:null,//父id
        directoryTreeRedirectPath:null,//重定向路径
        directoryTreePpIdName:null,//父id名称
        directoryTreeType: '1',//页面类型
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
        console.log(v);
        this.listLoading = false;
        // for(let i=0;i<v.data.length;i++){
        //   this.tree.push(v.data[i]);
        // }
        // for(let i=0;i<v.data.length;i++){
        //   this.tree.push(v.data[i]);
        // }
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
      if(this.items.directoryTreeType===2){
        this.$message.error('只有目录以及系统级才可添加页面')
      }
      let addItems={
        directoryTreeAccordingPath:null, //页面路径
        directoryTreeAbbreviation:null, //页面简称
        directoryTreeIcon:null, //页面图标
        directoryTreeName:null,//页面名称
        directoryTreeOwnershipSystemId:null,//归属系统
        directoryTreePath:null,//页面路径
        directoryTreePpId:null,//父id
        directoryTreeRedirectPath:null,//重定向路径
        directoryTreePpIdName:null,//父id名称
        directoryTreeType: '1',//页面类型
      };
      if(this.items.directoryTreeId<0){
        addItems.directoryTreePpId=0;
      }
      else{
        addItems.directoryTreePpId=this.items.directoryTreeId;
      }
      addItems.directoryTreePpIdName=this.items.directoryTreeName;
      addItems.directoryTreeOwnershipSystemId=this.items.directoryTreeOwnershipSystemId;

      
      this.addItems=addItems;
      this.addShow=true;
    },
    delect(){
      if(this.items.directoryTreeId<0){
        this.$message.error('系统级不能删除')
      }
        this.$confirm(`是否确认删除'${this.items.directoryTreeName}'页面?${this.items.directoryTreeType===1?'(注:该页面是目录页,删除后其子页面将会一起删除)':''}`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(()=>{
            let treeItems={
              directoryTreeId:this.items.directoryTreeId,
            };
            delectDirectoryTree(treeItems).then(v=>{
                this.search(true);
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
            })
            .catch( err => {
              this.$message.error('服务器错误')
            })
        })
    },
    add(){
      if(!isPathName(this.addItems.directoryTreeName)){
        this.$message.error('页面名称应在2-17之间')
      }
      else{
        this.$confirm('是否确认添加该页面?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(()=>{
            addDirectoryTree(this.addItems).then(v=>{ 
              this.addShow=false;
              this.search(true);
                this.$message({
                  type: 'success',
                  message: '添加成功!'
                });
             
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

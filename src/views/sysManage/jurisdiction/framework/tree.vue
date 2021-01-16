<template>
    <el-container style="height: 700px; border: 1px solid #eee">
      <el-aside width="300px" style="background-color: rgb(238, 241, 246)">
        <el-tree
          ref="tree2"
          :data="tree"
          :props="defaultProps"
          :filter-node-method="filterNode"
          class="filter-tree"
          @node-click="handleNodeClick"
          render-after-expand
          accordion
        />
         <!-- :load="loadNode"
          lazy -->
      </el-aside>
      <el-container >
        <div>
          <el-form ref="treeFrom" :model="items" label-width="100px"  :rules="treeRules">
            <el-form-item label="区划名称" prop="frameworkName">
              <el-input v-model="items.frameworkName" :disabled="tabShow" maxlength="17" show-word-limit ></el-input>
            </el-form-item>
            <el-form-item label="行政编号" prop="frameworkAdministrative">
              <el-input v-model="items.frameworkAdministrative" :disabled="tabShow" maxlength="12" show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="排序" prop="sort">
              <el-input v-model="items.sort" :disabled="tabShow" maxlength="6" show-word-limit></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="warning" v-if="tabShow" :disabled="this.items.frameworkRank<=1"  @click="isUpdate">修改</el-button>
                <el-button type="primary" v-if="tabShow" @click="addTree" >添加下一级</el-button>
                <el-button type="danger" v-if="tabShow" :disabled="this.items.frameworkRank<=1" @click="delect">删除</el-button>
                <el-button type="primary" v-if="!tabShow&&this.items.frameworkRank>1" style="margin-left: 20px;" @click="onSubmit('treeFrom')">保存</el-button>
             </el-form-item>
          </el-form>
        </div>
        <el-dialog
          title="添加页面"
          :visible.sync="addShow"
          width="40%"
        >
            <el-form ref="addTreeFrom" :model="addItems" label-width="100px" :rules="addTreeRules">
              <el-form-item label="上级组织" >
                <el-input v-model="addItems.frameworkPpIdName"  disabled></el-input>
              </el-form-item>
               <el-form-item label="区划名称" prop="frameworkName">
                <el-input v-model="addItems.frameworkName"  maxlength="17" show-word-limit ></el-input>
              </el-form-item>
              <el-form-item label="行政编号" prop="frameworkAdministrative">
                <el-input v-model="addItems.frameworkAdministrative"  maxlength="12" show-word-limit></el-input>
              </el-form-item>
              <el-form-item label="排序" prop="sort">
                 <el-input v-model="addItems.sort"  maxlength="6" show-word-limit></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                  <el-button type="danger" @click="noAddCanl">取消</el-button>
                  <el-button type="primary" @click="add('addTreeFrom')">提交</el-button>
             </span>
        </el-dialog>
      </el-container>
    </el-container>
</template>

<script>
import { selectFramework,updateFramework, addFramework,delectFramework} from '@/api/Role/framework'
import { isPathName,isAdministrative,isSort } from '@/utils/validate'
export default {
  
  data() {
      let validatePathName = (rule, value, callback) => {
        if (!isPathName(value)) {
          callback(new Error("只能中文，数字，英文且长度为2-17"));
        } else {
          callback();
        }
      };
      let validateAdministrative = (rule, value, callback) => {
        if (!isAdministrative(value)) {
          callback(new Error("只能中文，数字，英文且长度为2-20"));
        } else {
          callback();
        }
      };
      let validateSort = (rule, value, callback) => {
        if (!isSort(value)) {
          callback(new Error("请输入6位已内数字"));
        } else {
          callback();
        }
      };
    return {
      treeRules:{
          frameworkName:[
            {required: true, message: '请填写区划名称', trigger: 'blue'},
            {validator: validatePathName, trigger: "blue"}
          ],
          frameworkAdministrative:[
            {required: true, message: '请填写行政编码', trigger: 'blue'},
            {validator: validateAdministrative, trigger: "blue"}
          ],
          sort:[
            {required: true, message: '请输入排序信息', trigger: 'blue'},
            {validator: validateSort, trigger: "blue"}
          ],
          
      },
      addTreeRules:{
        frameworkName:[
            {required: true, message: '请填写区划名称', trigger: 'blue'},
            {validator: validatePathName, trigger: "blue"}
          ],
          frameworkAdministrative:[
            {required: true, message: '请填写行政编码', trigger: 'blue'},
            {validator: validateAdministrative, trigger: "blue"}
          ],
          sort:[
            {required: true, message: '请输入排序信息', trigger: 'blue'},
            {validator: validateSort, trigger: "blue"}
          ],
      },
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
        sort:0,//排序
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
          this.listLoading = false;
          this.tree=[];
          this.tree.push(v.data);
          if(!show){
            if(v.data!=null){
              let p={
              ...v.data
              };
              this.items=p;
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
    loadNode(node, resolve){
      if(node.label==undefined){
        return
      }
      else{
        let data=node.data;
        console.log(data);
        if(data.items==null){
          let params = {
            id:data.frameworkId
          };
          selectFramework(params).then(v=>{
             setTimeout(() => {
                resolve(v.data.items);
              }, 500);
          })
          .catch( err => {
            this.$message.error('服务器错误')
          })

        }
        else{
          setTimeout(() => {
            resolve(data.items);
          }, 500);
        }
      }
      
      
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
        sort:0,//排序
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
            })
            .catch( err => {
              this.$message.error('服务器错误')
            })
        })
    },
    add(formName){
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if(!isPathName(this.addItems.frameworkName)){
            this.$message.error('页面名称应在2-17之间')
          } 
          else if(!isAdministrative(this.addItems.frameworkAdministrative)){
            this.$message.error('请输入12位行政编码')
          }
           else if(!isSort(this.addItems.sort)){
              this.$message.error('请输入6位已内数字')
          }
          else{
            this.$confirm(`是否确认添加该组织?${this.addItems.frameworkName}`, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
            .then(()=>{
                addFramework(this.addItems).then(v=>{ 
                    this.addShow=false;
                    this.search(true);
                    this.$message({
                      type: 'success',
                      message: '添加成功!'
                    });
                })
                .catch( err => {
                  this.$message.error('服务器错误')
                
                })
                
            })
          }
         
        }
         else
          {
            console.log('error submit!!');
            return false;
          }
      })
      
       
        
    },
    noAddCanl() {
        this.addShow=false;
    },
    onSubmit(formName){
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if(!isPathName(this.items.frameworkName)){
            this.$message.error('页面名称应在2-17之间')
          }
          else if(!isAdministrative(this.items.frameworkAdministrative)){
            this.$message.error('请输入12位行政编码')
          }
          else if(!isSort(this.items.sort)){
              this.$message.error('请输入6位已内数字')
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
                  frameworkName:this.items.frameworkName,
                  sort:this.items.sort,
                };
                updateFramework(path).then(v=>{
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
        else
        {
          console.log('error submit!!');
          return false;
        }
      })
     
    
    }
  }
}
</script>
<style scoped lang="scss">
  /* .custom-tree-node {
    position:relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
   
  } */
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

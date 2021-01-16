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
          <el-form ref="treeFrom" :model="items" label-width="100px" :rules="treeRules">
            <el-form-item label="页面名称" prop="directoryTreeName">
              <el-input v-model="items.directoryTreeName" :disabled="tabShow" maxlength="17" show-word-limit ></el-input>
            </el-form-item>
            <el-form-item label="页面简称" prop="directoryTreeAbbreviation">
              <el-input v-model="items.directoryTreeAbbreviation" :disabled="tabShow" maxlength="17" show-word-limit></el-input>
            </el-form-item>
             <el-form-item label="页面路径" prop="directoryTreePath">
              <el-input v-model="items.directoryTreePath" :disabled="tabShow" maxlength="250" show-word-limit></el-input>
            </el-form-item>
             <el-form-item label="显示路径" prop="directoryTreeAccordingPath">
              <el-input v-model="items.directoryTreeAccordingPath" :disabled="tabShow" maxlength="250" show-word-limit></el-input>
            </el-form-item>
             <el-form-item label="重定向" prop="directoryTreeRedirectPath">
              <el-input v-model="items.directoryTreeRedirectPath" :disabled="tabShow" maxlength="250" show-word-limit></el-input>
            </el-form-item>
             <el-form-item label="图标" >
              <el-input v-model="items.directoryTreeIcon" :disabled="tabShow" maxlength="50" show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="目录类型" >
              <el-input :value="items.typeName" disabled ></el-input>
            </el-form-item>
            <el-form-item label="排序" prop="sort">
              <el-input v-model="items.sort"  maxlength="6" :disabled="tabShow"></el-input>
            </el-form-item>
            
            <el-form-item>
                <el-button type="warning" v-if="tabShow" :disabled="this.items.directoryTreeId<0"  @click="isUpdate">修改</el-button>
                <el-button type="primary" v-if="tabShow" @click="addTree" :disabled="items.directoryTreeType!=1">添加下一级</el-button>
                <el-button type="danger" v-if="tabShow" :disabled="this.items.directoryTreeId<0" @click="delect">删除</el-button>
                <el-button type="primary" v-if="!tabShow&&this.items.directoryTreeId>=0" style="margin-left: 20px;" @click="onSubmit('treeFrom')">保存</el-button>
             </el-form-item>
          </el-form>
        </div>
        <el-dialog
          title="添加页面"
          :visible.sync="addShow"
          width="40%"
        >
          <!-- <span slot="footer" class="dialog-footer">
          </span> -->
          <!-- <span slot="footer" class="dialog-footer"> -->
            <el-form ref="addTreeFrom" :model="addItems" label-width="100px" :rules="addTreeRules" >
              <el-form-item label="上级页面" prop="directoryTreePpIdName">
                <el-input v-model="addItems.directoryTreePpIdName"  disabled></el-input>
              </el-form-item>
              <el-form-item label="页面名称" prop="directoryTreeName">
                <el-input v-model="addItems.directoryTreeName"  maxlength="17" show-word-limit ></el-input>
              </el-form-item>
              <el-form-item label="页面简称" prop="directoryTreeAbbreviation">
                <el-input v-model="addItems.directoryTreeAbbreviation"  maxlength="17" show-word-limit></el-input>
              </el-form-item>
              <el-form-item label="页面路径" prop="directoryTreePath">
                <el-input v-model="addItems.directoryTreePath"  maxlength="250" show-word-limit></el-input>
              </el-form-item>
              <el-form-item label="显示路径" prop="directoryTreeAccordingPath">
                <el-input v-model="addItems.directoryTreeAccordingPath"  maxlength="250" show-word-limit></el-input>
              </el-form-item>
              <el-form-item label="重定向" prop="directoryTreeRedirectPath">
                <el-input v-model="addItems.directoryTreeRedirectPath"  maxlength="250" show-word-limit></el-input>
              </el-form-item>
              <el-form-item label="图标" prop="">
                <el-input v-model="addItems.directoryTreeIcon" maxlength="50" show-word-limit></el-input>
              </el-form-item>
              <el-form-item label="页面类型" prop="directoryTreeType">
                <el-radio v-model="addItems.directoryTreeType" label='1'>目录</el-radio>
                <el-radio v-model="addItems.directoryTreeType" label='2'>页面</el-radio>
              </el-form-item>
              <el-form-item label="排序" prop="sort">
              <el-input v-model="addItems.sort"  maxlength="6"></el-input>
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
import { selectDirectoryTree,updateDirectoryTree, addDirectoryTree,delectDirectoryTree} from '@/api/Role/directoryTree'

import { isPathName,isSort } from '@/utils/validate'
export default {

  data() {
       let validatePathName = (rule, value, callback) => {
        if (!isPathName(value)) {
          callback(new Error("只能中文，数字，英文且长度为2-17"));
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
        directoryTreeName:[
            {required: true, message: '请填写页面名称', trigger: 'blue'},
            {validator: validatePathName, trigger: "blue"}
        ],
        directoryTreeAbbreviation:[
          {required: true, message: '请填写页面简称', trigger: 'blue'},
          {validator: validatePathName, trigger: "blue"}
        ],
        directoryTreePath:[
          {required: true, message: '请填写页面路径', trigger: 'blue'},
        ],
        directoryTreeAccordingPath:[
          {required: true, message: '请填写显示路径', trigger: 'blue'},
        ],
        directoryTreeRedirectPath:[
          {required: true, message: '请填写重定向路径', trigger: 'blue'},
        ],
        sort:[
          {required: true, message: '请填写页面名称', trigger: 'blue'},
          {validator: validateSort, trigger: "blue"}
        ]
      },
      addTreeRules:{
        directoryTreeName:[
            {required: true, message: '请填写页面名称', trigger: 'blue'},
            {validator: validatePathName, trigger: "blue"}
        ],
        directoryTreeAbbreviation:[
          {required: true, message: '请填写页面简称', trigger: 'blue'},
          {validator: validatePathName, trigger: "blue"}
        ],
        directoryTreePath:[
          {required: true, message: '请填写页面路径', trigger: 'blue'},
        ],
        directoryTreeAccordingPath:[
          {required: true, message: '请填写显示路径', trigger: 'blue'},
        ],
        directoryTreeRedirectPath:[
          {required: true, message: '请填写重定向路径', trigger: 'blue'},
        ],
        directoryTreeType:[
          {required: true, message: '请填写排序信息', trigger: 'blue'},
        ],
        sort:[
          {required: true, message: '请填写排序信息', trigger: 'blue'},
          {validator: validateSort, trigger: "blue"}
        ]
      },
      listLoading: true, // 加载
      tree:[],
      defaultProps: {
        children: 'items',
        label: 'directoryTreeName'
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
        sort:0,
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
        isDisable: true,
        isPage:true
      };
      selectDirectoryTree(params).then(v=>{
        console.log(v)
        //  if (v.code == '1'){
          // console.log(v.data.code)
          this.listLoading = false;
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
        // }
        // else{
        //   this.$message.error(v.data.msg)
        // }
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
        sort:0,
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
              id:this.items.directoryTreeId,
            };
            delectDirectoryTree(treeItems).then(v=>{
              //  if (v.data.code == '1'){
                  this.search(true);
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
              //  }
              //  else{
              //     this.$message.error(v.data.msg)
              //  }
            })
            .catch( err => {
              this.$message.error('服务器错误')
            })
        })
    },
    add(formName){
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
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
          if(this.items.directoryTreeId<0){
            this.$message.error('系统级不能修改')
          }
          else if(!isPathName(this.items.directoryTreeName)){
             this.$message.error('页面名称应在2-17之间')
          }
          else if(!isSort(this.items.sort)){
              this.$message.error('请输入6位已内数字')
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
                  sort:this.items.sort
                };
                updateDirectoryTree(path).then(v=>{
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

<template>
  <div class="compile">
    <div class="compileHead">
      <h1>角色编辑</h1>
    </div>
    <el-form ref="addTreeFrom" :model="addItems" label-width="100px" :rules="addTreeRules" >
        <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="addItems.roleName"  maxlength="17" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="职能描述" prop="roleFunction">
            <el-input v-model="addItems.roleFunction"  maxlength="50" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="归属机构" prop="roleFrameworkId" >
            <el-input v-model="addItems.frameworkName" readonly>
              <template slot="append">
                  <el-button type="primary" size="medium" @click="frameworkShow">选择机构</el-button>
              </template>
            </el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
            <el-input v-model="addItems.sort"  maxlength="6"></el-input>
        </el-form-item>
        <el-form-item label="权限" >
            <el-tree
              ref="juTree"
              :data="jurisdictionTree"
              :props="defaultProp"
              :filter-node-method="filterNode"
              class="filter-tree"
              render-after-expand
              node-key="directoryTreeId"
              :default-checked-keys="frameworks"
              show-checkbox
              @check="frameworkChange"
           />
        </el-form-item>
        <el-form-item>
          <div class="handleSave">
              <el-button size="medium" type="primary" @click="submitForm('addTreeFrom')">保 存</el-button>
              <el-button size="medium" @click="resetForm('addTreeFrom')">取 消</el-button>
            </div>
        </el-form-item>
    </el-form>
     <el-dialog
        title="选择组织机构"
        :visible.sync="isframework"
        width="60%"
     >
      <el-container style="height:500px;border: 1px solid #eee">
        <el-aside width="300px" style="background-color: rgb(238, 241, 246)">
          <el-tree
            ref="trees"
            :data="frameworktree"
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
        <el-form ref="treeFrom" :model="frameworkItems" label-width="80px" >
            <el-form-item label="区划名称" >
              <el-input v-model="frameworkItems.frameworkName"   readonly></el-input>
            </el-form-item>
            <el-form-item label="行政编号" >
              <el-input v-model="frameworkItems.frameworkAdministrative" readonly></el-input>
            </el-form-item>
             <el-form-item>
                <el-button type="warning"  @click="noAddCanl">取消</el-button>
                <el-button type="primary"  @click="AddCanl">确认</el-button>
             </el-form-item>
        </el-form>
        
      </el-container>
    </el-container>
   </el-dialog>
   
  </div>
</template>

<script>
 import { selectRole,addRole,updateRole} from '@/api/Role/role'
 import { selectFramework} from '@/api/Role/framework'
 import { selectJurisdictionTree} from '@/api/Role/jurisdiction'
import sysManageRouter from '@/router/modules/sysManage'
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
        // 表单字段
        addItems:{
            roleName:null,
            sort:null,
            frameworkName:null,
            roleFrameworkId:null,
            roleFunction:null,
        },
        addTreeRules:{
            roleName:[
              {required: true, message: '请填写角色名称', trigger: 'blue'},
              {validator: validatePathName, trigger: "blue"}
            ],
            roleFunction:[
              {required: true, message: '请填写职能描述', trigger: 'blue'},
            ],
            roleFrameworkId:[
              {required: true, message: '请填写行政编码', trigger: 'blue'},
            ],
            sort:[
              {required: true, message: '请输入排序信息', trigger: 'blue'},
              {validator: validateSort, trigger: "blue"}
            ],
        },
        frameworkItems:{
          frameworkName:null,
          frameworkAdministrative:null,
        },
        isframework:false,
        frameworktree:[],
        frameworks:['4'],
        defaultProps: {
          children: 'items',
          label: 'frameworkName'
        },
        jurisdictionTree:[],
        defaultProp: {
          children: 'items',
          label: 'directoryTreeName'
        },
        addJurisdictionList:[],
        removeJurisdictionList:[],
        roleId:'',
      }
    },
    components: {
      
    },
    created() {
      // this.search();
      this.roleId = this.$route.query.roleId
      if (this.roleId) {
        this.getDetails(this.roleId)
      }
      this.search();
    },
    methods: {
        //初始数据获取
        search(show){
          let params = {
            ids:111
          };
          selectFramework(params).then(v=>{
            this.frameworktree=[];
            this.frameworktree.push(v.data);
            // console.log(this.frameworktree)
            if(!show){
              if(v.data!=null){
                let p={
                ...v.data
                };
                this.frameworkItems=p;
              }
            }
          })
          .catch( err => {
           this.$message.error('服务器错误')
           })
          let items={
            roleId:this.roleId
          };
           selectJurisdictionTree(items).then(v=>{
            //  console.log(v.data.itemsList)
              this.jurisdictionTree=[];
              if(v.data.itemsList!=null){
                for(let i=0;i<v.data.itemsList.length;i++){
                  this.jurisdictionTree.push(v.data.itemsList[i]);
                }
              }
              this.frameworks=v.data.role;

           })
        },
        //取消编辑
        resetForm(formName) {
          this.$router.back()
          // this.$refs[formName].resetFields();
        },
        //打开组织机构选择器
        frameworkShow(){
          this.isframework=true;
        },
        //角色信息初始
        getDetails(roleId){
          let items={
            roleId
          };
          selectRole(items).then(v=>{
            this.addItems=v.data;
          })
           .catch( err => {
              this.$message.error('服务器错误')
            })
        },
        //组织机构取消
        noAddCanl(){
          this.isframework=false;
        },
        //组织机构确认
        AddCanl(){
          this.isframework=false;
          this.addItems.roleFrameworkId=this.frameworkItems.frameworkId;
          this.addItems.frameworkName=this.frameworkItems.frameworkName;
        },
        //tree过滤
        filterNode(value, data) {
          if (!value) return true
          return data.label.indexOf(value) !== -1
        },
        // 提交
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              if (this.roleId){
                this.editScenery()
              }else {
                this.addScenery()
              }
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        //添加角色
        addScenery(){
          let items={
            roleName:this.addItems.roleName,
            roleFrameworkId:this.addItems.roleFrameworkId,
            roleFunction:this.addItems.roleFunction,
            sort:this.addItems.sort,
            reqJurisdiction:{
              addJurisdictionList:this.addJurisdictionList,
              removeJurisdictionList:this.removeJurisdictionList,
            }
          };
          addRole(items).then(v=>{
              this.$message({
                  type: 'success',
                  message: '添加成功!'
                });  
                this.$router.back()
          })
          .catch( err => {
              this.$message.error('服务器错误')
            })
        },
        //修改角色
        editScenery(){
          let items={
            roleId:this.roleId,
            roleName:this.addItems.roleName,
            roleFrameworkId:this.addItems.roleFrameworkId,
            roleFunction:this.addItems.roleFunction,
            sort:this.addItems.sort,
            reqJurisdiction:{
              addJurisdictionList:this.addJurisdictionList,
              removeJurisdictionList:this.removeJurisdictionList,
            }
          };
          updateRole(items).then(v=>{
               this.$message({
                  type: 'success',
                  message: '修改成功!'
                });  
                this.$router.back()
                
          })
          .catch( err => {
              this.$message.error('服务器错误')
            })
        },
        //组织机构信息切换
        handleNodeClick(data){
          console.log(data)
          let p={
              ...data
          };
          this.frameworkItems=p;
          // let params = {
          //       id:data.frameworkId
          //     };
          //     selectFramework(params).then(v=>{
          //       data.items=v.data.items;
          //           // resolve(v.data.items);
          //         console.log(v.data.items)
          //     })
          //     .catch( err => {
          //       this.$message.error('服务器错误')
          //     })
        },
        //权限操作
        frameworkChange(date,node){
          // console.log("cs")
          // console.log(node);
          console.log(date)
          let directoryTreeIdItems=date.directoryTreeIdItems;
          console.log(directoryTreeIdItems);
          
          if(node.checkedKeys.indexOf(date.directoryTreeId)===-1){
            console.log("取消")            
            for(let i=0;i<directoryTreeIdItems.length;i++){
                let index=this.addJurisdictionList.indexOf(directoryTreeIdItems[i]);
                if(index===-1){
                  if(this.removeJurisdictionList.indexOf(directoryTreeIdItems[i])===-1);
                  {
                     this.removeJurisdictionList.push(directoryTreeIdItems[i])
                  }
                }
                else 
                {
                  this.addJurisdictionList.splice(i,1);
                }
            }
          }
          else{
            console.log("选中")
            for(let i=0;i<directoryTreeIdItems.length;i++){
                let index=this.removeJurisdictionList.indexOf(directoryTreeIdItems[i]);
                if(index===-1){
                  if(this.addJurisdictionList.indexOf(directoryTreeIdItems[i])===-1);
                  {
                     this.addJurisdictionList.push(directoryTreeIdItems[i])
                  }
                }
                else 
                {
                  this.removeJurisdictionList.splice(i,1);
                }
            }
           

          }
           console.log(this.addJurisdictionList);
            console.log(this.removeJurisdictionList);
        },
        //组织树懒加载
        loadNode(node, resolve){
          console.log(node)
          if(node.label==undefined){
            return
          }
          else{
            let data=node.data;
            if(data.items==null){
              let params = {
                id:data.frameworkId
              };
              selectFramework(params).then(v=>{
                // setTimeout(() => {
                    resolve(v.data.items);
                  // }, 500);
              })
              .catch( err => {
                this.$message.error('服务器错误')
              })

            }
            else{
              // setTimeout(() => {
                resolve(data.items);
              // }, 500);
            }
          }
        },
    }
  }
</script>

<style scoped lang="scss">
  .compile {
    height: 100%;
    border: 1px solid #EBEEF5;
    position: relative;

    .compileHead {
      width: 100%;
      height: 60px;
      border-bottom: 1px solid #EBEEF5;
      line-height: 60px;
      background-color: #eeeeee;

      h1 {
        font-size: 24px;
        padding-left: 20px;
      }
    }

    .compileMain {
      padding: 50px;

      .handleSave {
        flex: 1;
        text-align: center;
      }

      .feature {
        display: flex;
      }

      .graphic {
        display: flex;
        align-items: center;
        margin-bottom: 30px;

        span {
          margin-right: 4px;
          font-size: 16px;
          color: #F56C6C;
        }
      }

      .mark {
        display: flex;
        align-items: self-start;

        .markMain {
          margin-left: 30px;

          .item {
            display: flex;
            align-items: center;
            border: 1px solid #ced4da;
            border-radius: 10px;

            &:first-child {
              margin-bottom: 10px;
            }

            .text {
              text-align: justify;
              text-align-last: justify;
              width: 80px;
              box-sizing: border-box;
              padding: 0 15px;
              background-color: #e9ecef;
              border-radius: 10px 0 0 10px;
            }

            .content {
              width: 300px;
              font-size: 12px;
              color: #333333;
              padding-left: 10px;
              text-align: left;
              overflow: hidden;
              white-space: nowrap;
            }
          }
        }
      }

      #map {
        width: 100%;
        height: 300px;
      }

      .dialog-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .main {
          width: 360px;
          margin-right: 8px;

          .item {
            display: flex;
            align-items: center;
            border: 1px solid #ced4da;
            border-radius: 10px;

            &:first-child {
              margin-bottom: 10px;
            }

            .text {
              text-align: justify;
              text-align-last: justify;
              width: 80px;
              box-sizing: border-box;
              padding: 0 15px;
              background-color: #e9ecef;
              border-radius: 10px 0 0 10px;
            }

            .content {
              flex: 1;
              font-size: 12px;
              color: #333333;
              padding-left: 10px;
              text-align: left;
              overflow: hidden;
              white-space: nowrap;
            }
          }
        }
      }
    }

  }
 .filter-tree{
    color:cornflowerblue;
    font-size: 14px;
  }
</style>

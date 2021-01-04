<template>
  <div class="compile">
    <div class="compileHead">
      <h1>用户编辑</h1>
    </div>
    <el-form ref="addTreeFrom" :model="addItems" :rules="addItemsRules" label-width="100px" >
      <el-form-item label="用户姓名" prop="userName">
            <el-input v-model="addItems.userName"  maxlength="17" show-word-limit clearable :disabled="isBoole"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="userPhone">
            <el-input v-model="addItems.userPhone"  maxlength="11" show-word-limit clearable :disabled="isBoole"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="userPassword" v-if="!userId" >
            <el-input v-model="addItems.userPassword"   show-word-limit clearable show-password :disabled="isBoole"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="userNickName" >
            <el-input v-model="addItems.userNickName"  maxlength="17" show-word-limit clearable :disabled="isBoole"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="userSex">
            <el-radio v-model="addItems.userSex" label="0" :disabled="isBoole">男</el-radio>
            <el-radio v-model="addItems.userSex" label="1" :disabled="isBoole">女</el-radio>
        </el-form-item>
        <el-form-item label="归属机构" prop="userFrameworkId">
            <el-input v-model="addItems.userFrameworkName" readonly>
              <template slot="append">
                  <el-button type="primary" size="medium" @click="frameworkShow">选择机构</el-button>
              </template>
            </el-input>
        </el-form-item>
        <el-form-item label="角色" >
            <el-select v-model="value.value"  filterable placeholder="请选择角色" multiple>
              <el-option
                v-for="item in roleList"
                :key="item.roleId"
                :label="item.roleName"
                :value="item.roleId">
              </el-option>
            </el-select>
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
 import { selectRole,addRole,updateRole,selectRoleList} from '@/api/Role/Jurisdiction/role'
 import { selectFramework} from '@/api/Role/Jurisdiction/framework'
 import { getUser,roleList,userCreated,updateUserInfo} from '@/api/Role/Jurisdiction/user'
 import { isPhones,isPassword,isPathName} from "@/utils/validate";
 
 import sysManageRouter from '@/router/modules/sysManage'
  export default {
    data() {
       let validatePhone = (rule, value, callback) => {
          if (!isPhones(value)) {
          callback(new Error("请输入正确的手机号"));
        } else {
          callback();
        }
      };
       let validateName = (rule, value, callback) => {
          if (!isPathName(value)) {
          callback(new Error("只能中文，数字，英文且长度为2-17"));
        } else {
          callback();
        }
      };
       let validateisPassword = (rule, value, callback) => {
          if (!isPassword(value)) {
          callback(new Error("密码只能输入6-20个字母、数字、下划线"));
        } else {
          callback();
        }
      };
      return {
        addItemsRules:{
            userPhone:[
              {required: true, message: '请填写手机号', trigger: 'blue'},
              {validator: validatePhone, trigger: "blue"}
            ],
            userNickName:[
              {required: true, message: '请填写昵称', trigger: 'blue'},
              {validator: validateName, trigger: "blue"}
            ],
            userName:[
              {required: true, message: '请填写用户姓名', trigger: 'blue'},
              {validator: validateName, trigger: "blue"}
            ],
            userPassword:[
              {required: true, message: '请填写密码', trigger: 'blue'},
              {validator: validateisPassword, trigger: "blue"}

            ],
            userSex:[
              {required: true, message: '请填写性别', trigger: 'blue'}
            ],
            userFrameworkId:[
              {required: true, message: '请选择组织机构', trigger: 'blue'}
            ],
        },
        // 表单字段
        addItems:{
            userPhone:'',
            userNickName:'',
            userName:'',
            userPassword:'',
            userSex:"0",
            userFrameworkName:null,
            userFrameworkId:'',
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
        defaultProp: {
          children: 'items',
          label: 'directoryTreeName'
        },
        userId:'',
        roleList:[],
        value: {
          created:[],
          value:[],
        },
        roleIdList:[],
        addRoleList:[],
        removeRoleList:[],
      }
    },
    components: {
      
    },
    computed: {
      isBoole(){
        return this.userId ? true : false
      }
    },
    created() {
      this.search();
      this.userId = this.$route.query.userId
      if (this.userId) {
        this.getDetails(this.userId)
        let addItemsRules={
            userFrameworkId:[
              {required: true, message: '请选择组织机构', trigger: 'blue'}
            ],
        };
        this.addItemsRules=addItemsRules;
      }
      console.log(this.userId===null)
      
    },
    methods: {
        //初始数据获取
        async search(show){
          let params = {
            ids:111
          };
         await selectFramework(params).then(v=>{
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
            roleId:null
          };
          await selectRoleList(items).then( v=>{
            console.log(v)
            let roleIdList=[];
            let roleList=[];
            let data=v.data;
            if(data!=null){
              for (let i=0;i<data.length;i++){
                let role={
                  ...data[i]
                };
                roleList.push(role);
                let roleId=data[i].roleId;
                roleIdList.push(roleId)
              }
            }
            
            this.roleList=roleList;
            this.roleIdList=roleIdList;
            
          })
           .catch( err => {
            this.$message.error('服务器错误')
           })
           if(this.userId){
              this.getRokeDetails(this.userId);
            }
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
        //用户信息初始
        
        getDetails(userId){
          getUser(userId).then(v=>{
            this.addItems=v.data;
            if(v.data.userSex===0){
              this.addItems.userSex="0";
            }
            else{
              this.addItems.userSex="1";
            }
          })
           .catch( err => {
              this.$message.error('服务器错误')
            })
            // console.log(this.roleIdList)
        },
        //获取用户角色信息
        getRokeDetails(userId){
          let items={
              userId
            };
            roleList(items).then(v=>{
              // console.log(v)
              let value=[];
              let data=v.data;
              if(data!=null){
                for (let i=0;i<data.length;i++){
                  let roleId=data[i].userRoleRoleId;
                  if(this.roleIdList.indexOf(roleId)!=-1&&value.indexOf(roleId)===-1){
                    value.push(roleId)
                  }
                }
              }
              this.value.created=[...value];
              this.value.value=value;
            })
        },
        //组织机构取消
        noAddCanl(){
          this.isframework=false;
        },
        //组织机构确认
        AddCanl(){
          this.isframework=false;
          this.addItems.userFrameworkId=this.frameworkItems.frameworkId;
          this.addItems.userFrameworkName=this.frameworkItems.frameworkName;
        },
        //tree过滤
        filterNode(value, data) {
          if (!value) return true
          return data.label.indexOf(value) !== -1
        },
        // 提交
        async submitForm(formName) {
          this.$refs[formName].validate(async (valid) => {
            if (valid) {
              await this.roleChange();
              if (this.userId){
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
              userPhone:this.addItems.userPhone,
              userNickName:this.addItems.userNickName,
              userName:this.addItems.userName,
              userPassword:this.addItems.userPassword,
              userSex:this.addItems.userSex,
              userFrameworkId:this.addItems.userFrameworkId,
              userOwnershipSystemId:1,
              reqRole:{
                addRoleList:this.addRoleList,
                removeRoleList:this.removeRoleList
              }
          };
          userCreated(items).then(v=>{
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
          // console.log(this.value)
          let items={
            userId:this.userId,
            userFrameworkId:this.addItems.userFrameworkId,
            userOwnershipSystemId:1,
            reqRole:{
              addRoleList:this.addRoleList,
              removeRoleList:this.removeRoleList
            }
          };
          console.log(items)
          updateUserInfo(items).then(v=>{
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
        },
        //用户操作
        roleChange(){
           let value=this.value.value;
           let created=this.value.created;
            console.log("value",value);
            console.log("created",created);
            let add=[];
            let remove=[];
            let valueSize=value.length;
            let max=valueSize;
            let createdSize=created.length;
            if(max<createdSize)max=createdSize;
            for(let i=0;i<max;i++){
              if(valueSize>i&&created.indexOf(value[i])===-1){
                add.push(value[i]); 
              }
              if(createdSize>i&&value.indexOf(created[i])===-1){
                remove.push(created[i]);
              }
            }
            this.addRoleList=add;
            this.removeRoleList=remove;
            console.log("addRoleList",this.addRoleList);
            console.log("removeRoleList",this.removeRoleList);
        },
        //权限操作
        frameworkChange(date,node){
          // console.log("cs")
          // console.log(node);
          // console.log(date)
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

<template>
  <div class="compile">
    <div class="compileHead">
      <h1>角色编辑</h1>
    </div>
    <el-form ref="addTreeFrom" :model="addItems" label-width="80px" >
        <el-form-item label="角色名称" >
            <el-input v-model="addItems.roleName"  maxlength="17" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="归属机构" >
            <el-input v-model="addItems.frameworkName" readonly>
              <template slot="append">
                  <el-button type="primary" size="medium" @click="frameworkShow">选择机构</el-button>
              </template>
            </el-input>
        </el-form-item>
        <el-form-item label="排序" >
            <el-input v-model="addItems.sort"  ></el-input>
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
 import { selectRole} from '@/api/Role/Jurisdiction/role'
 import { selectFramework} from '@/api/Role/Jurisdiction/framework'
 import { selectJurisdictionTree} from '@/api/Role/Jurisdiction/jurisdiction'
  export default {
    data() {
      return {
        // 表单字段
        addItems:{
            roleName:null,
            sort:null,
            frameworkName:null,
            roleFrameworkId:null,
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
        frameworkShow(){
          this.isframework=true;
        },
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
        noAddCanl(){
          this.isframework=false;
        },
        AddCanl(){
          this.isframework=false;
          this.addItems.roleFrameworkId=this.frameworkItems.frameworkId;
          this.addItems.frameworkName=this.frameworkItems.frameworkName;
        },
        filterNode(value, data) {
          if (!value) return true
          return data.label.indexOf(value) !== -1
        },
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
        frameworkChange(date,node){
          // console.log("cs")
          // console.log(node);
          console.log(date)
          let directoryTreeIdItems=date.directoryTreeIdItems;
          if(node.checkedKeys.indexOf(date.directoryTreeId)===-1){
            console.log("取消")
            console.log(directoryTreeIdItems)
            // addJurisdictionList
            // removeJurisdictionList
          }
          else{
            console.log("选中")
          }
          
        },
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

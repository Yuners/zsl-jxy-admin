<template>
    <el-container style="border: 1px solid #eee">
      <div>
        <div>
          <el-steps :active="active" finish-status="success" style="width:250px">
            <el-step title="农"></el-step>
            <el-step title="林"></el-step>
            <el-step title="牧"></el-step>
            <el-step title="副"></el-step>
            <el-step title="🐟"></el-step>
          </el-steps>
        </div>
        <el-aside width="300px" style="background-color: rgb(238, 241, 246)" v-for="(item, index) in treesInfo" :key="index">
          <el-tree  v-if="item.type == active"
            ref="tree2"
            :props="props"
            :data="item.tree"
            show-checkbox
            default-expand-all
            node-key="dictionaryId"
            :default-checked-keys="item.checkedIdList"
            @check-change="(a,b,c)=>handleCheckChange(a,b,c,index)">
          </el-tree>
        </el-aside>

      </div>
      <el-container >
        <div>
          <div style="padding-left:200px; margin:8px;font-size:10px;color:red" v-if="active == 2">
          提示：（蛋、奶的单位为吨，其他为活物数量）
          </div>
          <el-form class="flex-item" ref="treeFrom" inline :model="form" label-width="120px" >
            <div>
              <div>
                <div>
                  <el-form-item  label="乡村名称" >
                    <!-- <el-input v-model="summary.villageName" disabled show-word-limit ></el-input> -->
                  </el-form-item>
                  <el-form-item  >
                    <el-input v-model="summary.villageName" disabled show-word-limit ></el-input>
                  </el-form-item>
                  <el-form-item  label="年份">
                    <!-- <el-input v-model="summary.economicsYear" disabled show-word-limit ></el-input> -->
                  </el-form-item>
                  <el-form-item >
                    <el-input v-model="summary.economicsYear" disabled show-word-limit ></el-input>
                  </el-form-item>
                </div>
              </div>
              <div v-for="(ti,i) in treesInfo" :key="i" class="flex-item">
                <div v-for="(item, index) in ti.showLIst" :key="index" >
                  <el-form-item  :label="item.addFlag==1?null:item.dictionaryName" v-if="ti.type == active">
                  </el-form-item>
                  <el-form-item v-if="(ti.type == 0 || ti.type == 1 || ti.type == 4)&&ti.type == active">
                    <el-input v-model.trim="item.economicsName" show-word-limit placeholder="请输入名称"></el-input>
                  </el-form-item>
                  <el-form-item v-if="(ti.type == 0 || ti.type == 1 || ti.type == 4)&&ti.type == active" >
                    <el-input-number style="width:145px" :precision="2" :step="0.1" controls-position="right" v-model.trim="item.economicsArea" show-word-limit placeholder="种植面积(亩)"></el-input-number>
                  </el-form-item>
                  <el-form-item v-if="ti.type == active">
                    <el-input-number v-model.trim="item.economicsNumber" style="width:145px" :precision="2" :step="0.1" controls-position="right" show-word-limit :placeholder="getPlaceholder(ti.type)"></el-input-number>
                  </el-form-item>  
                  <el-form-item v-if="ti.type == active && (ti.type == 0 || ti.type == 1 || ti.type == 4)" >
                    <el-button size="small" v-if="item.dictionaryName !=null && item.addFlag!=1 "  @click="addInfo(i,index,item)" >+</el-button>
                    <el-button size="small" v-if="item.dictionaryName ==null || item.addFlag==1"  @click="reduceInfo(i,index,item)">-</el-button>
                  </el-form-item>
                </div>
              </div>
            </div>
            <el-form-item style="width:100%;padding-left:200px">
              <el-button style="margin-top: 12px;" @click="last" v-if="active>0">上一步</el-button>
              <el-button style="margin-top: 12px;" @click="next" v-if="active<4">下一步</el-button>
              <el-button type="primary"  v-if="active == 4" @click="submitForm">保存</el-button>
              <el-button type="danger" @click="resetForm" v-if="active == 4" >取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-container>
    </el-container>
</template>

<script>
// import { selectDirectoryTree,updateDirectoryTree, addDirectoryTree,delectDirectoryTree} from '@/api/Role/Jurisdiction/directoryTree'
import { isPathName } from '@/utils/validate'
import { addEconomics, getEconomicsById, updateEconomics } from '@/api/infoMng/basics/economics'
import { getDictionaryAllByPCode } from '@/api/dictionary'
export default {

  data() {
    return {
      active: 0,
      listLoading: true, // 加载
      agricultureTree:[],//农
      forestTree:[], // 林
      pashtureTree:[], // 牧
      auxiliaryTree:[], //辅
      fishingTree:[], //渔
      treesInfo: [
        {type: 0, code: 'BASICS_AGRICULTURE', name: "农", tree:[], showLIst:[],checkedIdList:[] },
        {type: 1, code: 'BASICS_FOREST', name: "林", tree:[], showLIst:[],checkedIdList:[]},
        {type: 2, code: 'BASICS_PASTURE', name: "牧", tree:[], showLIst:[],checkedIdList:[]},
        {type: 3, code: 'BASICS_AUXILIARY', name: "辅", tree:[], showLIst:[],checkedIdList:[]},
        {type: 4, code: 'BASICS_FISHING', name: "渔", tree:[], showLIst:[],checkedIdList:[]}
      ],
      index:null,
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
        economicsYear:new Date().getFullYear(),
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
    next() {
      if (this.active++ > 5) this.active = 0;
    },
    last(){
      if (this.active-- > 5) this.active = 1;
    },
    init(){
      this.summaryId = this.$route.query.economicsSummaryId
    },
    //循环取树
    async handelTrees(){
      await this.treesInfo.forEach((v,i) => {
        this.getTrees(v.code, v.name,i)
        .then(vv => {
          v.tree = vv.tree
          v.showLIst = vv.showLIst
          v.checkedIdList = vv.checkedIdList
        })
      })
      console.info(this.treesInfo)
    },
    //取树
    async getTrees(code,name,i){
      let params = {
        dictionaryPcode: code,
      };
      let tree = []
      let showLIst = []
      let checkedIdList = []
      await getDictionaryAllByPCode(params).then(v=>{
        this.listLoading = false;
        let data = v.data.data
        tree = [{"dictionaryId":1, "dictionaryLevel":1, "dictionaryName":name, "item":data}]
        // 右边显示列处理
        if(this.summaryId == null){ // 全选默认值
          data.forEach(res => {
            // 在后台将月份与组织机构代码添加进去 economics_location_id
            showLIst.push(res)
            checkedIdList.push(res.dictionaryId)
          });
        }else{
          this.treesInfo[i].showLIst.forEach(res =>{
            showLIst.push(res)
            checkedIdList.push(res.dictionaryId)
          })
        }
        this.listLoading = false
      })
      .catch( err => {
        this.$message.error('服务器错误')
        this.listLoading = false;
      })
      
      let res = {
        tree,
        showLIst,
        checkedIdList
      }
      return res
    },
    async search(){
      if(this.summaryId != null){
        await this.getDetails(this.summaryId)
        .then(v => {
          console.info(v)
          this.summary.villageName = v.economicsVillageName
          this.summary.economicsYear = v.economicsYear

          this.treesInfo = v.treesInfolist
          console.info("1",this.treesInfo)
        })
        this.handelTrees()
        console.info("2",this.treesInfo)
      }else{
        this.handelTrees()
      }
      
    },
    //节点被点击时找到index
    nodeCheck(index){
      // console.info(a,b)
      console.info(index)
      this.index = index
    },
    //左侧树的处理
    //树点勾选事件
    handleCheckChange(data, checked, indeterminate, index) {//组件默认点击上级的选择框，默认循环处理该方法
      let _this = this.treesInfo[index]
      if(data.dictionaryLevel>1){// 为了不让一级数据加入到右面的显示中
        //如果是选中
        if(checked){
          console.info("选中")
         if(_this.checkedIdList.indexOf(data.dictionaryId)===-1){
            this.treesInfo[index].showLIst.push(data)
            this.treesInfo[index].showLIst.sort(function(a,b){
              return a.sort - b.sort;
            });
          this.treesInfo[index].checkedIdList.push(data.dictionaryId)
         }
        }else{//如果是解除选中
          console.info("解除")
          for(let i=0;i<_this.showLIst.length;i++){//右侧显示删除
            if(_this.showLIst[i].dictionaryId == data.dictionaryId){
              if(_this.showLIst[i].economicsNumber != '' && _this.showLIst[i].economicsNumber != null){ // 取消选中 去掉当前默认值
                this.treesInfo[index].showLIst[i].economicsNumber = null
              }
              this.treesInfo[index].showLIst.splice(i,1)
            }
          }
          for(let i=0;i<_this.checkedIdList.length;i++){//选中列表删除
            if(_this.checkedIdList[i] == data.dictionaryId){
              this.treesInfo[index].checkedIdList.splice(i,1)
            }
          }
        }
      }
      // console.info(this.checkedIdList)
      // this.index = null // 清空 下次再用
    },
    //树点击事件
    handleNodeClick(data) {
      console.log(data);
    },
    //获取相对应单位，及输入提示
    getPlaceholder(type){
      switch(type){
        case 0:
          return "单位产量(吨)"
        break;
        case 1:
          return "单位产量(棵)"
        break;
        case 2:
          return "销售数量"
        break;
        case 3:
          return "数量"
        break;
        case 4:
          return "单位产量(吨)"
        break;
      }
    },
    addInfo(treeIndex,showIndex,item){
      console.info(treeIndex,showIndex,item)
      this.treesInfo[treeIndex].showLIst.push({"economicsName":'',"economicsArea":null,"economicsNumber":null, "sort":item.sort, "dictionaryId":item.dictionaryId, "addFlag":1})
      this.treesInfo[treeIndex].showLIst.sort(function(a,b){
        return a.sort - b.sort;
      });
    },
    reduceInfo(treeIndex,showIndex,item){
      console.info(treeIndex,showIndex,item)
      this.treesInfo[treeIndex].showLIst.splice(showIndex,1)
    },
    // 获取乡村详情
    async getDetails(id) {
      let params = {
        economicsSummaryId: id
      }
      this.checkedIdList = [];
      this.showLIst=[];
      let resData = null
      await getEconomicsById(params)
      .then(res => {
        if (res.data.code == '1'){
          let data = res.data.data
          console.info(data)
          resData = data
        } else {
          this.$message.error(res.data.msg)
        }
      })
      .catch(err => {
        console.log(err)
      })
      return resData
    },
    //选中的元素，不能为空/null
    validateNullCheckout(){ //判断非空
      let flag = false
      try{
        this.treesInfo.forEach(v=>{
          let flag1 = false
          let flag2 = false
          if(v.type == 0 || v.type==1 || v.type == 4){
            flag1 = v.showLIst.some(vv => {
              return this.validateNull(vv.economicsArea)
            })
            flag2 = v.showLIst.some(vv => {
              return this.validateNull(vv.economicsName)
            })
          }
          let flag3 = v.showLIst.some(vv => {
            return this.validateNull(vv.economicsNumber)
          })
          if(flag1||flag2||flag3){
            flag = true
            throw Error("满足条件终止循环")
            
          }
        })
      }catch(err){
        console.log(err)
      }
      return flag
    },
    // 选中元素不能为null
    validateNull(number){
      if(!number){
        console.info(number)
        return true
      }else if(number == null || number =='' || number =='undefined'){
        console.info(number)
        
        return true
      }else return false
    },
    validateNumberCheckout(){
      let flag = false
      try{
        this.treesInfo.forEach(v=>{
          let flag1 = false
          if(v.type == 0 || v.type==1 || v.type == 4){
            flag1 = v.showLIst.some(v=>{
              return this.validataNumber(v.economicsArea)
            })
          }
          let flag2 = v.showLIst.some(v=>{
            return this.validataNumber(v.economicsNumber)
          })
          if(flag1||flag2){
            flag = true
            throw Error("满足条件终止循环")
            return;
          }
        })
      }catch(err){
        console.log(err)
      }
      return flag;
    },
    //请填写不小于零的数字,且小数点不可超过两位
    validataNumber(number){
      let flag = !new RegExp("^(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)$").test(number);
      return flag
    },
    validateCheckout(){
      let flag1 = this.validateNullCheckout()
      // if(flag1){
      //   return flag1
      // }
      // let flag2 = this.validataNumber()
      
      return flag1
    },
    // 提交 todo 需要获取所属地区码与村名
    submitForm(formName) {
      let flag = this.treesInfo.some(v=>{
        console.info(v.showLIst)
        return v.showLIst.length !=0
      })
      if(!flag){
        this.$message.error("至少要选一个大类填写")
        return;
      }
      console.info(this.validateCheckout())
      if(this.validateCheckout()){
          this.$message({
            message: '选中项不能为空,请填写不小于零的数字,且小数点不可超过两位,且小数点不可超过两位',
            type: 'error'
          })
        return;
      }
      if (this.summaryId){
        this.editSummary()
      }else {
        this.addSummary()
      }
    },
    // 发送新增请求
    addSummary() {
      let data = {
        treesInfolist:this.treesInfo,
        economicsYear:this.summary.economicsYear,
        economicsVillageName:this.summary.villageName
      };
      addEconomics(data)
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
      let data = {
        economicsSummaryId:this.summaryId,
        treesInfolist:this.treesInfo
      };
      // data.foodRelease = this.form.foodRelease ? '1' : '0'
      updateEconomics(data)
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

  .el-form--inline .el-form-item {
    width: 160px;
    display: inline-block;
    margin-right: 10px;
    vertical-align: top;
}
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
    justify-content: left;
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

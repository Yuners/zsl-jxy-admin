<template>
  <div class="compile">
    <div class="compileHead">
      <h1>活动编辑</h1>
    </div>
    <div class="compileMain">
      <el-form label-position="right" :model="form" :rules="rules" ref="ruleForm" label-width="110px">
        <div class="block">
          <div class="title">
            <h3>编辑特产活动</h3>
          </div>
          <el-form-item label="活动名称：" prop="activityName">
            <el-input maxlength="20" style="width: 350px" v-model="form.activityName"></el-input>
          </el-form-item>
          <el-form-item label="活动时间：" prop="activityTime" >
            <el-date-picker
              v-model="form.activityTime"
              type="daterange"
              align="right"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              @change="getTime">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="活动类型：" prop="activityType" >
            <el-radio v-model="form.activityType" :label="type.one">满减活动</el-radio>
            <el-radio v-model="form.activityType" :label="type.two" disabled>优惠券</el-radio>
            <el-radio v-model="form.activityType" :label="type.three" disabled>广告</el-radio>
          </el-form-item>
          <el-form-item label="优惠条件：" prop="activityDescribeList" >
            <div class="graphic">
              <el-button size="medium" @click="addGraphic">新增优惠规则</el-button>
              <span>(最多可添加5个层级)</span>
            </div>
            <el-table
              :data="form.activityDescribeList"
              border
              fit
              highlight-current-row
            >
              <el-table-column align="center" label="层级" width="95">
                <template slot-scope="scope">
                  {{ scope.$index + 1 }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="优惠门槛" >
                <template slot-scope="scope">
                  <span>满 </span>
                  <span class="sumMoney">{{ scope.row.describeTotal }}</span>
                  <span> 元</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="优惠方式" >
                <template slot-scope="scope">
                  <span>减现金 </span>
                  <span class="sumMoney"> {{ scope.row.describeDiscount }} </span>
                  <span> 元</span>
                </template>
              </el-table-column>
               <el-table-column
                align="center"
                label="操作"
                width="150"
              >
              <template slot-scope="scope">
                <el-button type="text" @click="dataEdit(scope.$index,scope.row)">编辑</el-button>
                <el-button type="text" @click="dataDelete(scope.$index)">删除</el-button>
              </template>
              </el-table-column>
              </el-table>
          </el-form-item>
          <el-form-item label="活动商品：" prop="specialetyList" >
            <el-select v-model="form.specialetyList"  reserve-keyword filterable placeholder="请选择商品" multiple @change='changeSelect' >
              <el-checkbox v-model="checked" @change='selectAll'>全选</el-checkbox>
              <el-option
                v-for="item in list"
                :key="item.specialtyId"
                :label="item.specialtyName"
                :value="item.specialtyId"
                >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <div style="display: flex;">
            <div class="switch_item">
              <span>发布：</span>
              <el-switch
                v-model="form.activityIsUp"
                active-color="#13ce66"
                inactive-color="#eeeeee"
                :active-value="max"
                :inactive-value="min">
              </el-switch>
            </div>
            <div class="handleSave">
              <el-button size="medium" type="primary" @click="submitForm('ruleForm')">保 存</el-button>
              <el-button size="medium" @click="resetForm('ruleForm')">取 消</el-button>
            </div>
            </div>
          </el-form-item>
        </div>
      </el-form>
      <el-dialog
        title="请添加优惠规则"
        :visible.sync="sumFalg"
        width="40%">
        <el-form label-position="right" :model="sum" :rules="sumRules" ref="sumForm" label-width="110px">
          <el-form-item label="优惠门槛：" prop="describeTotal">
            <el-input maxlength="20"  v-model="sum.describeTotal">
              <template slot="prepend">满</template>
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="优惠金额：" prop="describeDiscount">
            <el-input maxlength="20"  v-model="sum.describeDiscount">
              <template slot="prepend">优惠</template>
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="sumCanl">取 消</el-button>
            <el-button type="primary" @click="sumSub">确 定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <!-- <graphic :addShow="addShow" :graphicData="graphicData" @submit="bySaving" @close="cancel"></graphic>
    <specification :add-show="specifShow" :graphicData="specifData" @submit="saveSpecif" @close="cancelSpecif"></specification> -->
  </div>
</template>

<script>
import {getSpecialtyList} from "@/api/Releases/specialty";
import {getActivityById,updateActivity,addActivity} from "@/api/Operation/activity"
import { activityMoney } from "@/utils/validate"
  export default {
    data() {
      let validateMoney = (rule, value, callback) => {
        if (!activityMoney(value)) {
          callback(new Error("请输入0-99999之间的整数"));
        } else {
          callback();
        }
      };
      let validateMoneys = (rule, value, callback) => {
        if (!activityMoney(value)) {
          callback(new Error("请输入0-99999之间的整数"));
        } else {
          callback();
        }
      };
      let validateList = (rule, value, callback) => {
          if(value===null||value===undefined) callback(new Error("请选择至少一个商品"));
          else{
            if(value.length>1){
              callback();
            }
            else if(value.length===1){
              if(value[0]==='全选'){
                callback(new Error("权限不能作为商品"));
              }
              else{
                callback();
              }
            }
            else{
              callback(new Error("请选择至少一个商品"));
            }
          }
          
          // if (!isPhones(value)) {
           
          // } else {
          //   
          // }
      };
      return {
        
        // 表单字段
        form: {
          activityName: '', // 活动名称
          stateTime:'',//开始时间
          endTime:'',//开始时间
          activityTime:'',
          activityType:1,//活动类型
          specialetyList:[],//活动列表
          activityIsUp:1,
          activityDescribeList:[
          ],//优惠条件
        },
        sum:{
          describeTotal:null,
          describeDiscount:null,
        },
        sumRules:{
          describeTotal:[
            {required: true, message: '请填写优惠门槛', trigger: 'blur'},
            {validator: validateMoney, trigger: "blue"}
          ],
          describeDiscount:[
            {required: true, message: '请填写优惠金额', trigger: 'blur'},
            {validator: validateMoneys, trigger: "blue"}
          ]
        },
        sumFalg:false,
        // 表单验证
        rules: {
          activityName: [
            {required: true, message: '请填写特产名称', trigger: 'blur'}
          ],
          activityTime:[
             {required: true, message: '请选择活动时间', trigger: 'blur'}
          ],
          activityType:[
            {required: true, message: '请选择活动类型', trigger: 'blur'}
          ],
          specialetyList:[
            {required: true, message: '请选择至少一个商品', trigger: 'blur'},
            {validator: validateList, trigger: "blue"}
          ],
          activityDescribeList:[
            {required: true, message: '请至少添加一条优惠规则', trigger: 'blur'},
          ]
        },
        type:{
          one:1,
          two:2,
          three:3
        },
        list:[],//商品数据
         pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          },
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        checked:false,
        max:1,
        min:0,
        activityId:null
      }
    },
    components: {
        
    },
    created() {
      this.activityId = this.$route.query.activityId
      if (this.activityId) {
        this.getDetailsd(this.activityId)
      }
      this.getSpecialty();
    },
    
    methods: {
      editScenery(){
        let pages={
          ...this.form
        };
        updateActivity(pages)
        .then(res=>{
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
      //添加数据
      addScenery(){
        let pages={
          ...this.form
        };
        addActivity(pages)
        .then(res=>{
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
       // 取消优惠编辑
      resetForm(formName) {
        this.$router.back()
        // this.$refs[formName].resetFields();
      },
      //优惠条件删除
      dataDelete(index) {
        this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.form.activityDescribeList.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //优惠条件编辑
      dataEdit(index,data){
          let sum={
            id:index,
            describeTotal:data.describeTotal,
            describeDiscount:data.describeDiscount,
          };
          this.sum=sum;
          this.sumFalg=true;
        },
       //优惠条件确认
      sumSub(){
        this.$refs['sumForm'].validate((valid) => {
          if (valid) {
            if(!activityMoney(this.sum.describeTotal))this.$message.error('优惠门槛金额应为0-99999之间的整数');
            else if(!activityMoney(this.sum.describeDiscount))this.$message.error('优惠金额应为0-99999之间的整数');
            else if(parseInt(this.sum.describeDiscount)>parseInt(this.sum.describeTotal))this.$message.error('优惠金额不能大于优惠门槛金额');
            else{
              if(this.sum.id===null||this.sum.id===undefined){
                
                this.form.activityDescribeList.push(this.sum);
                this.$message.success('添加优惠规则成功');
              }
              else{
                this.$set(this.form.activityDescribeList, this.sum.id, this.sum);
                this.$message.success('编辑优惠规则成功');
              }
             
              this.sumFalg=false;
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //优惠条件取消
      sumCanl(){
        this.sumFalg=false;
      },
      //优惠条件唤起
      addGraphic(){
        if(this.form.activityDescribeList.length>=5){
            this.$message.error("优惠条件最多5条")
        }
        else{
          let sum={
            describeTotal:null,
            describeDiscount:null,
          };
          this.sum=sum;
          this.sumFalg=true;
        }
      },
      //全选操作
      selectAll() {
        this.form.specialetyList = []
        if (this.checked) {
          this.list.map((item) => {
            this.form.specialetyList.push(item.specialtyId)
          })
        } else {
          this.form.specialetyList = []
        }
      },
      // 提交
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.sceneryId){
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
      //全选状态值切换
      changeSelect(val) {
        if (val.length === this.list.length) {
          this.checked = true
        } else {
          this.checked = false
        }
      },
      //商品数据获取
      getSpecialty(){
        let param={
        };
        getSpecialtyList(param)
        .then(res=>{
          let data = res.data
            if (data.code == '1'){
              if (data.data.length){
                this.list = data.data
                console.log(this.list)
              }
            } else {
              this.$message.error(data.msg)
            }
        })
         .catch(err => {
            console.log(err)
          })
      },
      getDetailsd(id){
        let pages={
          activityId:id
        };
        getActivityById(pages)
        .then(res=>{
          console.log(res)
            if (res.data.code == '1'){
              let form ={
                ...res.data.data
              }
              form.stateTime=new Date(form.activityEndTime)
              form.endTime=new Date(form.activityStartTime)
              let time=[];
              time.push(form.activityStartTime);
              time.push(form.activityEndTime);
              form.activityTime=time;
              this.form=form;
            }
            else{
              this.$message.error(res.data.msg)
            }
        })
        .catch(err => {
            console.log(err)
          })
      },
      //开始结束时间解析
      getTime(maxDate){
        this.form.stateTime=maxDate[0];
        this.form.endTime=maxDate[1];
        console.log(this.form.activityTime)
        // console.log(maxDate)
        // console.log(this.form.activityStartTime)
        //  console.log(this.form.activityEndTime)
      },
     
     

     
      
     
    }
  }
</script>

<style scoped lang="scss">
.el-checkbox {
    text-align: right;
    width: 100%;
    padding-right: 10px;
  }
  .sumMoney{
    color:red;
    text-decoration :  underline 
  }
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
    .tooltip{
      margin-left: 30px;
      color: #999999;
    }
  }

</style>

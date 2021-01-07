<template>
  <div class="compile">
    <div class="compileHead">
      <h1>安全认证</h1>
    </div>
    <el-card class="box-card">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="修改手机号" name="phone">
          <div v-if="phoneData.show" style="width:100%;">
              <div style="width:60%; text-align: center;">
                <el-form  ref="phoneDataFrom" :rules="phoneDataRules" :model="phoneData" >
                  <el-form-item label="手机号" prop="phone">
                    <el-input v-model="phoneData.phone" >
                      <template slot="append">
                          <el-button  v-if="phoneData.time===0?true:false" icon="el-icon-arrow-right" type="primary" size="medium" @click="codeShowPhone" style="color:red"></el-button>
                          <el-button v-else type="primary" size="medium" style="color:red"> {{phoneData.time}}</el-button>
                      </template>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="验证码" prop="code">
                    <el-input v-model="phoneData.code" maxlength="6" minlength="6"></el-input>
                  </el-form-item>
                  <el-form-item >
                     <el-button  type="primary" @click="updatePhoneDate('phoneDataFrom')">修改手机号</el-button>
                  </el-form-item>
                </el-form>
              </div>
          </div>
          <div v-else style="height:200px;margin-top:100px ;text-align: center;">
             <el-button size="medium" type="warning" :disabled="user.userId===null?true:false" @click="answerShow(1)">安全认证</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="修改密码" name="password">
          <div v-if="passwordData.show">
              <div style="width:60%; text-align: center;">
                <el-form  ref="passwordDataFrom" :rules="passwordDataRules" :model="passwordData" >
                  <el-form-item label="新密码" prop="password">
                    <el-input v-model="passwordData.password" show-password>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="重复密码" prop="newPassword">
                    <el-input v-model="passwordData.newPassword" show-password></el-input>
                  </el-form-item>
                  <el-form-item >
                     <el-button  type="primary" @click="updatePasswordDate('passwordDataFrom')">修改密码</el-button>
                  </el-form-item>
                </el-form>
              </div>
          </div>
          <div v-else style="height:200px;margin-top:100px ;text-align: center;">
             <el-button size="medium" type="warning" :disabled="user.userId===null?true:false" @click="answerShow(2)">安全认证</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="修改密保" name="question">
          <div v-if="questionData.show">
              <div style="width:60%; text-align: center;">
                <el-form  ref="questionDataFrom" :rules="questionDataRules" :model="questionData" >
                  <el-form-item label="密保问题" prop="securityQuestion">
                    <el-select v-model="questionData.securityQuestion" placeholder="请选择">
                      <el-option
                        v-for="item in securityQuestionList"
                        :key="item.securityQuestionId"
                        :label="item.securityQuestion"
                        :value="item.securityQuestionId">
                      </el-option>
                    </el-select>
                    <!-- <el-input v-model="questionData.securityQuestion" >
                    </el-input> -->
                  </el-form-item>
                  <el-form-item label="密保答案" prop="securityAnswer">
                    <el-input v-model="questionData.securityAnswer" ></el-input>
                  </el-form-item>
                  <el-form-item >
                     <el-button  type="primary" @click="updateQuestionDate('questionDataFrom')">修改密保</el-button>
                  </el-form-item>
                </el-form>
              </div>
          </div>
          <div v-else style="height:200px;margin-top:100px ;text-align: center;">
             <el-button size="medium" type="warning" :disabled="user.userId===null?true:false" @click="answerShow(3)">安全认证</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
      <el-dialog
        title="安全认证"
        :visible.sync="isAnswer"
        width="60%"
      >
      <div style="height:250px">
          <el-row >
            <el-col :span="6">
              <div style="height:250px;border-right-style: solid;border-right-color: #cccccc;float:left;">
                <el-row >
                  <el-col :span="24">
                    <el-button icon="el-icon-phone" type="warning" style="width:100%" :plain="secret.createdType===1?false:true" @click="createdType(1)">手机号认证</el-button>
                  </el-col>
                  <el-col :span="24">
                    <el-button icon="el-icon-lock" type="warning" style="width:100%;margin-top: 2px;" :plain="secret.createdType===2?false:true" @click="createdType(2)">密码认证</el-button>
                  </el-col>
                  <el-col :span="24">
                    <el-button icon="el-icon-help" v-if="user.userSecurityQuestionId===null?false:true" type="warning" style="width:100%;margin-top: 2px;" :plain="secret.createdType===3?false:true" @click="createdType(3)">密保认证</el-button>
                    <!-- <el-button icon="el-icon-help" type="warning" style="width:100%;margin-top: 2px;" :plain="secret.createdType===3?false:true" @click="createdType(3)">密保认证</el-button> -->
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="18">
              <div class="grid-content bg-purple">
                <el-form v-if="secret.createdType===1?true:false" ref="secretOneFrom" :rules="secretOneRules" :model="secret" >
                  <el-form-item label="手机号">
                    <el-input v-model="secret.phone" disabled>
                      <template slot="append">
                          <el-button  v-if="time===0?true:false" icon="el-icon-arrow-right" type="primary" size="medium" @click="codeShow" style="color:red"></el-button>
                          <el-button v-else type="primary" size="medium" style="color:red"> {{time}}</el-button>
                      </template>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="验证码" prop="code">
                    <el-input v-model="secret.code" maxlength="6" minlength="6"></el-input>
                  </el-form-item>
                </el-form>
                <el-form v-else-if="secret.createdType===2?true:false" ref="secretFromTwo" :rules="secretTwoRules" :model="secret">
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="secret.password" show-password ></el-input>
                    </el-form-item>
                </el-form>
                <el-form v-else-if="secret.createdType===3?true:false" ref="secretFromThree" :rules="secretThreeRules" :model="secret" >
                  <el-form-item label="密保问题">
                    <el-input v-model="user.userSecurityQuestionName" disabled>
                    </el-input>
                 
                  </el-form-item>
                  <el-form-item label="密保答案" prop="answer">
                    <el-input v-model="secret.answer" ></el-input>
                  </el-form-item>
                </el-form>
                <div style="text-align: center;">
                  <el-button size="medium" type="warning"  @click="getSecret" >安全认证</el-button>
                </div>
              </div>
            </el-col>
          </el-row>
      </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import {getUser,postSecret,updatePassword,updatePhone,updateSecurity} from '@/api/Role/Platform/user'
import { selectListSecurityQuestion}from '@/api/Role/Platform/securityQuestion'
import {getSmsCode} from '@/api/SmsApi'
import {isCode,isPassword,isPhones,isSecurityQuestion} from '@/utils/validate'
  export default {
    data() {
      let validatePassword = (rule, value, callback) => {
          if (!isPassword(value)) {
          callback(new Error("密码只能输入6-20个字母、数字、下划线"));
        } else {
          callback();
        }
      };
       let validateCode = (rule, value, callback) => {
          if (!isCode(value)) {
          callback(new Error("请输入正确的验证码"));
        } else {
          callback();
        }
      };
      let validatePhone = (rule, value, callback) => {
          if (!isPhones(value)) {
          callback(new Error("请输入正确的手机号"));
        } else {
          callback();
        }
      };
      let validateSecurityQuestion = (rule, value, callback) => {
          if (!isSecurityQuestion(value)) {
          callback(new Error("不符合行政编码要求,行政编码为12位数字"));
        } else {
          callback();
        }
      };
      
      return {
        activeName: 'phone',
        phoneData:{
          show:false,
          secret:null,
          phone:null,
          code:null,
          smsSecret:null,
          time:0,
          interval:null,
        },
        passwordData:{
          show:false,
          secret:null,
          password:null,
          newPassword:null,
        },
        questionData:{
          show:false,
          secret:null,
          securityQuestion:null,
          securityAnswer:null,
        },
        user:{

        },
        secretOneRules:{
            code:[
              {required: true, message: '请填写验证码', trigger: 'blue'},
              {validator: validateCode, trigger: "blue"}
            ],
        },
        secretTwoRules:{
            password:[
              {required: true, message: '请填写密码', trigger: 'blue'},
              {validator: validatePassword, trigger: "blue"}
            ],
        },
        secretThreeRules:{
          answer:[
            {required: true, message: '请输入密保答案', trigger: 'blue'},
            {validator: validateSecurityQuestion, trigger: "blue"}
          ]
        },
        passwordDataRules:{
          password:[
            {required: true, message: '请填写密码', trigger: 'blue'},
            {validator: validatePassword, trigger: "blue"}
          ],
          newPassword:[
              {required: true, message: '请填写密码', trigger: 'blue'},
              {validator: validatePassword, trigger: "blue"}
           ],
        },
        phoneDataRules:{
            phone:[
              {required: true, message: '请填写手机号', trigger: 'blue'},
              {validator: validatePhone, trigger: "blue"}
            ],
            code:[
              {required: true, message: '请填写验证码', trigger: 'blue'},
              {validator: validateCode, trigger: "blue"}
            ],
        },
        questionDataRules:{
            securityQuestion:[
              {required: true, message: '请选择密保问题', trigger: 'blue'},
            ],
            securityAnswer:[
              {required: true, message: '请输入密保答案', trigger: 'blue'},
              {validator: validateSecurityQuestion, trigger: "blue"}
            ],
        },
        secret:{
          createdType:null,//获取密钥方式：1手机验证，2密码验证，3密保问题验证
          useType:null,//密钥使用方式：1修改手机，2修改密码，3修改密保
          phone:null,//手机号码 获取方式 1,2,3 必填
          smsSecret:null,//短信密钥 获取方式 1 必填
          code:null,//短信验证码 获取方式 1 必填
          password:null,//密码 获取方式 2 必填
          question:null,//密保问题序号 获取方式 3 必填
          answer:null,//密保问题答案
        },
        isAnswer:false,
        time:0,
        interval:null,
        securityQuestionList:[],
      }
    },
    components: {
      
    },
    created() {
      
      this.search();
      this.getSecurityQuestion();
    },
    methods: {
      //修改密保
      updateQuestionDate(formName){
          this.$refs[formName].validate(async (valid) => {
            if (valid) {
              if(this.questionData.securityQuestion===null||this.questionData.securityQuestion===''||this.questionData.securityQuestion===undefined){
                this.$message.error('请选择密保问题');
                return false;
              }
              else if(this.questionData.securityAnswer===null||this.questionData.securityAnswer===''||this.questionData.securityAnswer===undefined){
                this.$message.error('请输入密保答案');
                return false;
              }
              else if(!isSecurityQuestion(this.questionData.securityAnswer)){
                 this.$message.error('只能中文，数字，英文且长度为2-20');
                 return false;
              }
              else{
                
                let items={
                  ...this.questionData
                }
                updateSecurity(items).then(v=>{
                  // console.log(v)
                  let questionData={
                    show:false,
                    secret:null,
                    securityQuestion:null,
                    securityAnswer:null,
                  };
                  this.questionData=questionData;
                  this.$message({
                    type: 'success',
                    message: '修改密保成功!'
                  });  
                  this.search();
                  
                })
                .catch( err => {
                  this.$message.error('服务器错误')
                  let questionData={
                    show:false,
                    secret:null,
                    securityQuestion:null,
                    securityAnswer:null,
                  };
                   this.questionData=questionData;
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


      //修改密码
        updatePasswordDate(formName){
          this.$refs[formName].validate(async (valid) => {
            if (valid) {
              if (this.passwordData.password===null||this.passwordData.password===''||this.passwordData.password===undefined) {
                this.$message.error('请输入密码');
                return false;
              }
              else if(!isPassword(this.passwordData.password)){
                  this.$message.error('密码只能输入6-20个字母、数字、下划线');
                  return false;
              }
              else if(this.passwordData.password!=this.passwordData.newPassword){
                  this.$message.error('两次密码请保持一致');
                  return false;
              }
              else{
                let items={
                  ...this.passwordData
                }
                updatePassword(items).then(v=>{
                  // console.log(v)
                  let passwordData={
                    show:false,
                    secret:null,
                    password:null,
                    newPassword:null,
                  };
                  this.passwordData=passwordData;
                  this.$message({
                    type: 'success',
                    message: '修改密码成功!'
                  });  
                  this.search();
                  
                })
                .catch( err => {
                  this.$message.error('服务器错误')
                  let passwordData={
                    show:false,
                    secret:null,
                    password:null,
                    newPassword:null,
                  };
                  this.passwordData=passwordData;
                })
              }
            }
            else{
              
              console.log('error submit!!');
              return false;
            }
          })
        },
        //修改手机号
        updatePhoneDate(formName){
          this.$refs[formName].validate(async (valid) => {
            if (valid) {
              if (this.phoneData.phone===null||this.phoneData.phone===''||this.phoneData.phone===undefined) {
                this.$message.error('请输入手机号');
                return false;
              }
              else if(!isPhones(this.phoneData.phone)){
                this.$message.error("请输入正确的手机号")
                return false;
              }
              else if(this.phoneData.code===null||this.phoneData.code===''||this.phoneData.code===undefined)
              {
                this.$message.error('请输入验证码');
                return false;
              }
              else if(!isCode(this.phoneData.code)){
                this.$message.error('请输入正确的验证码');
                return false;
              }
              else{
                let items={
                  ...this.phoneData
                }
                updatePhone(items).then(v=>{
                  let phoneData={
                    show:false,
                    secret:null,
                    phone:null,
                    code:null,
                    smsSecret:null,
                    time:0,
                    interval:null,
                  };
                  this.phoneData=phoneData;
                  this.search();
                  this.$message({
                    type: 'success',
                    message: '修改手机号成功!'
                  });  
                })
                .catch( err => {
                  this.$message.error('服务器错误')
                  let phoneData={
                    show:false,
                    secret:null,
                    phone:null,
                    code:null,
                    smsSecret:null,
                    time:0,
                    interval:null,
                  };
                  this.phoneData=phoneData;
                })
              }
            } 
            else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        //获取安全密钥
        getSecret(){
          if (this.secret.phone===null||this.secret.phone===''||this.secret.phone===undefined) {
              this.$message.error('请输入手机');
           }
           else if(this.secret.createdType===1){
              if(this.secret.smsSecret===null||this.secret.smsSecret===''||this.secret.smsSecret===undefined){
                   this.$message.error('请先获取验证码'); 
              }
              else {
                this.$refs['secretOneFrom'].validate(async (valid) => {
                  if (valid) {
                    if(this.secret.code===null||this.secret.code===''||this.secret.code===undefined)
                    {
                      this.$message.error('请输入验证码');
                      return false;
                    }
                    else if(!isCode(this.secret.code)){
                      this.$message.error('请输入正确的验证码');
                      return false;
                    }
                    else{
                       this.sendPost();
                    }
                  
                  } else {
                    console.log('error submit!!');
                    return false;
                  }
                });
                  
              }
           }
           else if(this.secret.createdType===2){
            
               this.$refs['secretFromTwo'].validate(async (valid) => {
                  if (valid) {
                    if(this.secret.password===null||this.secret.password===''||this.secret.password===undefined){
                        this.$message.error('请先输入密码');
                        return false;
                    }
                    else if(!isPassword(this.secret.password)){
                        this.$message.error('密码只能输入6-20个字母、数字、下划线');
                        return false;
                    }
                    else{
                       this.sendPost();
                    }
                  
                  } else {
                    console.log('error submit!!');
                    return false;
                  }
                });
             
              
           }
           else{
              
              this.$refs['secretFromThree'].validate(async (valid) => {
                  if (valid) {
                    if(this.user.userSecurityQuestionId===null||this.user.userSecurityQuestionId===''||this.user.userSecurityQuestionId===undefined){
                        this.$message.error('您还没有设置密保,请先设置');
                        return false;
                    }
                    else if(this.secret.answer===null||this.secret.answer===''||this.secret.answer===undefined){
                        this.$message.error('请先输入密保答案');
                        return false;
                    }
                    else if(!isSecurityQuestion(this.secret.answer)){
                        this.$message.error('密保答案只能中文，数字，英文且长度为2-20');
                         return false;
                    }
                    else{
                      this.secret.question=this.user.userSecurityQuestionId;
                       this.sendPost();
                    }
                  
                  } else {
                    console.log('error submit!!');
                    return false;
                  }
                });
           }
        },
        //发送请求，保存密钥
        sendPost(){
            let items={
              ...this.secret
            };
            postSecret(items).then(v=>{
              if(items.useType===1){
                this.phoneData.show=true;
                this.phoneData.secret=v.data.secret;
              }
              else if(items.useType===2){
                this.passwordData.show=true;
                this.passwordData.secret=v.data.secret;
              }
              else{
                this.questionData.show=true;
                this.questionData.secret=v.data.secret;
              }
              console.log(v);
              this.isAnswer=false;
            })
        },
        //安全验证码到计时
        count(){
          
          if(this.time>0){
            this.time--;
          }
          if(this.time===0&&this.interval!=null){
            
             clearInterval(this.interval);
             this.interval = null
          }
         },
         //手机验证码到计时
         countPhone(){
          
          if(this.phoneData.time>0){
            this.phoneData.time--;
          }
          if(this.phoneData.time===0&&this.phoneData.interval!=null){
            
             clearInterval(this.phoneData.interval);
             this.phoneData.interval = null
          }
         },
         //发送手机验证码
        codeShowPhone(){
          if (this.phoneData.phone===null||this.phoneData.phone===''||this.phoneData.phone===undefined) {
              this.$message.error('请输入手机号');
           }
           else if(!isPhones(this.phoneData.phone)){
             this.$message.error("请输入正确的手机号")
           }
           else{
              let items={
                phone:this.phoneData.phone,
                codeType:5,
              };
              console.log(items)
              getSmsCode(items).then(v=>{
                  console.log(v)
                  this.phoneData.time = 60;
                  this.countPhone();
                  this.phoneData.interval = setInterval(this.countPhone, 1000);
                  this.phoneData.smsSecret=v.data.smsSecret;
                  
              })
              .catch( err => {
                this.$message.error('服务器错误')
              })
           }
        },
         //发送安全验证码
        codeShow(){
           if (this.secret.phone===null||this.secret.phone===''||this.secret.phone===undefined) {
              this.$message.error('请输入手机');
           }
           else{
             let items={
               phone:this.secret.phone,
               codeType:this.secret.useType,
             };
             console.log(items)
             getSmsCode(items).then(v=>{
                console.log(v)
                this.time = 60;
                this.count();
                this.interval = setInterval(this.count, 1000);
                this.secret.smsSecret=v.data.smsSecret;
             })
             .catch( err => {
                this.$message.error('服务器错误')
             })
               
           }
          
        },
        //安全认证初始化
        answerShow(index){
          let item={
            createdType:1,//获取密钥方式：1手机验证，2密码验证，3密保问题验证
            useType:index,//密钥使用方式：1修改手机，2修改密码，3修改密保
            phone:this.user.userPhone,//手机号码 获取方式 1,2,3 必填
            smsSecret:null,//短信密钥 获取方式 1 必填
            code:null,//短信验证码 获取方式 1 必填
            password:null,//密码 获取方式 2 必填
            question:null,//密保问题序号 获取方式 3 必填
            answer:null,//密保问题答案
          };
          this.secret=item;
          this.isAnswer=true;
        },
        //更换认证方式
        createdType(index){
          this.secret.createdType=index;
        },
        //密保数据获取
        getSecurityQuestion(){
          selectListSecurityQuestion().then(v=>{
            // console.log(v)
            this.securityQuestionList=v.data;
            if(this.securityQuestionList!=null&&this.securityQuestionList.length>0){
              this.questionData.securityQuestion=this.securityQuestionList[0].securityQuestionId;
            }
          })
          .catch( err => {
            this.$message.error('服务器错误')
          })
        },
        //初始数据获取
        search(){
          getUser().then(res=>{
            
              this.user=res.data;
              console.log(res.data);
              
          })
          .catch( err => {
           this.$message.error('服务器错误')
          })
        },
        handleClick(tab, event) {
          
        }
    }
  }
</script>

<style scoped lang="scss">
  .compile {
    height: 100%;
    border: 1px solid #EBEEF5;
    position: relative;
    // border-style:solid;

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

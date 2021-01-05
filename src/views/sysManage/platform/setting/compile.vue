<template>
  <div class="compile">
    <div class="compileHead">
      <h1>个人资料编辑</h1>
    </div>
    <el-card class="box-card">
      <div style="text-align: center;" >
        <div style="display: flex;widht:200px;">
           <el-image :src="value.user.userPhoto" style="border-radius: 50%;height:150px;width:150px;" ></el-image>
            <el-upload
              ref="fileRef"
              action
              :accept="selectType"
              :auto-upload="true"
              :limit="1"
              :http-request="imagesUpload"
              :on-exceed="handleExceed"
              :before-upload="beforeAvatarUpload"
              :file-list="fileList"
              :show-file-list="false"
              style="padding-top: 130px;"
            >
                <el-button slot="trigger" size="small" type="success" icon="el-icon-camera" circle ></el-button>
            </el-upload>
        </div>
      </div>
      <el-form ref="userFrom" :model="value.user" style="top:10px;">
        <el-form-item label="角色：" >
              <el-input :value="value.role.map(v=>v.userRoleRoleName).join(', ')"   show-word-limit clearable disabled></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="11">
              <el-form-item label="用户昵称：" prop="userNickName">
                <el-input maxlength="17"  v-model="value.user.userNickName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11" :push="2">
              <el-form-item label="用户姓名：" prop="userName">
                <el-input maxlength="17"  v-model="value.user.userName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="手机号：" >
                <el-input   v-model="value.user.userPhone" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11" :push="2">
              <el-form-item label="组织机构：" >
                <el-input   v-model="value.user.userFrameworkName" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="性别：" prop="userSex">
                <el-select v-model="value.user.userSex" placeholder="请选择" style="width:100%">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11" :push="2">
              <el-form-item label="生日：" >
                <el-date-picker
                  v-model="value.user.userBirthday"
                  type="date"
                  placeholder="选择生日"
                  style="width:100%">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form>
              <div class="handleSave">
                  <el-button size="medium" type="warning" @click="submitForm('userFrom')" :disabled="value.user.userId===null?true:false">修改资料</el-button>
              </div>
          </el-form>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {getUser} from '@/api/Role/Platform/user'
import {roleList,updateUserInfo} from '@/api/Role/Jurisdiction/user'
import { isPathName} from "@/utils/validate";
import FileApi from "@/api/FileApi";
  export default {
    data() {
      let validateName = (rule, value, callback) => {
          if (!isPathName(value)) {
          callback(new Error("只能中文，数字，英文且长度为2-17"));
        } else {
          callback();
        }
      };
      return {
        addItemsRules:{
           userNickName:[
              {required: true, message: '请填写昵称', trigger: 'blue'},
              {validator: validateName, trigger: "blue"}
            ],
            userName:[
              {required: true, message: '请填写用户姓名', trigger: 'blue'},
              {validator: validateName, trigger: "blue"}
            ],
            userSex:[
              {required: true, message: '请填写性别', trigger: 'blue'}
            ],
        },
        value:{
          user:{

          },
          role:[],
        },
        options: [{
          value: 0,
          label: '男'
        }, {
          value: 1,
          label: '女'
        }],
        fileList:[],
      }
    },
    components: {
      
    },
    created() {
      this.search();
     
    },
    computed: {
      selectType(){
        return '.jpg,.jpeg,.png,.gif'
      },
    },
    methods: {
        errorHandler() {
          return true
        },
        //初始数据获取
        search(){
          getUser().then(res=>{
            
              this.value.user=res.data;
              this.getRoleDate(res.data.userId);
          })
          .catch( err => {
            this.$message.error(err)
           })
        },
        handleExceed(files, fileList) {
          console.log(files);
          console.log(fileList)
          console.log(this.fileList)
          this.$message({
            message: "只能上传1张图片",
            type: "warning",
          });
        },
        //初始化角色信息
        getRoleDate(userId){
            let items={
              userId
            };
            roleList(items).then(v=>{
              // console.log(v)
              // let roleName='';
              this.value.role=v.data;
            })
            .catch( err => {
              this.$message.error(err)
            })
        },
        submitForm(formName){
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$confirm(`是否确认修改用户信息`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              })
              .then( () => {
                let items={
                  userId:this.value.user.userId,
                  userNickName:this.value.user.userNickName,
                  userName:this.value.user.userName,
                  userPhoto:this.value.user.userPhoto,
                  userSex:this.value.user.userSex,
                  userBirthday:this.value.user.userBirthday,
                };
                console.log(items)
                updateUserInfo(items).then(res=>{
                   this.$message({
                      type: 'success',
                      message: '修改成功!'
                    });  
                })
                .catch( err => {
                  this.$message.error(err)
                })
              })
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        }, 
        imagesUpload(param){
          FileApi.uploadImage(param).then(res => {
              if (res.data) {
                let data = res.data;
                this.value.user.userPhoto=data.url;
                console.log(this.fileList)
                console.log(data);
                this.$refs.fileRef.clearFiles();
              }
          })
          .catch(err => {
              console.log(err)
          })
        },
        beforeAvatarUpload(file){
          let isJPG;
          let fileType = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
          if (fileType.indexOf(file.type) >= 0) {
            isJPG = true;
          } else {
            isJPG = false;
          }
          const isLt2M = file.size / 1024 / 1024 < 2;
          if (!isJPG) {
            this.$message.error("请上传图片文件!");
          } else if (!isLt2M) {
            this.$message.error("上传图片大小不能超过 2MB!");
          }
          return isJPG && isLt2M;
        }
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
    .feature {
        display: flex;
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
  .uploadPhone{
    height: 10px;
    width: 10px;
  }
</style>

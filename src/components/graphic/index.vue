<template>
  <div class="addGraphic">
    <div class="addMain" ref="addMain">
      <el-form :model="graphic" :rules="graphicRules" ref="graphicForm" label-width="110px" class="demo-ruleForm">
        <el-form-item label="上传图片：" prop="fileList">
          <div class="is-flex">
            <ul class="upTime" v-show="graphic.fileList.length && graphic.fileList">
              <transition-group name="slide-fade">
                <li
                  class="upLoad-item"
                  v-for="(item,
													index) in graphic.fileList"
                  :key="item.fileUrl"
                >
                  <img
                    :src="item.fileUrl"
                    alt=""
                  />
                  <span class="masked">
														<span
                              class="maskedDelet"
                              @click="
																handleRemove(
																	index
																)
															"
                            >
															<i
                                class="el-icon-delete"
                              ></i>
														</span>
													</span>
                </li>
              </transition-group>
            </ul>
            <el-upload
              action
              accept=".jpg,.jpeg,.png,.gif"
              list-type="picture-card"
              :auto-upload="true"
              :limit="3"
              v-if="graphic.fileList.length < 3"
              :multiple="true"
              :http-request="imagesUpload"
              :on-exceed="handleExceed"
              :before-upload="beforeAvatarUpload"
              :file-list="graphic.fileList"
              :show-file-list="false"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item label="文字描述：" prop="describeContent">
          <el-input
            type="textarea"
            v-model="graphic.describeContent"
            maxlength="500"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="medium" type="primary" @click="bySaving()">保 存</el-button>
          <el-button size="medium" @click="cancel()">取 消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
    import FileApi from "@/api/FileApi";

    export default {
      data() {
        return {
          // 图文详情
          graphic: {
            fileList: [],
            describeContent: ''
          },
          graphicRules: {
            fileList: [
              {required: true, message: '请上传图片', trigger: 'blur'}
            ],
            describeContent: [
              {required: true, message: '请填写文字描述', trigger: 'blur'}
            ]
          },
        }
      },
      props:{
        graphicData:{
          type: Object,
          default:{}
        }
      },
      created() {
        if (this.graphicData.data){
          this.graphic = this.graphicData.data
        }
      },
      methods: {

        // 移除图片
        handleRemove(inx) {
          console.log(inx)
          this.graphic.fileList.splice(inx, 1)
        },
        //上传图片超出3个时
        handleExceed(files, fileList) {
          this.$message({
            message: "只能上传3张图片",
            type: "warning",
          });
          // this.disabledShow = true
        },
        //上传图片前判断
        beforeAvatarUpload(file) {
          let haha = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
          let isJPG;
          if (haha.indexOf(file.type) >= 0) {
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
        },
        // 上传图片
        imagesUpload(param) {
          console.log(param)
          FileApi.uploadImage(param)
            .then(res => {
              if (res.data) {
                let data = res.data
                let params = {
                  fileHeight: data.height, // 图片高度
                  fileLable: data.ext, // 图片标签
                  fileName: data.name, // 附件名称
                  fileOldName: data.name, // 文件原名称
                  fileType: "image/jpeg", // 文件类型（图片、视频）
                  fileUrl: data.url, // 文件url
                  fileWidth: data.width // 图片宽度
                }
                this.graphic.fileList.push(params)
                console.log(this.graphic)
              } else {
                this.$message.error('上传失败')
              }
            })
            .catch(err => {
              console.log(err)
            })
        },

        // 提交
        bySaving() {
          this.$refs.graphicForm.validate((valid) => {
            if (valid) {
              let data = JSON.parse(JSON.stringify(this.graphic))
              this.$emit('submit',data)
              this.$refs.graphicForm.resetFields();
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },


        // 取消图文详情添加
        cancel() {
          this.$emit('close')
          this.$refs.graphicForm.resetFields();
        },
      }
    }
</script>

<style scoped lang="scss">

  .addGraphic {
    width: 100%;
    height: calc(100% - 60px);
    position: absolute;
    top: 60px;
    left: 0;
    padding: 0 70px;
    background-color: rgba(0, 0, 0, .2);
    z-index: 99;

    .addMain {
      background-color: #ffffff;
      padding: 70px;
      margin-top: 150px;

      .is-flex {
        display: flex;

        .upTime {
          padding: 0;
          margin: 0;

          span {
            display: flex;
            justify-content: flex-start;
          }

          .upLoad-item {
            position: relative;
            font-size: 14px;
            color: #606266;
            line-height: 1.8;
            overflow: hidden;
            background-color: #fff;
            border: 1px solid #c0ccda;
            border-radius: 6px;
            box-sizing: border-box;
            width: 148px;
            height: 148px;
            margin: 0 8px 8px 0;
            display: flex;
            align-items: center;
            justify-content: center;

            img {
              width: 100%;
              /*height: 100%;*/
            }

            .masked {
              position: absolute;
              width: 100%;
              height: 100%;
              left: 0;
              top: 0;
              cursor: default;
              text-align: center;
              color: #fff;
              opacity: 0;
              font-size: 20px;
              background-color: rgba(0, 0, 0, 0.5);
              transition: opacity 0.3s;

              &:hover {
                opacity: 1;
              }

              .maskedDelet {
                position: absolute;
                top: 50%;
                margin-top: -11px;
                left: 50%;
                margin-left: -10px;
                font-size: inherit;

                i {
                  cursor: pointer;
                }
              }
            }
          }
        }
      }

    }
  }


  .slide-fade-enter-active {
    transition: all 1s ease;
  }

  .slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */
  {
    transform: translateY(-10px);
    opacity: 0;
  }
</style>

<template>
  <div class="is-flex">
    <template v-if="uploadType == 'image'">
      <ul class="upTime" v-show="fileList.length && fileList">
        <transition-group name="slide-fade">
          <li
            class="upLoad-item"
            v-for="(item, index) in fileList"
            :key="item.fileUrl"
          >
            <img
              :src="item.fileUrl"
              alt=""
            />
            <span class="masked" v-if="!disabled">
              <span
                class="maskedDelet"
                @click="handleRemove(index)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </li>
        </transition-group>
      </ul>
    </template>
    <template v-if="uploadType == 'video'">
      <div
        class="loading"
        v-show="loading"
        v-loading="loading"
        element-loading-text="上传中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      ></div>
      <ul class="upTime" v-show="fileList.length && fileList">
<!--        <transition-group name="slide-fade">-->
          <li
            class="upLoad-item"
            v-for="(item, index) in fileList"
            :key="item.url"
          >
            <video
              width="148px"
              height="148px"
              :src="item.url"
            >
              您的浏览器不支持 video 标签。
            </video>
            <span class="masked" v-if="!disabled">
              <span
                class="maskedDelet"
                @click="handleRemove(index)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </li>
<!--        </transition-group>-->
      </ul>
    </template>
    <el-upload
      action
      :accept="selectType"
      list-type="picture-card"
      :auto-upload="true"
      :limit="limit"
      v-if="fileShow && !loading && !disabled"
      :multiple="true"
      :http-request="imagesUpload"
      :on-exceed="handleExceed"
      :before-upload="beforeAvatarUpload"
      :file-list="fileList"
      :show-file-list="false"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
  </div>
</template>

<script>
  import FileApi from "@/api/FileApi";

  export default {
    props:{
      uploadType:{
        type: String,
        default: 'image'
      },
      fileList: {
        type: Array,
        default: []
      },
      limit: {
        type: Number,
        default: 3
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      selectType(){
        if(this.uploadType == 'image'){
          return '.jpg,.jpeg,.png,.gif'
        } else if (this.uploadType == 'video') {
          return '.mp4,.flv'
        }
      },
      fileShow(){
          return this.fileList.length < this.limit
      }
    },
    data() {
      return {
        loading:false
      }
    },
    methods: {
      // 移除图片
      handleRemove(inx) {
        // this.fileList.splice(inx, 1)
        this.$emit('deleteImage', inx)
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
        if ( this.uploadType == 'image'){
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
        } else if ( this.uploadType == 'video' ) {
          let isJPG;
          let fileType = ["video/mp4", "video/flv"];
          if (fileType.indexOf(file.type) >= 0) {
            isJPG = true;
          } else {
            isJPG = false;
          }
          const isLt2M = file.size / 1024 / 1024 < 150;
          if (!isJPG) {
            this.$message.error("请上传视频文件!");
          } else if (!isLt2M) {
            this.$message.error("上传视频大小不能超过 150MB!");
          }
          return isJPG && isLt2M;
        }
      },
      // 上传图片
      imagesUpload(param) {
        if (this.uploadType == 'image') {
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
                // this.fileList.push(params)
                this.$emit('succeed', params)
              } else {
                this.$message.error('上传失败')
              }
            })
            .catch(err => {
              console.log(err)
            })
        } else if ( this.uploadType == 'video' ) {
          this.loading = true
          FileApi.uploadVideo(param)
            .then( res => {
              if (res.data) {
                let data = res.data
                let params = {
                  fileLable: data.ext, // 图片标签
                  fileName: data.name, // 附件名称
                  fileOldName: data.name, // 文件原名称
                  fileType: "video/mp4", // 文件类型（图片、视频）
                  fileUrl: data.url, // 文件url
                }
                this.$emit('succeed', params)
              } else {
                this.$message.error('上传失败')
              }
              this.loading = false
            })
        }
      },

    }
  }
</script>

<style scoped lang="scss">

  .is-flex {
    display: flex;

    .loading{
      width: 148px;
      height: 148px;
    }

    .upTime {
      padding: 0;
      margin: 0;
      display: flex;

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

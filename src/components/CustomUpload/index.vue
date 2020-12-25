<template>
  <div class="is-flex">
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
          <span class="masked">
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
    <el-upload
      action
      accept=".jpg,.jpeg,.png,.gif"
      list-type="picture-card"
      :auto-upload="true"
      :limit="3"
      v-if="fileList.length < 3"
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
    data() {
      return {
        fileList:[]
      }
    },
    methods: {
      // 移除图片
      handleRemove(inx) {
        console.log(inx)
        this.fileList.splice(inx, 1)
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
              this.fileList.push(params)
              console.log(this.fileList)
            } else {
              this.$message.error('上传失败')
            }
          })
          .catch(err => {
            console.log(err)
          })
      },

    }
  }
</script>

<style scoped>

</style>

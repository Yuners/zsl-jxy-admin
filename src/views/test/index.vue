<template>
  <el-upload
    action=""
    list-type="picture-card"
    :auto-upload="true"
    :http-request="testUpload"
    :on-preview="handlePictureCardPreview">
    <i class="el-icon-plus"></i>
  </el-upload>
</template>

<script>
  import FileApi from "@/api/FileApi"

    export default {
        name: "index",

      methods:{
        testUpload(param){
          console.log(param)
          FileApi.uploadImage(param)
            .then( res => {
              console.log(res)
            })
            .catch( err => {
              console.log(err)
            })
        },
        handlePictureCardPreview(file){
          console.log(file)
        },
      }
    }
</script>

<style scoped>

</style>

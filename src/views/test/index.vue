<template>
  <div>
    <CustomUpload @succeed="test" @deleteImage="deleteImage"></CustomUpload>
  </div>
</template>

<script>
  import CustomUpload from '@/components/CustomUpload'
    export default {
      data(){
        return{
          fileList:[]
        }
      },
      components:{
        CustomUpload
      },
      methods: {
        test(data){
          this.fileList.push(data)
        },
        deleteImage(index){
          console.log(index)
          this.fileList.splice(index, 1)
        }
      }
    }
</script>

<style scoped>

</style>

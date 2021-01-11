<template>
  <div class="imageDetails">
    <el-dialog
      title="图文详情"
      :visible.sync="centerDialogVisible"
      width="50%"
      >
      <div class="content" v-if="imageData">
        <div class="imageList">
          <el-image class="imageItem" v-for="url in imageData.fileList" :key="url.fileUrl" :src="url.fileUrl"></el-image>
        </div>
        <div class="describe">
          <span>{{ imageData.describeContent }}</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        centerDialogVisible: false,
        imageData: ''
      }
    },
    methods:{
      open(data){
        this.imageData = data
        this.centerDialogVisible = true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .content{

    .imageList{
      display: flex;
      flex-direction: column;
      align-items: center;

      .imageItem{
        width: 300px;
        margin-bottom: 30px;
      }

      .describe{
        font-size: 16px;
        color: #333333;
      }
    }
  }
</style>

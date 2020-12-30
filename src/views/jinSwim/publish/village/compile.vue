<template>
  <div class="compile">
    <div class="compileHead">
      <h1>简介编辑</h1>
    </div>
    <div class="compileMain">
      <div class="file-block">
        <div class="block-title">
          上传宣传片
        </div>
        <div class="block-main">
          <el-radio-group @change="handle" style="display: flex" v-model="form.villagePropagandaType">
            <div class="item">
              <span class="block_icon el-icon-video-camera-solid"></span>
              <el-radio label="视频">视频</el-radio>
            </div>
            <div class="item">
              <span class="block_icon el-icon-picture"></span>
              <el-radio label="图片">图片</el-radio>
            </div>
            <!--<div class="item">
              <span class="block_icon el-icon-picture-outline-round"></span>
              <el-radio label="全景图">全景图</el-radio>
            </div>-->
          </el-radio-group>
          <div class="hint">
            上传说明：视频、图片、全景图任选其一作为宣传片。其中视频大小不超过150M，最好为mp4格式。
            如果上传图片，则不少于10张，总大小不超过100M，最好为jpg格式。<br>
            如果切换其他类型将会清除源文件！！！！
          </div>
          <div class="uploadItem">
            <template v-if="form.villagePropagandaType == '视频'">
              <CustomUpload :fileList="form.villageDescribeList" uploadType="video" @succeed="videoSucce" @deleteImage="videoImage"></CustomUpload>
            </template>
            <template v-if="form.villagePropagandaType == '图片'">
              <CustomUpload :fileList="form.villageDescribeList" @succeed="imageSucce" @deleteImage="deleteImage"></CustomUpload>
            </template>
          </div>
        </div>
      </div>
      <div class="textIntroduction">
        <div class="block-title">
          文字简介
        </div>
        <div class="richText">
          <tinymce v-model="form.villageIntroduction" :height="300" />
        </div>
      </div>
      <div class="submitButton" style="display: flex;">
        <div class="switch_item">
          <span>发布：</span>
          <el-switch
            v-model="form.sceneryRelease"
            active-color="#13ce66"
            inactive-color="#eeeeee">
          </el-switch>
        </div>
        <div class="handleSave">
          <el-button size="medium" type="primary" @click="submitForm">保 存</el-button>
          <el-button size="medium" @click="resetForm">取 消</el-button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import { updateVillage, getVillageDetails } from '@/api/Releases/village'
  import CustomUpload from '@/components/CustomUpload'
  import Tinymce from '@/components/Tinymce'

    export default {
      data(){
        return {
          form:{
            villagePropagandaType: '视频',
            villageDescribeList:[],
            villageIntroduction: '<p><span style="monospace;">XX村<br />xx省xx市xx县xx镇xx村<br /><br />xx村，位于xx省xx县境西南部xx公里处，东南连东西掌村，西北接附城镇新庄村，包括1个行政村，4个自然村。有居民xx人，xx户，耕地xx亩，非农户xx户。......<br /><br />地理环境<br /><br />xx村山川并茂，地貌独特。山区有丰富的xx资源，贮藏区域达xx平方公里。xx国道，xx公路横穿而过，地下水资源充足。<br /><br />人口<br /><br />xx年末全市常住人口xx万人，比上年末减少xx万人。其中，城镇人口xx万人，占常住人口的比重为xx%；常住外来人口xx万人，占常住人口的比重为xx%。常住人口出生率xx&permil;，死亡率xx&permil;，自然增长率xx&permil;。常住人口密度为每平方公里xx人，比上年末减少xx人。<br /><br />风景名胜<br /><br />xx纪念馆<br />xx纪念馆位于xx，是为了纪念xx。<br />xx庙/寺<br />xx庙位于xx，由xx兴建。<br /><br />著名人物<br /><br />张三（xx年&mdash;xx年）<br />三国时期著名军事家，著有《xxx》。<br />李四（xx年&mdash;）<br />xx省xx市局长，市委书记。<br /><br />荣誉称号<br /><br />xxxx年荣获xx发布的&ldquo;十大美丽乡村&rdquo;。<br />xxxx年被xx设立为&ldquo;全国重点镇&rdquo;。</span></p>',
            villageRelease: false
          },
          villageId:''
        }
      },
      components:{
        CustomUpload,
        Tinymce
      },
      created() {
        this.villageId = this.$route.query.villageId
        if (this.villageId) {
          this.getDetails(this.villageId)
        }
      },
      methods: {
        // 获取乡村详情
        getDetails(id) {
          let params = {
            villageId: id
          }
          getVillageDetails(params)
            .then(res => {
              if (res.data.code == '1'){
                let data = res.data.data
                data.villageRelease = data.villageRelease ? true : false
                let formData = JSON.parse(JSON.stringify(data))
                for (let key in this.form) {
                  if (formData[key] != null){
                    this.form[key] = formData[key]
                  }
                }
              } else {
                this.$message.error(res.data.msg)
              }
            })
            .catch(err => {
              console.log(err)
            })
        },
        // 提交
        submitForm() {
          if (!this.form.villageDescribeList.length) {
            this.$message.error('请上传文件')
            return
          } else {
            this.alterData()
          }
        },
        alterData(){
          let data = JSON.parse(JSON.stringify(this.form))
          data.villageRelease = this.form.villageRelease ? '1' : '0'
          data.villageId = this.villageId
          updateVillage(data)
            .then(res => {
              if (res.data.code == '1'){
                this.$message.success(res.data.msg)
                setTimeout(() => {
                  this.$router.back()
                },500)
              }else {
                this.$message.error(res.data.msg)
              }
            })
            .catch(err => {
              console.log(err)
            })
        },
        // 取消
        resetForm() {
          this.$router.back()
        },
        handle(){
          this.form.villageDescribeList = []
        },
        //图片上传成功回调
        imageSucce(data){
          this.form.villageDescribeList.push(data)
        },
        //图片删除成功回调
        deleteImage(index){
          this.form.villageDescribeList.splice(index, 1)
        },
        //视频上传成功回调
        videoSucce(data){
          console.log(data)
          this.form.villageDescribeList.push(data)
        },
        //视频删除成功回调
        videoImage(index){
          console.log(index)
          this.form.villageDescribeList.splice(index, 1)
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

    .compileMain {
      padding: 50px;

      .file-block{
        .block-title{
          font-size: 30px;
          font-weight: bold;
        }

        .block-main{
          padding-left: 100px;
          margin-top: 20px;

          .hint{
            font-size: 14px;
            color: #999999;
            padding: 30px;
          }
          .item{
            display: flex;
            align-items: center;
            padding-left: 30px;

            .block_icon{
              font-size: 30px;
              margin-right: 15px;
            }
          }
          .uploadItem{
            padding-left: 30px;
          }
        }
      }

      .textIntroduction{
        padding-top: 30px;
        .block-title{
          font-size: 30px;
          font-weight: bold;
        }

        .richText{
          padding-left: 100px;
          margin-top: 20px;
        }
      }

      .submitButton{
        align-items: center;
        padding-top: 30px;
      }
      .handleSave {
        flex: 1;
        text-align: center;
      }
    }

  }

</style>

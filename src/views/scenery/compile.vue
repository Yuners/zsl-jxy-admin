<template>
    <div class="compile">
      <div class="compileHead">
        <h1>风景编辑</h1>
      </div>
      <div class="compileMain">
        <el-form label-position="right" :model="form" :rules="rules" ref="ruleForm" label-width="110px">
          <div class="block">
            <div class="title">
              <h3>编辑景区</h3>
            </div>
            <el-form-item label="选择分类：" prop="sceneryType">
              <el-radio-group v-model="form.sceneryType">
                <el-radio v-for="item in classifyList" :label="item" />
              </el-radio-group>
            </el-form-item>
            <el-form-item label="景区名称：" prop="sceneryName">
              <el-input style="width: 350px" v-model="form.sceneryName"></el-input>
            </el-form-item>
            <div class="clearfix feature">
                <el-form-item label="特色一：" prop="sceneryLabelOne">
                  <el-input style="width: 350px" v-model="form.sceneryLabelOne"></el-input>
                </el-form-item>
                <div style="width: 100px"></div>
                <el-form-item label="特色二：" prop="sceneryLabelTwo">
                  <el-input style="width: 350px" v-model="form.sceneryLabelTwo"></el-input>
                </el-form-item>
            </div>
          </div>
          <div class="block">
            <div class="title">
              <h3>用户须知</h3>
            </div>
            <el-form-item label="电话：" prop="sceneryPhone">
              <el-input type="number" style="width: 350px" v-model.number="form.sceneryPhone"></el-input>
            </el-form-item>
            <el-form-item label="营业时间：" prop="sceneryBusinesshours">
              <el-input style="width: 350px" v-model="form.sceneryBusinesshours"></el-input>
            </el-form-item>
            <el-form-item label="价格说明：" prop="sceneryPrice">
              <el-input style="width: 350px" v-model="form.sceneryPrice"></el-input>
            </el-form-item>
            <el-form-item label="温馨提示：" prop="sceneryReminder">
              <el-input type="textarea" v-model="form.sceneryReminder"></el-input>
            </el-form-item>
          </div>
          <div class="block">
            <div class="title">
              <h3>交通攻略</h3>
            </div>
            <el-form-item label="自助游：" prop="sceneryIndependenttravel">
              <el-input type="textarea" v-model="form.sceneryIndependenttravel"></el-input>
            </el-form-item>
            <el-form-item label="自驾游：" prop="sceneryRoadtrip">
              <el-input type="textarea" v-model="form.sceneryRoadtrip"></el-input>
            </el-form-item>
            <el-form-item label="地图标注：" prop="sceneryCoordinate">
              <div id="map"></div>
            </el-form-item>
          </div>
          <div class="block">
            <div class="title">
              <h3>设施包含</h3>
            </div>
            <el-form-item prop="sceneryFacilities">
              <el-checkbox-group v-model="form.sceneryFacilities">
                <el-checkbox label="停车位" name="type"></el-checkbox>
                <el-checkbox label="公厕" name="type"></el-checkbox>
                <el-checkbox label="便利店" name="type"></el-checkbox>
                <el-checkbox label="渔具" name="type"></el-checkbox>
                <el-checkbox label="采摘工具" name="type"></el-checkbox>
                <el-checkbox label="烧烤工具" name="type"></el-checkbox>
                <el-checkbox label="农具" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </div>
          <div class="block">
            <div class="title">
              <h3>图文详情</h3>
            </div>
            <el-form-item prop="graphicDetails">
              <div class="graphic">
                <span>*</span>
                <el-button size="medium" @click="addGraphic">添加详情</el-button>
              </div>
              <el-table
                :data="form.graphicDetails"
                border
                fit
                highlight-current-row
              >
                <el-table-column align="center" label="序号" width="95">
                  <template slot-scope="scope">
                    {{ scope.$index + 1 }}
                  </template>
                </el-table-column>
                <el-table-column label="图片" align="center">
                  <template slot-scope="scope">
                    <el-image
                      v-for="item in scope.row.images"
                      style="width: 50px; height: 50px"
                      :src="item"
                      :fit="'cover'"/>
                  </template>
                </el-table-column>
                <el-table-column label="文字描述" align="center">
                  <template slot-scope="scope">
                    {{ scope.row.text }}
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  label="操作"
                  width="150"
                >
                  <template slot-scope="scope">
                    <el-button type="text">编辑</el-button>
                    <el-button type="text">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
          </div>
          <el-form-item>
            <el-switch
              v-model="form.sceneryRelease"
              active-color="#13ce66"
              inactive-color="#eeeeee">
            </el-switch>
            <el-button size="medium" type="primary" @click="submitForm('ruleForm')">保 存</el-button>
            <el-button size="medium" @click="resetForm('ruleForm')">取 消</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="addGraphic" v-show="addShow">
        <div class="addMain" ref="addMain">
          <el-form :model="graphic" :rules="graphicRules" ref="graphicForm" label-width="110px" class="demo-ruleForm">
            <el-form-item label="上传图片：" prop="images">
              <el-upload
                action="#"
                list-type="picture-card"
                :auto-upload="false"
                :on-preview="handlePictureCardPreview">
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="文字描述：" prop="text">
              <el-input type="textarea" v-model="graphic.text"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button size="medium" type="primary" @click="submitForm('graphicForm')">保 存</el-button>
              <el-button size="medium" @click="cancel">取 消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
</template>

<script>
  import { MapLoader } from '@/utils/AMap.js'
  import { isMobile } from '@/utils/validate'
  import { addScenery } from '@/api/Releases'

    export default {
      data() {
        let validatePhone = (rule, value, callback) => {
          if (!isMobile(value)) {
            callback(new Error("请输入正确的手机号"));
          } else {
            callback();
          }
        };
        return {
          // 表单字段
          form:{
            sceneryType: '', // 选择分类
            sceneryName: '', // 景区名称
            sceneryLabelOne: '', // 特色一
            sceneryLabelTwo: '', // 特色二
            sceneryPhone: '', // 电话
            sceneryBusinesshours: '', // 营业时间
            sceneryPrice: '', // 价格说明
            sceneryReminder: '', // 温馨提示
            sceneryIndependenttravel: '', // 自助游
            sceneryRoadtrip: '', // 自驾游
            sceneryCoordinate: {}, // 地图经纬
            sceneryFacilities: [], // 包含设施
            graphicDetails: [], // 图文详情
            sceneryRelease: false
          },
          // 表单验证
          rules: {
            sceneryType: [
              { required: true, message: '请选择分类', trigger: 'blur' }
            ],
            sceneryName: [
              { required: true, message: '请填写景区名称', trigger: 'blur' }
            ],
            sceneryLabelOne: [
              { required: true, message: '请填写特色', trigger: 'blur' }
            ],
            sceneryPhone: [
              { required: true, message: '请输入电话', trigger: 'blur' },
              { validator: validatePhone, trigger: "blur" }
            ],
            sceneryBusinesshours: [
              { required: true, message: '请填写营业时间', trigger: 'blur' }
            ],
            sceneryPrice: [
              { required: true, message: '请填写价格说明', trigger: 'blur' }
            ],
            /*graphicDetails: [
              { required: true, message: '请至少添加一个图文详情', trigger: 'change' }
            ],*/
          },
          // 图文详情
          graphic:{
            images:[],
            text:''
          },
          graphicRules:{
            images: [
              { required: true, message: '请上传图片', trigger: 'blur' }
            ],
            text: [
              { required: true, message: '请填写文字描述', trigger: 'blur' }
            ]
          },
          classifyList:['自然风景', '人文景观', '采摘', '垂钓', '烧烤', '亲子', '露营', '体验农活'],
          addShow:false,
        }
      },
      mounted() {
        this.init()

        console.log(this.$message('123'))
      },
      methods: {
        // 调用地图
        init(){
          let _this = this
          MapLoader().then( AMap => {
            let map = new AMap.Map('map'); // 注册地图
            // 获取当前位置
            map.plugin('AMap.Geolocation', function () {
              let geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                maximumAge: 0,           //定位结果缓存0毫秒，默认：0
                convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                showButton: true,        //显示定位按钮，默认：true
                buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
                buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
                showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
                panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
                zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
              });
              map.addControl(geolocation);
              geolocation.getCurrentPosition(function(status,result){
                console.log(status)
                if(status == 'complete'){
                  console.log(result)
                }else{
                  console.log(result)
                }
              });
              // AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
              // AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
            });
            // 绑定地图点击事件
            map.on('click',(e) => {
              let data = {
                lng: e.lnglat.getLng(),
                lat: e.lnglat.getLat()
              }
              _this.form.sceneryCoordinate = data
            })
          })
        },
        // 提交
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              console.log(this.form)
              this.addScenery()
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        // 转换类型
        jsonToString(a){
          return JSON.stringify(a)
        },
        // 发送请求
        addScenery(){
          let data = JSON.parse(JSON.stringify(this.form))
          data.graphicDetails = this.jsonToString(this.form.graphicDetails)
          data.sceneryCoordinate = this.jsonToString(this.form.sceneryCoordinate)
          data.sceneryFacilities = this.jsonToString(this.form.sceneryFacilities)
          data.sceneryRelease = this.form.sceneryRelease ? '1' : '0'
          addScenery(data)
            .then( res => {
              console.log(res)
            })
            .catch( err => {
              console.log(err)
            })
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        addGraphic(){
          this.addShow = true
          this.$nextTick(() => {
            window.scrollTo(0, 170)
          })
        },
        cancel(){
          this.addShow = false
        },
        handlePictureCardPreview(file){
          console.log(file)
        },

      }
    }
</script>

<style scoped lang="scss">
  .compile{
    height: 100%;
    border: 1px solid #EBEEF5;
    position: relative;

    .compileHead{
      width: 100%;
      height: 60px;
      border-bottom: 1px solid #EBEEF5;
      line-height: 60px;
      background-color: #eeeeee;

      h1{
        font-size: 24px;
        padding-left: 20px;
      }
    }

    .compileMain{
      padding: 50px;

      .feature{
        display: flex;
      }

      .graphic{
        display: flex;
        align-items: center;
        margin-bottom: 30px;

        span{
          margin-right: 4px;
          font-size: 16px;
          color: #F56C6C;
        }
      }

      #map{
        width: 300px;
        height: 300px;
      }
    }

    .addGraphic{
      width: 100%;
      height: calc(100% - 60px);
      position: absolute;
      top: 60px;
      left: 0;
      padding: 0 70px;
      background-color: rgba(0, 0, 0, .2);
      z-index: 9999;

      .addMain{
        background-color: #ffffff;
        padding: 70px;
        margin-top: 150px;
      }
    }
  }

</style>

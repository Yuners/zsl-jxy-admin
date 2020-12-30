<template>
  <div class="compile">
    <div class="compileHead">
      <h1>乡村编辑</h1>
    </div>
    <div class="compileMain">
      <el-form label-position="right" :model="form" :rules="rules" ref="ruleForm" label-width="110px">
        <div class="block">
          <div class="clearfix feature">
            <el-form-item label="乡村名称：" prop="villageName">
              <el-input maxlength="10" style="width: 350px" v-model="form.villageName"></el-input>
            </el-form-item>
            <div style="width: 100px"></div>
            <el-form-item label="电话区号：" prop="villagePhone">
              <el-input maxlength="10" style="width: 350px" v-model="form.villagePhone"></el-input>
            </el-form-item>
          </div>
          <div class="clearfix feature">
            <el-form-item label="乡村别名：" prop="villageNikeName">
              <el-input maxlength="10" style="width: 350px" v-model="form.villageNikeName"></el-input>
            </el-form-item>
            <div style="width: 100px"></div>
            <el-form-item label="邮政编码：" prop="villagePostCode">
              <el-input maxlength="10" style="width: 350px" v-model="form.villagePostCode"></el-input>
            </el-form-item>
          </div>
          <div class="clearfix feature">
            <el-form-item label="所属地区：" prop="villageLocationId">
              <el-input maxlength="10" style="width: 350px" v-model="form.villageLocationName" disabled placeholder="xx省xx市xx县/区xx镇/乡"></el-input>
            </el-form-item>
            <div style="width: 100px"></div>
            <el-form-item label="主要特产：" prop="villageMainSpecialty">
              <el-input maxlength="10" style="width: 350px" v-model="form.villageMainSpecialty"></el-input>
            </el-form-item>
          </div>
          <div class="clearfix feature">
            <el-form-item label="面积：" prop="villageArea">
              <el-input maxlength="10" style="width: 350px" v-model="form.villageArea" placeholder="平方公里"></el-input>
            </el-form-item>
            <div style="width: 100px"></div>
            <el-form-item label="气温：" prop="villageAverageTemperature">
              <el-input maxlength="10" style="width: 350px" v-model="form.villageAverageTemperature" placeholder="年平均气温℃"></el-input>
            </el-form-item>
          </div>
          <div class="clearfix feature">
            <el-form-item label="下辖村：" prop="villageJurisdiction">
              <el-input maxlength="10" style="width: 350px" v-model="form.villageJurisdiction" placeholder="下辖自然村组"></el-input>
            </el-form-item>
            <div style="width: 100px"></div>
            <el-form-item label="年降水量：" prop="villagePrecipitation">
              <el-input maxlength="10" style="width: 350px" v-model="form.villagePrecipitation" placeholder="毫米"></el-input>
            </el-form-item>
          </div>
          <div class="clearfix feature">
            <el-form-item label="方言：" prop="villageDialect">
              <el-input maxlength="10" style="width: 350px" v-model="form.villageDialect"></el-input>
            </el-form-item>
            <div style="width: 100px"></div>
            <el-form-item label="海拔：" prop="villageAltitude">
              <el-input maxlength="10" style="width: 350px" v-model="form.villageAltitude" placeholder="千米"></el-input>
            </el-form-item>
          </div>
          <div class="clearfix feature">
            <el-form-item label="地理状况：" prop="villageGeography">
              <el-input maxlength="10" style="width: 350px" v-model="form.villageGeography"></el-input>
            </el-form-item>
            <div style="width: 100px"></div>
            <el-form-item label="年份：" prop="villageYear">
              <el-input maxlength="10" style="width: 350px" v-model="form.villageYear" disabled></el-input>
            </el-form-item>
            <!-- <div class="container">
              <el-form-item label="年份："  prop="villageYear">
                <div class="block">
                  <el-date-picker
                    style="width: 350px"
                    v-model="form.villageYear"
                    type="year"
                    @change="test"
                    value-format='yyyy'
                    placeholder="选择年份">
                  </el-date-picker>
                </div>
              </el-form-item>
            </div> -->
          </div>
        </div>
        <div class="block">
          <el-form-item label="地图标注：" prop="villageCoordinate">
            <div class="mark">
              <el-button type="primary" size="medium" @click="openMap">选择地点</el-button>
              <div class="markMain">
                <div class="item">
                  <div class="text">
                    经纬度
                  </div>
                  <div class="content">
                    {{ form.villageCoordinate ? form.villageCoordinate.lng + ',' + form.villageCoordinate.lat : '' }}
                  </div>
                </div>
                <div class="item">
                  <div class="text">
                    地址
                  </div>
                  <div class="content">
                    {{ lnglatCache.address }}
                  </div>
                </div>
              </div>
            </div>
            <el-dialog
              title="请点击地图"
              :visible.sync="mapShow"
              width="30%">
              <div id="map"></div>
              <span slot="footer" class="dialog-footer">
                <div class="main">
                  <div class="item">
                    <div class="text">
                      经纬度
                    </div>
                    <div class="content">
                      {{ lnglat }}
                    </div>
                  </div>
                  <div class="item">
                    <div class="text">
                      地址
                    </div>
                    <div class="content">
                      {{ site }}
                    </div>
                  </div>
                </div>
                <div>
                  <el-button @click="mapCanl">取 消</el-button>
                  <el-button type="primary" @click="mapSub">确 定</el-button>
                </div>
              </span>
            </el-dialog>
            <!--            <div id="map"></div>-->
          </el-form-item>
        </div>
        <el-form-item>
          <div style="display: flex;">
            <div class="handleSave">
              <el-button size="medium" type="primary" @click="submitForm('ruleForm')">保 存</el-button>
              <el-button size="medium" @click="resetForm('ruleForm')">取 消</el-button>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </div>

    <graphic :addShow="addShow" :graphicData="graphicData" @submit="bySaving" @close="cancel"></graphic>
  </div>
</template>

<script>
  import { MapLoader } from '@/utils/AMap.js'
  import { isAllNumber } from '@/utils/validate'
  import { addVillage, updateVillage, getVillageById } from '@/api/infoMng/basics/vallage'
  import { getPcca } from '@/api/common'
  import Graphic from '@/components/graphic/index'

  export default {
    props: {
      params: {
        type: Object
      }
    },
    data() {
      let validatePhone = (rule, value, callback) => {
        if (!isAllNumber(value) || value.length!=4) {
          callback(new Error("请输入正确的电话区号(四位)"));
        } else {
          callback();
        }
      };
      let validateCode = (rule, value, callback) => {
        if (!isAllNumber(value) || value.length!=6) {
          callback(new Error("请输入正确的电话区号(6位)"));
        } else {
          callback();
        }
      };
      return {
        // 表单字段
        form: {
          villageName: '', // 乡村名称
          villageLocationId: '', // 乡村所属行政区划id
          villageNikeName: '', // 乡村别名
          villageCoordinate: '', // 乡村坐标
          villageArea: '', // 面积
          villageJurisdiction: '', // 下辖自然村组
          villageDialect: '', // 方言
          villagePhone: '', // 电话
          villagePostCode: '', // 邮政编码
          villageMainSpecialty: '', // 主要特产
          villageGeography: '', // 地理状况
          villageAverageTemperature: '', // 年平均气温
          villagePrecipitation: '', // 年降水量
          villageAltitude: '', // 海拔
          foodRelease: false,
          villageYear:null, // 记录年份
          villageLocationName:'',
        },
        // 表单验证
        rules: {
          villageName: [
            {required: true, message: '此选项为必选', trigger: 'blur'}
          ],
          villageLocationId: [
            {required: true, message: '此选项为必选', trigger: 'blur'}
          ],
          villageNikeName: [
            {required: true, message: '此选项为必选', trigger: 'blur'}
          ],
          villageArea: [
            {required: true, message: '此选项为必选', trigger: 'blur'}
          ],
          villageJurisdiction: [
            {required: true, message: '此选项为必选', trigger: 'blur'}
          ],
          villageDialect: [
            {required: true, message: '此选项为必选', trigger: 'blur'}
          ],
          villagePhone: [
            {required: true, message: '此选项为必选', trigger: 'blur'},
            {validator: validatePhone, trigger: 'blur'},
          ],
          villagePostCode: [
            {required: true, message: '此选项为必选', trigger: 'blur'},
            {validator: validateCode}
          ],
          villageMainSpecialty: [
            {required: true, message: '此选项为必选', trigger: 'blur'}
          ],
          villageGeography: [
            {required: true, message: '此选项为必选', trigger: 'blur'}
          ],
          villageAverageTemperature: [
            {required: true, message: '此选项为必选', trigger: 'blur'}
          ],
          villagePrecipitation: [
            {required: true, message: '此选项为必选', trigger: 'blur'}
          ],
          villageAltitude: [
            {required: true, message: '此选项为必选', trigger: 'blur'}
          ],
          foodRelease: [
            {required: true, message: '此选项为必选', trigger: 'blur'}
          ],
          villageCoordinate: [
            {required: true, message: '请选择标注地址', trigger: 'blur'}
          ],
          villageYear: [
            {required: true, message: '此选项为必选', trigger: 'blur'}
          ]
          // foodDescribeList: [
          //   {required: true, message: '请至少添加一个图文详情', trigger: 'change'}
          // ],
        },
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
        classifyList: [],
        facilityLsit:[],
        addShow: false,
        mapShow: false,
        lnglat: '',
        site: '',
        lnglatCache: {
          gnote: {},
          address: ''
        }, // 选择位置缓存
        graphicData: {},
        villageId: '',// 乡村id
        cityList: null,
      }
    },
    components: {
      Graphic
    },
    created() {
      this.villageId = this.$route.query.villageId
      if (this.villageId) {
        this.getDetails(this.villageId)
      }else{
        this.form.villageYear = new Date().getFullYear()
      }
      this.getCity()
    },
    methods: {
      // 获取乡村详情
      getDetails(id) {
        let params = {
          villageId: id
        }
        getVillageById(params)
          .then(res => {
            if (res.data.code == '1'){
              let data = res.data.data
              data.foodRelease = data.foodRelease ? true : false
              let formData = JSON.parse(JSON.stringify(data))
              for (let key in this.form) {
                this.form[key] = formData[key]
              }
              this.form.villageCoordinate = JSON.parse(data.villageCoordinate)
              console.info(data.villageCoordinate)
              let coordinate = JSON.parse(data.villageCoordinate)
              let lnglat = coordinate.lng + ',' + coordinate.lat
              this.getAddress(lnglat)
            } else {
              this.$message.error(res.data.msg)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      // 逆解析地址
      getAddress(lnglat) {
        let _this = this
        MapLoader().then(AMap => {
          // let map = new AMap.Map(); // 注册地图
          AMap.plugin(["AMap.Geocoder"], function () {
            let geocoder = new AMap.Geocoder();

            geocoder.getAddress(lnglat, (status, result) => {
              if (status === 'complete' && result.regeocode) {
                let address = result.regeocode.formattedAddress;
                _this.lnglatCache.address = address;
              } else {
                _this.$message.error('根据经纬度查询地址失败')
              }
            });
          })
        })
      },
      // 获取乡村分类
      getDictionary() {
        let params = {
          dictionaryPcode: "SHOW_TYPE_FOOD"
        }
        getDictionary(params)
          .then(res => {
            if (res.data.data.code == 200) {
              let data = res.data.data.data
              this.classifyList = data
            }
          })
      },
      getCity(){
        let params = {
          id: "1338353936444280801"
        }
        getPcca(params)
          .then( res => {
            console.info(res.data)
            this.cityList = res.data
            console.info(this.cityList)
          })
          .catch( err => {
            console.log(err)
          })
      },
      // 打开地图
      openMap() {
        this.mapShow = true
        this.$nextTick(() => {
          this.init()
        })
      },
      // 确认地图经纬
      mapSub() {
        this.form.villageCoordinate = this.lnglatCache.gnote
        this.lnglatCache.address = this.site
        this.mapShow = false
        console.log(this.form)
      },
      // 取消选择地图
      mapCanl() {
        this.mapShow = false
        this.lnglat = ''
        this.site = ''
        this.lnglatCache = {}
      },
      // 调用地图
      init() {
        let _this = this
        MapLoader().then(AMap => {
          let map = new AMap.Map('map'); // 注册地图

          // 标记地址与逆解析
          let regeoCode = (lnglat) => {
            let geocoder = new AMap.Geocoder();

            geocoder.getAddress(lnglat, (status, result) => {
              if (status === 'complete' && result.regeocode) {
                let address = result.regeocode.formattedAddress;
                _this.site = address;
              } else {
                _this.$message.error('根据经纬度查询地址失败')
              }
            });
          }
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
              zoomToAccuracy: true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            });
            map.addControl(geolocation);
            geolocation.getCurrentPosition(function (status, result) {
              if (status == 'complete') {
                console.log(result)
              } else {
                console.log(result)
              }
            });
            // AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
            // AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
          });
          // 绑定地图点击事件
          map.on('click', (e) => {
            let data = {
              lng: e.lnglat.getLng(),
              lat: e.lnglat.getLat()
            }
            _this.lnglatCache.gnote = data
            _this.lnglat = `${data.lng}` + ',' + `${data.lat}`
            regeoCode(`${data.lng}` + ',' + `${data.lat}`)
          })

        })
      },
      // 提交 todo 需要获取所属地区码与村名
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.villageId){
              this.editVillage()
            }else {
              this.addVillage()
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 提交
      bySaving(data) {
        if (this.graphicData.type === 'add') {
          this.form.foodDescribeList.push(data)
          this.$message({
            type: 'success',
            message: '添加成功!'
          });
        } else if (this.graphicData.type === 'edit') {
          // this.form.foodDescribeList[this.graphicData.index] = data
          this.$set(this.form.foodDescribeList, this.graphicData.index, data)
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
        }
        this.addShow = false
      },
      // 取消图文详情添加
      cancel() {
        this.addShow = false
      },
      // 转换类型
      jsonToString(a) {
        return JSON.stringify(a)
      },
      // 发送新增请求
      addVillage() {
        let data = JSON.parse(JSON.stringify(this.form))
        data.villageCoordinate = this.jsonToString(this.form.villageCoordinate)
        data.foodRelease = this.form.foodRelease ? '1' : '0'
        addVillage(data)
          .then(res => {
            let data = res.data
            if (data.code == '1') {
              this.$message({
                message: data.msg,
                type: 'success'
              })
              this.$router.back()
            } else {
              this.$message.error(data.msg)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      test(val){
        console.log(val)
      },
      // 发送修改请求
      editVillage(){
        let data = JSON.parse(JSON.stringify(this.form))
        data.villageCoordinate = this.jsonToString(this.form.villageCoordinate)
        data.foodRelease = this.form.foodRelease ? '1' : '0'
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
      // 取消乡村添加
      resetForm(formName) {
        this.$router.back()
        // this.$refs[formName].resetFields();
      },
      // 打开添加详情
      addGraphic() {
        this.graphicData = {
          type: 'add',
          index: null
        }
        this.addShow = true
      },
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

</style>

<template>
  <div class="compile">
    <div class="compileHead">
      <h1>美食编辑</h1>
    </div>
    <div class="compileMain">
      <el-form label-position="right" :model="form" :rules="rules" ref="ruleForm" label-width="110px">
        <div class="block">
          <div class="title">
            <h3>编辑美食</h3>
          </div>
          <el-form-item label="选择分类：" prop="foodType">
            <el-radio-group v-model="form.foodType">
              <el-radio v-for="item in classifyList" :key="item.dictionaryId" :label="item.dictionaryId">{{
                item.dictionaryName }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="美食名称：" prop="foodName">
            <el-input maxlength="20" style="width: 350px" v-model="form.foodName"></el-input>
          </el-form-item>
          <div class="clearfix feature">
            <el-form-item label="特色一：" prop="foodLabelOne">
              <el-input maxlength="10" style="width: 350px" v-model="form.foodLabelOne"></el-input>
            </el-form-item>
            <div style="width: 100px"></div>
            <el-form-item label="特色二：" prop="foodLabelTwo">
              <el-input maxlength="10" style="width: 350px" v-model="form.foodLabelTwo"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="block">
          <div class="title">
            <h3>用户须知</h3>
          </div>
          <el-form-item label="电话：" prop="foodPhone">
            <el-input maxlength="20" type="number" style="width: 350px" v-model.number="form.foodPhone"></el-input>
          </el-form-item>
          <el-form-item label="营业时间：" prop="foodBusinesshours">
            <el-input maxlength="20" style="width: 350px" v-model="form.foodBusinesshours"></el-input>
          </el-form-item>
          <el-form-item label="价格说明：" prop="foodPrice">
            <el-input maxlength="20" style="width: 350px" v-model="form.foodPrice"></el-input>
          </el-form-item>
          <el-form-item label="温馨提示：" prop="foodReminder">
            <el-input maxlength="200" show-word-limit type="textarea" v-model="form.foodReminder"></el-input>
          </el-form-item>
        </div>
        <div class="block">
          <div class="title">
            <h3>交通攻略</h3>
          </div>
          <el-form-item label="自助游：" prop="foodIndependenttravel">
            <el-input maxlength="200" show-word-limit type="textarea" v-model="form.foodIndependenttravel"></el-input>
          </el-form-item>
          <el-form-item label="自驾游：" prop="foodRoadtrip">
            <el-input maxlength="200" show-word-limit type="textarea" v-model="form.foodRoadtrip"></el-input>
          </el-form-item>
          <el-form-item label="地图标注：" prop="foodCoordinate">
            <div class="mark">
              <el-button type="primary" size="medium" @click="openMap">选择地点</el-button>
              <div class="markMain">
                <div class="item">
                  <div class="text">
                    经纬度
                  </div>
                  <div class="content">
                    {{ form.foodCoordinate ? form.foodCoordinate.lng + ',' + form.foodCoordinate.lat : '' }}
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
        <div class="block">
          <div class="title">
            <h3>设施包含</h3>
          </div>
          <el-form-item prop="foodFacilities">
            <el-checkbox-group v-model="form.foodFacilities">
              <el-checkbox
                v-for="(item,index) of facilityLsit"
                :label="item.dictionaryName"
                :key="index"
                name="type"
              ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </div>
        <div class="block">
          <div class="title">
            <h3>图文详情</h3>
          </div>
          <el-form-item prop="foodDescribeList">
            <div class="graphic">
              <span>*</span>
              <el-button size="medium" @click="addGraphic">添加详情</el-button>
            </div>
            <el-table
              :data="form.foodDescribeList"
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
                    v-for="(item,index) in scope.row.fileList"
                    style="width: 50px; height: 50px;margin-right: 5px"
                    :key="index"
                    :src="item.fileUrl"
                    :fit="'cover'"/>
                </template>
              </el-table-column>
              <el-table-column label="文字描述" align="center">
                <template slot-scope="scope">
                  {{ scope.row.describeContent }}
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="操作"
                width="150"
              >
                <template slot-scope="scope">
                  <el-button type="text" @click="dataEdit(scope.$index,scope.row)">编辑</el-button>
                  <el-button type="text" @click="dataDelete(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </div>
        <el-form-item>
          <div style="display: flex;">
            <div class="switch_item">
              <span>发布：</span>
              <el-switch
                v-model="form.foodRelease"
                active-color="#13ce66"
                inactive-color="#eeeeee">
              </el-switch>
            </div>
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
  import { isMobile } from '@/utils/validate'
  import { addFood, getFoodDetails, updateFood } from '@/api/Releases/food'
  import { getDictionary } from '@/api/common'
  import Graphic from '@/components/graphic/index'

  export default {
    props: {
      params: {
        type: Object
      }
    },
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
        form: {
          foodType: '', // 选择分类
          foodName: '', // 美食名称
          foodLabelOne: '', // 特色一
          foodLabelTwo: '', // 特色二
          foodPhone: '', // 电话
          foodBusinesshours: '', // 营业时间
          foodPrice: '', // 价格说明
          foodReminder: '', // 温馨提示
          foodIndependenttravel: '', // 自助游
          foodRoadtrip: '', // 自驾游
          foodCoordinate: '', // 地图经纬
          foodFacilities: [], // 包含设施
          foodDescribeList: [], // 图文详情
          foodRelease: false
        },
        // 表单验证
        rules: {
          foodType: [
            {required: true, message: '请选择分类', trigger: 'blur'}
          ],
          foodName: [
            {required: true, message: '请填写美食名称', trigger: 'blur'}
          ],
          foodLabelOne: [
            {required: true, message: '请填写特色', trigger: 'blur'}
          ],
          foodPhone: [
            {required: true, message: '请输入电话', trigger: 'blur'},
            {validator: validatePhone, trigger: "blur"}
          ],
          foodBusinesshours: [
            {required: true, message: '请填写营业时间', trigger: 'blur'}
          ],
          foodPrice: [
            {required: true, message: '请填写价格说明', trigger: 'blur'}
          ],
          foodCoordinate: [
            {required: true, message: '请选择标注地址', trigger: 'blur'}
          ],
          foodDescribeList: [
            {required: true, message: '请至少添加一个图文详情', trigger: 'change'}
          ],
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
        foodId: '',// 美食id
      }
    },
    components: {
      Graphic
    },
    created() {
      this.getDictionary()
      this.getFacility()
      this.foodId = this.$route.query.foodId
      if (this.foodId) {
        this.getDetails(this.foodId)
      }
    },
    methods: {
      // 获取美食详情
      getDetails(id) {
        let params = {
          foodId: id
        }
        getFoodDetails(params)
          .then(res => {
            if (res.data.code == '1'){
              let data = res.data.data
              data.foodCoordinate = JSON.parse(data.foodCoordinate)
              data.foodFacilities = JSON.parse(data.foodFacilities)
              data.foodRelease = data.foodRelease ? true : false
              let formData = JSON.parse(JSON.stringify(data))
              for (let key in this.form) {
                this.form[key] = formData[key]
              }
              let lnglat = data.foodCoordinate.lng + ',' + data.foodCoordinate.lat
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
      // 获取美食分类
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
      // 获取美食设施分类
      getFacility() {
        let params = {
          dictionaryPcode: "FACILITIES_SERVICES_SCENERY"
        }
        getDictionary(params)
          .then(res => {
            if (res.data.data.code == 200) {
              let data = res.data.data.data
              this.facilityLsit = data
            }
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
        this.form.foodCoordinate = this.lnglatCache.gnote
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
      // 提交
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.foodId){
              this.editFood()
            }else {
              this.addFood()
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
      addFood() {
        let data = JSON.parse(JSON.stringify(this.form))
        data.foodDescribeList = this.form.foodDescribeList
        data.foodCoordinate = this.jsonToString(this.form.foodCoordinate)
        data.foodFacilities = this.jsonToString(this.form.foodFacilities)
        data.foodRelease = this.form.foodRelease ? '1' : '0'
        addFood(data)
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
      // 发送修改请求
      editFood(){
        let data = JSON.parse(JSON.stringify(this.form))
        data.foodDescribeList = this.form.foodDescribeList
        data.foodCoordinate = this.jsonToString(this.form.foodCoordinate)
        data.foodFacilities = this.jsonToString(this.form.foodFacilities)
        data.foodRelease = this.form.foodRelease ? '1' : '0'
        data.foodId = this.foodId
        updateFood(data)
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
      // 取消美食添加
      resetForm(formName) {
        this.$router.back()
        // this.$refs[formName].resetFields();
      },
      // 修改图文详情
      dataEdit(index, data) {
        let param = JSON.parse(JSON.stringify(data))
        this.graphicData = {
          type: 'edit',
          index: index,
          data: param
        }
        this.addShow = true
      },
      // 打开添加详情
      addGraphic() {
        this.graphicData = {
          type: 'add',
          index: null
        }
        this.addShow = true
      },
      // 删除图文详情
      dataDelete(index) {
        this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.form.foodDescribeList.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      handlePictureCardPreview(file) {
        console.log(file)
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

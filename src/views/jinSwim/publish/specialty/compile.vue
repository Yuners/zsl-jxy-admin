<template>
  <div class="compile">
    <div class="compileHead">
      <h1>特产编辑</h1>
    </div>
    <div class="compileMain">
      <el-form label-position="right" :model="form" :rules="rules" ref="ruleForm" label-width="110px">
        <div class="block">
          <div class="title">
            <h3>编辑特产</h3>
          </div>
          <el-form-item label="选择分类：" prop="specialtyType">
            <el-radio-group v-model="form.specialtyType">
              <el-radio v-for="item in classifyList" :key="item.dictionaryId" :label="item.dictionaryId">{{
                item.dictionaryName }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="特产名称：" prop="specialtyName">
            <el-input maxlength="20" style="width: 350px" v-model="form.specialtyName"></el-input>
          </el-form-item>
          <div class="clearfix feature">
            <el-form-item label="特色一：" prop="specialtyLabelOne">
              <el-input maxlength="10" style="width: 350px" v-model="form.specialtyLabelOne"></el-input>
            </el-form-item>
            <div style="width: 100px"></div>
            <el-form-item label="特色二：" prop="specialtyLabelTwo">
              <el-input maxlength="10" style="width: 350px" v-model="form.specialtyLabelTwo"></el-input>
            </el-form-item>
          </div>
          <el-form-item label="商品图片：" prop="specialtyFileList">
            <custom-upload @succeed="shopImage" :fileList="form.fileUrlList" @deleteImage="deleteImage" />
          </el-form-item>

          <el-form-item label="产地标注：" prop="specialtyCoordinate">
            <div class="mark">
              <el-button type="primary" size="medium" @click="openMap">选择地点</el-button>
              <div class="markMain">
                <div class="item">
                  <div class="text">
                    经纬度
                  </div>
                  <div class="content">
                    {{ form.specialtyCoordinate ? form.specialtyCoordinate.lng + ',' + form.specialtyCoordinate.lat : '' }}
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
            <h3>规格编辑</h3>
          </div>
          <el-form-item label-width="15px" prop="specsList">
            <div class="graphic">
              <span>*</span>
              <el-button size="medium" @click="addSpecif">添加规格</el-button>
            </div>
            <el-table
              :data="form.specsList"
              border
              fit
              highlight-current-row
            >
              <el-table-column align="center" label="序号" width="100">
                <template slot-scope="scope">
                  {{ scope.$index + 1 }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="规格参数">
                <template slot-scope="scope">
                  {{ scope.row.specsParam }}
                </template>
              </el-table-column>
              <el-table-column label="单位" align="center" width="150">
                <template slot-scope="scope">
                  {{ scope.row.specsUnit }}
                </template>
              </el-table-column>
              <el-table-column label="数量" align="center" width="150">
                <template slot-scope="scope">
                  {{ scope.row.specsNumber }}
                </template>
              </el-table-column>
              <el-table-column label="价格" align="center" width="150">
                <template slot-scope="scope">
                  {{ scope.row.specsPrice }}
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="操作"
                width="150"
              >
                <template slot-scope="scope">
                  <el-button type="text" @click="editSpecif(scope.$index,scope.row)">编辑</el-button>
                  <el-button type="text" @click="deleteSpecif(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </div>
        <div class="block">
          <div class="title">
            <h3>图文详情</h3>
          </div>
          <el-form-item label-width="15px" prop="specialtyDescribeList">
            <div class="graphic">
              <span>*</span>
              <el-button size="medium" @click="addGraphic">添加详情</el-button>
            </div>
            <el-table
              :data="form.specialtyDescribeList"
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
              <el-table-column label="文字描述" show-overflow-tooltip align="center">
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
        <div class="block">
          <div class="title">
            <h3>运费设置</h3>
          </div>
          <el-form-item label-width="15px" label=" " prop="specialtyFreightId">
            <el-select
              v-model="form.specialtyFreightId"
              placeholder="请选择运费模板"
              @change="pickFre"
            >
              <el-option
                v-for="item in freightList"
                :key="item.freightId"
                :label="item.freightName"
                :value="item.freightId">
              </el-option>
            </el-select>
            <span class="tooltip">(初次使用请先前往运营管理创建模板再选择模板名称)</span>
          </el-form-item>
        </div>
        <div class="block">
          <div class="title">
            <h3>用户须知</h3>
          </div>
          <el-form-item label-width="15px" label=" " prop="specialtyNoticeId">
            <el-select
              v-model="form.specialtyNoticeId"
              placeholder="请选择用户须知模板"
              @change="pickNot"
            >
              <el-option
                v-for="item in noticeList"
                :key="item.noticeId"
                :label="item.noticeName"
                :value="item.noticeId">
              </el-option>
            </el-select>
            <span class="tooltip">(初次使用请先前往运营管理创建模板再选择模板名称)</span>
          </el-form-item>
        </div>
        <el-form-item label-width="15px">
          <div style="display: flex;">
            <div class="switch_item">
              <span>发布：</span>
              <el-switch
                v-model="form.specialtyRelease"
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
    <specification :add-show="specifShow" :graphicData="specifData" @submit="saveSpecif" @close="cancelSpecif"></specification>
  </div>
</template>

<script>
  import {
    addSpecialty,
    getSpecialtyDetails,
    updateSpecialty,
    getFreightList,
    getNoticeList
  } from '@/api/Releases/specialty'
  import { getDictionary } from '@/api/common'
  import Graphic from '@/components/graphic/index'
  import Specification from './components/specification'
  import {MapLoader} from "@/utils/AMap";
  import CustomUpload from '@/components/CustomUpload'

  export default {
    data() {
      return {
        options: [],
        freightList:[], // 运费模板
        noticeList:[], // 用户须知模板
        // 表单字段
        form: {
          specialtyType: '', // 选择分类
          specialtyName: '', // 特产名称
          specialtyLabelOne: '', // 特色一
          specialtyLabelTwo: '', // 特色二
          fileUrlList: [],
          specsList:[], // 特产规格
          specialtyDescribeList: [], // 图文详情
          specialtyCoordinate: '', // 地图经纬
          specialtyNoticeId: '', // 用户须知id
          specialtyNoticeName: '', // 用户须知名字
          specialtyFreightId: '', // 运费模板id
          specialtyFreightName: '', // 运费模板名字
          specialtyRelease: false,
        },
        // 表单验证
        rules: {
          specialtyType: [
            {required: true, message: '请选择分类', trigger: 'blur'}
          ],
          specialtyName: [
            {required: true, message: '请填写特产名称', trigger: 'blur'}
          ],
          specialtyLabelOne: [
            {required: true, message: '请填写特色', trigger: 'blur'}
          ],
          fileUrlList: [
            {required: true, message: '请填上传商品图片', trigger: 'change'}
          ],
          specsList: [
            {required: true, message: '请至少添加一个特产规格', trigger: 'change'}
          ],
          specialtyCoordinate: [
            {required: true, message: '请选择产地标注', trigger: 'change'}
          ],
          specialtyNoticeId: [
            {required: true, message: '请选择用户须知模板', trigger: 'change'}
          ],
          specialtyFreightId: [
            {required: true, message: '请选择运费模板', trigger: 'change'}
          ],
          specialtyDescribeList: [
            {required: true, message: '请至少添加一个图文详情', trigger: 'change'}
          ],
        },
        classifyList: [],
        addShow: false,
        specifShow: false,
        graphicData: {},
        specifData: {},
        specialtyId: '',// 特产id
        mapShow: false,
        lnglat: '',
        site: '',
        lnglatCache: {
          gnote: {},
          address: ''
        }, // 选择位置缓存
      }
    },
    components: {
      Graphic,
      Specification,
      CustomUpload
    },
    created() {
      this.getDictionary()
      this.getFreight()
      this.getNotice()
      this.specialtyId = this.$route.query.specialtyId
      if (this.specialtyId) {
        this.getDetails(this.specialtyId)
      }
    },
    methods: {
      // 商品图片删除
      deleteImage(index){
        this.form.fileUrlList.splice(index, 1)
      },
      shopImage(data){
        this.form.fileUrlList.push(data)
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
      // 打开地图
      openMap() {
        this.mapShow = true
        this.$nextTick(() => {
          this.init()
        })
      },
      // 确认地图经纬
      mapSub() {
        this.form.specialtyCoordinate = this.lnglatCache.gnote
        this.lnglatCache.address = this.site
        this.mapShow = false
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
      // 获取特产详情
      getDetails(id) {
        let params = {
          specialtyId: id
        }
        getSpecialtyDetails(params)
          .then(res => {
            if (res.data.code == '1'){
              let data = res.data.data
              data.specialtyCoordinate = JSON.parse(data.specialtyCoordinate)
              data.specialtyFacilities = JSON.parse(data.specialtyFacilities)
              data.specialtyRelease = data.specialtyRelease ? true : false
              let formData = JSON.parse(JSON.stringify(data))
              for (let key in this.form) {
                if (formData[key] != null){
                  this.form[key] = formData[key]
                }
              }
              if (data.specialtyCoordinate){
                console.log(data.specialtyCoordinate)
                let lnglat = data.specialtyCoordinate.lng + ',' + data.specialtyCoordinate.lat
                this.getAddress(lnglat)
              }
            } else {
              this.$message.error(res.data.msg)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      // 选择运费
      pickFre(val){
        let a = this.freightList.filter( item => {
          return item.freightId == val
        })[0]
        this.form.specialtyFreightName = a.freightName
      },
      // 获取运费设置
      getFreight(){
          getFreightList()
            .then( res => {
              if (res.data.code == '1'){
                let data = res.data.data
                this.freightList = data
              }
            })
      },
      // 选择用户须知
      pickNot(val){
        let a = this.noticeList.filter( item => {
          return item.noticeId == val
        })[0]
        this.form.specialtyNoticeName = a.noticeName
      },
      // 获取用户须知
      getNotice(){
          getNoticeList()
            .then( res => {
              if (res.data.code == '1'){
                let data = res.data.data
                this.noticeList = data
              }
            })
      },
      // 获取特产分类
      getDictionary() {
        let params = {
          dictionaryPcode: "SHOW_TYPE_SPECIALTY"
        }
        getDictionary(params)
          .then(res => {
            if (res.data.data.code == 200) {
              let data = res.data.data.data
              this.classifyList = data
            }
          })
      },
      // 特产提交
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.specialtyId){
              this.editSpecialty()
            }else {
              this.addSpecialty()
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 转换类型
      jsonToString(a) {
        return JSON.stringify(a)
      },
      // 发送新增请求
      addSpecialty() {
        let data = JSON.parse(JSON.stringify(this.form))
        data.specialtyDescribeList = this.form.specialtyDescribeList
        data.specialtyCoordinate = this.jsonToString(this.form.specialtyCoordinate)
        data.specialtyRelease = this.form.specialtyRelease ? '1' : '0'
        addSpecialty(data)
          .then(res => {
            if (res.code == 1) {
              this.$message({
                message: res.data.msg,
                type: 'success'
              })
              this.$router.back()
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      // 发送修改请求
      editSpecialty(){
        let data = JSON.parse(JSON.stringify(this.form))
        data.specialtyDescribeList = this.form.specialtyDescribeList
        data.specialtyCoordinate = this.jsonToString(this.form.specialtyCoordinate)
        data.specialtyRelease = this.form.specialtyRelease ? '1' : '0'
        data.specialtyId = this.specialtyId
        updateSpecialty(data)
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
      // 取消特产添加
      resetForm(formName) {
        this.$router.back()
        // this.$refs[formName].resetFields();
      },
      // 图文详情提交
      bySaving(data) {
        if (this.graphicData.type === 'add') {
          this.form.specialtyDescribeList.push(data)
          this.$message({
            type: 'success',
            message: '添加成功!'
          });
        } else if (this.graphicData.type === 'edit') {
          this.$set(this.form.specialtyDescribeList, this.graphicData.index, data)
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
          this.form.specialtyDescribeList.splice(index, 1)
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

      // 打开规格编辑
      addSpecif(){
        this.specifData = {
          type: 'add',
          index: null
        }
        this.specifShow = true
      },
      // 修改规格编辑
      editSpecif(index, data) {
        let param = JSON.parse(JSON.stringify(data))
        this.specifData = {
          type: 'edit',
          index: index,
          data: param
        }
        this.specifShow = true
      },
      // 删除规格编辑
      deleteSpecif(index) {
        this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.form.specsList.splice(index, 1)
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
      // 取消规格编辑添加
      cancelSpecif() {
        this.specifShow = false
      },
      // 图文详情提交
      saveSpecif(data) {
        if (this.specifData.type === 'add') {
          this.form.specsList.push(data)
          this.$message({
            type: 'success',
            message: '添加成功!'
          });
        } else if (this.specifData.type === 'edit') {
          this.$set(this.form.specsList, this.specifData.index, data)
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
        }
        this.specifShow = false
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
    .tooltip{
      margin-left: 30px;
      color: #999999;
    }
  }

</style>

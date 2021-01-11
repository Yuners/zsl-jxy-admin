<template>
  <div class="compile">
    <div class="compileHead">
      <h1>特产编辑</h1>
    </div>
    <div class="compileMain">
      <el-form label-position="right" :model="form" ref="ruleForm" label-width="110px">
        <div class="block">
          <div class="title">
            <h3>编辑特产</h3>
          </div>
          <el-form-item label="选择分类：" prop="specialtyType">
            <el-radio-group v-model="form.specialtyType">
              <el-radio disabled v-for="item in classifyList" :key="item.dictionaryId" :label="item.dictionaryId">{{
                item.dictionaryName }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="特产名称：" prop="specialtyName">
            <el-input disabled maxlength="20" style="width: 350px" v-model="form.specialtyName"></el-input>
          </el-form-item>
          <div class="clearfix feature">
            <el-form-item label="特色一：" prop="specialtyLabelOne">
              <el-input disabled maxlength="10" style="width: 350px" v-model="form.specialtyLabelOne"></el-input>
            </el-form-item>
            <div style="width: 100px"></div>
            <el-form-item label="特色二：" prop="specialtyLabelTwo">
              <el-input disabled maxlength="10" style="width: 350px" v-model="form.specialtyLabelTwo"></el-input>
            </el-form-item>
          </div>
          <el-form-item label="商品图片：" prop="fileUrlList">
            <custom-upload :disabled="true" :fileList="form.fileUrlList" />
          </el-form-item>

          <el-form-item label="产地标注：" prop="specialtyCoordinate">
            <div class="mark">
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
            <!--            <div id="map"></div>-->
          </el-form-item>
        </div>
        <div class="block">
          <div class="title">
            <h3>规格编辑</h3>
          </div>
          <el-form-item label-width="15px" prop="specsList">
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
            </el-table>
          </el-form-item>
        </div>
        <div class="block">
          <div class="title">
            <h3>图文详情</h3>
          </div>
          <el-form-item label-width="15px" prop="specialtyDescribeList">
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
                  <el-button type="text" @click="check(scope.row)">查看</el-button>
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
              disabled
              v-model="form.specialtyFreightName"
              placeholder="请选择运费模板"
            >
            </el-select>
          </el-form-item>
        </div>
        <div class="block">
          <div class="title">
            <h3>用户须知</h3>
          </div>
          <el-form-item label-width="15px" label=" " prop="specialtyNoticeId">
            <el-select
              disabled
              v-model="form.specialtyNoticeName"
              placeholder="请选择用户须知模板"
            >
            </el-select>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <viewDetails ref="viewDetails"></viewDetails>
  </div>
</template>

<script>
  import { getSpecialtyDetails } from '@/api/Releases/specialty'
  import { getDictionary } from '@/api/common'
  import {MapLoader} from "@/utils/AMap";
  import CustomUpload from '@/components/CustomUpload'
  import viewDetails from '../components/viewDetails'

  export default {
    data() {
      return {
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
      CustomUpload,
      viewDetails
    },
    created() {
      this.getDictionary()
      this.specialtyId = this.$route.query.specialtyId
      if (this.specialtyId) {
        this.getDetails(this.specialtyId)
      }
    },
    methods: {
      // 查看图文详情
      check(data){
        this.$refs.viewDetails.open(data)
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

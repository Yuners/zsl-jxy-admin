<template>
  <div class="compile">
    <div class="compileHead">
      <h1>美食详情</h1>
    </div>
    <div class="compileMain">
      <el-form label-position="right" :model="form" ref="ruleForm" label-width="110px">
        <div class="block">
          <div class="title">
            <h3>美食详情</h3>
          </div>
          <el-form-item label="美食分类：" prop="foodType">
            <el-radio-group v-model="form.foodType">
              <el-radio disabled v-for="item in classifyList" :key="item.dictionaryId" :label="item.dictionaryId">{{
                item.dictionaryName }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="美食名称：" prop="foodName">
            <el-input :disabled="true" maxlength="20" style="width: 350px" v-model="form.foodName"></el-input>
          </el-form-item>
          <div class="clearfix feature">
            <el-form-item label="特色一：" prop="foodLabelOne">
              <el-input :disabled="true" maxlength="10" style="width: 350px" v-model="form.foodLabelOne"></el-input>
            </el-form-item>
            <div style="width: 100px"></div>
            <el-form-item label="特色二：" prop="foodLabelTwo">
              <el-input :disabled="true" maxlength="10" style="width: 350px" v-model="form.foodLabelTwo"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="block">
          <div class="title">
            <h3>用户须知</h3>
          </div>
          <el-form-item label="电话：" prop="foodPhone">
            <el-input :disabled="true" maxlength="20" type="number" style="width: 350px" v-model.number="form.foodPhone"></el-input>
          </el-form-item>
          <el-form-item label="营业时间：" prop="foodBusinesshours">
            <el-input :disabled="true" maxlength="20" style="width: 350px" v-model="form.foodBusinesshours"></el-input>
          </el-form-item>
          <el-form-item label="价格说明：" prop="foodPrice">
            <el-input :disabled="true" maxlength="20" style="width: 350px" v-model="form.foodPrice"></el-input>
          </el-form-item>
          <el-form-item label="温馨提示：" prop="foodReminder">
            <el-input :disabled="true" maxlength="200" show-word-limit type="textarea" v-model="form.foodReminder"></el-input>
          </el-form-item>
        </div>
        <div class="block">
          <div class="title">
            <h3>交通攻略</h3>
          </div>
          <el-form-item label="自助游：" prop="foodIndependenttravel">
            <el-input :disabled="true" maxlength="200" show-word-limit type="textarea" v-model="form.foodIndependenttravel"></el-input>
          </el-form-item>
          <el-form-item label="自驾游：" prop="foodRoadtrip">
            <el-input :disabled="true" maxlength="200" show-word-limit type="textarea" v-model="form.foodRoadtrip"></el-input>
          </el-form-item>
          <el-form-item label="地图标注：" prop="foodCoordinate">
            <div class="mark">
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
                  <el-button >取 消</el-button>
                  <el-button type="primary" >确 定</el-button>
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
                disabled
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
            </el-table>
          </el-form-item>
        </div>
      </el-form>
    </div>

  </div>
</template>

<script>
  import {MapLoader} from '@/utils/AMap.js'
  import { getDictionary, getFoodDetails } from '@/api/Releases'

  export default {
    data() {
      return {
        // 表单字段
        form: {
          foodType: '', // 选择分类
          foodName: '', // 景区名称
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
        classifyList: [],
        facilityLsit:[],
        lnglat: '',
        site: '',
        lnglatCache: {
          gnote: {},
          address: ''
        }, // 选择位置缓存
        foodId: '',// 景区id
      }
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
      // 获取景区详情
      getDetails(id) {
        let params = {
          foodId: id
        }
        getFoodDetails(params)
          .then(res => {
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
            console.log(this.form)
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
      // 获取景区分类
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
      // 获取景区设施分类
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

    .addGraphic {
      width: 100%;
      height: calc(100% - 60px);
      position: absolute;
      top: 60px;
      left: 0;
      padding: 0 70px;
      background-color: rgba(0, 0, 0, .2);
      z-index: 99;

      .addMain {
        background-color: #ffffff;
        padding: 70px;
        margin-top: 150px;

        .is-flex {
          display: flex;

          .upTime {
            padding: 0;
            margin: 0;

            span {
              display: flex;
              justify-content: flex-start;
            }

            .upLoad-item {
              position: relative;
              font-size: 14px;
              color: #606266;
              line-height: 1.8;
              overflow: hidden;
              background-color: #fff;
              border: 1px solid #c0ccda;
              border-radius: 6px;
              box-sizing: border-box;
              width: 148px;
              height: 148px;
              margin: 0 8px 8px 0;
              display: flex;
              align-items: center;
              justify-content: center;

              img {
                width: 100%;
                /*height: 100%;*/
              }

              .masked {
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                cursor: default;
                text-align: center;
                color: #fff;
                opacity: 0;
                font-size: 20px;
                background-color: rgba(0, 0, 0, 0.5);
                transition: opacity 0.3s;

                &:hover {
                  opacity: 1;
                }

                .maskedDelet {
                  position: absolute;
                  top: 50%;
                  margin-top: -11px;
                  left: 50%;
                  margin-left: -10px;
                  font-size: inherit;

                  i {
                    cursor: pointer;
                  }
                }
              }
            }
          }
        }

      }
    }
  }

  .slide-fade-enter-active {
    transition: all 1s ease;
  }

  .slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */
  {
    transform: translateY(-10px);
    opacity: 0;
  }
</style>

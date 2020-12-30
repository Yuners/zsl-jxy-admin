<template>
  <div class="compile">
    <div class="compileHead">
      <h1>乡村详情</h1>
    </div>
    <div class="compileMain">
      <el-form label-position="right" :model="form" ref="ruleForm" label-width="110px">
        <div class="block">
          <div class="clearfix feature">
            <el-form-item label="乡村名称：" prop="villageName">
              <el-input maxlength="10" style="width: 350px" :disabled="true" v-model="form.villageName"></el-input>
            </el-form-item>
            <div style="width: 100px"></div>
            <el-form-item label="电话区号：" prop="villagePhone">
              <el-input maxlength="10" style="width: 350px" :disabled="true" v-model="form.villagePhone"></el-input>
            </el-form-item>
          </div>
          <div class="clearfix feature">
            <el-form-item label="乡村别名：" prop="villageNikeName">
              <el-input maxlength="10" style="width: 350px" :disabled="true" v-model="form.villageNikeName"></el-input>
            </el-form-item>
            <div style="width: 100px"></div>
            <el-form-item label="邮政编码：" prop="villagePostCode">
              <el-input maxlength="10" style="width: 350px" :disabled="true" v-model="form.villagePostCode"></el-input>
            </el-form-item>
          </div>
          <div class="clearfix feature">
            <el-form-item label="所属地区：" prop="villageLocationName">
              <el-input maxlength="10" style="width: 350px" :disabled="true" v-model="form.villageLocationName" placeholder="xx省xx市xx县/区xx镇/乡"></el-input>
            </el-form-item>
            <div style="width: 100px"></div>
            <el-form-item label="主要特产：" prop="villageMainSpecialty">
              <el-input maxlength="10" style="width: 350px" :disabled="true" v-model="form.villageMainSpecialty"></el-input>
            </el-form-item>
          </div>
          <div class="clearfix feature">
            <el-form-item label="面积：" prop="villageArea">
              <el-input maxlength="10" style="width: 350px" :disabled="true" v-model="form.villageArea" placeholder="平方公里"></el-input>
            </el-form-item>
            <div style="width: 100px"></div>
            <el-form-item label="气温：" prop="villageAverageTemperature">
              <el-input maxlength="10" style="width: 350px" :disabled="true" v-model="form.villageAverageTemperature" placeholder="年平均气温℃"></el-input>
            </el-form-item>
          </div>
          <div class="clearfix feature">
            <el-form-item label="下辖村：" prop="villageJurisdiction">
              <el-input maxlength="10" style="width: 350px" :disabled="true" v-model="form.villageJurisdiction" placeholder="下辖自然村组"></el-input>
            </el-form-item>
            <div style="width: 100px"></div>
            <el-form-item label="年降水量：" prop="villagePrecipitation">
              <el-input maxlength="10" style="width: 350px" :disabled="true" v-model="form.villagePrecipitation" placeholder="毫米"></el-input>
            </el-form-item>
          </div>
          <div class="clearfix feature">
            <el-form-item label="方言：" prop="villageDialect">
              <el-input maxlength="10" style="width: 350px" :disabled="true" v-model="form.villageDialect"></el-input>
            </el-form-item>
            <div style="width: 100px"></div>
            <el-form-item label="海拔：" prop="villageAltitude">
              <el-input maxlength="10" style="width: 350px" :disabled="true" v-model="form.villageAltitude" placeholder="千米"></el-input>
            </el-form-item>
          </div>
          <div class="clearfix feature">
            <el-form-item label="地理状况：" prop="villageGeography">
              <el-input maxlength="10" style="width: 350px" :disabled="true" v-model="form.villageGeography"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="block">
          <el-form-item label="地图标注：" prop="villageCoordinate" >
            <div class="mark">
              <div class="markMain">
                <div class="item">
                  <div class="text">
                    经纬度
                  </div>
                  <div class="content">
                    {{ form.villageCoordinate ? toJson(form.villageCoordinate).lng + ',' + toJson(form.villageCoordinate).lat : '' }}
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
                  <el-button>取 消</el-button>
                  <el-button type="primary">确 定</el-button>
                </div>
              </span>
            </el-dialog>
            <!--            <div id="map"></div>-->
          </el-form-item>
        </div>
      </el-form>
    </div>

  </div>
</template>

<script>
  import {MapLoader} from '@/utils/AMap.js'
  import { getVillageById } from '@/api/infoMng/basics/vallage'
  import { getDictionary } from '@/api/common'

  export default {
    data() {
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
          villageLocationName:'',
        },
        lnglat: '',
        site: '',
        lnglatCache: {
          gnote: {},
          address: ''
        }, // 选择位置缓存
        villageId: '',// 乡村id
      }
    },
    created() {
      this.villageId = this.$route.query.villageId
      if (this.villageId) {
        this.getDetails(this.villageId)
      }
    },
    methods: {
      // 获取景区详情
      getDetails(id) {
        let params = {
          villageId: id
        }
        getVillageById(params)
          .then(res => {
            console.info(res)
            if (res.data.code == '1'){
              let data = res.data.data
              data.foodRelease = data.foodRelease ? true : false
              let formData = JSON.parse(JSON.stringify(data))
              for (let key in this.form) {
                this.form[key] = formData[key]
              }
              console.info(data.villageLocationName)
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
      toJson(v){

        return JSON.parse(v)
      },
      // 逆解析地址
      getAddress(lnglat) {
        let _this = this
        MapLoader().then(AMap => {
          // let map = new AMap.Map(); // 注册地图
          AMap.plugin(["AMap.Geocoder"], function () {
            let geocoder = new AMap.Geocoder();
            console.info(lnglat)
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

<template>
  <div class="compile">
    <div class="compileHead">
      <h1>民宿编辑</h1>
    </div>
    <div class="compileMain">
      <el-form label-position="right" :model="form" ref="ruleForm" label-width="110px">
        <div class="block">
          <div class="title">
            <h3>编辑民宿</h3>
          </div>
          <el-form-item label="选择分类：" prop="bedType">
            <el-radio-group v-model="form.bedType">
              <el-radio :disabled="true" v-for="item in classifyList" :key="item.dictionaryId" :label="item.dictionaryId">{{
                item.dictionaryName }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="民宿名称：" prop="bedName">
            <el-input :disabled="true" maxlength="20" style="width: 350px" v-model="form.bedName"></el-input>
          </el-form-item>
          <div class="clearfix feature">
            <el-form-item label="特色一：" prop="bedLabelOne">
              <el-input :disabled="true" maxlength="10" style="width: 350px" v-model="form.bedLabelOne"></el-input>
            </el-form-item>
            <div style="width: 100px"></div>
            <el-form-item label="特色二：" prop="bedLabelTwo">
              <el-input :disabled="true" maxlength="10" style="width: 350px" v-model="form.bedLabelTwo"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="block">
          <div class="title">
            <h3>用户须知</h3>
          </div>
          <el-form-item label="电话：" prop="bedPhone">
            <el-input :disabled="true" maxlength="20" type="number" style="width: 350px" v-model.number="form.bedPhone"></el-input>
          </el-form-item>
          <el-form-item label="营业时间：" prop="bedBusinesshours">
            <el-input :disabled="true" maxlength="20" style="width: 350px" v-model="form.bedBusinesshours"></el-input>
          </el-form-item>
          <el-form-item label="价格说明：" prop="bedPrice">
            <el-input :disabled="true" maxlength="20" style="width: 350px" v-model="form.bedPrice"></el-input>
          </el-form-item>
          <el-form-item label="温馨提示：" prop="bedReminder">
            <el-input :disabled="true" maxlength="200" show-word-limit type="textarea" v-model="form.bedReminder"></el-input>
          </el-form-item>
        </div>
        <div class="block">
          <div class="title">
            <h3>交通攻略</h3>
          </div>
          <el-form-item label="自助游：" prop="bedIndependenttravel">
            <el-input :disabled="true" maxlength="200" show-word-limit type="textarea" v-model="form.bedIndependenttravel"></el-input>
          </el-form-item>
          <el-form-item label="自驾游：" prop="bedRoadtrip">
            <el-input :disabled="true" maxlength="200" show-word-limit type="textarea" v-model="form.bedRoadtrip"></el-input>
          </el-form-item>
          <el-form-item :disabled="true" label="地图标注：" prop="bedCoordinate">
            <div class="mark">
              <div class="markMain">
                <div class="item">
                  <div class="text">
                    经纬度
                  </div>
                  <div class="content">
                    {{ form.bedCoordinate ? form.bedCoordinate.lng + ',' + form.bedCoordinate.lat : '' }}
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
          </el-form-item>
        </div>
        <div class="block">
          <div class="title">
            <h3>预订流程</h3>
          </div>
          <el-form-item label="线上预订：">
            <span>提交订单后，需要房东确认订单</span>
          </el-form-item>
          <el-form-item label="线下押金：" prop="bedDeposit">
            <el-radio :disabled="true" v-model="radio" label="1">免押金</el-radio>
            <el-radio :disabled="true" v-model="radio" label="2">付押金</el-radio>
            <el-input :disabled="true" style="width: 100px" type="number" v-model="form.bedDeposit"></el-input> <span>元</span>
          </el-form-item>
          <el-form-item label="提供发票：">
            <span>开具发票需与房东协商</span>
          </el-form-item>
          <el-form-item label="退订规则：">
            <div class="regulation">
              <div class="centent">
                <span>入住日前1天14:00前取消订单，全额退款；距入住日14:00不足24小时取消，扣首晚房费；入住后提前离店，当日14:00前取消，扣当日房费，当日14:00后取消，扣当日+次日房费。</span>
              </div>
              <div class="flow">
                <el-steps direction="vertical" finish-status="success" :active="3">
                  <el-step title="现在预订">
                    <div class="desCent" slot="description">
                      <el-tag type="success">如取消订单，全额退款</el-tag>
                    </div>
                  </el-step>
                  <el-step title="入住日前一天14:00前">
                    <div class="desCent" slot="description">
                      <el-tag type="danger">如取消订单，扣首晚房费</el-tag>
                    </div>
                  </el-step>
                  <el-step title="入住当天14:00">
                    <div class="desCent" slot="description">
                      <el-tag type="danger">
                        当日14:00前取消订单，扣当日房费，
                        当日14:00后取消订单，  扣当日+次日房费。
                      </el-tag>
                    </div>
                  </el-step>
                  <el-step title="离店日当天12:00"></el-step>
                </el-steps>
              </div>
            </div>
          </el-form-item>
        </div>
        <div class="block">
          <div class="title">
            <h3>图文详情</h3>
          </div>
          <el-form-item prop="bedDescribeList">
            <el-table
              :data="form.bedDescribeList"
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
                  <el-button type="text" @click="check(scope.row)">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </div>
        <div class="block">
          <div class="title">
            <h3>房间编辑</h3>
          </div>
          <el-form-item prop="bedRoomList">
            <el-table
              :data="form.bedRoomList"
              border
              fit
              highlight-current-row
            >
              <el-table-column align="center" label="房间类型" width="95">
                <template slot-scope="scope">
                  {{ isClassType(scope.row.roomType) }}
                </template>
              </el-table-column>
              <el-table-column label="房间名称(房号)" align="center">
                <template slot-scope="scope">
                  {{ scope.row.roomName }}
                </template>
              </el-table-column>
              <el-table-column label="房间描述" align="center">
                <template slot-scope="scope">
                  {{ scope.row.roomDescribe }}
                </template>
              </el-table-column>
              <el-table-column label="面积" align="center">
                <template slot-scope="scope">
                  {{ scope.row.roomArea }}
                </template>
              </el-table-column>
              <el-table-column label="价格" align="center">
                <template slot-scope="scope">
                  {{ scope.row.roomPrice }}
                </template>
              </el-table-column>
              <el-table-column label="其他说明" align="center">
                <template slot-scope="scope">
                  {{ scope.row.roomExplain }}
                </template>
              </el-table-column>
              <el-table-column label="设施包含" align="center">
                <template slot-scope="scope">
                  {{ updataString(scope.row.roomFacilities) }}
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <viewDetails ref="viewDetails"></viewDetails>
  </div>
</template>

<script>
  import {MapLoader} from '@/utils/AMap.js'
  import { getBedDetails } from '@/api/Releases/bed'
  import { getDictionary } from '@/api/common'
  import viewDetails from '../components/viewDetails'

  export default {
    data() {
      return {
        radio:'1', // 选择押金
        // 表单字段
        form: {
          bedType: '', // 选择分类
          bedName: '', // 民宿名称
          bedLabelOne: '', // 特色一
          bedLabelTwo: '', // 特色二
          bedPhone: '', // 电话
          bedBusinesshours: '', // 营业时间
          bedPrice: '', // 价格说明
          bedDeposit:'', // 押金
          bedReminder: '', // 温馨提示
          bedIndependenttravel: '', // 自助游
          bedRoadtrip: '', // 自驾游
          bedCoordinate: '', // 地图经纬
          bedDescribeList: [], // 图文详情
          bedRoomList:[], // 房间详情
          bedRelease: false
        },
        classifyList: [], // 分类
        addShow: false, // 图文添加显示
        mapShow: false, // 地图
        lnglat: '', // 经纬度
        site: '', // 详细地址
        lnglatCache: {
          gnote: {},
          address: ''
        }, // 选择位置缓存
        graphicData: {}, // 图文详情数据
        bedId: '',// 民宿id
        roomData: {}, // 房间编辑数据
        addRoom: false, // 房间编辑显示
        roomClassList:[], // 房间类型
      }
    },
    components:{
      viewDetails
    },
    created() {
      this.getDictionary()
      this.bedId = this.$route.query.bedId
      if (this.bedId) {
        this.getDetails(this.bedId)
      }
    },
    methods: {
      // 查看图文详情
      check(data){
        this.$refs.viewDetails.open(data)
      },
      updataString(val){
        let data = JSON.parse(val)
        return data.join()
      },
      isClassType(val){
        let data = this.roomClassList.filter( item => {
          return  item.dictionaryId == val
        })
        return data[0].dictionaryName
      },
      // 获取民宿详情
      getDetails(id) {
        let params = {
          bedId: id
        }
        getBedDetails(params)
          .then(res => {
            if (res.data.code == '1'){
              let data = res.data.data
              data.bedCoordinate = JSON.parse(data.bedCoordinate)
              data.bedFacilities = JSON.parse(data.bedFacilities)
              data.bedRelease = data.bedRelease ? true : false
              let formData = JSON.parse(JSON.stringify(data))
              if (formData.bedDeposit){
                this.radio = '2'
              }
              for (let key in this.form) {
                this.form[key] = formData[key]
              }
              let lnglat = data.bedCoordinate.lng + ',' + data.bedCoordinate.lat
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
      // 获取民宿分类
      getDictionary() {
        let params = {
          dictionaryPcode: "SHOW_TYPE_BED"
        }
        getDictionary(params)
          .then(res => {
            if (res.data.data.code == 200) {
              let data = res.data.data.data
              this.classifyList = data
            }
          })
        let a = {
          dictionaryPcode: "ROOM_TYPE"
        }
        getDictionary(a)
          .then(res => {
            if (res.data.data.code == 200) {
              let data = res.data.data.data
              this.roomClassList = data
            }
          })
      },
      // 转换类型
      jsonToString(a) {
        return JSON.stringify(a)
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

      .regulation{
        display: flex;
        flex-direction: column;

        .centent{
          width: 500px;

          span{
            font-size: 16px;
            color: #333333;
          }
        }

        .flow{
          padding: 30px 0;
          box-sizing: border-box;
          height: 400px;
          line-height: 1;

        }
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

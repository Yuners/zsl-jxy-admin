<template>
  <div class="compile">
    <div class="compileHead">
      <h1>运费模板编辑</h1>
    </div>
    <div class="compileMain">
      <el-form :model="carriageForm" :rules="carriageRules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
        <el-form-item label="模板名称：" prop="freightName">
          <el-input disabled style="width: 350px;" v-model="carriageForm.freightName"></el-input>
        </el-form-item>
        <el-form-item label="选择包邮地区：" prop="freightIsAllFree">
          <el-radio-group v-model="carriageForm.freightIsAllFree">
            <el-radio disabled :label="1" border>全国包邮</el-radio>
            <el-radio disabled :label="0" border>自定义</el-radio>
          </el-radio-group>
        </el-form-item>
        <div class="block" v-if="carriageForm.freightIsAllFree == 0">
          <el-form-item label="计费方式：" prop="freightChargingType">
            <el-radio-group v-model="carriageForm.freightChargingType">
              <el-radio disabled :label="0">按件计费</el-radio>
              <el-radio disabled :label="1">按重量计费</el-radio>
              <el-radio disabled :label="2">按体积计费</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="配送区域及运费：" prop="freightDistributionList">
            <div class="reminder">
              <span>(首件及首费是基础运费，如2件以内10元，续1件续费1元，买4件商品的运费就是12元。)</span>
            </div>
            <el-table
              style="width: 1000px;"
              :data="carriageForm.freightDistributionList"
              border
              fit
              highlight-current-row
            >
              <el-table-column align="center" label="可配送地区" width="150">
                <template slot-scope="scope">
                  {{ scope.row.distributionRegionName | ArrToStr }}
                </template>
              </el-table-column>
              <el-table-column :label="carriageForm.freightChargingType == 0 ? '首件' : carriageForm.freightChargingType == 1 ? '首件重量(KG)' : '首件体积(m³)' " align="center">
                <template slot-scope="scope">
                  {{ scope.row.distributionFirstWeight }}
                </template>
              </el-table-column>
              <el-table-column label="首费(元)" align="center">
                <template slot-scope="scope">
                  {{ scope.row.distributionFirstPrice }}
                </template>
              </el-table-column>
              <el-table-column :label="carriageForm.freightChargingType == 0 ? '续件' : carriageForm.freightChargingType == 1 ? '续件重量(KG)' : '续件体积(m³)' " align="center">
                <template slot-scope="scope">
                  {{ scope.row.distributionContinuationWeight }}
                </template>
              </el-table-column>
              <el-table-column label="续费(元)" align="center">
                <template slot-scope="scope">
                  {{ scope.row.distributionContinuationPrice }}
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item label="按条件包邮：" prop="freightParcelList">
            <div class="reminder">
              <el-radio-group v-model="pinkage">
                <el-radio disabled :label="true">有</el-radio>
                <el-radio disabled :label="false">无</el-radio>
              </el-radio-group>
              <span class="text">(若其中有条件为0，则表示满足不为0的条件即可包邮，否则满足全部条件才可包邮。)</span>
            </div>
            <template v-if="pinkage">
              <el-table
                style="width: 800px;"
                :data="carriageForm.freightParcelList"
                border
                fit
                highlight-current-row
              >
                <el-table-column align="center" label="区域选择" width="150">
                  <template slot-scope="scope">
                    {{ scope.row.parcelRegionName | ArrToStr }}
                  </template>
                </el-table-column>
                <el-table-column :label="carriageForm.freightChargingType == 0 ? '包邮件数' : carriageForm.freightChargingType == 1 ? '包邮重量(KG)' : '包邮体积(m³)' " align="center">
                  <template slot-scope="scope">
                    {{ scope.row.parcelWeight }}
                  </template>
                </el-table-column>
                <el-table-column label="包邮金额" align="center">
                  <template slot-scope="scope">
                    {{ scope.row.parcelPrice }}
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-form-item>
        </div>
        <el-form-item class="noFreight" label="不配送区域选择：" prop="freightNotDistribution">
          <div class="reminder">
            <span>(如果全国可配送，则不用选择)</span>
          </div>
          <div class="freightMain">
            <div class="noCity">
              <el-tag class="tagCity" v-for="item of carriageForm.freightNotDistribution" :key="item">{{ cityName(item) }}</el-tag>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import SelectCity from './components/selectCity'
  import { getPcca } from "@/api/common";
  import { addFreight, getFreightDetails, updateFreight } from '@/api/Operation/carriage'

  export default {
    data() {
      return {
        pinkage: false,
        carriageForm:{
          freightName: '', // 模板名称
          freightIsAllFree: 1, // 是否全国包邮
          freightChargingType: 0, // 0、按件计费 1、按重量计费 2、按体积计费
          freightDistributionList: [
            {
              distributionRegionId:['1338353936444280801'], // id
              distributionRegionName: ['默认全国'], // name
              distributionFirstWeight: 1, // 首件
              distributionFirstPrice: 0, // 首费
              distributionContinuationWeight: 1, // 续重
              distributionContinuationPrice: 0, // 续费
            }
          ], // 配送表
          freightParcelList: [], // 包邮条件
          freightNotDistribution: [], // 不配送区域
        },
        carriageRules:{
          freightName:[
            {required: true, message: '请输入模板名称', trigger: 'blur'}
          ]
        },
        cityList:[], // 城市数据
        deliveryList:[], // 配送区域城市数据
        deliveryShow:false, // 配送区域
        delivery:[], // 配送区域
        noDeliveryList: [], // 不配送区域城市数据
        noDeliveryShow: false, // 不配送区域
        noDelivery:[], // 不配送区域
        conditionList: [], // 条件包邮区域城市数据
        conditionShow: false, // 条件包邮区域
        condition: [], // 条件包邮区域
        freightId: '', // 运费id
      }
    },
    filters: {
      ArrToStr(val){
        return val.join()
      }
    },
    components: {
      SelectCity
    },
    async created() {
      await this.getPcca()
      this.freightId = this.$route.query.freightId
      if (this.freightId) {
        this.getDetails(this.freightId)
      }
    },
    methods: {
      // 获取景区详情
      getDetails(id) {
        let params = {
          freightId: id
        }
        getFreightDetails(params).then( res => {
          if (res.data.code == '1'){
            let data = res.data.data
            if (data.freightDistributionList != 0){
              data.freightDistributionList.map( (item,index) => {
                data.freightDistributionList[index].distributionRegionId = JSON.parse(item.distributionRegionId)
                data.freightDistributionList[index].distributionRegionName = JSON.parse(item.distributionRegionName)
              })
            }
            if (data.freightParcelList.length != 0){
              this.pinkage = true
              data.freightParcelList.map( (item,index) => {
                data.freightParcelList[index].parcelRegionId = JSON.parse(item.parcelRegionId)
                data.freightParcelList[index].parcelRegionName = JSON.parse(item.parcelRegionName)
              })
            }
            data.freightNotDistribution = JSON.parse(data.freightNotDistribution)
            data.freightChargingType = Number(data.freightChargingType)
            let formData = JSON.parse(JSON.stringify(data))
            for (let key in this.carriageForm) {
              if (formData[key] != null){
                this.carriageForm[key] = formData[key]
              }
            }
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      cityName(id){
        let data = this.cityList.filter( item => {
          return item.frameworkId == id
        })[0]
        return data.frameworkName
      },
      getPcca() {
        return new Promise((resolve, reject) => {
          let params = {
            id: "1338353936444280801"
          }
          getPcca(params)
            .then(res => {
              if (res.code == 1 && res.data.length && res.data){
                let data = res.data
                this.cityList = data
                resolve()
              }
            })
            .catch(err => {
              reject(err)
            })
        })
      },
      // 表单保存
      saveForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.freightId){
              this.editFreight()
            } else {
              this.addFreight()
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 提交新增请求
      addFreight(){
        let params = JSON.parse(JSON.stringify(this.carriageForm))
        params.freightDistributionList.map( (item,index) => {
          params.freightDistributionList[index].distributionRegionId = JSON.stringify(item.distributionRegionId)
          params.freightDistributionList[index].distributionRegionName = JSON.stringify(item.distributionRegionName)
        })
        if (params.freightParcelList.length != 0){
          params.freightParcelList.map( (item,index) => {
            params.freightParcelList[index].parcelRegionId = JSON.stringify(item.parcelRegionId)
            params.freightParcelList[index].parcelRegionName = JSON.stringify(item.parcelRegionName)
          })
        }
        params.freightNotDistribution = JSON.stringify(params.freightNotDistribution)
        addFreight(params)
          .then( res => {
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
          .catch( err => {})
      },
      editFreight(){
        let params = JSON.parse(JSON.stringify(this.carriageForm))
        params.freightDistributionList.map( (item,index) => {
          params.freightDistributionList[index].distributionRegionId = JSON.stringify(item.distributionRegionId)
          params.freightDistributionList[index].distributionRegionName = JSON.stringify(item.distributionRegionName)
        })
        if (params.freightParcelList.length != 0){
          params.freightParcelList.map( (item,index) => {
            params.freightParcelList[index].parcelRegionId = JSON.stringify(item.parcelRegionId)
            params.freightParcelList[index].parcelRegionName = JSON.stringify(item.parcelRegionName)
          })
        }
        params.freightNotDistribution = JSON.stringify(params.freightNotDistribution)
        params.freightId = this.freightId
        updateFreight(params)
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
      // 表单取消
      cancelForm() {
        this.$router.back()
      },
      // 过滤已选择城市
      filterCity(type){
        let cityList = JSON.parse(JSON.stringify(this.cityList))
        let toList = JSON.parse(JSON.stringify(this.carriageForm.freightDistributionList))
        let newList = []
        toList.forEach( item => {
          newList = newList.concat(item.distributionRegionId)
        })
        let noList = JSON.parse(JSON.stringify(this.carriageForm.freightNotDistribution))
        let filterList = newList.concat(noList)
        // 如果为no 再次过滤条件包邮内容
        if (type == 'no'){
          let pinkageList = JSON.parse(JSON.stringify(this.carriageForm.freightParcelList))
          let pinkage = []
          pinkageList.forEach( item => {
            pinkage = pinkage.concat(item.parcelRegionId)
          })
          filterList = filterList.concat(pinkage)
        }
        if (filterList.length >= 1) {
          filterList.map( item => {
            cityList = cityList.filter( city => {
              return city.frameworkId != item
            })
          })
        }
        return cityList
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

      .reminder{
        font-size: 14px;
        color: #999999;

        .text{
          margin-left: 20px;
        }
      }

      .noFreight{

        .noCity{
          padding-top: 15px;

          .tagCity{
            margin-right: 15px;
          }
        }
      }

      .itemTitle{
        font-size: 16px;
        text-align: justify;
        -moz-text-align-last: justify;
        text-align-last: justify;
        color: #606266;
        line-height: 40px;
        box-sizing: border-box;
        padding-left: 15px;
        width: 180px;
        font-weight: 700;
      }

      .cityItem{
        padding-top: 10px;
      }

      .monad{
        padding: 0 10px;
      }
    }

  }

</style>

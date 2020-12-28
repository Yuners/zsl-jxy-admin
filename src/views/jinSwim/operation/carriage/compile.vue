<template>
  <div class="compile">
    <div class="compileHead">
      <h1>运费模板编辑</h1>
    </div>
    <div class="compileMain">
      <el-form :model="carriageForm" :rules="carriageRules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
        <el-form-item label="模板名称：" prop="freightName">
          <el-input style="width: 350px;" v-model="carriageForm.freightName"></el-input>
        </el-form-item>
        <el-form-item label="选择包邮地区：" prop="freightIsAllFree">
          <el-radio-group v-model="carriageForm.freightIsAllFree">
            <el-radio :label="1" border>全国包邮</el-radio>
            <el-radio :label="0" border>自定义</el-radio>
          </el-radio-group>
        </el-form-item>
        <div class="block" v-show="carriageForm.freightIsAllFree == 0">
          <div class="item">
            <div class="itemTitle">
              商家包邮配送地区：
            </div>
            <el-form-item class="cityItem" label-width="50px" prop="freightFreeShipping">
              <el-checkbox-group
                v-model="carriageForm.freightFreeShipping">
                <el-checkbox style="margin-right: 0;" border size="small" v-for="city in cityList" :label="city.frameworkId" :key="city.frameworkId">{{city.frameworkName}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </div>
          <div class="item">
            <div class="itemTitle">
              需要买家付邮费地区：
            </div>
            <el-form-item label="计费方式：" prop="freightChargingType">
              <el-radio-group v-model="carriageForm.freightChargingType">
                <el-radio label="按件计费" border>按件计费</el-radio>
                <el-radio label="按重量计费" border>按重量计费</el-radio>
              </el-radio-group>
            </el-form-item>
            <div class="itemTitle">
              配送地区：
            </div>
            <el-form-item class="cityItem" label-width="50px" prop="freightNotFreeShipping">
              <el-checkbox-group
                v-model="carriageForm.freightNotFreeShipping">
                <el-checkbox style="margin-right: 0;" border size="small" v-for="city in cityList" :label="city.frameworkId" :key="city.frameworkId">{{city.frameworkName}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <div class="itemTitle">
              配送运费：
            </div>
            <div>
              <el-form-item
                label-width="80px"
                style="display: inline-block"
                label="首件："
                prop="freightFirstWeight"
              >
                <el-input style="width: 80px;" v-model="carriageForm.freightFirstWeight"></el-input>
                <span class="monad">件</span>
              </el-form-item>
              <el-form-item
                label-width="80px"
                style="display: inline-block"
                label="首费："
                prop="freightFirstPrice"
              >
                <el-input style="width: 80px;" v-model="carriageForm.freightFirstPrice"></el-input>
                <span class="monad">元</span>
              </el-form-item>
            </div>
            <div>
              <el-form-item
                label-width="80px"
                style="display: inline-block"
                label="续件："
                prop="freightContinuationWeight"
              >
                <el-input style="width: 80px;" v-model="carriageForm.freightContinuationWeight"></el-input>
                <span class="monad">件</span>
              </el-form-item>
              <el-form-item
                label-width="80px"
                style="display: inline-block"
                label="续费："
                prop="freightContinuationPrice"
              >
                <el-input style="width: 80px;" v-model="carriageForm.freightContinuationPrice"></el-input>
                <span class="monad">元</span>
              </el-form-item>
            </div>
            <el-form-item
              label-width="0"
              prop="freightFreeShippingCondition"
            >
              <el-checkbox v-model="pinkage">指定条件包邮：</el-checkbox>
              <span class="monad">满</span>
              <el-input style="width: 80px;" v-model="carriageForm.freightFreeShippingCondition"></el-input>
              <span class="monad">件包邮</span>
            </el-form-item>
          </div>
        </div>
        <el-form-item>
          <el-button type="primary" @click="saveForm('ruleForm')">保存</el-button>
          <el-button @click="cancelForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import Graphic from '@/components/graphic/index'
  import { getArea } from '@/api/common'

  export default {
    data() {
      return {
        pinkage: false,
        carriageForm:{
          freightName: '', // 模板名称
          freightIsAllFree: 1, // 是否全国包邮
          freightFreeShipping: [], // 包邮地区
          freightChargingType: '', // 计费类型(按件计费，按重量计费)
          freightNotFreeShipping: [], // 不包邮地区id
          freightFirstWeight: '', // 首件/首重
          freightFirstPrice: '', // 首费
          freightContinuationWeight: '', // 续件/续重
          freightContinuationPrice: '', // 续费
          freightFreeShippingCondition: '', // 指定条件包邮
        },
        carriageRules:{

        },
        cityList:[]
      }
    },
    components: {
      Graphic
    },
    created() {
      this.getCity()
    },
    methods: {
      // 获取地区
      getCity(){
        let params = {
          id: "1338353936444280801"
        }
        getArea(params)
          .then( res => {
            this.cityList = res.data.items
          })
          .catch( err => {
            console.log(err)
          })
      },
      // 表单保存
      saveForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 表单取消
      cancelForm() {
        this.$router.back()
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

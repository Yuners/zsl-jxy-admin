<template>
  <div class="compile">
    <div class="compileHead">
      <h1>运费模板编辑</h1>
    </div>
    <div class="compileMain">
      <el-form :model="noticeForm" :rules="noticeRules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
        <el-form-item label="模板名称：" prop="noticeName">
          <el-input style="width: 350px;" v-model="noticeForm.noticeName"></el-input>
        </el-form-item>
        <el-form-item label="电话：" prop="noticePhone">
          <el-input style="width: 350px;" v-model="noticeForm.noticePhone"></el-input>
        </el-form-item>
        <el-form-item label="发货时间：" prop="noticeDeliveryTime">
          <el-input type="textarea" v-model="noticeForm.noticeDeliveryTime"></el-input>
        </el-form-item>
        <el-form-item label="价格说明：" prop="noticePriceDescription">
          <el-input type="textarea" v-model="noticeForm.noticePriceDescription"></el-input>
        </el-form-item>
        <el-form-item label="关于快递：" prop="noticeExpressInstructions">
          <el-input type="textarea" v-model="noticeForm.noticeExpressInstructions"></el-input>
        </el-form-item>
        <el-form-item label="签收提醒：" prop="noticeSignReminder">
          <el-input type="textarea" v-model="noticeForm.noticeSignReminder"></el-input>
        </el-form-item>
        <el-form-item label="退换问题：" prop="noticeReturnExchange">
          <el-input type="textarea" v-model="noticeForm.noticeReturnExchange"></el-input>
        </el-form-item>
        <el-form-item label="温馨提示：" prop="noticeReminder">
          <el-input type="textarea" v-model="noticeForm.noticeReminder"></el-input>
        </el-form-item>
        <el-form-item class="flex_item">
          <el-button type="primary" @click="saveForm('ruleForm')">保存</el-button>
          <el-button @click="cancelForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { isMobile } from "@/utils/validate";
  import { addNotice, getNoticeDetails, updateNotice } from '@/api/Operation/userNotes'

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
        pinkage: false,
        noticeForm:{
          noticeName: '', // 模板名称
          noticePhone: '', // 电话
          noticeDeliveryTime: '无特殊说明时，一般当天16:30前付款成功的货品将于当天发出，16:30以后付款的商品则将于次日下午16:40发出；江、浙、沪地区一般1-3天到达，其它地区3-4天到达，西藏、青海、甘肃、内蒙等偏远地区3-7天，具体视情况而定，不同快递，速度稍有区别。', // 发货时间
          noticePriceDescription: '所标价格已经是很高性价比了，不再接受任何形式的议价或包邮要求。因宝贝质量、生产方式、销售策略、服务成本等的不同所造成的合理价格差异还请买家们理解。我们不提供因价格问题而要求的退换货服务。我们建议您在购物前货比三家，比较后再拍。', //价格说明
          noticeExpressInstructions: '快递一般是2-3天到达,但因所在城市不同，运送速度会有一定的不一，特别是比较偏远的地区。如果是遇到恶劣天气以及法定节假日，都会有延迟耽搁现象。另外快递公司每个网点的业务员素质也不一，中间可能出现个别网点业务员态度不好或者包裹损坏等，一些卖家无法预知的意外因素。总之有什么不愉快请联系我们，我们会积极跟快递公司沟通解决的。', //关于快递
          noticeSignReminder: '1.货品外包装完好无损，封口处无二次封装痕迹（双方预先同意事先开箱验货外）\n' +
            '2.请务必在当地配送物流面前拆包检查，确认货品是买家购买的商品，仔细检查核对和确认包装内所有附件，商品无损伤。\n' +
            '3.如果签收商品时有。如果有商品有损坏，或者其他因素，在绝收同时请及时跟我们联系。明显的破碎或者其他任何不正常，请拒收货品并及时联系我们。\n' +
            '4.如果买家有任何疑问，或者不满意，请买家及时联系我们取得沟通，我们回尽量给买家满意答复。\n' +
            '5.如有代收事宜视同本人签收的一些守则遵守。所以部分买家因为收货不方便，或者由门卫，朋友，家人代收事宜，请嘱咐代收人收货时务必检查好。', //签收提醒
          noticeReturnExchange: '1.退换商品应保持你收到商品时的原貌（商品本身有质量问题的除外）。\n' +
            '2.所有换货金额不得低于退回货品金额；换货所产生的邮资由买家自行承担；产品质量产生的邮资由卖家承担。\n' +
            '3.由于退换交易每个环节要花费双倍的精力来为您服务，不仅仅只是简单的运费问题，所以衷心希望您购买前多咨询，多比较，做到心中有数再拍下，尽量避免因反复退换给双方增加不必要的开支和重复工作。', //退换问题
          noticeReminder: '', // 温馨提示
        },
        noticeRules:{
          noticeName:[
            {required: true, message: '请填写模板名称', trigger: 'blur'}
          ],
          noticePhone:[
            {required: true, message: '请填写电话', trigger: 'blur'},
            {validator: validatePhone, trigger: "blur"}
          ],
          noticeDeliveryTime:[
            {required: true, message: '请填写发货时间', trigger: 'blur'}
          ],
          noticePriceDescription:[
            {required: true, message: '请填写价格说明', trigger: 'blur'}
          ],
          noticeExpressInstructions:[
            {required: true, message: '请填写关于快递', trigger: 'blur'}
          ],
          noticeSignReminder:[
            {required: true, message: '请填写签收提醒', trigger: 'blur'}
          ],
          noticeReturnExchange:[
            {required: true, message: '请填写退换问题', trigger: 'blur'}
          ],
        },
        noticeId:'',
      }
    },
    created() {
      this.noticeId = this.$route.query.noticeId
      if (this.noticeId) {
        this.getDetails(this.noticeId)
      }
    },
    methods: {
      // 获取用户须知详情
      getDetails(id) {
        let params = {
          noticeId: id
        }
        getNoticeDetails(params)
          .then(res => {
            if (res.data.code == '1'){
              let data = res.data.data
              let formData = JSON.parse(JSON.stringify(data))
              for (let key in this.noticeForm) {
                this.noticeForm[key] = formData[key]
              }
            } else {
              this.$message.error(res.data.msg)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      // 新增请求
      addNotice(){
        let params = this.noticeForm
        addNotice(params)
          .then( res => {
            let data = res.data
            if (data.code == 1){
              this.$message.success(data.msg)
              setTimeout( () => {
                this.$router.back()
              })
            } else {
              this.$message.error(data.msg)
            }
          })
          .catch( err => {
            console.log(err)
          })
      },
      // 修改请求
      editNotice(){
        let data = JSON.parse(JSON.stringify(this.noticeForm))
        data.noticeId = this.noticeId
        updateNotice(data)
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
      // 表单保存
      saveForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.noticeId){
              this.editNotice()
            }else {
              this.addNotice()
            }
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

      .flex_item{
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

  }

</style>

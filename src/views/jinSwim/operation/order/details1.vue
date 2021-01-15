<template>
  <div class="compile">
    <div class="compileHead">
      <h1>订单详情</h1>
    </div>
    <div class="compileMain">
      <el-form label-position="right" :model="form" ref="ruleForm" label-width="110px">
        <div class="block">
          <div class="title">
            <h3>商铺信息</h3>
          </div>
          <el-form-item label="商铺名称：" prop="sceneryName">
            <el-input :disabled="true" maxlength="20" style="width: 350px" v-model="order.shopName"></el-input>
          </el-form-item>
        </div>
        <div class="block">
          <div class="title">
            <h3>收货信息</h3>
          </div>
          <div class="clearfix feature">
            <el-form-item label="用户昵称：" prop="sceneryLabelOne">
              <el-input :disabled="true" maxlength="10" style="width: 350px" v-model="order.userName"></el-input>
            </el-form-item>
            <div style="width: 100px"></div>
            <el-form-item label="收货人：" prop="sceneryLabelTwo">
              <el-input :disabled="true" maxlength="10" style="width: 350px" v-model="order.realName"></el-input>
            </el-form-item>
          </div>
          <div class="clearfix feature">
            <el-form-item label="联系电话：" prop="sceneryLabelOne">
              <el-input :disabled="true" maxlength="10" style="width: 350px" v-model="order.userPhone"></el-input>
            </el-form-item>
            <div style="width: 100px"></div>
            <el-form-item label="收货地址：" prop="sceneryLabelTwo">
              <el-input :disabled="true" maxlength="10" style="width: 350px" v-model="order.userAddress"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="block">
          <div class="title">
            <h3>订单信息</h3>
          </div>
          <div class="clearfix feature">
            <el-form-item label="订单编号：" prop="sceneryLabelOne">
              <el-input :disabled="true" maxlength="10" style="width: 350px" v-model="order.orderId"></el-input>
            </el-form-item>
            <div style="width: 100px"></div>
            <el-form-item label="订单状态：" prop="sceneryLabelTwo">
              <el-input :disabled="true" maxlength="10" style="width: 350px" v-model="statusMap[order.status].text"></el-input>
            </el-form-item>
          </div>
          <div class="clearfix feature">
            <el-form-item label="商品总数：" prop="sceneryLabelOne">
              <el-input :disabled="true" maxlength="10" style="width: 350px" v-model="order.totalNum"></el-input>
            </el-form-item>
            <div style="width: 100px"></div>
            <el-form-item label="商品总价：" prop="sceneryLabelTwo">
              <el-input :disabled="true" maxlength="10" style="width: 350px" v-model="order.totalPrice"></el-input>
            </el-form-item>
          </div>
          <div class="clearfix feature" v-if="order.couponPrice != 0 && rder.couponPrice != null">
            <el-form-item label="商铺优惠金额：" prop="sceneryLabelOne">
              <el-input :disabled="true" maxlength="10" style="width: 350px" v-model="order.couponPrice"></el-input>
            </el-form-item>
            <div style="width: 100px"></div>
            <el-form-item label="拍立减（直播）：" prop="sceneryLabelTwo" v-if="order.livePrice != 0 && rder.livePrice != null">
              <el-input :disabled="true" maxlength="10" style="width: 350px" v-model="order.livePrice"></el-input>
            </el-form-item>
          </div>
          <div class="clearfix feature" v-if="order.paltCouponPrice != 0 && rder.paltCouponPrice != null">
            <el-form-item label="平台优惠金额：" prop="sceneryLabelOne">
              <el-input :disabled="true" maxlength="10" style="width: 350px" v-model="order.paltCouponPrice"></el-input>
            </el-form-item>
            <div style="width: 100px"></div>
            <el-form-item label="支付邮费：" prop="sceneryLabelTwo">
              <el-input :disabled="true" maxlength="10" style="width: 350px" v-model="order.payPostage"></el-input>
            </el-form-item>
          </div>
          <div class="clearfix feature">
            <el-form-item label="创建时间：" prop="sceneryLabelOne">
              <el-input :disabled="true" maxlength="10" style="width: 350px" v-model="order.addTime"></el-input>
            </el-form-item>
            <div style="width: 100px"></div>
            <el-form-item label="支付方式：" prop="sceneryLabelTwo">
              <el-input :disabled="true" maxlength="10" style="width: 350px" v-model="order.isChannel">{{payType(order.isChannel) ==null ?'未支付' : payType(order.isChannel)}}</el-input>
            </el-form-item>
          </div>
          <div class="clearfix feature">
            <el-form-item label="支付时间：" prop="sceneryLabelOne" v-if="order.payTime">
              <el-input :disabled="true" maxlength="10" style="width: 350px" v-model="order.payTime"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="block">
          <div class="title">
            <h3>商品信息</h3>
          </div>
          <div class="clearfix feature">
            <el-form-item label="用户昵称：" prop="sceneryLabelOne">
              <el-input :disabled="true" maxlength="10" style="width: 350px" v-model="order.userName"></el-input>
            </el-form-item>
            <div style="width: 100px"></div>
            <el-form-item label="收货人：" prop="sceneryLabelTwo">
              <el-input :disabled="true" maxlength="10" style="width: 350px" v-model="order.realName"></el-input>
            </el-form-item>
          </div>
          <div class="clearfix feature">
            <el-form-item label="联系电话：" prop="sceneryLabelOne">
              <el-input :disabled="true" maxlength="10" style="width: 350px" v-model="order.userPhone"></el-input>
            </el-form-item>
            <div style="width: 100px"></div>
            <el-form-item label="收货地址：" prop="sceneryLabelTwo">
              <el-input :disabled="true" maxlength="10" style="width: 350px" v-model="order.userAddress"></el-input>
            </el-form-item>
          </div>
        </div>




        <div class="block">
          <div class="title">
            <h3>交通攻略</h3>
          </div>
          <el-form-item label="自助游：" prop="sceneryIndependenttravel">
            <el-input :disabled="true" maxlength="200" show-word-limit type="textarea" v-model="form.sceneryIndependenttravel"></el-input>
          </el-form-item>
          <el-form-item label="自驾游：" prop="sceneryRoadtrip">
            <el-input :disabled="true" maxlength="200" show-word-limit type="textarea" v-model="form.sceneryRoadtrip"></el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>

  </div>
</template>

<script>
  import { getOrderDetails } from '@/api/Operation/order'
  import status from "@/views/jinSwim/operation/order/order/order.js";
  export default {
    data() {
      return {
        oId: '',// 订单id
        order: null,
        statusMap:{
          ...status
        },
      }
    },
    created() {
       this.oId = this.$route.query.orderId
       this.getDetails(this.oId)
    },
    methods: {
      // 获取订单详情
      getDetails(id) {
        console.info(id)
        getOrderDetails(id)
        .then(res => {
          console.info(res)
          if (res.data.code == '1'){
            this.order = res.data.data
          } else {
            this.$message.error(res.data.msg)
          }
        })
        .catch(err => {
          console.log(err)
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

<template>
   <el-card class="box-card" v-if="show">
        <div slot="header" class="clearfix">
            <span>订单详细</span>
        </div>
        <div>
        <el-card >
            <div class="font-weight-black" style="font-size: 18px;">商铺信息</div>
            <el-row>
                <el-col :span="12">
                    <span class="font-weight-bold" style="font-size: 14px;">商铺名称：</span>
                    <span class="font-weight-black" style="color: #BD2C00; font-size: 14px;">{{order.shopName}}</span>
                </el-col>
                <!-- <el-col cols="12">
                    <span class="font-weight-bold" style="font-size: 14px;">商家姓名：</span>
                    <span class="font-weight-black" style="color: #BD2C00; font-size: 14px;">{{order.merId}}</span>
                </el-col> -->
            </el-row>
        </el-card>
        <br/>
        <el-card >
            <div class="font-weight-black" style="font-size: 18px;">收货信息</div>
            <el-row>
                <el-col :span="12">
                    <span class="font-weight-bold" style="font-size: 14px;">用户昵称：</span>
                    <span class="font-weight-black" style="color: #BD2C00; font-size: 14px;">{{order.userName}}</span>
                </el-col>
                <el-col :span="12">
                    <span class="font-weight-bold" style="font-size: 14px;">收货人：</span>
                    <span class="font-weight-black" style="color: #BD2C00; font-size: 14px;">{{order.realName}}</span>
                </el-col>
                <el-col :span="12">
                    <span class="font-weight-bold" style="font-size: 14px;">联系电话：</span>
                    <span class="font-weight-black" style="color: #BD2C00; font-size: 14px;">{{order.userPhone}}</span>
                </el-col>
                <el-col :span="12">
                    <span class="font-weight-bold" style="font-size: 14px;">收货地址：</span>
                    <span class="font-weight-black" style="color: #BD2C00; font-size: 14px;">{{order.userAddress}}</span>
                </el-col>
            </el-row>
        </el-card >
        <br/>
        <el-card
            class="mx-auto"
            max-width="650"
        >
            <div class="font-weight-black" style="font-size: 18px;">订单信息</div>
            <el-row>
                <el-col :span="12">
                    <span class="font-weight-bold" style="font-size: 14px;">订单编号：</span>
                    <span class="font-weight-black" style="color: #BD2C00; font-size: 14px;">{{order.orderId}}</span>
                </el-col>
                <el-col :span="12">
                    <span class="font-weight-bold" style="font-size: 14px;">订单状态：</span>
                    <span class="font-weight-black" style="color: #BD2C00; font-size: 14px;">
                        {{statusMap[order.status].text}}
                    </span>
                </el-col>
                <el-col :span="12">
                    <span class="font-weight-bold" style="font-size: 14px;">商品总数：</span>
                    <span class="font-weight-black" style="color: #BD2C00; font-size: 14px;">{{order.totalNum}}</span>
                </el-col>
                <el-col :span="12">
                    <span class="font-weight-bold" style="font-size: 14px;">商品总价：</span>
                    <span class="font-weight-black" style="color: #BD2C00; font-size: 14px;">{{order.totalPrice}}</span>
                </el-col>
                <el-col :span="12" v-if="order.couponPrice != 0 && order.couponPrice !=null">
                    <span class="font-weight-bold" style="font-size: 14px;">商铺优惠金额：</span>
                    <span class="font-weight-black" style="color: #BD2C00; font-size: 14px;">{{order.couponPrice}}</span>
                </el-col>
                <el-col :span="12" v-if="order.livePrice != 0 && order.livePrice !=null">
                    <span class="font-weight-bold" style="font-size: 14px;">拍立减（直播）：</span>
                    <span class="font-weight-black" style="color: #BD2C00; font-size: 14px;">{{order.livePrice}}</span>
                </el-col>
                <el-col :span="12" v-if="order.paltCouponPrice != 0 && order.paltCouponPrice !=null">
                    <span class="font-weight-bold" style="font-size: 14px;">平台优惠金额：</span>
                    <span class="font-weight-black" style="color: #BD2C00; font-size: 14px;">{{order.paltCouponPrice}}</span>
                </el-col>
                <el-col :span="12">
                    <span class="font-weight-bold" style="font-size: 14px;">支付邮费：</span>
                    <span class="font-weight-black" style="color: #BD2C00; font-size: 14px;">{{order.payPostage}}</span>
                </el-col>
                <el-col :span="12">
                    <span class="font-weight-bold" style="font-size: 14px;">实际支付：</span>
                    <span class="font-weight-black" style="color: #BD2C00; font-size: 14px;">{{order.payPrice}}</span>
                </el-col>
                <el-col :span="12">
                    <span class="font-weight-bold" style="font-size: 14px;">创建时间：</span>
                    <span class="font-weight-black" style="color: #BD2C00; font-size: 14px;">{{order.addTime*1000 | formatDate}}</span>
                </el-col>
                    <el-col :span="12">
                    <span class="font-weight-bold" style="font-size: 14px;">支付方式：</span>
                    <span class="font-weight-black" style="color: #BD2C00; font-size: 14px;">{{payType(order.isChannel) ==null ?'未支付' : payType(order.isChannel)}}</span>
                </el-col>
                <el-col :span="12" v-if="order.payTime">
                    <span class="font-weight-bold" style="font-size: 14px;">支付时间：</span>
                    <span class="font-weight-black" style="color: #BD2C00; font-size: 14px;">{{order.payTime*1000 | formatDate}}</span>
                </el-col>
            </el-row>
        </el-card>
        <br/>
        <el-card
            class="mx-auto"
            max-width="650"
        >
        <div class="font-weight-black" style="font-size: 18px;">商品信息</div>
            <el-row>
                <el-col v-for="(item,index) in order.orderInfoList" :span="12" :key="index">
                    <span class="font-weight-bold" style="font-size: 14px;">{{goodJson(item.cartInfo).title}}</span>
                    <span class="font-weight-bold" v-if="goodJson(item.cartInfo).space !=''" style="font-size: 14px;">【{{goodJson(item.cartInfo).space}}】</span>
                    <span class="font-weight-bold" style="font-size: 14px;">￥{{goodJson(item.cartInfo).price}}</span>
                    <span class="font-weight-bold" style="font-size: 14px;">﹝{{goodJson(item.cartInfo).number}}个﹞</span>
                    <el-image
                        style="width: 100px; height: 100px"
                        :src="goodJson(item.cartInfo).src">
                    </el-image>
                    <!-- <v-img :src="goodJson(item.cartInfo).src" aspect-ratio="1.0"></v-img> -->
                </el-col>
            </el-row>
        </el-card>
        <br/>
        <el-card v-if="order.isRefund == 1"
            class="mx-auto"
            max-width="650"
        >
            <div class="font-weight-black" style="font-size: 18px;" >退款信息</div>
            <el-row>
                <el-col cols="12">
                    <span class="font-weight-bold" style="font-size: 14px;">退货类型：</span>
                    <span class="font-weight-black" style="color: #BD2C00; font-size: 14px;">{{order.refund.refundType}}</span>
                </el-col>
                <el-col cols="12">
                    <span class="font-weight-bold" style="font-size: 14px;">退货图片：</span>
                    <span v-if="order.refund.refundReasonWapImg == null" class="font-weight-black" style="color: #BD2C00; font-size: 14px;">无</span>
                    <v-container fluid v-if="order.refund.refundReasonWapImg != null">
                        <el-row justify="space-around">
                        <el-col :span="12" v-for="(item, index) in goodJson(order.refund.refundReasonWapImg)" :key="index">
                            <el-image
                                style="width: 100px; height: 100px"
                                :src="goodJson(item).url">
                            </el-image>
                        </el-col>
                        </el-row>
                    </v-container>
                </el-col>
                <el-col cols="12">
                    <span class="font-weight-bold" style="font-size: 14px;">退货申请时间：</span>
                    <span class="font-weight-black" style="color: #BD2C00; font-size: 14px;">{{order.refund.refundApplyTime|formatDate}}</span>
                </el-col>
                <el-col cols="12">
                    <span class="font-weight-bold" style="font-size: 14px;">快递单号：</span>
                    <span v-if="order.refund.isDelivery == 1" class="font-weight-black" style="color: #BD2C00; font-size: 14px;">{{order.refund.refundDeliveryId}}</span>
                    <span v-if="order.refund.isDelivery == 0" class="font-weight-black" style="color: #BD2C00; font-size: 14px;">未填写</span>
                </el-col>
                <el-col cols="12">
                    <span class="font-weight-bold" style="font-size: 14px;">退款金额：</span>
                    <span class="font-weight-black" style="color: #BD2C00; font-size: 14px;" v-if="order.refundPrice">{{order.refundPrice}}</span>
                    <span class="font-weight-black" style="color: #BD2C00; font-size: 14px;" v-else>{{order.payPrice}}</span>
                    
                </el-col>
                <el-col cols="12">
                    <span class="font-weight-bold" style="font-size: 14px;">退货用户说明：</span>
                    <span class="font-weight-black" style="color: #BD2C00; font-size: 14px;">{{order.refund.refundReasonWap}}</span>
                </el-col>
                <el-col cols="12" v-show="order.status == -2">
                    <span class="font-weight-bold" style="font-size: 14px;">不退货原因：</span>
                    <span class="font-weight-black" style="color: #BD2C00; font-size: 14px;">{{order.refund.regoodReason}}</span>
                </el-col>
                <el-col cols="12" v-show="order.status == -5">
                    <span class="font-weight-bold" style="font-size: 14px;">不退款原因：</span>
                    <span class="font-weight-black" style="color: #BD2C00; font-size: 14px;">{{order.refund.refundReason}}</span>
                </el-col>
                <el-col cols="12">
                    <span class="font-weight-bold" style="font-size: 14px;">退款结束时间：</span>
                    <span class="font-weight-black" style="color: #BD2C00; font-size: 14px;">{{order.refund.refundReasonTime*1000 | formatDate}}</span>
                </el-col>
                <el-col cols="12" v-if="order.refund.consignee">
                    <span class="font-weight-bold" style="font-size: 14px;">退货邮寄信息：</span>
                    <span class="font-weight-black" style="color: #BD2C00; font-size: 14px;">{{order.refund.consignee+'('+order.refund.contact+')'+order.refund.address+'【'+order.refund.remark+'】'}}</span>
                </el-col>
            </el-row>
            <el-button style="float: right; padding: 3px 0" type="text" @click="delivery(order.refund.refundDeliveryId)">
                <span v-if="!ifDelivery">查看物流</span>
                <span v-if="ifDelivery">关闭物流</span>
            </el-button>

        </el-card>
        <br />
        <el-card
            class="mx-auto"
            width="650"
        >
            <div class="font-weight-black" style="font-size: 18px;">用户物流信息</div>
            <el-row>
                <el-col style="padding:10px" cols="12" >
                    <span class="font-weight-bold" style="font-size: 14px;">快递公司：</span>
                    <span class="font-weight-black" style="color: #BD2C00; font-size: 14px;">{{order.deliveryName}}</span>
                </el-col>
                <el-col cols="12" >
                    <span class="font-weight-bold" style="font-size: 14px;">快递单号：</span>
                    <span class="font-weight-black" style="color: #BD2C00; font-size: 14px;">{{order.deliveryId}}</span>
                </el-col>
            </el-row>
            <el-button style="float: right; padding: 3px 0" type="text" @click="delivery(order.deliveryId)">
                <span v-if="!ifDelivery">查看物流</span>
                <span v-if="ifDelivery">关闭物流</span>
            </el-button>
        </el-card>
        <el-dialog style="text-align:center"
            title="物流信息"
            :visible.sync="ifDelivery"
            width="80%">
            <div class="block">
                <el-timeline >
                    <el-timeline-item
                        v-for="(item, index) in expressList"
                        :key="index"
                        :type="line.type"
                        :color="line.color"
                        :size="line.size"
                        :timestamp="item.map.time">
                        {{item.map.status}}
                    </el-timeline-item>
                </el-timeline>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="ifDelivery = false">关闭</el-button>
            </span>
          </el-dialog>
        <br/>
        <el-card
            class="mx-auto"
            max-width="650"
        >
            <div class="font-weight-black" style="font-size: 18px;">备注信息</div>
            <el-row>
                <el-col cols="12">
                    <span class="font-weight-black" style="color: #BD2C00; font-size: 14px;">{{order.mark}}</span>
                </el-col>
            </el-row>
        </el-card>
        <br/>
        <!-- <el-card
            class="mx-auto"
            max-width="650"
        >
            <div class="font-weight-black" style="font-size: 18px;">商家（管理员）备注信息</div>
            <el-row>
                <el-col cols="12">
                    <span class="font-weight-black" style="color: #BD2C00; font-size: 14px;">{{order.remark}}</span>
                </el-col>
            </el-row>
        </el-card> -->
        </div>
    </el-card>
</template>

<script>
    import { formatDate } from '@/utils/index.js'
    import { getOrderDetails, getOrderExpress } from '@/api/Operation/order'
    import status from "@/views/jinSwim/operation/order/order/order.js";
    import Vue from 'vue'
    export default {
        data() {
            return {
                line:{
                    "color": "blue",
                    "type": "success",
                    "size": "normal"
                },
                order: null,
                ifDelivery: false,
                ifRefundDelivery: false,
                statusMap:{
                    ...status
                },
                expressList:null,
                show:false,
                oId: '',// 订单id
            }
        },
        created(){
            this.oId = this.$route.query.orderId
            this.search()
        },
        filters: {
            formatDate(time) {
                var date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
            }
        },
        methods: {
            // 物品json装换
			goodJson(src){
				return JSON.parse(src)
            },
            payType(type){
                if(type == 1){
                    return "微信"
                }
                if(type == 2){
                    return "支付宝"
                }
                if(type == 3){
                    return "余额"
                }
                if(type == 4){
                    return "银行卡"
                }
                if(type == 5){
                    return "微信小程序"
                }
            },
            delivery(id){
                if(id=="" || id==null){
                    Vue.prototype.$message.error('没有订单号不能查询');
                    return;
                }
                this.ifDelivery = true
                this.express(id)
                // if(type==1){
                //     if(!this.ifRefundDelivery){
                //         this.ifDelivery = false
                //         this.express(id)
                //     }
                //     this.ifRefundDelivery = !this.ifRefundDelivery
                // }else{
                //     if(!this.ifDelivery){
                //         this.express(id)
                //         this.ifRefundDelivery = false
                //     }
                //     this.ifDelivery = !this.ifDelivery
                // }
                
            },
            search(){
                getOrderDetails(this.oId).then(res => {
                    if (res.data.code == '1'){
                        this.order = res.data.data
                    } else {
                        this.$message.error(res.data.msg)
                    }
                }).finally(() => { 
                    this.show=true; 
                })
            },
            express(id){
                this.expressList = null
                getOrderExpress(id).then(v => {
                    console.info(v)
                    this.expressList = JSON.parse(v.data.data.resuilt).map.result.map.list.myArrayList;
                    console.info(JSON.parse(v.data.data.resuilt).map.result.map.list.myArrayList)
                })
                .finally(() => {   
                })
            }
        },
    }
    // el-row.el-col
</script>

<style lang = "scss" scoped>
  .box-card::v-deep{
      .el-col{
          padding: 10px;
      }
  }
</style>
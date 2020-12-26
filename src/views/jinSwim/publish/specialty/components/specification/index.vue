<template>
  <div class="addGraphic">
    <el-dialog
      class="addMain"
      :visible.sync="addShow"
      :before-close="cancel"
      :show-close="false"
      center>
      <el-form :model="graphic" :rules="graphicRules" ref="graphicForm" label-width="110px" class="demo-ruleForm">
        <el-form-item label="规格参数：" prop="specsParam">
          <el-input
            type="textarea"
            v-model="graphic.specsParam"
            maxlength="500"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="库存数量：" prop="specsNumber">
          <el-input maxlength="20" style="width: 350px" v-model="graphic.specsNumber"></el-input>
        </el-form-item>
        <el-form-item label="商品单位：" prop="specsUnit">
          <el-input maxlength="20" style="width: 350px" v-model="graphic.specsUnit"></el-input>
        </el-form-item>
        <el-form-item label="销售价格：" prop="specsPrice">
          <el-input maxlength="20" style="width: 350px" v-model="graphic.specsPrice"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button size="medium" type="primary" @click="bySaving()">保 存</el-button>
          <el-button size="medium" @click="cancel()">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        // 图文详情
        graphic: {
          specsParam: '', // 规格参数
          specsNumber: '', // 数量
          specsUnit: '', // 单位
          specsPrice: '', // 价格
        },
        graphicRules: {
          specsParam: [
            {required: true, message: '请填写文字描述', trigger: 'blur'}
          ],
          specsNumber: [
            {required: true, message: '请填写库存数量', trigger: 'blur'}
          ],
          specsUnit: [
            {required: true, message: '请填写商品单位', trigger: 'blur'}
          ],
          specsPrice: [
            {required: true, message: '请填写销售价格', trigger: 'blur'}
          ],
        },
      }
    },
    props:{
      graphicData:{
        type: Object,
        default:{}
      },
      addShow:{
        type: Boolean,
        default: false
      }
    },
    watch:{
      graphicData(val){
        if (val.type == 'edit'){
          for ( let key in this.graphic){
              this.graphic[key] = val.data[key]
          }
        }
      }
    },
    methods: {
      // 提交
      bySaving() {
        this.$refs.graphicForm.validate((valid) => {
          if (valid) {
            let data = JSON.parse(JSON.stringify(this.graphic))
            this.$emit('submit',data)
            this.$refs.graphicForm.resetFields();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      // 取消图文详情添加
      cancel() {
        this.$emit('close')
        this.$refs.graphicForm.resetFields();
      },
    }
  }
</script>

<style scoped lang="scss">

  .addGraphic {

    .addMain {

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

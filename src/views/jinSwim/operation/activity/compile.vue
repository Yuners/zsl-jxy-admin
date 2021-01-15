<template>
  <div class="compile">
    <div class="compileHead">
      <h1>活动编辑</h1>
    </div>
    <div class="compileMain">
      <el-form label-position="right" :model="form" :rules="rules" ref="ruleForm" label-width="110px">
        <div class="block">
          <div class="title">
            <h3>编辑特产活动</h3>
          </div>
          <el-form-item label="活动名称：" prop="activityName">
            <el-input maxlength="20" style="width: 350px" v-model="form.activityName"></el-input>
          </el-form-item>
          <el-form-item label="活动时间：" prop="activityTime" >
            <el-date-picker
              v-model="form.activityTime"
              type="daterange"
              align="right"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              @change="getTime">
            </el-date-picker>
          </el-form-item>
        </div>
      </el-form>
    </div>

    <!-- <graphic :addShow="addShow" :graphicData="graphicData" @submit="bySaving" @close="cancel"></graphic>
    <specification :add-show="specifShow" :graphicData="specifData" @submit="saveSpecif" @close="cancelSpecif"></specification> -->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        
        // 表单字段
        form: {
          activityName: '', // 活动名称
          activityStartTime:'',//开始时间
          activityEndTime:'',//开始时间
          activityTime:'',
        },
        // 表单验证
        rules: {
          activityName: [
            {required: true, message: '请填写特产名称', trigger: 'blur'}
          ],
          activityTime:[
             {required: true, message: '请选择活动时间', trigger: 'blur'}
          ]
        },
         pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          },
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        
      }
    },
    components: {
      
    },
    created() {
      
    },
    methods: {
      
      getTime(maxDate){
        this.form.activityStartTime=maxDate[0];
        this.form.activityEndTime=maxDate[1];
        // console.log(maxDate)
        // console.log(this.form.activityStartTime)
        //  console.log(this.form.activityEndTime)
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
    .tooltip{
      margin-left: 30px;
      color: #999999;
    }
  }

</style>

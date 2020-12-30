<template>
  <div class="selectCity">
    <el-dialog
      title="选择城市"
      :visible.sync="cityShow"
      width="50%"
      :before-close="handleClose">
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group  v-model="checkedCities" @change="handleCheckedCitiesChange">
        <el-checkbox style="width: 20%;padding: 7px 0" v-for="city in cityList" :label="city.frameworkId" :key="city.frameworkId">{{city.frameworkName}}</el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { getPcca } from "@/api/common";

  export default {
    props:{
      cityShow: {
        type: Boolean,
        default: false
      },
      cityList: {
        type: Array,
        default: []
      },
    },
    data(){
      return {
        checkAll: false,
        checkedCities: [],
        isIndeterminate: false,
        cityListId:[]
      }
    },
    watch: {
      cityList(data){
        let idList = []
        data.map(item => {
          idList.push(item.frameworkId)
        })
        this.cityListId = idList
      }
    },
    created() {
    },
    methods: {
      handleCheckAllChange(val) {
        this.checkedCities = val ? this.cityListId : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cityList.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cityList.length;
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.$emit('close')
            this.checkAll = false
            this.isIndeterminate = false
            this.checkedCities = []
          })
          .catch(_ => {});
      },
      submit(){
        let cityData = []
        this.checkedCities.map( item => {
          let data = this.cityList.filter( city => {
            return city.frameworkId == item
          })[0]
          cityData.push(
            {
              frameworkId:data.frameworkId,
              frameworkName:data.frameworkName
            })
        })
        this.$emit('change', cityData)
        this.checkAll = false
        this.isIndeterminate = false
        this.checkedCities = []
      }
    }
  }
</script>

<style scoped>

</style>

<template>
  <div class="compile">
    <div class="compileHead">
      <h1>运费模板编辑</h1>
    </div>
    <div class="compileMain">
    </div>
  </div>
</template>

<script>
  import Graphic from '@/components/graphic/index'

  export default {
    data() {
      return {

      }
    },
    components: {
      Graphic
    },
    created() {

    },
    methods: {

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


    }

  }

</style>

<template>
  <div class="app-container">
    <el-tree
      ref="tree2"
      :data="tree"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
      default-expand-all
      @node-click="handleNodeClick"
    />

  </div>
</template>

<script>
import { selectDirectoryTree } from '@/api/Role/directoryTree'
export default {

  data() {
    return {
      listLoading: true, // 加载
      tree:[],
      defaultProps: {
        children: 'items',
        label: 'directoryTreeName'
      },
      
    }
  },
  watch: {
    
  },
  mounted() {
    this.search();
  },
  methods: {
    search(){
      this.listLoading = true;
      let params = {
        isDisable: true,
        isPage:true
      };
      selectDirectoryTree(params).then(v=>{
        console.log("yes");
        console.log(v);
        this.listLoading = false;
        this.tree=v.data
      })
      .catch( err => {
        this.$message.error('服务器错误')
        this.listLoading = false;
      })
    },
    filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
    },
    handleNodeClick(data){
      console.log(data)
    }
  }
}
</script>

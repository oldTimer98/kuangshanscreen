<template>
  <div>
    <zu-ji></zu-ji>
  </div>
</template>

<script>
  import ZuJi from './components/zuji.vue'
  export default {
    components: {
      ZuJi,
    },
  }
</script>

<style lang="scss" scoped>
  ::v-deep .el-table th.el-table__cell > .cell {
    font-weight: 600;
  }
</style>

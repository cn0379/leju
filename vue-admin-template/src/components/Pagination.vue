<template>
  <div>
    <el-pagination
      style="margin-top: 30px;text-align:center;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.start"
      :page-sizes="page.sizes"
      :page-size="page.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.totalCount"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    page: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      
    };
  },
  methods: {
    handleSizeChange(e) {
      this.page.limit = e
      this.$emit('refreshList')
    },
    handleCurrentChange(e) {
      this.page.start = e
      this.$emit('refreshList')
    },
  },
};
</script>

<style lang='scss' scoped>
</style>

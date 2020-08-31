<template>
  <div>
    <div class="title" v-text="title">基本信息</div>
    <el-row class="table">
      <el-col v-for="(item,idx) in data" :key="idx" :span="layout">
        <div class="table-cell-head">
          <span>{{ idx }}</span>
        </div>
        <div class="table-cell-body">
          <span>{{ item }}</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
    },
    layout: {
    },
    title: {
      type: String,
    },
  },
  data() {
    return {};
  },
};
</script>
 
<style  lang='scss' scoped>
.title {
  padding: 30px 0;
  font-weight: 700;
}
.table {
  border-left: 1px solid #dcdfe6;
  border-top: 1px solid #dcdfe6;
  .table-cell-head {
    border-right: 1px solid #dcdfe6;
    border-bottom: 1px solid #dcdfe6;
    padding: 10px;
    font-size: 14px;
    text-align: center;
    color: #606266;
    background-color: #f5f7fa;
  }
  .table-cell-body {
    border-right: 1px solid #dcdfe6;
    border-bottom: 1px solid #dcdfe6;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    text-align: center;
    color: #606266;
  }
}
</style>

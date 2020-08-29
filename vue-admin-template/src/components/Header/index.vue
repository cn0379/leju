<template>
  <div class="main">
    <el-card class="card" shadow="never">
      <div slot="header" >
        <span>搜索条件</span>
      </div>
      <el-row :gutter="30" >
        <el-col :span="8">
          <el-input placeholder="请输入用户名称" size="small" />
        </el-col>
         <el-col :span="8">
          <el-input placeholder="请输入手机号" size="small" />
        </el-col>
        <el-col :span="4" >  
            <el-button size="small"  >重置</el-button>
            <el-button size="small" type="primary" >搜索</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {};
  },
};
</script>
 
<style  lang='scss' scoped>
.main {
  .card {
    margin: 30px;
  }
}
</style>

<template>
  <div class="main">
    <el-card class="card" shadow="never">
      <div slot="header">
        <span>搜索条件</span>
      </div>
      <el-row :gutter="30">
        <el-col :span="5">
          <el-input :placeholder="`请输入${title}`" v-model="search.target" size="small" />
        </el-col>
        <el-col :span="5">
          <el-input v-if="isShow" v-model="search.info" :placeholder="`请输入${desc}号`" size="small" />
        </el-col>
        <el-col :span="4">
          <el-select size="small" v-model="search.status" clearable :placeholder="status">
            <el-option
              v-for="( key, value ) in listOne"
              :key="key"
              :label="key"
              :value="value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-select size="small" v-model="search.statusend" clearable :placeholder="isClose">
            <el-option
              v-for="( key, value ) in listTwo"
              :key="key"
              :label="key"
              :value="value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-button size="small">重置</el-button>
          <el-button size="small" type="primary" @click="doSearch">搜索</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    title: {
      type: String,
      default: "",
    },
    desc: {
      type: String,
      default: "",
    },
    isShow: {
      type: Boolean,
    },
    listOne:{
      type: Object,
    },
    listTwo:{
      type: Object,
    },
    status: {
      type: String,
    },
    isClose: {
      type: String
    },
  },
  data() {
    return {
      search: {},
    };
  },
  methods: {
    // 搜索
    doSearch() {
      this.$emit("resetList", this.search);
    },
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

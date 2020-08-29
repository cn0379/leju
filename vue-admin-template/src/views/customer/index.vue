<template>
  <div class="customer-main">
    <el-card class="card" shadow="never">
      <Header />
      <div style="margin:30px">
        <el-table border :data="customerList" v-loading="loading">
          <el-table-column align="center" width="50" label="#" type="index"></el-table-column>
          <el-table-column align="center" width="200" label="头像">
            <template slot-scope="scope">
              <el-image class="pic" fit="cover" :src="scope.row.avatar"></el-image>
            </template>
          </el-table-column>
          <el-table-column align="center" width="200" prop="username" label="用户名"></el-table-column>
          <el-table-column align="center" width="200" prop="nickname" label="昵称"></el-table-column>
          <el-table-column align="center" width="250" prop="tel" label="电话号码"></el-table-column>
          <el-table-column align="center" width="220" prop="email" label="邮箱"></el-table-column>
          <el-table-column align="center" width="280" prop="addTime" label="注册时间"></el-table-column>
          <el-table-column align="center" fixed="right">
            <template slot-scope="scope">
              <span class="view" @click="viewUser(scope.row.id)">查看明细</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <Pagination @refreshList="getcustomerList" :page="page" />
    </el-card>
  </div>
</template>

<script>
import Header from "@/components/Header/index";
import Pagination from "@/components/Pagination";
import PageMixins from "@/mixin/pageMixin";
import customerApi from "@/api/customer/index";

export default {
  components: {
    Header,
    Pagination,
  },
  mixins: [PageMixins],
  data() {
    return {
      loading: false, // 加载交互
      customerList: [], // 客户列表
    };
  },
  created() {
    this.getcustomerList();
  },
  methods: {
    // 获取用户列表
    getcustomerList() {
      this.loading = true;
      delete this.page.sizes;
      customerApi
        .customerList({
          ...this.page,
        })
        .then((res) => {
          this.customerList = res.data.list;
          this.page.totalCount = res.data.totalRow;
          this.loading = false;
        });
    },
    // 查看用户明细
    viewUser(id) {
      customerApi.customerDetail({ id: id }).then( res =>{
        console.log(res)
      })
    }
  },
};
</script>
 
<style  lang='scss' scoped>
.customer-main {
  .card {
    margin: 30px;
    .pic {
      width: 80px;
      height: 80px;
    }
    .view {
      cursor: pointer;
      color: #40b6fd;
    }
  }
}
</style>

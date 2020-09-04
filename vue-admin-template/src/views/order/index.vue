<template>
  <div class="order-main">
    <Header 
     @resetList="getOrderList($event)"
     status="状态查询" 
     isClose="是否关闭" 
     title="用户名" 
     :listOne="orderStatusInfo" 
     :listTwo="isStatus" 
     :isShow="false" 
     />
    <el-card class="card" shadow="never" >
      <el-table :data="orderList"  v-loading="loading" border >
        <el-table-column label="#" align="center" width="50" type="index" ></el-table-column>
        <el-table-column label="订单编号" align="center" width="200" prop="orderId" ></el-table-column>
        <el-table-column label="添加时间" align="center" width="200" prop="addTime" ></el-table-column>
        <el-table-column label="用户账号" align="center" width="180" prop="username" ></el-table-column>
        <el-table-column label="订单金额" align="center" width="100" prop="price" ></el-table-column>
        <el-table-column label="订单数量" align="center" width="80" prop="count" ></el-table-column>
        <el-table-column label="订单状态" align="center" width="120">
          <template slot-scope="scope" >
              <el-tag  v-if="scope.row.orderStatus=='0'"  type="warning" size="mini">未付款</el-tag>
              <el-tag  v-if="scope.row.orderStatus=='1'"  color="#E6FFFB" size="mini">已付款</el-tag>
              <el-tag  v-if="scope.row.orderStatus=='2'"  size="mini">已发货</el-tag>
              <el-tag  v-if="scope.row.orderStatus=='3'"  type="success" size="mini">已收货</el-tag>
              <el-tag  v-if="scope.row.orderStatus=='9'"  type="danger" size="mini">申请退款</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="支付类型" align="center" width="80" prop="payType" ></el-table-column>
        <el-table-column label="是否关闭" align="center" width="100" prop="" >
           <template slot-scope="scope">
              <el-tag  v-if="scope.row.statusend=='0'"  type="success" size="mini">正在进行</el-tag>
              <el-tag  v-else type="danger" size="mini">已关闭</el-tag>
             </template>
        </el-table-column>
        <el-table-column label="完成时间" align="center" width="200" prop="payTime" ></el-table-column>
        <el-table-column fixed="right"  align="center" label="操作" width="200">
          <template slot-scope="scope" >
            <el-button type="primary" size="small" @click="doViewOrder(scope.row.orderId)">查看订单</el-button>
          </template>
        </el-table-column>
      </el-table>
      <Pagination  @refreshList="getOrderList" :page="page" />
    </el-card>
  </div>
</template>

<script>
import Header from "@/components/Header/index";
import PageMixin from "@/mixin/pageMixin";
import Pagination from "@/components/Pagination";
import orderApi from '@/api/order/index'
import NP from 'number-precision'

export default {
  components: {
    Header,
    Pagination,
  },
  mixins: [PageMixin],
  data() {
    return {
      loading: false, // 加载交互
      orderList: [], // 订单列表
      orderStatusInfo: { // 状态信息
        '0': '未付款',
        '1': '已付款',
        '2': '已发货',
        '3': '已收货',
        '9': '申请退款',
      },
      isStatus: {  // 是否关闭
        '0' : '正在进行',
        '1' : '已关闭'
      },
      orderInfoText: '', // 付款状态 
      tagType: ''// 标签类型
    };
  },
  created() {
    this.getOrderList()
  },
  computed: {
    
  },
  methods: {
    //获取订单
    async getOrderList (search) {
      this.loading = true;
      delete this.page.sizes;
      // 替换对象键名
      if(search) {
        search.username = search.target
        delete search.target
      }
      var submitObj = {
        ...this.page,
         ...search
      }
      const { data } = await orderApi.orderList(submitObj)
      this.orderList = data.list
      this.page.totalCount = data.totalRow;
      this.loading = false;
    },
    // 查看订单
    doViewOrder (orderId) {
      this.$router.push({name:'OrderDetail',params:{ id: orderId }})
    },
  },
};
</script>

<style  lang='scss' scoped>
.order-main {
  background-color: #F5F7FA;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  &::-webkit-scrollbar {display:none}
  .card {
    margin: 30px;
  }
}
</style>

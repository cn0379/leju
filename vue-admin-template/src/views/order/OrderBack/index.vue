<template>
  <div class="orderBack-mian">
    <Header />
    <el-card class="card" shadow="never">
       <el-table :data="orderBackList" border v-loading="loading">
          <el-table-column label="#" align="center" prop="" width="50" ></el-table-column>
          <el-table-column label="订单编号" align="center" prop="orderId" width="220" ></el-table-column>
          <el-table-column label="申请时间" align="center" prop="addtime" width="220" ></el-table-column>
          <el-table-column label="用户账户" align="center" prop="username" width="120" ></el-table-column>
          <el-table-column label="订单金额" align="center" prop="order_price" width="120" ></el-table-column>
          <el-table-column label="订单数量" align="center" prop="count" width="100" ></el-table-column>
          <el-table-column label="是否关闭" align="center" prop="" width="140" >
            <template slot-scope="scope">
              <el-tag  v-if="scope.row.statusend=='0'"  type="success" size="mini">正在进行</el-tag>
              <el-tag  v-else type="danger" size="mini">已关闭</el-tag>
             </template>
          </el-table-column>
          <el-table-column label="退货状态" align="center" prop="" width="270" >
              <template slot-scope="scope" >
                <el-tag  v-if="scope.row.process=='0'"  type="warning" size="mini">等待处理</el-tag>
                <el-tag  v-if="scope.row.process=='1'"  color="#E6FFFB" size="mini">确认退货,等待收货</el-tag>
                <el-tag  v-if="scope.row.process=='2'"  size="mini">确认收货,已退款</el-tag>
                <el-tag  v-if="scope.row.process=='9'"  type="danger" size="mini">拒绝退货</el-tag>
          </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" align="center" >
            <template slot-scope="scope" >
            <el-button type="primary" size="small" @click="doViewOrderBack(scope.row.backId)" >查看退单</el-button>
          </template>
          </el-table-column>
       </el-table>
       <Pagination @refreshList="getOrderBackList" :page="page" />
    </el-card>
 </div>
</template>

<script>
import Header from '@/components/Header/index'
import pageMixin from '@/mixin/pageMixin'
import Pagination from "@/components/Pagination";
import orderBackApi from '@/api/order/orderBack/index'

export default {
  name:'OrderBack',
  mixins:[pageMixin],
  components:{
    Header,
    Pagination,
  },
  data () {
    return {
      orderBackList: [], // 退单列表
      loading: false // 加载交互
    }
  },
  created() {
    this.getOrderBackList()
  },
  methods: {
    // 获取列表
    async getOrderBackList() {
      this.loading = true
      delete this.page.sizes
      const { data }  = await orderBackApi.orderBackList(this.page)
      console.log(data)
      this.page.totalCount = data.totalRow
      this.orderBackList = data.list
      this.loading = false
    },
    // 查看退单明细
    doViewOrderBack (backId) {
      this.$router.push({name:'OrderBackDetail',params:{ id: backId }})
    }
  },
}

</script>

<style  lang='scss' scoped>
  .orderBack-mian {
    background-color: #F5F7FA;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;
      .card {
        margin: 30px;
      }
  }

</style>

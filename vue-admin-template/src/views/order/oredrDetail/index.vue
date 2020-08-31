<template>
  <div class="orderdetail-main">
    <div class="step">
      <el-steps :space="300" :active="step" finish-status="success">
        <el-step title="未付款" :description="orderInfo.addTime"></el-step>
        <el-step title="已付款" :description="orderInfo.payTime"></el-step>
        <el-step title="已发货" :description="orderInfo.sendTime"></el-step>
        <el-step title="已收货" :description="orderInfo.receiveTime"></el-step>
        <el-step title="已关闭" :description="orderInfo.doneTime"></el-step>
      </el-steps>
    </div>
    <el-col :offset="1" class="btn" >
        <el-button size="small" type="primary" @click="back" >返回</el-button>
    </el-col>
    <el-card class="card" shadow="never">
      <div slot="header">
        <el-tag :type="tagType" class="order-status">当前订单状态:{{ orderInfoText }}</el-tag>
      </div>
      <div>
        <BaseTable :data="orderBaseInfo" title="基本信息" :layout="4" />
        <BaseTable :data="userInfo" title="收货人信息" :layout="4" />
        <div class="title">商品信息</div>
        <el-table :data="curGoodsInfo" border>
          <el-table-column label="#" align="center" type="index" width="50"></el-table-column>
          <el-table-column label="商品图片" align="center" prop="" width="180">
            <template slot-scope="scope" >
              <el-image :scr="scope.row.cover_img" fit="cover" style="width:80;height:80"></el-image>
            </template>
          </el-table-column>
          <el-table-column label="商品名称" align="center" prop="gname" width="200" ></el-table-column>
          <el-table-column label="型号/型号" align="center" prop="" width="200">
            <template slot-scope="scope" >
              货号/型号: {{ scope.row.sku_code }} {{ scope.row.color_text }}
            </template>
          </el-table-column>
          <el-table-column label="数量" align="center" prop="count" width="150" ></el-table-column>
          <el-table-column label="是否退货" align="center" prop="" width="300">
            <template  slot-scope="scope">
                <p v-if="!scope.row.backId">否</p>
                <a v-if="scope.row.backId" style="color:red" href="#">是</a>
            </template>
          </el-table-column>
          <el-table-column label="支付金额" align="center" prop="price"></el-table-column>
        </el-table>
        <el-col :offset="22">
           <div class="total"> 合计{{ total }}元</div>
        </el-col>
        <BaseTable :data="costInfo" title="费用信息" :layout="6" />
        <BaseTable :data="otherInfo" title="退货信息" :layout="6" />
      </div>
        <el-col :offset="11" class="btn" >
          <el-button type="primary">已发货</el-button>
        </el-col>
    </el-card>
  </div>
</template>

<script>
import BaseTable from '../BaesTable/index'
import orderApi from '@/api/order/index'
import NP from 'number-precision'

export default {
  components: {
    BaseTable
  },
  data() {
    return {
      active: 0,
      orderInfo: {},// 订单信息
      userOrderInfo: {}, // 用户信息
      curGoodsInfo: [], // 商品信息
      orderInfoText: '', // 付款状态文字描述 
      costOrderInfo: {}, // 其他信息
      tagType: '',// 标签类型
      active: 0, // 步骤高亮
    };
  },
  created() {
    let id = this.$route.params.id
    this.initMethods(id)
  },
  computed: {
    orderBaseInfo() {
      return {
        订单编号: this.orderInfo.orderId,
        用户账号: this.orderInfo.username,
        订单金额: this.orderInfo.price,
        订单数量: this.orderInfo.count,
        订单状态: '',
        下单时间: this.orderInfo.addTime,
        付款时间: this.orderInfo.payTime,
        发货时间: this.orderInfo.sendTime,
        收货时间: this.orderInfo.receiveTime,
        退单时间: this.orderInfo.backTime,
        结束时间: this.orderInfo.endTime,
        其他: '',
      };
    },
    userInfo () {
      return {
        收货人: this.userOrderInfo.name,
        手机号码: this.userOrderInfo.tel,
        邮政编码: this.userOrderInfo.cityCode,
        地市: this.userOrderInfo.cityStr,
        详细地址: this.userOrderInfo.cityBak,
        邮箱: this.userOrderInfo.email || '无'
      }
    },
    costInfo() {
      return {
        商品合计: this.costOrderInfo.count,
        运费: this.costOrderInfo.freight,
        订单金额: this.costOrderInfo.price,
        实际付款:  this.costOrderInfo.price * this.costOrderInfo.count,
      }
    },
    otherInfo () {
      return {
         申请人: '',
         退款金额: '',
         退货商品: '',
         申请时间: '',
      }
    },
     // 合计
    total() {
     var total = this.curGoodsInfo.reduce( (cur,pre) => {
        cur += (pre.price * pre.count)
        cur = NP.round(cur, 2)
        return cur
      },0)
      return total
    },
    // 状态高亮 
    step() {
      if (this.orderInfo.statusend == '1') return 4
      return parseInt(this.orderInfo.orderStatus) + 1
    }
  },
  methods: {
    initMethods (id) {
      this.getUserInfo(id)
      this.getCurOrder(id)
      this.getGoodsInfo(id)
    },
    // 获取基本信息
    async getCurOrder (id) {
      const  { data }   = await orderApi.orderList({ orderId: id })
      this.orderInfo = data.list[0]
      this.costOrderInfo = data.list[0]
      this.getOrderStatus()
    },
    // 获取用户信息
    async getUserInfo (id) {
      console.log(id)
      const { data } = await orderApi.uesrOrderInfo({ orderId: id })
      data.cityCode =  data.cityCode.substring(0,5)
      this.userOrderInfo = data || {}
    },
    // 获取商品详情信息
    async getGoodsInfo (id) {
      const { data } = await orderApi.orderDetail({ orderId: id })
      this.curGoodsInfo = data
    },
    // 返回上一级路由
    back () {
      this.$router.go(-1)
    },
    // 精确计算
    npRound(n) {
      return NP.round(n, 2)
    },
    // 订单状态
    getOrderStatus() {
      console.log(this.orderInfo)
      let status = this.orderInfo.statusend
      switch(status){
        case '1':
          this.tagType = 'danger'
          this.orderInfoText = '已关闭'
          break;
        case '0':
          this.tagType = 'success'
          this.orderInfoText = '进行中...'
          break;
        }
     },
  },
};
</script>

<style  lang='scss' scoped>
.orderdetail-main {
  .step {
    margin: 0 250px;
  }
  .step {
    margin-top: 40px;
    .el-steps {
      justify-content: center;
    }
  }
  .title {
    padding: 30px 0;
    font-weight: 700;
  }
  .card {
    margin: 40px;
    .total {
      font-size: 18px;
      padding-top: 20px;
      color: #ff0000;
    }
    .order-status {
      
    }
  }
  .btn {
    padding: 20px 0;
  }
}
</style>

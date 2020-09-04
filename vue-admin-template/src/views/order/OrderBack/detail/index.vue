<template>
  <div class="orderBack-main" >
    <el-card class="card" shadow="nerver" >
      <el-table :data="product" border>
         <el-table-column align="center" label="商品图片" width="200" >
            <template slot-scope="scope">
               <el-image :src="scope.row.cover_img" fit="cover" style="width:150px;height:100px;" ></el-image>
            </template>
         </el-table-column>
         <el-table-column align="center" label="商品描述" width="" >
            <template slot-scope="scope" >
              <p>{{ scope.row.gname }}</p>
              <p>品牌: {{ scope.row.brandName }} | {{ scope.row.brandEname }} </p>
              <p>{{ scope.row.gdescr }}</p>
            </template>
         </el-table-column>
         <el-table-column align="center" label="价格/货号"  width="" >
            <template slot-scope="scope" >
              价格: {{ scope.row.p_price }}
              货号: {{ scope.row.sku_code }}
            </template>
         </el-table-column>
         <el-table-column align="center" label="商品属性" prop="color_text" width=""></el-table-column>
         <el-table-column align="center" label="数量" prop="count" width=""></el-table-column>
         <el-table-column align="center" label="小计" prop="p_price" width="" ></el-table-column>
      </el-table>
        <BaseTable title="订单信息" :data="orderBackInfo" :layout="8" />
      <el-row class="table">
        <el-col :span="12" >
          <div class="table-cell-head">
            <span>订单金额</span>
          </div>
          <div class="table-cell-body">
            <span>{{ orderBackList.order_price }}</span>
          </div>
        </el-col>
        <el-col :span="12" >
          <div class="table-cell-head">
            <span>退单金额</span>
          </div>
          <div class="table-cell-body">
             <el-input-number 
             v-if="orderBackList.process == 0" 
             v-model="back_price" 
             readonly
             style="text-indent:0" 
             size="mini" 
             :min="0"
             label />
            <span v-else >{{ orderBackList.back_price }}</span>
          </div>
        </el-col>
      </el-row>

      <el-row class="table">
          <el-col v-if="orderBackList.process=='0'" :span="12">
            <div class="table-cell-head">
              <span>处理备注:</span>
            </div>
            <div class="table-cell-body">
              <el-input v-model="handlebak" size="mini" placeholder="通过/拒绝的处理备注信息" />
            </div>
          </el-col>
          <el-col v-if="(orderBackList.process ==1 || orderBackList.process==9)&& orderBackList.statusend==0" :span="12">
            <div class="table-cell-head">
              <span>完成订单备注:</span>
            </div>
            <div class="table-cell-body">
              <el-input v-model="endbak" size="mini" placeholder="收货后关闭订单的备注信息" />
            </div>
          </el-col>
      </el-row>
      
      <el-row class="table" >
          <el-col :span="12">
            <div class="table-cell-head">
              <span>处理订单备注:</span>
            </div>
            <div class="table-cell-body">
              <span>{{ orderBackList.handlebak }}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="table-cell-head">
              <span>处理时间:</span>
            </div>
            <div class="table-cell-body">
              <span>{{ orderBackList.handletime }}</span>
            </div>
          </el-col>
           <el-col :span="12">
            <div class="table-cell-head">
              <span>处理完成备注:</span>
            </div>
            <div class="table-cell-body">
              <span>{{ orderBackList.endbak }}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="table-cell-head">
              <span>处理时间:</span>
            </div>
            <div class="table-cell-body">
              <span>{{ orderBackList.endtime }}</span>
            </div>
          </el-col>
        </el-row>
       <div v-if=" this.orderBackList.statusend=='0'" class="footer" style="margin: 30px auto; text-align: center;">
          <el-button v-if="this.orderBackList.process=='0'" type="default" @click="rejectBack" >拒绝退货</el-button>
          <el-button v-if="this.orderBackList.process=='0'" type="primary" @click="agreeBack" >确认退货</el-button>
          <el-button v-if="this.orderBackList.process=='1'" type="primary" @click="backDone" >收到退货</el-button>
          <el-button v-if="this.orderBackList.process=='9'" type="primary" @click="closeDone" >关闭订单</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import orderBackApi from '@/api/order/orderBack/index'
import BaseTable from '../../BaesTable/index'
import { Tip } from "@/utils/index";

export default {
  components: {
    BaseTable
  },
  data () {
    return {
      orderBackList: {
      }, // 退单列表
      backId:'',
      endbak:'',
      handlebak: ''
    }
  },
  created() {
    let backId = this.$route.params.id
    this.backId = this.$route.params.id
    this.getCurOrderBack(backId)
  },
  computed : {
    // 产品列表
    product() {
      var productList  = {
        ...this.orderBackList.product,
        count: this.orderBackList.count
      }
      return [productList]
    },
    orderBackInfo() {
      return {
        退单编号: this.backId,
        当前状态: this.orderBackList.process,
        订单编号: this.orderBackList.orderId,
        申请时间: this.orderBackList.addtime,
        用户账户: this.orderBackList.username,
        联系人: this.orderBackList.sendUser,
        退单理由: this.orderBackList.reason,
        联系电话: this.orderBackList.tel,
        收获地址: this.orderBackList.cityStr,
        邮编: this.orderBackList.cityCode,
        详细地址: this.orderBackList.cityBak,
      };
    },
  },
  methods: {
    // 获取退单列表
    async getCurOrderBack(backId) {
      const { data } = await orderBackApi.orderBackDetail({ id: backId })
      console.log(data)
      if(data.cityCode){
        data.cityCode =  data.cityCode.substring(0,5)
      }
      this.orderBackList = data
    },
    // 关闭订单
    closeDone() {
      orderBackApi.closeOrder({
        id: this.backId,
        bak: this.endbak
      }).then( res => {
        Tip(res,'关闭订单',location.reload())
      })
    },
    // 收到退货关闭订单
    backDone() {
      orderBackApi.orderBackDone({
        id: this.backId,
        bak: this.endbak
      }).then( res => {
        Tip(res,'操作',location.reload())
      })
    },
    // 同意退货
    agreeBack () {
       orderBackApi.agreeBackOrder({
        id: this.backId,
        bak: this.handlebak,
        back_price: this.back_price
      }).then( res => {
        Tip(res,'操作',location.reload())
      })
    },
    // 拒绝退货
    rejectBack () {
      orderBackApi.rejectBackOrder({
          id: this.backId,
          bak: this.handlebak,
      }).then( res => {
        Tip(res,'操作',location.reload())
      })
    }
  }, 
}

</script>

<style  lang='scss' scoped>
  .orderBack-main {
      .card {
        margin: 30px;
      }
      .table {
        margin-top: 20px;
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
  }

</style>

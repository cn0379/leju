<template>
  <div class="skuDetail-main">
    <el-dialog title="收货地址" width="60%" :visible.sync="dialog" :before-close="handleClose">
      <el-table :data="skuList" border stripe>
        <el-table-column width="140" align="center" prop="color_text" label="颜色"></el-table-column>
        <el-table-column width="140" align="center" prop="color" label="色值"></el-table-column>
        <el-table-column width="140" align="center" label="sku编码">
          <template slot-scope="scope">
            <el-input v-model="scope.row.sku_code" size="small" />
          </template>
        </el-table-column>
        <el-table-column width="140" align="center" prop label="价格">
          <template slot-scope="scope">
            <el-input v-model="scope.row.price" />
          </template>
        </el-table-column>
        <el-table-column width="140" align="center" label="库存">
          <template slot-scope="scope">
            <el-input v-model="scope.row.count" />
          </template>
        </el-table-column>

        <el-table-column width="245" align="center" prop label="操作">
          <template slot-scope="scope">
            <span class="submit" @click="submitSku(scope.row.id)">提交修改</span>
            <span class="del" @click="removeSku(scope.row.id)">删除</span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import storageApi from "@/api/storage/index";
import { Tip } from "@/utils/index";

export default {
  data() {
    return {
      dialog: false, // 弹出层
      skuList: [], // sku 列表
    };
  },
  methods: {
    // 打开dialog
    openDialog(id) {
      this.dialog = true;
      this.getSkuList(id);
    },
    // 关闭dialog
    handleClose() {
      this.dialog = false;
    },
    // 获取sku列表
    getSkuList(id) {
      storageApi.skuList({ productId: id }).then((res) => {
        this.skuList = res.data;
      });
    },
    // 提交修改
    submitSku(id) {
      let item = this.find_(id);
      storageApi.saveOrUpdateSku(item).then((res) => {
        Tip(res,"修改",this.getSkuList());
      });
    },
    // 删除选中sku项目
    removeSku(id) {
      let item = this.find_(id);
      storageApi.removeSku(item).then((res) => {
        Tip(res,"删除",this.getSkuList());
      });
    },
    // 寻找当前项目
    find_(id) {
      return this.skuList.find((ele) => ele.id === id);
    },
  },
};
</script>

<style  lang='scss' scoped>
.skuDetail-main {
  .submit {
    cursor: pointer;
    color: #40b6fd;
  }
  .del {
    cursor: pointer;
    color: #ff0000;
    padding-left: 8px;
  }
}
</style>

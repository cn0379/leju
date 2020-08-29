<template>
  <div class="brand-main">
    <el-card class="card" shadow="never">
      <Header />
      <el-button type="primary" style="margin-left:27px;" @click="goAddBrand">新增</el-button>
      <div class="card-container">
        <el-card class="card-item" v-for="item in brandList" :key="item.id" shadow="hover">
          <div slot="header" >
            <span>{{ item.cname }}</span>
          </div>
          <div style="width:280px;height:200px;" >
            <el-image @click="viewPic(item.coverImg)" class="pic" :src="item.coverImg" fit="cover"></el-image>
          </div>
          <div style="margin-top:20px;" >
            <el-button style="margin-right:138px;" size="mini" @click="editBrand(item.id)">编辑</el-button>
            <el-button @click="removeBrand(item.id)" type="danger" size="mini" >删除</el-button>
          </div>
        </el-card>
      </div>
    </el-card>
    <el-dialog title="预览" :visible.sync="dialog" width="50%" :before-close="handleClose">
      <el-image fit="cover" :src="bigPic"></el-image>
    </el-dialog>
    <AddBrand ref="addBrandRef" @resDetail="resDetailList($event)"  @resList="resBrandList($event)"/>
    <Pagination :page="page" />
  </div>
</template>

<script>
import Header from "@/components/Header/index";
import Pagination from "@/components/Pagination";
import AddBrand from "./BaseAddBrand";
import PageMixins from "@/mixin/pageMixin";
import brandApi from "@/api/brand/brand";

export default {
  components: {
    Header,
    Pagination,
    AddBrand,
  },
  mixins: [PageMixins],
  data() {
    return {
      dialog: false, // 图片预览隐藏颜色
      brandList: [], // 品牌列表
      bigPic: '', // 预览大图
    };
  },
  created() {
    this.getBarnList();
  },
  methods: {
    // 获取品牌列表
    async getBarnList() {
      const { data } = await brandApi.brandList();
      this.brandList = data;
    },
    // 添加
    goAddBrand() {
      this.$refs.addBrandRef.openDialog();
    },
    // 编辑
    editBrand(id) {
      this.$refs.addBrandRef.openDialog(id,brandApi.brandDetail);
    },
    // 删除
    removeBrand(id) {
      brandApi.removeBrand({ id: id }).then((res) => {
        this.tip(res,"删除")
      });
    },
    // 提示
    tip(res, desc) {
      if(res.code === "S") {
        this.$message.success( desc + '成功!')
        this.getBarnList();
      }else {
        this.$message.error( desc + '失败!')
      }
    },
    // 关闭预览
    handleClose() {
      this.dialog = false
    },
    // 大图预览
    viewPic(pic) {
      this.bigPic = pic
      this.dialog = true
    },
    // 子组件响应事件
    resBrandList (e) {
      let submitObj = e
      brandApi.saveOrUpdateBrand(submitObj).then((res) => {
        if (res.code === "S") {
          this.$message.success("上传成功!");
          this.handleClose();
          this.getBarnList()
        } else {
          this.$message.error("上传失败!");
        }
      });
    },
    resDetailList(id) {
       brandApi.brandDetail({ id: id }).then((res) => {
        this.bradList = res.data;
      });
    }
  },
};
</script>

<style  lang='scss' scoped>
.brand-main {
  .card {
    margin: 30px;
    .card-container {
      display: flex;
      flex-wrap: wrap;
      margin-top: 15px;
      .card-item {
        width: 305px;
        height: 345px;
        margin: 20px;
        .pic {
          height: 100%;
          width: 100%;
          padding-right:20px ;
        }
      }
    }
  }
}
</style>

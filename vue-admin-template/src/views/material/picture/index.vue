<template>
  <div class="material-picture-main">
    <Header />
    <el-card v-loading="loading" class="card" shadow="never">
      <div slot="header">
        <span>素材信息</span>
      </div>
      <el-upload
        :show-file-list="isFlieShow"
        action="/api/leju/admin/material/uploadAndSaveImg"
        :on-success="coverSuccess"
      >
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        <el-button size="small" type="primary">上传图片</el-button>
      </el-upload>
      <div class="card-container">
        <el-card class="card-item" v-for="item in pictureList" :key="item.id" shadow="hover">
          <div style="width:280px;height:200px;">
            <el-image @click="viewPic(item.ossUrl)" class="pic" :src="item.ossUrl" fit="cover"></el-image>
          </div>
          <div style="margin-top:20px;">
            <el-button @click="removePic(item.id)" type="danger" size="mini">删除</el-button>
          </div>
        </el-card>
      </div>
      <el-dialog title="预览" :visible.sync="dialog" width="50%" :before-close="handleClose">
        <el-image fit="cover" :src="bigPic"></el-image>
      </el-dialog>
      <Pagination @refreshList="getPicList" :page="page" />
    </el-card>
  </div>
</template>

<script>
import Header from "@/components/Header/index";
import Pagination from "@/components/Pagination";
import PageMixins from "@/mixin/pageMixin";
import picApi from "@/api/material/picture/index";
import { Tip } from "@/utils/index";

export default {
  name: "Picture",
  components: {
    Header,
    Pagination,
  },
  mixins: [PageMixins],
  data() {
    return {
      pictureList: [], // 图片列表
      loading: false, // 加载交互
      isFlieShow: true, // 清空上传成功后的文件
      dialog: false, // 弹出层
      bigPic: "", // 预览大图
    };
  },
  created() {
    this.getPicList();
  },
  methods: {
    // 获取列表
    async getPicList() {
      this.loading = true;
      delete this.page.sizes;
      this.page.limit = 12;
      const { data } = await picApi.pictureList({ ...this.page });
      console.log(data);
      this.pictureList = data.list;
      this.page.totalCount = data.totalRow;
      this.loading = false;
    },
    // 删除图片
    async removePic(id) {
      const res = await picApi.removePicture({ id: id });
      Tip(res,'删除',this.getPicList())
    },
    // 大图预览
    viewPic(pic) {
      this.bigPic = pic
      this.dialog = true
    },
    // 上传图片成功的回调函数
    coverSuccess() {
      this.getPicList();
      this.isFlieShow = false;
    },
    // 关闭
    handleClose() {
      this.dialog = false
    }
  },
};
</script>

<style  lang='scss' scoped>
.material-picture-main {
  .card {
    margin: 30px;
    .card-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-top: 15px;
      .card-item {
        width: 305px;
        height: 290px;
        margin-top: 40px;
        .pic {
          height: 100%;
          width: 100%;
          padding-right: 20px;
        }
      }
    }
  }
}
</style>

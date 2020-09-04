<template>
  <div class="material-article-main">
      <transition name="fadeInUp">
        <DetailArtic v-show="isDetailShow" ref="articleDeatil" @closeDeatil="openOrclose($event)" />
      </transition>
    <div v-show="!isDetailShow">
      <Header />
      <el-card class="card" shadow="never">
        <el-button type="primary" style="margin-bottom:20px;" @click="goAdd">新增</el-button>
        <el-table border :data="articleList" v-loading="loading">
          <el-table-column align="center" width="50" type="index" label="#"></el-table-column>
          <el-table-column align="center" width="180" prop="title" label="文章标题"></el-table-column>
          <el-table-column align="center" width="120" prop="author" label="作者"></el-table-column>
          <el-table-column align="center" width="230" prop="kindTitle" label="文章分类"></el-table-column>
          <el-table-column align="center" width="150" label="颜色分类">
            <template slot-scope="scope">
              <span :style="{backgroundColor:scope.row.color1}" class="circle"></span>
              <span :style="{backgroundColor:scope.row.color2}" class="circle"></span>
              <span :style="{backgroundColor:scope.row.color3}" class="circle"></span>
            </template>
          </el-table-column>
          <el-table-column align="center" width="130" label="封面图片">
            <template slot-scope="scope">
              <el-image :src="scope.row.coverImg" fit="cover" style="width:100px;height:50px;"></el-image>
            </template>
          </el-table-column>
          <el-table-column align="center" width="100" label="阅读量/赞">
            <template
              slot-scope="scope"
            >{{ (scope.row.viewCount || 0) + '/' + (scope.row.zanCount || 0 ) }}</template>
          </el-table-column>
          <el-table-column align="center" width="200" prop="addTime" label="更新时间"></el-table-column>
          <el-table-column fixed="right" align="center" width="240" label="操作">
            <template slot-scope="scope">
              <el-button type="default" size="mini" @click="goView(scope.row.id)">查看</el-button>
              <el-button type="primary" size="mini" @click="goEdit(scope.row.id)">编辑</el-button>
              <el-button type="danger" size="mini" @click="goDel(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog title="文章信息" :visible.sync="dialog" width="50%" :before-close="handleClose">
          <p v-html="story"></p>
        </el-dialog>
        <Pagination @refreshList="getArticleList" :page="page" />
      </el-card>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header/index";
import Pagination from "@/components/Pagination";
import PageMixins from "@/mixin/pageMixin";
import { Tip } from "@/utils/index";
import articleApi from "@/api/material/article/index";
import DetailArtic from "./detail/detail";

export default {
  components: {
    Header,
    Pagination,
    DetailArtic,
  },
  mixins: [PageMixins],
  data() {
    return {
      articleList: [], // 文章列表
      loading: false, // 加载交互
      isDetailShow: false, // 详情的显示
      dialog: false, //弹出层
      story: "", // 文章内容
    };
  },
  created() {
    this.getArticleList();
  },
  methods: {
    // 获取文章列表
    async getArticleList() {
      this.loading = true;
      delete this.page.sizes;
      const { data } = await articleApi.articleList(this.page);
      this.articleList = data.list;
      this.page.totalCount = data.totalRow;
      this.loading = false;
    },
    // 控制详情组件的显示和隐藏
    openOrclose(e) {
      if ("refreshStr") {
        this.getArticleList();
      }
      this.isDetailShow = !this.isDetailShow;
    },
    // 查看
    async goView(id) {
      this.dialog = true;
      const { data } = await articleApi.articleDetail({ id: id });
      this.story = data.content2;
    },
    // 编辑
    goEdit(id) {
      this.openOrclose();
      this.$refs.articleDeatil.getArticleDetail(id);
    },
    // 新增
    goAdd() {
      this.openOrclose();
      this.$refs.articleDeatil.getKindList();
    },
    // 删除
    goDel(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
      .then(() => {
        articleApi.removeArticle({ id: id }).then((res) => {
          Tip(res, "删除", this.getArticleList());
        });
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除",
        });
      });
    },
    // 关闭弹出层
    handleClose() {
      this.dialog = false;
    },
  },
};
</script>

<style  lang='scss' scoped>
.material-article-main {
  .card {
    margin: 30px;
  }
  .circle {
    display: inline-block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin: 0 2px;
  }
  .edit {
    cursor: pointer;
  }
  .view {
    cursor: pointer;
    font-size: 12px;
    color: #409eff;
    padding: 0 15px;
  }
  .del {
    cursor: pointer;
    font-size: 12px;
    color: #ff0000;
  }
  background-color: #F5F7FA;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  &::-webkit-scrollbar {display:none}

  .fadeInUp-enter-active {
    animation: fadeInUp 0.4s 0.4s both;
  }
  .fadeInUp-leave-active {
    animation: fadeInUp 0.4s reverse;
  }
  .fadeOutUp-enter-active {
    animation: fadeInUp 0.4s 0.4s;
  }

  @keyframes fadeInUp {
    0% {
      transform: translateY(-110%);
    }
    100% {
      transform: translateY(0);
    }
  }
  @keyframes fadeOutUp {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-100%);
    }
  }
}
</style>

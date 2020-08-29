<template>
  <div class="article-detail-main">
    <el-card class="card" shadow="hover">
      <div slot="header">
        <span>文章信息编辑</span>
      </div>
      <el-form :model="curArticle" ref="form" label-width="120px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="文章标题">
              <el-input v-model="curArticle.title" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="作者">
              <el-input v-model="curArticle.author" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="颜色">
          <el-col>
            <el-color-picker @change="selectColor" v-model="curArticle.color1" size="small"></el-color-picker>
            <el-color-picker
              v-model="curArticle.color2"
              style="margin:0 20px;withd:100px;"
              size="small"
               @change="selectColor2"
            ></el-color-picker>
            <el-color-picker @change="selectColor3" v-model="curArticle.color3" size="small"></el-color-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="商品分类">
          <el-checkbox-group v-model="curArticle.kindIds">
            <el-checkbox v-for="item in kindList" :key="item.id" :label="item.id">{{ item.ctitle }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="上传图片">
          <el-col :span="6">
            <el-upload
              :show-file-list="isFlieShow"
              action="/api/leju/admin/material/uploadAndSaveImg"
              :on-success="coverSuccess"
            >
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              <el-button size="small" type="primary">选择图片</el-button>
            </el-upload>
          </el-col>
          <el-col :span="6">
            <el-image style="width:100px;height:100px" :src="curArticle.coverImg" fit="cover"></el-image>
          </el-col>
        </el-form-item>
        <el-row :gutter="30">
          <el-form-item label="切换富文本类型">
            <el-col :span="6">
              <el-radio-group v-model="t_Type">
                <el-radio :label="0">富文本</el-radio>
                <el-radio :label="1">markDown</el-radio>
              </el-radio-group>
            </el-col>
            <el-col :span="12">
              <span style="color: #E6A23C;margin-left:50px;">
                <i class="el-icon-warning" /> 切换编辑器会清空内容,请谨慎操作.
              </span>
            </el-col>
          </el-form-item>
          <el-col>
            <Tinymce
              v-model="curArticle.content2"
              upload-url="http://bufantec.com/api/leju/admin/material/uploadImg"
              v-show="t_Type === 0"
              ref="tin"
            />
            <keep-alive>
              <MarkdownEditor
                v-model="curArticle.content1"
                v-show="t_Type === 1"
                class="markdown-editor"
              />
            </keep-alive>
            <el-col :offset="21" style="margin-top:20px;">
              <el-button @click="cancel">取消</el-button>
              <el-button style="margin-left:65px;" type="primary" @click="doSave">提交</el-button>
            </el-col>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Tinymce from "@/components/Tinymce";
import MarkdownEditor from "@/components/MarkdownEditor";
import articleApi from "@/api/material/article/index";
import kindApi from "@/api/kind/kind";
import { Tip, resetFormData } from "@/utils/index";

export default {
  components: {
    Tinymce,
    MarkdownEditor,
  },
  data() {
    return {
      t_Type: 0, // 富文本类型
      curArticle: { // 当前文章项目
        kindIds: [], // 分类列表
        content1: '', // 富文本
        content2: '', // markdown
        coverImg: '' // 图片
      }, 
      isFlieShow: true, // 文件描述显示/隐藏
      kindList: [], // 分类列表
    };
  },
  created() {},
  methods: {
    // 取消
    cancel() {
      this.$emit("closeDeatil");
    },
    // 获取文章详细
    async getArticleDetail(id) {
      this.getKindList();
      const { data } = await articleApi.articleDetail({ id: id });
      console.log(data);
      this.curArticle = data;
    },
    // 获取分类列表
    async getKindList() {
      const { data } = await kindApi.kindList();
      this.kindList = data;
      console.log(data);
    },
    // 提交
    doSave() {
      articleApi.saveOrUpdateArticle(this.curArticle).then((res) => {
        Tip(res,'上传',this.$emit("closeDeatil",'refreshStr'))
      })
    },
    // 上传图片成功的回调
    coverSuccess(res) {
      console.log(res)
      this.curArticle.coverImg = res.ossUrl
      this.isFlieShow = false
    },
    // 选择颜色的值
    selectColor(e) {
      this.curArticle.color1 = e
    },
    selectColor2(e){ 
      this.curArticle.color2 = e
    },
    selectColor3(e){
      this.curArticle.color3 = e
    }
  },
};
</script>

<style  lang='scss' scoped>
.article-detail-main {
  .card {
    margin: 30px;
    .markdown-editor {
      ::v-deep .te-md-splitter {
        width: 100%;
      }
    }
    .cirle {
      width: 25px;
      height: 25px;
      background: turquoise;
      border-radius: 50%;
    }
  }
}
</style>

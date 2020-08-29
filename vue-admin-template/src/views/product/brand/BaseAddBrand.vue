<template>
  <div class="brand-detail-main">
    <el-dialog title="新增品牌" :visible.sync="dialog" width="30%" :before-close="handleClose">
      <el-form ref="form" :model="bradList" label-width="120px">
        <el-form-item label="品牌名称">
          <el-input v-model="bradList.cname" placeholder="中文名称" />
        </el-form-item>
        <el-form-item label="英文名称">
          <el-input v-model="bradList.ename" placeholder="English Name" />
        </el-form-item>
        <el-form-item label="封面图片">
          <el-upload action="/api/leju/admin/material/uploadImg" :on-success="coverSuccess">
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            <el-button size="small" type="primary">上传图片</el-button>
          </el-upload>
          <el-image v-show="pciShow" :src="bradList.coverImg" style="width:150px;height:150px;"></el-image>
        </el-form-item>
        <el-form-item>
          <el-input v-model="bradList.descr" type="textarea" />
        </el-form-item>
        <el-form-item>
          <div>
            <el-button @click="handleClose">取消</el-button>
            <el-button type="primary" @click="doSave">确定</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import brandApi from "@/api/brand/brand";

export default {
  name: "AddBrand",
  data() {
    return {
      dialog: false, // 弹出层
      bradList: {
        // 品牌列表
        coverImg: "",
      },
      pciShow: false, // 图片的显示和隐藏
    };
  },

  methods: {
    // 打开弹出层
    openDialog(id,api) {
      this.dialog = true;
      if (id) {
        this.getBrandDetail(id,api);
      }
    },
    // 关闭弹出层
    handleClose() {
      this.dialog = false;
    },
    // 保存
    doSave() {
      this.$emit("resList",this.bradList);
    },
    // 获取详情
    getBrandDetail(id, api ) {
      api({ id: id }).then((res) => {
        console.log(res);
        this.bradList = res.data;
      });
    },
    // 上传图片成功的回调函数
    coverSuccess(res) {
      this.bradList.coverImg = res.ossUrl;
      this.pciShow = true;
    },
  },
};
</script>

<style lang='scss' scoped>
</style>

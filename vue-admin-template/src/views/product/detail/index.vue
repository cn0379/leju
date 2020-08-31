<template>
  <div class="addGoods-main">
    <el-steps class="step" :active="step" finish-status="success">
      <el-step title="商品基本信息"></el-step>
      <el-step title="添加库存信息"></el-step>
      <el-step title="添加关联"></el-step>
    </el-steps>
    <el-card class="card" shadow="hover">
      <el-form ref="form" :model="currentGoods" label-width="120px">
        <div v-show="step==1">
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="商品名称">
                <el-input v-model="currentGoods.gname" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="品牌">
                <el-select v-model="currentGoods.brand_id" placeholder="请选择">
                  <el-option
                    v-for="item in brandList"
                    :key="item.id"
                    :label="item.cname"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="原产地">
                <el-cascader
                  v-model="selectCity"
                  size="small"
                  :options="cityOptions"
                  @change="cityChange"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="商品编码">
                <el-input v-model="currentGoods.pcode" placeholder="商家自定义" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="关键词">
                <el-input v-model="currentGoods.keywords" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="商品描述">
                <el-input v-model="currentGoods.detail_desc" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="封面图片">
                <el-upload action="/api/leju/admin/material/uploadImg" :on-success="coverSuccess">
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-image style="width:100px;height:100px;" fit="cover" :src="currentGoods.cover_img">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline" />
                </div>
              </el-image>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="是否上架">
                <el-switch v-model="currentGoods.isshow" :active-value="1" :inactive-value="0" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否最热">
                <el-switch v-model="currentGoods.ishot" :active-value="1" :inactive-value="0" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否最新">
                <el-switch v-model="currentGoods.isnew" :active-value="1" :inactive-value="0" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="进价">
                <el-input-number v-model="currentGoods.price_in" :min="0" />(单位:分)
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="售价">
                <el-input-number v-model="currentGoods.price_out" :min="0" />(单位:分)
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="当前价格">
                <el-input-number v-model="currentGoods.price_now" :min="0" />(单位:分)
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="重量">
                <el-input-number v-model="currentGoods.weight" :min="0" />(单位:克)
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="排序">
                <el-input-number v-model="currentGoods.sort" :min="0" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="单位名称">
                <el-input
                  v-model="currentGoods.unit_name"
                  style="width:300px;"
                  placeholder="比如:个/辆/台/..."
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="商品分类">
                <el-checkbox-group v-model="currentGoods.kindIds" size="small">
                  <el-checkbox
                    v-for="item in kindList"
                    :key="item.id"
                    :label="item.id"
                  >{{ item.ctitle }}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="8">
              <el-form-item label="系列">
                <el-select v-model="value" clearable placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>-->
            <el-col :span="8">
              <el-form-item label="送货服务">
                <el-checkbox-group v-model="currentGoods.service_promise">
                  <el-checkbox :label="0">无</el-checkbox>
                  <el-checkbox :label="1">送货入户</el-checkbox>
                  <el-checkbox :label="2">上门安装</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div v-show="step==2">
          <el-row>
            <el-col :span="10">
              <el-form-item label="标题详情">
                <el-input v-model="currentGoods.detail_title" placeholder="仙女凳/减肥凳" />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="副标题">
                <el-input v-model="currentGoods.descr" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="添加sku颜色:">
            <el-col :span="4">
              <el-input v-model="colorInfo.text" size="small" placeholder="颜色:如土豪金" />
            </el-col>
            <el-col :offset="1" :span="4">
              <el-input v-model="colorInfo.color" size="small" placeholder="色值:如#ff0000" />
            </el-col>
            <el-col :offset="1" :span="2">
              <el-button type="primary" size="mini" @click="createSku">创建</el-button>
            </el-col>
            <el-col>
              颜色:
              <el-checkbox-group v-model="colorSel" >
                <el-checkbox
                  v-for="item in colorList"
                  :key="item.color"
                  :label="item.text"
                >
                  <span :style="{color:item.color}">{{ item.text }}</span>
                  <span style="padding-left:5px;" @click="delColorInfo(item.text)">删除</span>
                </el-checkbox>
              </el-checkbox-group>
            </el-col>
            <el-col>
              <el-button
                style="margin-bottom:20px"
                type="primary"
                size="mini"
                @click="addSku"
                plain
              >{{ textSkuInfo }}</el-button>
            </el-col>
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
              <el-table-column width="140" align="center" prop label="操作">
                <template slot-scope="scope">
                  <p class="submit" @click="delitSku(scope.row.skuId)">删除</p>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <el-row>
            <el-form-item style="margin-top:50px;" label="轮播图">
              <el-col :span="8">
                <el-upload action="/api/leju/admin/material/uploadImg" :on-success="step2Success">
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </el-col>
              <el-col :span="14">
                <el-image
                  fit="cover"
                  class="banner-detail"
                  v-for="item in currentGoods.imgs"
                  :key="item"
                  :src="item"
                ></el-image>
              </el-col>
            </el-form-item>
          </el-row>
          <el-form-item label="商品描述">
            <TinEditor
              ref="tin"
              v-model="currentGoods.content"
              upload-url="http://bufantec.com/api/leju/admin/material/uploadImg"
            />
          </el-form-item>
        </div>
        <div v-show="step==3">
          <el-form-item label="关联商品">
            <el-transfer v-model="linkGoods" :titles="['所有商品','选中商品']" :data="goodsList"></el-transfer>
          </el-form-item>

          <el-form-item label="备注">
            <el-input v-model="currentGoods.bak" type="textarea" />
          </el-form-item>
        </div>
        <el-col :offset="11" style="margin-top:20px;margin-bottom:20px;">
          <el-button size="small" v-show="step > 1" type="default" @click="preStep">返回上一步</el-button>
          <el-button
            size="small"
            v-show="step < 3 "
            type="primary"
            @click="nextStep"
          >{{ btnTextInfo }}</el-button>
          <el-button size="small" v-show="step===3" type="primary" @click="doSave">提交保存</el-button>
        </el-col>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import TinEditor from "@/components/Tinymce";
import brandApi from "@/api/brand/brand";
import productApi from "@/api/product/index";
import kindApi from "@/api/kind/kind";
import { deepClone } from "@/utils/index";
import {
  regionDataPlus,
  CodeToText,
  TextToCode,
} from "element-china-area-data";

export default {
  name: "addGoods",
  components: {
    TinEditor,
  },
  data() {
    return {
      active: 0, // 高亮
      step: 1, // 步长,
      currentGoods: {
        // 以编辑作为入口 当前商品列表
        service_promise: [], // 初始化服务列表
        kindIds: [], // 初始化分类列表
        imgs: [], // 轮播初始化列表
      },
      goodsList: [], // 商品列表
      brandList: [], // 品牌列表
      kindList: [], // 分类列表
      skuList: [], // sku列表
      cityOptions: regionDataPlus, // 城市信息
      selectCity: [], // 渲染时的城市信息
      cityStr:[], // 城市字符串
      colorList: [], // 颜色列表
      colorInfo: {}, // 颜色信息
      tempSkuInfo: [], // 保存 创建时 选中的sku
      linkGoods: [], // 关联商品
      colorSel: [], // 绑定颜色值
    };
  },
  created() {
    let id = this.$route.params.id;
    if (id) {
      this.$route.meta.title = "商品编辑";
     }
      this.initMethods(id);
  },
  computed: {
    // 更改按钮文字信息
    btnTextInfo() {
      return this.step === 1 ? "下一步,填写库存信息" : "下一步,填写关联商品";
    },
    textSkuInfo() {
      return this.skuList.length == 0 ? "生成" : "重新生成";
    },
  },
  methods: {
    // 初始化
    initMethods(id) {
      this.getGoodsDeatil(id);
      this.getBrandList();
      this.getKindList();
      this.getGoodsList();
    },
    // 上一步
    preStep() {
      this.step--;
    },
    // 下一步
    nextStep() {
      this.step++;
    },
    // 商品明细
    async getGoodsDeatil(id) {
      const { data } = await productApi.goodsDetail({ id: id });
      this.currentGoods = data;
      console.log(data);
      let kindStr,
          imgsStr,
          cityNum;
      kindStr = this.currentGoods.kindIds.split(",");
      imgsStr = this.currentGoods.imgs && this.currentGoods.imgs.split(",")
      this.currentGoods.kindIds = kindStr;
      this.currentGoods.imgs = imgsStr;
      this.currentGoods.service_promise = [0, 1, 2];
      this.selectCity = data.origin_city  && data.origin_city.split(",")
      cityNum = data.origin_code && data.origin_code.split(",")
      this.selectCity = cityNum && ( cityNum = cityNum.length === 2) || this.getCityCode(this.selectCity) // 防止 city 编码数据不完整
      this.skuList = this.currentGoods.skuList;
      this.setTin(this.currentGoods.content);
      if (this.currentGoods.link1) {
        if (this.currentGoods.link1.indexOf(",") != 1) {
          this.linkGoods = this.currentGoods.link1.split(",");
        }
      }
    },
    // 获取城市编码 防止错误数据
    getCityCode(city) {
      if(!city) {
        return
      }else if(city.length === 3) {
        let cityCode = TextToCode[city[0]].code + ',' + TextToCode[city[0]][city[1]].code + ',' + TextToCode[city[0]][city[1]][city[2]].code
        return cityCode.split(",")
      }
    },
    // 品牌列表
    async getBrandList() {
      const { data } = await brandApi.brandList();
      this.brandList = data;
    },
    // 分类列表
    async getKindList() {
      const { data } = await kindApi.kindList();
      this.kindList = data;
    },
    // 商品列表
    async getGoodsList() {
      const { data } = await productApi.goodsList();
      var list = data.list;
      list.forEach((ele) => {
        this.goodsList.push({
          key: ele.id,
          label: ele.gname,
        });
      });
    },
    // 选中城市信息
    cityChange(e) {
      let city = e;
      this.selectCity = city
      this.cityStr = city && city.map((ele) => {
        return CodeToText[ele]
      })
      this.currentGoods.origin_code = this.selectCity && this.selectCity.join(',')
      this.currentGoods.origin_city = this.selectCity && this.cityStr.join(',')
    },
    // 图片上传成功的回调函数
    coverSuccess(res) {
      this.currentGoods.cover_img = res.ossUrl;
    },
    // 步骤二 图片上传成功的回调函数
    step2Success(res) {
      this.currentGoods.imgs.push(res.ossUrl);
    },
    // 创建sku
    createSku() {
      var tempInfo = deepClone(this.colorInfo);
      var newColorObj = {
        ...tempInfo,
        skuId: +new Date(),
      };
      this.colorList.push(newColorObj);
      this.colorInfo = {};
    },
    // 创建删除
    delColorInfo(text) {
      this.colorList = this.colorList.filter((ele) => {
        return ele.text != text;
      });
    },
    // 生成sku
    addSku() {
      this.skuList = [];
      this.colorList.forEach((ele) => {
        this.skuList.push({
          skuId: ele.skuId,
          color: ele.color,
          color_text: ele.text,
          sku_code: "",
          price: 0,
          count: 0,
        });
      });
      this.colorList = [];
    },
    // 生成删除
    delitSku(id) {
      this.skuList = this.skuList.filter((ele) => {
        return ele.skuId != id;
      });
    },
    // 获取富文本内容
    getTin() {
      return this.$refs.tin.getContent()
    },
    //设置富文本
    setTin(view) {
      this.$refs.tin.setContent(view);
    },
    // 提交/编辑 
    doSave() {
      
      var submitObj = {
        ...this.currentGoods,
      }
      this.skuList.map((ele, idx) => {
        return (submitObj['skuList' + `[${idx}]`] = ele)
      })
      productApi.saveOrUpdateGoods(submitObj).then((res) => {
        if(res.method == '更新' || res.method == '新增'){
          this.$message.success( res.method + "成功!")
          this.$router.push({ name: 'GoodsList' })
        }else {
          this.$message.error( res.method + "失败!")
        }
      });
    },
  },
};
</script>

<style  lang='scss' scoped>
.addGoods-main {
  .step {
    width: 1000px;
    margin: 40px auto;
  }
  .card {
    margin: 50px;
    .banner-detail {
      width: 120px;
      height: 120px;
      margin-left: 10px;
    }
    .submit {
      cursor: pointer;
      color: #ff0000;
    }
  }
}
</style>

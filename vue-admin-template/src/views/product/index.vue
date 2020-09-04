<template>
  <div class="product-main">
    <el-card class="card" shadow="never">
      <div slot="header">
        <span>搜索条件</span>
      </div>
      <el-row :gutter="30">
        <el-col :span="6">
          <el-input v-model="search.gname"  placeholder="商品名称" style="width:300px"></el-input>
        </el-col>
        <el-col :span="6">
          <el-input v-model="search.pcode" placeholder="商品编码" style="width:300px"></el-input>
        </el-col>
        <el-col :span="6">
          <el-select  v-model="search.brandId" placeholder="品牌">
            <el-option
              v-for="item in brandList"
              :key="item.id"
              :label="item.cname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-select v-model="search.kindId" placeholder="分类">
            <el-option
              v-for="item in kindList"
              :key="item.id"
              :label="item.ctitle"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :offset="20" style="margin-top:40px;">
          <el-button size="small" plain @click="doReset">重置</el-button>
          <el-button size="small" type="primary" @click="doSearch">搜索</el-button>
        </el-col>
      </el-row>
      <el-button type="primary" style="margin-top:30px;" @click="goAdd">新增</el-button>
      <el-table v-loading="loading" :data="goodsList" border style="margin-top:30px">
        <el-table-column type="index" align="center" fixed :width="50" label="#"></el-table-column>
        <el-table-column fixed align="center" prop="cover_img" label="商品图片" width="300">
          <template slot-scope="scope">
            <el-image :src="scope.row.cover_img" fit="cover" style="width:150px;height:100px;" @click="jumpEdit(scope.row.id)" ></el-image>
          </template>
        </el-table-column>
        <el-table-column align="center" label="商品名称" width="350">
          <template slot-scope="scope">
            <p>{{ scope.row.gname }}</p>
            <p
              class="brand"
            >品牌:{{ scope.row.brandName || '获取失败' }} | {{ scope.row.brandEname || 'Get failed' }}</p>
            <p style="padding:10px;">{{ scope.row.descr }}</p>
          </template>
        </el-table-column>
        <el-table-column align="center" label="标签" width="250">
          <template slot-scope="scope">
            <p>
              上架:<el-switch v-model="scope.row.isshow" :active-value="1" :inactive-value="0"  @change="switchChange('isshow', scope.row.isshow, scope.row.id)" />
            </p>
            <p>
              最热:<el-switch v-model="scope.row.ishot" :active-value="1" :inactive-value="0" @change="switchChange('ishot', scope.row.isshow, scope.row.id)" />
            </p>

            <p>
              最新:<el-switch v-model="scope.row.isnew" :active-value="1" :inactive-value="0" @change="switchChange('isnew', scope.row.isshow, scope.row.id)" />
            </p>
          </template>
        </el-table-column>
        <el-table-column align="center" label="价格货号" width="190">
          <template slot-scope="scope">
            <p>价格: ￥{{ scope.row.price_now /100 }}</p>
            <p>货号:{{ scope.row.pcode }}</p>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="ctitles" label="所属分类" width="200"></el-table-column>
        <el-table-column align="center" prop label="查看sku" width="150">
          <template slot-scope="scope">
            <p class="view-sku" @click="viewSku(scope.row.id)">查看sku</p>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="sort" label="排序" width="120"></el-table-column>
        <el-table-column align="center" prop="origin_city" label="原产地" width="200"></el-table-column>
        <el-table-column align="center" prop="addtime" label="添加时间" width="200"></el-table-column>
        <el-table-column align="center" prop label="编辑" width="300">
          <template slot-scope="scope">
            <div>
              <el-button type="primary" size="small" @click="jumpEdit(scope.row.id)" >编辑</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
         <Pagination @refreshList="getGoodsList" :page="page" />
         <SkuDetail  ref="skuDetail" />
    </el-card>
  </div>
</template>

<script>
import productApi from '@/api/product/index';
import barndApi from '@/api/brand/brand';
import kindApi from '@/api/kind/kind'
import pageMixin from '@/mixin/pageMixin';
import Pagination from '@/components/Pagination';
import SkuDetail from './sku/BaseSkuvue'
import Header from '@/components/Header'
import { Tip } from "@/utils/index";

export default {
  name: 'Product',
  components: {
    Pagination,
    SkuDetail,
    Header
  },
  mixins: [pageMixin], // 分页mixin
  data() {
    return {
      goodsList: [], // 商品列表
      brandList: {}, // 品牌列表
      kindList: {}, // 分类列表
      loading: false, // 加载交互
      search: {}, // 搜索
    };
  },
  created() {
    this.initMethods()
  },
  methods: {
    //初始化
    initMethods() {
      this.getGoodsList();
      this.getBrandList();
      this.getkindList()
    },
    // 重置搜索列表
    doReset() {
      this.search = {}
    },
    // 搜索
    doSearch() {
      this.page.start = 1
      this.getGoodsList()
    },
    // 获取商品列表
    async getGoodsList() {
      this.loading = true;
      let page = {
        start: this.page.start,
        limit: this.page.limit,
        ...this.search
      };
      const { data } = await productApi.goodsList(page);
      this.goodsList = data.list;
      this.page.totalCount = data.totalRow;
      this.loading = false;
    },
    // 获取品牌列表
    async getBrandList() {
      const { data } = await barndApi.brandList();
      this.brandList = data;
    },
    // 获取分类列表
    async getkindList(){
      const { data } = await kindApi.kindList();
      this.kindList = data;
    },
    // 新增
    goAdd() {
      this.$router.push({ name: 'detailGoods' });
    },
    // 编辑
    jumpEdit(id) {
      this.$router.push({name:'detailGoods', params: { id: id } })
    },
    // 改变 switch 状态
    switchChange(code,view,id){
      let submitObj = {
        id: id,
        [code]: view
      }
      productApi.switchCode({...submitObj}).then( res => {
        Tip(res,'更新')
      })
    },
    // sku 明细
    viewSku (id) {
      this.$refs.skuDetail.openDialog(id)
    },
  },
};
</script>

<style  lang='scss' scoped>
.product-main {
  background-color: #F5F7FA;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  &::-webkit-scrollbar {display:none}
  .card {
    margin: 30px;
    .brand {
      max-width: 250px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      margin: 0 auto;
    }
    .view-sku {
      cursor: pointer;
      color: #40b6fd;
    }
  }
}
</style>

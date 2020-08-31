import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  {
    path: '/product',
    name: 'product',
    component: Layout,
    redirect: '/product/goods',
    meta: { title: '商品管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'goodsList',
        name: 'GoodsList',
        component: () => import('@/views/product/index'),
        meta: { title: '商品列表', icon: 'table' }
      },
      {
        path: 'detailGoods/:id',
        name: 'detailGoods',
        component: () => import('@/views/product/detail/index'),
        meta: { title: '商品添加', icon: 'table' }
      },
      {
        path: 'kindGoods',
        name: 'KindGoods',
        component: () => import('@/views/product/kind/index'),
        meta: { title: '分类管理', icon: 'table' }
      },
      {
        path: 'brandManage',
        name: 'BrandManage',
        component: () => import('@/views/product/brand/index'),
        meta: { title: '品牌管理', icon: 'table' }
      },
      {
        path: 'seriesManage',
        name: 'SeriesManage',
        component: () => import('@/views/product/index'),
        meta: { title: '系列管理', icon: 'table' }
      },
    ]
  },
  {
    path: '/customer',
    name: 'Customer',
    component: Layout,
    redirect: '/customer/customer',
    meta: { title: '客户管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'customerManage',
        name: 'CustomerManage',
        component: () => import('@/views/customer/index'),
        meta: { title: '客户管理', icon: 'table' }
      },
    ]
  },
  {
    path: '/order',
    name: 'Order',
    component: Layout,
    redirect: '/customer/customer',
    meta: { title: '订单管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'orderManage',
        name: 'OrderManage',
        component: () => import('@/views/order/index'),
        meta: { title: '订单管理', icon: 'table' }
      },
      {
        path: 'orderDetail/:id',
        name: 'OrderDetail',
        component: () => import('@/views/order/oredrDetail/index'),
        meta: { title: '订单详情', icon: 'table' }
      },
    ]
  },
  {
    path: '/material',
    name: 'material',
    component: Layout,
    redirect: '/material/material',
    meta: { title: '素材管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'pictureManage',
        name: 'PictureManage',
        component: () => import('@/views/material/picture/index'),
        meta: { title: '素材管理', icon: 'table' }
      },
      {
        path: 'articleManage',
        name: 'ArticleManage',
        component: () => import('@/views/material/article/index'),
        meta: { title: '文章管理', icon: 'table' }
      },
    ]
  },
  {
    path: '/banner',
    name: 'Banner',
    component: Layout,
    redirect: '/banner',
    meta: { title: '轮播管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'bannerManage',
        name: 'BannerManage',
        component: () => import('@/views/banner/index'),
        meta: { title: '轮播管理', icon: 'table' }
      },
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

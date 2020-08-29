<template>
  <div class="banner-main">
        
  </div>
</template>

<script>
import bannerApi from '@/api/banner/index'

export default {
  data() {
    return {};
  },
  methods: {
    async getBannerList () {
     const { data } = await bannerApi.bannerList()
    },
  }
};
</script>

<style lang='stylus' scoped>
</style>

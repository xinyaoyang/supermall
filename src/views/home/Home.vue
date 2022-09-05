<template>
  <div id="home">
    <nav-bar class="home-nav"><template v-slot:center><div>购物街</div></template></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
  </div>

</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import {getHomeMultidata} from "@/router/home";
import HomeSwiper from "@/views/home/childComps/HomeSwiper";
import RecommendView from "@/views/home/childComps/RecommendView";
// import Swiper from "@/components/common/swiper/Swiper";
// import SwiperItem from "@/components/common/swiper/SwiperItem";

export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
    }
  },
  created() {
    getHomeMultidata().then(resolve => {
      this.banners = resolve.data.banner.list
      this.recommends = resolve.data.recommend.list
      console.log(resolve)
    })
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
  },
}
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: #ffffff;
  }

  .navimg{
    width: 100%;
  }
</style>

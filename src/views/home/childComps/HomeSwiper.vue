<template>
  <div>
    <Swiper class="navimg">
      <swiper-item v-for="item in banners">
        <a :href = "item.link">
          <img :src = "item.image" alt = "" class="navimg">
        </a>
      </swiper-item>
    </Swiper>
  </div>

</template>

<script>

import Swiper from "@/components/common/swiper/Swiper";
import SwiperItem from "@/components/common/swiper/SwiperItem";
export default {
  name: "HomeSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    },
    // recommends: {
    //   type: Array,
    //   default() {
    //     return []
    //   }
    // },
  }
}
</script>

<style scoped>
.navimg img{
  width: 100%;
}
</style>

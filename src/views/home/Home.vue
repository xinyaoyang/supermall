<template>
  <div id="home">
    <nav-bar class="home-nav"><template v-slot:center><div>购物街</div></template></nav-bar>

    <Scroll class="content" ref="scroll"
            :probe-type="3"
            :pull-up-load="true"
            @monitorScroll="contentScroll"
            @pullingUp="loadMore">
            <!--@pullingUp="loadMore">-->
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :title="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl"></tab-control>
      <good-list :goods="showGoods"></good-list>
    </Scroll>
    <back-top @click="backClick" v-show="isShowBackTop"/>
  </div>

</template>

<script>
import HomeSwiper from "@/views/home/childComps/HomeSwiper";
import RecommendView from "@/views/home/childComps/RecommendView";
import FeatureView from "@/views/home/childComps/FeatureView";

import NavBar from "@/components/common/navbar/NavBar";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodList from "@/components/content/goods/GoodList";
import Scroll from "@/components/common/scroll/Scroll";
import BackTop from "@/components/content/backTop/BackTop";

import {getHomeMultidata,getHomeGoods} from "@/network/home";
import debounce from "@/components/utils";


export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: {page: 0, list: []},
        new: {page: 0, list: []},
        sell: {page: 0, list: []}
      },
      currentType: 'pop',
      isShowBackTop: false
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  created() {
    //1.请求多个数据
    this.getHomeMultidata()

    // 2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

  },
  mounted() {
    //1.图片加载的事件监听和消抖设置
    const refresh = debounce(this.$refs.scroll.refresh,500)
    //1.监听Item中图片监听完成
    this.$bus.on('itemImageLoad',() => {
      // console.log(this.$refs.scroll.refresh)
      refresh()
    })

    //2.获取tabControl的offsetTop
    //所有的组件都有$el属性：用于获取组件中的元素
    console.log(this.$refs.tabControl.$el.offsetTop);
  },
  methods: {
    /*
    * 事件监听相关方法
    * */

    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
    },
    backClick() {
      // console.log('backClick')
      // console.log(this.$refs.scroll.message);
      this.$refs.scroll.scrollTo(0,0)
    },
    contentScroll(position) {
      // this.$refs.scroll.scroll.on('scroll',(position) => {
      //   console.log(position)
      // })
      this.isShowBackTop = -position.y > 1000
    },
    loadMore() {
      // console.log('上拉加载更多')
      this.getHomeGoods(this.currentType)

      this.$refs.scroll.scroll.refresh()
    },

    /*
    * 网络请求相关方法
    * */
    getHomeMultidata() {
      getHomeMultidata().then(resolve => {
        this.banners = resolve.data.banner.list
        this.recommends = resolve.data.recommend.list
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page +=1

        this.$refs.scroll.finishPullUp()
      })
    }
  },

}
</script>

<style scoped>
#home {
  /*padding-top: 44px;*/
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}

.content {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>

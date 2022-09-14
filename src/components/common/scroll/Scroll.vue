<template>
  <div className = "wrapper" ref = "wrapper">
    <div className = "context">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
       },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
        },
    data() {
      return {
        scroll: null,
        message: '啊哈哈哈'
      }
    },
    // mounted() {
    //   this.scroll = new BScroll(this.$refs.wrapper, {
    //     click: true
    //   })
    // },
    // updated() {
    //   this.scroll.refresh()
    // }

    mounted() {
      // setTimeout(() => {

      //1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        // ObserverDOM: true,
        click: true,
        // mouseWheel: true,
        pullUpLoad: this.pullUpLoad
      })

      //2.监听滚动的位置
      if(this.probeType === 2 || this.probeType ===3){
        this.scroll.on('scroll', (position) => {
          this.$emit('monitorScroll', position)
        })
      }

      // 3.监听上拉事件
      if(this.pullUpLoad){
        this.scroll.on('pullingUp', () => {
          // console.log('监听滚动到底部')
          //监听滚动到底部
          this.$emit('pullingUp')
        })
      }

      // console.log(this.scroll)


    },
    methods: {
      scrollTo(x, y, time = 500) {
        this.scroll && this.scrollTo&& this.scroll.scrollTo(x, y, 500)
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      refresh() {
        // console.log('------')
        this.scroll && this.scroll.refresh()
      }
    }
  }


</script>

<style scoped>

</style>

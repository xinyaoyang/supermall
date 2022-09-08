<template>
 <div class="wrapper" ref="wrapper">
   <div class="context">
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
      setTimeout(() => {

        //1.创建BScroll对象
        this.scroll = new BScroll(this.$refs.wrapper,{
          probeType:  this.probeType,
          ObserverDOM: true,
          click: true,
          mouseWheel: true,
          pullUpLoad: this.pullUpLoad
        })

        //2.监听滚动的位置
        this.scroll.on('scroll',(position) => {
          this.$emit('monitorScroll',position)
        })

        //3.监听上拉事件
        this.scroll.on('pullingUp',() => {
          // console.log('上拉加载更多')
          this.$emit('pullingUp')
        })
      },1000)
    },
    methods: {
      scrollTo(x,y,time=500) {
        this.scroll.scrollTo(x,y,500)
      },
      finishPullUp() {
        this.scroll.finishPullUp()
      }
    }
  }
</script>

<style scoped>

</style>

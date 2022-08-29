<template>
  <div id="home">
    <nav-bar>
      <template v-slot:center>
        <div>购物街</div>
      </template>
    </nav-bar>
    <h2>首页</h2>
  </div>

</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
export default {
  name: "Home",
  components: {
    NavBar
  },
}
</script>

<style scoped>

</style>

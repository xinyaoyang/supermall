<template>
    <MainTabbar></MainTabbar>
    <router-view/>
</template>

<script>
import MainTabbar from "components/content/mainTabbar/MainTabbar";

  export default {
    name: 'App',
    components: {
      MainTabbar
    }
  }
</script>

<style>
  @import "assets/css/base.css";
</style>

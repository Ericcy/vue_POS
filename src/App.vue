<template>
  <div id="app">
    <SideBar></SideBar>
    <div class="main">
     <router-view></router-view>
    </div>
  </div>
</template>

<script>
import SideBar from '@/components/common/sideBar'
export default {
  name: 'app',
  components: {
    SideBar
  }
}
</script>

<style>
#app {
  font-family: 'Microsoft YaHei', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.main{
  width:95%;
  float:right;
}
</style>

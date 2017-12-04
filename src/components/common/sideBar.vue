<template>
  <div class="sideBar">
    <ul>
      <li>
        <router-link to="Pos">
          <i class="icon iconfont icon-shouyin"></i>
          <div>收银</div>
        </router-link>
      </li>
      <li>
        <i class="icon iconfont icon-dianpu"></i>
        <div>店铺</div>
      </li>
      <li>
        <i class="icon iconfont icon-shangpin"></i>
        <div>商品</div>
      </li>
      <li>
        <router-link to="HuiYuan">
          <i class="icon iconfont icon-a536"></i>
          <div>会员</div>
        </router-link>
      </li>
      <li>
        <router-link to="TongJi">
          <i class="icon iconfont icon-tongji"></i>
          <div>统计</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {

  }
</script>
<style scoped>
  .sideBar{
    width:5%;
    height:100%;
    background:#1D8ce0;
    color:#fff;
    float:left;
    font-size:10px;
  }
  .sideBar ul{
    margin:0;
    padding:0;  
  }
  .sideBar ul i{
    font-size:24px;
  }
  .sideBar ul li{
   list-style:none;
   border-bottom:1px solid #20a0ff;
   padding:10px;
   text-align:center;
  }
  .sideBar a{
    text-decoration:none;
    color:#fff;
  }
</style>
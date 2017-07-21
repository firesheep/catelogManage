<template>
  <div id="app">
  	<div class="left">
  		<router-link to="/catalogManage" name="catalogManage" class="leftMenu">分类管理</router-link>
		<router-link to="/goodsManage" name="goodsManage" class="leftMenu">商品分类</router-link>
  	</div>
  	<div class="right">
  		<router-view class="view"></router-view>
  	</div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style>
*{ margin:0; padding:0; }
body{ font-size: 14px; }
li{ list-style: none; }
#app{ background: #f7f9fb; padding:20px; }
.left{ width:180px; padding:20px; }
.leftMenu{ text-decoration: none; display: block; color: #666; border-bottom: 1px solid #e8eaef; height: 40px; line-height: 40px; }
.router-link-active{ color: #e9563d; }
.left,.right{ display: inline-block; vertical-align: top; }
.right{ background: #fff; width:918px; height: 1000px; padding:20px; }
</style>

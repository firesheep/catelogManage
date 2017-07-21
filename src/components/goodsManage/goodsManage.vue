<template>
  <div class="gmMain">
    <el-tabs v-model="activeName">
	    <el-tab-pane label="全部商品" name="first">
			<gmMain></gmMain>
	    </el-tab-pane>
	    <el-tab-pane label="未分类商品" name="second">未分类商品</el-tab-pane>
	    <el-tab-pane label="已分类商品" name="third">已分类商品</el-tab-pane>
	  </el-tabs>
  </div>
</template>

<script>
import gmMain from './gmMain.vue'
export default {
	components:{
		gmMain
	},
  	data() {
      return {
        activeName: 'first'
      };
    },
    methods: {
      
    },
    

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

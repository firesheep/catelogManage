<template>
  <div class="catalogMain">
  	<div class="cmTitle">
  		<div class="addManual" @click="addByManual('manual')">＋添加手工分类</div>
  		<div class="addAuto" @click="addByAuto">＋添加自动分类</div>
	  	<div class="save" @click="saveData">保存</div>
  	</div>
  	<div class="cmOpe">
      <label>
        <el-checkbox v-model="$store.state.checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      </label>
  		<div class="batchDel" :class="{batchDelActive: $store.state.batchDelBol}" @click="batchDelFn">批量删除</div>
  	</div>
  	<div class="cmListMain">
  		<cateList></cateList>
  	</div>
    <autoClassify v-show="$store.state.popUpShow"></autoClassify>
  </div>
</template>

<script>
import cateList from './cateList'
import autoClassify from './autoClassify'
import { mapMutations } from 'vuex'

export default {
  components:{
  	cateList,
    autoClassify
  },
  methods:{
    ...mapMutations([
      'addByAuto','handleCheckAllChange','batchDelFn','saveData','addByManual'
    ])
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cmOpe{ border-bottom: 1px solid #f1f1f1; padding-bottom: 20px; margin-top: 20px; }
.cmTitle{ overflow: hidden; zoom:1; }
.cmTitle div{ float: left; cursor: pointer; }
.addManual,.addAuto{ width:188px; height: 34px; line-height: 34px; border:1px solid #fc472e; color:#fc472e; 
	text-align: center; margin-right: 25px; }
.save{ background: #fc472e; color:#ffffff; border-radius: 2px; width:100px; height: 36px; line-height: 36px; 
	text-align: center; margin-left: 388px; }
.el-checkbox{ display: inline-block; }
.batchDel{ width:100px; height: 26px; background: #f2f2f2; color:#cccccc; border-radius: 2px; text-align: center; 
	line-height: 26px; margin: 0 0 0 58px; cursor: pointer; display: inline-block; }
.batchDelActive{ background: #eb5535; color: #fff; }
</style>

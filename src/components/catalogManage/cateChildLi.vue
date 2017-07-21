<template>
	<transition-group class="childUl" name="flip-list" tag="ul">
		<li class="childLi listLi" v-for="(item, index) in message.childLi.allItemC" :key="item.id">
			<el-checkbox v-model="item.hasChecked" :value="index" class="cb" @change="handleCheckedChange"></el-checkbox>
			<div class="branch"></div>
			<div class="userInput">
				<input type="text" maxlength="12">
			</div>
			<div class="moveWrap">
				<img src="../../assets/top.jpg" @click="goTop({allItem:message.childLi.allItemC,item:item})">
				<img src="../../assets/up.jpg" @click="goUp({allItem:message.childLi.allItemC,item:item})">
				<img src="../../assets/down.jpg" @click="goDown({allItem:message.childLi.allItemC,item:item})">
				<img src="../../assets/bottom.jpg" @click="goBottom({allItem:message.childLi.allItemC,item:item})">
			</div>
			<p class="createTime">{{ item.nowTime }}</p>
			<p class="cMethod" cattype="1">手动分类</p>
			<p class="delIt" @click="delSelf({item, cindex})">删除</p>
			<a href="#" class="viewProduct ">查看商品</a>
		</li>
	</transition-group>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
	props:["message","cindex"],
	methods:{
		...mapMutations([
			'delSelf','handleCheckedChange','goTop','goUp','goDown','goBottom'
		])
	}
}

</script>

<style>
.childUl{ margin-top: 20px; }
.childLi{ padding: 20px 0; overflow: hidden; zoom:1; border-top: 1px solid #f1f1f1; }
.branch{ border-left:1px solid #f1f1f1; border-bottom: 1px solid #f1f1f1; width:15px; height:15px; margin-left: 30px; }
.childLi>.moveWrap{ margin:10px 0 0 83px; }
.childUl>li:last-child{ padding:20px 0 0 0; }

.flip-list-move {
  transition: transform 0.5s;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>










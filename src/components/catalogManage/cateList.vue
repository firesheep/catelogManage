<template>
	<transition-group name="flip-list" tag="ul">
		<li class="parentLi" v-for="(item, index) in $store.state.allItem" :key="item.id">
			<el-checkbox v-model="item.hasChecked" :value="index" class="cb" @change="handleCheckedChange"></el-checkbox>
			<div class="moreImgWrap" @click="showAddBtnFn(index)">
				<img src="../../assets/shut.jpg" class="moreImg">
			</div>
			<div class="userInput">
				<input type="text" maxlength="12" v-model="item.clName">
			</div>
			<div class="moveWrap">
				<img src="../../assets/top.jpg" @click="goTop({allItem:$store.state.allItem,item:item})">
				<img src="../../assets/up.jpg" @click="goUp({allItem:$store.state.allItem,item:item})">
				<img src="../../assets/down.jpg" @click="goDown({allItem:$store.state.allItem,item:item})">
				<img src="../../assets/bottom.jpg" @click="goBottom({allItem:$store.state.allItem,item:item})">
			</div>
			<p class="createTime">{{ item.nowTime }}</p>
			<p class="cMethod" cattype="1">{{item.clMethod}}</p>
			<p class="delIt" @click="delSelf({item})">删除</p>
			<a href="#" class="viewProduct ">查看商品</a>
			<transition name="fade">
				<div class="branchMain" v-show="item.showAddBtn">
					<cateChildLi :message="item" :cindex="index"></cateChildLi>
					<ul class="addClassUl">
						<li class="addClassLi">
							<div class="branch">
								
							</div>
							<p class="addChild" @click="addByManualC(index)">添加分类</p>
						</li>
					</ul>
				</div>
			</transition>
		</li>
	</transition-group>
</template>

<script>
import cateChildLi from './cateChildLi'
import { mapMutations } from 'vuex'

export default {
	components:{
		cateChildLi
	},
	methods:{
		...mapMutations([
			'delSelf','handleCheckedChange','goTop','goUp','goDown','goBottom','showAddBtnFn','addByManualC'
		])
	},
	/*watch: {
        allItem:{
        	handler:function(){
				this.allItem.forEach(function(item,i){

				})
			},
			deep:true
        }
    }*/
}

</script>

<style>
.cb{ margin-top: 10px; }
.parentLi{ padding:20px 0; border-bottom: 1px solid #f1f1f1; overflow: hidden; zoom:1; }
.parentLi>*,.childLi>*,.addClassLi>*{ float: left; }
.selectIt{ margin-top:10px; }
.moreImgWrap{ width:10px; height: 19px; margin:9px 10px 0 10px; }
.userInput{ position: relative; }
.userInput>input{ border:1px solid #dedede; width:138px; height: 32px; padding:0 5px; }
.moveWrap{ margin:10px 0 0 100px; }
.moveWrap>img{ margin:0 7px; cursor: pointer; }
.createTime{ margin-left: 40px; margin-top: 10px; width:140px; }
.cMethod{ margin-left: 70px; margin-top: 10px; }
.delIt{ margin-left: 72px; margin-top: 10px; cursor: pointer; color: #e9563d; text-decoration: underline; }
.viewProduct{ margin-left: 18px; margin-top: 10px; color:#e9563d; text-decoration: underline; }

.branchMain{ width: 100%; }
.addClassUl{ width: 100%; margin-top: 20px; }
.addClassLi{ padding-top: 20px; overflow: hidden; zoom:1; border-top: 1px solid #f1f1f1; }
.addClassLi>.branch{ margin-left: 48px; }
.addClassLi p{ background: #d6d6d6; color:#666666; height: 30px; width:100px; line-height: 30px; text-align: center; cursor: pointer; }


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










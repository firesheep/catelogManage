<template>
	<div class="sectionMain">
    <div class="sectionOne">
      <div class="gcShopName">
        <p>商品名称</p>
        <input type="text" value="">
      </div>
      <div class="gcShopPrice">
        <p>价格</p>
        <input type="text" value="" class="startPrice">
        <div></div>
        <input type="text" value="" class="endPrice">
      </div>
      <div class="gcShopClassified">
        <p>商品分类</p>
        <el-cascader
          :options="options"
          :show-all-levels="false"
          change-on-select
        ></el-cascader>
      </div>
      <div class="searchBtn">搜索</div>
    </div>

    <div class="sectionTwo">
      <div class="cmOpe">
        <el-checkbox v-model="$store.state.checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <div class="batchDel">批量删除</div>
      </div>
    </div>

    <div class="sectionThree">
      <ul class="listTit">
        <li style="width:35%;">商品名称</li>
        <li style="width:10%;">价格</li>
        <li style="width:10%;">创建时间</li>
        <li style="width:10%;">状态</li>
        <li style="width:20%;">所属分类</li>
        <li style="width:10%;">编辑分类</li>
      </ul>

      <ul class="listMain">
        <li class="listMainLi" v-for="(item,index) in goodsList">
          <el-checkbox v-model="item.hasChecked" :value="index" class="cb" @change="handleCheckedChange"></el-checkbox>
          <img :src="item.mainImg" class="listPic">
          <a class="listName" target="_blank" href="http://detail.qbao.com/3531101.html?channel=50">{{item.spuName}}</a>
          <p class="listPrice">¥{{(item.viewPrice/100).toFixed(2)}}</p>
          <p class="listTime">{{item.createTime}}</p>
          <p class="listState">{{(item.publishState == 1 && ( item.auditState == 2 || item.auditState == 4 )?"已上架":"已下架")}}</p>
          <div class="listBelong">
            <span></span>
          </div>

        </li>
      </ul>

      <el-pagination
        layout="prev, pager, next"
        :total="50">
      </el-pagination>
    </div>




	</div>
</template>


<script>
import {mapMutations} from 'vuex'

export default{
	data(){
		return {
			options:[],
      goodsList:[]
		}
	},
  methods:{
    ...mapMutations([
      'handleCheckAllChange','handleCheckedChange'
    ])
  },
	created(){
		const This = this;
		function getarr(item){
			const arr = [];
			item.childList.forEach(function(item,i){
					arr.push({
							'value':item.catName,
							'label':item.catName
						})
  			})
  			return arr;
		}
    this.$http.get("//localhost:3000/loadList").then(response => {
      	response.body.forEach(function(item,i){
      		This.options.push({
	      		'value':item.catName,
	      		'label':item.catName,
	      		'children':getarr(item)
      		})
      	})
    }, response => {});
    this.$http.get('//localhost:3000/getAllStoreGoodsList',{'_page':7,'_limit':20}).then(response => {
      this.goodsList = response.body;
    })
	}
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sectionOne{ margin-top:25px; display: table; width:100%; border-bottom: 1px dashed #eee; padding-bottom: 15px; }
.sectionOne>*{ display: inline-block; }
.sectionOne input{ border:1px solid #dedede; height: 32px; display: inline-block; }
.gcShopName input{ width: 155px; padding-left:3px; }
.gcShopName p,.gcShopPrice p{ display: inline-block; color:#666666; margin-right: 5px; }
.gcShopPrice{ margin-left: 30px; }
.gcShopPrice div{ display: inline-block; border-bottom: 1px solid #dedede; width: 17px; margin:0 6px; }
.gcShopPrice input{ width:82px; padding-left: 3px; }

.gcShopClassified>p{ margin-left: 32px; color:#666666; margin-right: 5px; display: inline-block; }
.el-cascader{ display: inline-block; width: 158px; }
.searchBtn{ background: #eb5535; color: #ffffff; border-radius: 2px; width:100px; text-align: center; height: 34px;
line-height: 34px; margin-left: 28px; cursor: pointer; }


.cmOpe{ padding-bottom: 20px; margin-top: 20px; }
.el-checkbox{ display: inline-block; }
.batchDel{ width:100px; height: 26px; background: #f2f2f2; color:#cccccc; border-radius: 2px; text-align: center; 
  line-height: 26px; margin: 0 0 0 58px; cursor: pointer; display: inline-block; }
.batchDelActive{ background: #eb5535; color: #fff; }

.listTit{ background: #f6f7f8; overflow: hidden; zoom:1; }
.listTit li{ float: left; height: 38px; line-height: 38px; text-align: center; }

.listMain>li{ padding:16px 0; border-bottom: 1px solid #dedede; }
.listMain>li>*{ display: inline-block; vertical-align: middle; }
.listMain>li>p{ color: #888888; }
.listName{ color: #888888; width:168px; margin-right: 62px; text-decoration: none; }
.selectIt{ margin-right: 25px; }
.listPic{ margin-right: 23px; width:60px; height: 60px; margin-left: 5px; }
.showListpic{ position: absolute; right:100px; border:1px solid red; z-index: 1; }
.listPrice{ width:70px; }
.listTime{ margin-right: 28px; width: 80px; }
.listState{ margin-right: 30px; }
.listBelong{ width:175px; margin-right: 10px; text-align: center; display: inline-block; color: #888888; }

</style>
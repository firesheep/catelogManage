<template>
  <div>
  	<div class="blackBg"></div>
    <div class="acPopup">
      <div class="ppTitle">
        <p>自动分类</p>
        <img src="../../assets/close.jpg" @click="closeByAuto">
      </div>

      <div class="ppMain">
        <div class="ppInfo">
          <p>按商品类目归类</p>
          <img src="../../assets/info.jpg">
          <span>已满3个分类的商品不再参与自动分类</span>
        </div>

        <div class="mainTit">
          <p style="margin-left:95px;">类目名称</p>
          <p style="margin-left:285px;">操作</p>
        </div>

        <div class="mainList">
          <li class="autoList" v-for="item in $store.state.autoItem">
            <el-checkbox v-model="item.autoCheck" @change="autoHasCheck(item)"></el-checkbox>
            <input type="text" :value="item.dirName">
            <p class="viewGoods" @click="viewGoodsDetail">查看商品<span>（{{item.spuNum}}）</span></p>
          </li>
        </div>
      </div>
      
      <div class="ppFoot">
        <div class="autoAddCancel" @click="closeByAuto">取消</div>
        <div class="autoAddConfirm" @click="addByManual('auto')">确定</div>
      </div>

      <div class="detailPop" v-show="$store.state.detailPop">
        <div class="dpTit">
          <p style="margin-left:20px;">商品名称</p>
          <p style="margin-left:220px;">价格</p>
          <img src="../../assets/close.jpg" style="margin-left:38px;" @click="closeDetailPop">
        </div>
        <div class="dpMain">
          <ul>
            <li v-for="item in $store.state.goodsDetail" class="goodsDetailList">
              <a href="http://detail.qbao.com/'+ msg[i].id +'.html?channel=50">
                <img :src="item.mainImg">
                <p style="margin-left:5px; width:200px;">{{item.spuName}}</p>
                <p style="margin-left:10px;">￥{{item.viewPrice}}</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  methods:{
    ...mapMutations([
      'closeByAuto','addByManual','viewGoodsDetail','closeDetailPop','autoHasCheck'
    ])
  },
  created(){
    this.$http.get("//localhost:3000/getAutoCatalogList").then(response => {
      this.$store.state.autoItem = response.body;
    }, response => {});

    this.$http.get("//localhost:3000/getGoodsByDirId").then(response => {
      this.$store.state.goodsDetail = response.body;
    }, response => {});
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.blackBg{ position: fixed; top:0; right: 0; bottom: 0; left:0; background: #000; opacity: 0.3; z-index: 1;  }
.acPopup{ position: fixed; top:50%; left:50%; width: 600px; height: 500px; margin:-250px 0 0 -300px; z-index: 2; background: #fff; border-radius: 5px; }
.detailPop{ width: 400px; height: 350px; position: absolute; top:50%; left:50%; margin:-175px 0 0 -200px; background: #fff;
 z-index: 3; box-shadow: 0 2px 10px #ccc; }
.ppTitle{ padding:15px; border-bottom: 1px dashed #eee; }
.ppTitle *{ display: inline-block; vertical-align: middle; }
.ppTitle p{ color:#000; font-size: 18px; }
.ppTitle img{ margin-left: 472px; }

.ppMain{ padding:15px; }

.ppInfo *{ display: inline-block; vertical-align: middle; }
.ppInfo p{ color:#666; }
.ppInfo img{ margin-left: 15px; }
.ppInfo span{ color:#f1832e; }

.mainTit{ background: #f1f1f1; margin-top: 15px; }
.mainTit p{ display: inline-block; height: 30px; line-height: 30px; }

.mainList{ border:1px solid #f1f1f1; max-height: 300px; overflow: auto; }
.autoList{ padding:10px; }
.autoList *{ display: inline-block; }
.autoList input{ height: 30px; padding-left: 5px; width: 165px; margin-left: 15px; }
.viewGoods{ cursor: pointer; color: #e9563d; margin-left: 200px; }
.viewGoods span{ color: #bbb; }

.ppFoot{ position: absolute; bottom: 15px; left:0; text-align:center; width: 100%; }
.ppFoot>div{ display: inline-block; padding:8px 30px; border-radius: 4px; border:1px solid #eb5535; cursor: pointer; }
.autoAddCancel{ background: #fff; color: #eb5535; margin-right: 20px; }
.autoAddConfirm{ background: #eb5535; color: #fff; }

.dpMain{ max-height: 320px; overflow: auto; }
.dpTit{ background: #f1f1f1; padding:10px 0; }
.dpTit *{ display: inline-block; vertical-align: middle; }

.goodsDetailList a{ padding:10px; display: block; text-decoration:none; color: #666; }
.goodsDetailList a:hover{ color: red; }
.goodsDetailList a *{ display: inline-block; vertical-align: middle; }
</style>

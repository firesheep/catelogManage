import Vue from 'vue'
import Vuex from 'vuex'
import { MessageBox } from 'element-ui'
import {} from './mutation-types.js'
import {removeByValue, upRecord, downRecord, topRecord, bottomRecord, getNowFormatDate} from '../config/tool.js'
import low from 'lowdb'

Vue.use(Vuex)

const state = {
	manualNum:0,
	allItem:[],
	hasCheckedNum:0,
	checkAll:false,
	batchDelBol:false,
	popUpShow:false,
	autoItem:[],
	detailPop:false,
	goodsDetail:[]
}

const actions = {

}

const mutations = {
	addByManual(state,from){
		if ( from == 'auto' ) {
			state.autoItem.forEach(function(item, i){
	          	if ( item.autoCheck ) {
					state.allItem.push({
						id:item.dirId,
						nowTime:getNowFormatDate(),
						clName:item.dirName,
						clMethod:'自动分类',
						hasChecked:false,
						showAddBtn:false,
						childLi:{
							manualNumC:0,
							allItemC:[],
							hasCheckedNumC:0,
							checkAllC:false
						}
					})
	          	}
	    	})
	    	state.popUpShow = false;
		}else{
			state.manualNum++;
			state.allItem.push({
				id:state.manualNum,
				nowTime:getNowFormatDate(),
				clName:'',
				clMethod:'手动分类',
				hasChecked:false,
				showAddBtn:false,
				childLi:{
					manualNumC:0,
					allItemC:[],
					hasCheckedNumC:0,
					checkAllC:false
				}
			})
		}
		
	},
	addByAuto(state){
		state.popUpShow = true;
		state.autoItem.forEach(function(item, i){
          	Object.assign(item, {autoCheck:false})
    	})
	},
	closeByAuto(state){
		state.popUpShow = false;
	},
	autoHasCheck(state,item){
		state.autoItem.forEach(function(itemObj, i){
          	if ( item == itemObj ) {
          		itemObj.autoCheck = event.target.checked;
          	}
    	})
	},
	viewGoodsDetail(state){
		state.detailPop = true;
	},
	closeDetailPop(state){
		state.detailPop = false;
	},
	delSelf(state, {item, cindex}){
		if ( cindex == undefined ) {
			removeByValue(state.allItem, item)
			if ( state.allItem.length == 0 ) {
				state.checkAll = false;
			}
		}else{
			removeByValue(state.allItem[cindex].childLi.allItemC, item)
			if ( state.allItem[cindex].childLi.allItemC.length == 0 ) {
				state.checkAll = false;
			}
		}
	},
	batchDelFn(state){
		if ( !state.batchDelBol ) {
			return;
		}
		const arr = [];
		const childArr = [];
		var ifDel = true;
		state.allItem.forEach(function(item,i){
			if ( item.childLi.allItemC.length > 0 && item.hasChecked ) {
				MessageBox.alert('分类 “'+ item.clName +'” 中还有子分类，暂不可删除。', '提示', {
		          confirmButtonText: '知道了'
		        });
		        ifDel = false;
			}
			item.childLi.allItemC.forEach(function(item,i){
				if ( !item.hasChecked ) {
					childArr.push(item)
				}
			})
			item.childLi.allItemC = childArr;
		})
		if ( ifDel ) {
			state.allItem.forEach(function(item,i){
				if ( !item.hasChecked ) {
					arr.push(item)
				}
			})
			state.allItem = arr;
			state.checkAll = state.batchDelBol = false;
		}
	},
	handleCheckAllChange(state){
		if ( event.target.checked ) {
			state.batchDelBol = true;
			state.allItem.forEach(function(item ,i){
				item.hasChecked = true;
				item.childLi.allItemC.forEach(function(item,i){
					item.hasChecked = true;
				})
			})
			state.hasCheckedNum = state.allItem.length
		}else{
			state.batchDelBol = false;
			state.allItem.forEach(function(item ,i){
				item.hasChecked = false;
				item.childLi.allItemC.forEach(function(item,i){
					item.hasChecked = false;
				})
			})
		}
	},
	handleCheckedChange(state){
		var childCheckArr = state.allItem.map(function(item){
			return item.childLi.allItemC.filter(function(item){
				return item.hasChecked
			}).length
		})
		var allCheckNum = 0;
		childCheckArr.forEach(function(item){
			allCheckNum += item
		})
		state.batchDelBol = (state.allItem.filter(item => item.hasChecked ).length+allCheckNum) > 1

		state.checkAll = state.allItem.every(item => item.hasChecked ) && state.allItem.every(item => item.childLi.allItemC.every(item => item.hasChecked ) );

	},
	goTop(state, {allItem,item}){
		topRecord( allItem, allItem.indexOf(item) )
	},
	goUp(state, {allItem, item}){
		upRecord( allItem, allItem.indexOf(item) )
	},
	goDown(state, {allItem,item}){
		downRecord( allItem, allItem.indexOf(item) )
	},
	goBottom(state, {allItem,item}){
		bottomRecord( allItem, allItem.indexOf(item) )
	},
	showAddBtnFn(state, index){
		state.allItem[index].showAddBtn = !state.allItem[index].showAddBtn
	},
	addByManualC(state, index){
		state.allItem[index].childLi.manualNumC++
		state.allItem[index].childLi.allItemC.push({
			id:state.allItem[index].childLi.manualNumC,
			nowTime:getNowFormatDate(),
			hasChecked:false,
		})
	},
	saveData(state){
		const db = low('../../../mock/db.json')
		// Set some defaults if your JSON file is empty
		db.defaults({ posts: [], user: {} })
		  .write()
		  console.log('save')
		// Add a post
		db.get('posts')
		  .push({ id: 1, title: 'lowdb is awesome'})
		  .write()

		// Set a user
		db.set('user.name', 'typicode')
		  .write()

	}
}
const store = new Vuex.Store({
	state,
	actions,
	mutations
})


//vuex中watch的用法
/*store.watch(
	// When the returned result changes...
  function (state) {
    return state.allItem
  },
  // Run this callback
  function(){
  	console.log(11)
  }
)*/

/*store.watch((state) => state.searchString, (oldValue, newValue) => {
    console.log('search string is changing')
    console.log(oldValue)
    console.log(newValue)
})*/

export default store;


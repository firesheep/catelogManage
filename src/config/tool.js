
//从数组中删除指定值元素
export const removeByValue = (arr, val) => {
  for(var i=0; i<arr.length; i++) {
    if(arr[i] == val) {
      arr.splice(i, 1);
      break;
    }
  }
}

// 交换数组元素
export const swapItems = (arr, index1, index2) => {
    arr[index1] = arr.splice(index2, 1, arr[index1])[0];
    return arr;
};

// 上移
export const upRecord = (arr, $index) => {
    if($index == 0) {
        return;
    }
    swapItems(arr, $index, $index - 1);
};

// 下移
export const downRecord = (arr, $index) => {
    if($index == arr.length -1) {
        return;
    }
    swapItems(arr, $index, $index + 1);
};

//移至顶部
export const topRecord = (arr, $index) => {
  if ( $index == 0 ) {
    return;
  }
  return arr.unshift( arr.splice( $index, 1 )[0] );
}

//移至底部
export const bottomRecord = (arr, $index) => {
  if ( $index == arr.length -1 ) {
    return;
  }
  return arr.push( arr.splice( $index, 1 )[0] )
}

//获取当前时间
export const getNowFormatDate = () => {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}

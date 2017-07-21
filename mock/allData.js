/*module.exports = function () {
 var faker = require("faker");
 faker.locale = "zh_CN";
 var _ = require("lodash");
 return {
     data: _.times(10, function (n) {
         return {
             id: faker.random.uuid(),
             dirName: faker.lorem.words(),
             spuNum: faker.random.number()
         }
     })
 }
}*/

module.exports = function () {
 var Mock  = require("mockjs");
 var data = Mock.mock({
        'getAutoCatalogList|1-20': [{
            'dirId': '@id',
            'dirName':'@cword(3,8)',
            'spuNum':'@natural(0, 30)'
        }],
        'getGoodsByDirId|1-10':[{
            'id':'@id',
            'mainImg':'@image("60x60")',
            'spuName':'@cword(3,8)',
            'viewPrice':'@natural(100, 3000)'
        }],
        'loadList|1-20':[{
            'catName':'@cword(3,8)',
            'id':'@id',
            'checked':false,
            'childList|0-10':[{
                'catName':'@cword(3,8)',
                'id':'@id',
                'checked':false
            }]
        }],
        'getAllStoreGoodsList|30-60':[{
            'id':'@id',
            'spuName':'@cword(3,28)',
            'mainImg':'@image("60x60")',
            'viewPrice':'@natural(100, 30000)',
            'createTime':'@date("yyyy-MM-dd")',
            'auditState':'@natural(1, 4)',
            'publishState':'@natural(0, 1)'
        }]
    })
 return data;
}

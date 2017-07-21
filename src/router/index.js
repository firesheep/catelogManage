import App from '../App'

const catalogManage = r => require.ensure([], () => r(require('../components/catalogManage/catalogManage')), 'catalogManage')
const goodsManage = r => require.ensure([], () => r(require('../components/goodsManage/goodsManage')), 'goodsManage')

export default [
	{
		path: '/',
	    name:'catalogManage',
	    component: catalogManage
	},
	{
	    path: '/catalogManage',
	    name:'catalogManage',
	    component: catalogManage
	},
	{
	    path: '/goodsManage',
	    name:'goodsManage',
	    component: goodsManage
	},
]
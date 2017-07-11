/*
* @Author: 夏本增
* @Date:   2017-05-24 14:29:56
* @Last Modified time: 2017-07-10 17:25:15
*/
//整站的配置信息
//站点根链接
var SITEURL = 'http://www.webfeel.org/';

var APILIST = {
	//以下为远程接口
	oneapi:SITEURL + 'zuoye/php/oneapi.php',
	// subNavApi : SITEURL + 'zuoye/php/subNavApi.php'
	productBlock : SITEURL + 'zuoye/php/productBlock.php',
	smallImgData : SITEURL + 'zuoye/php/smallImgData.php',
	//根据不同产品pid获得不同产品信息
	param: SITEURL + 'zuoye/php/param.php',
	//省
	province: SITEURL + 'zuoye/php/province.php',
	//市
	city: SITEURL + 'zuoye/php/city.php',
	//区
	area: SITEURL + 'zuoye/php/area.php',
	//购物车产品列表
	cartUlLi: SITEURL + 'zuoye/php/cartUlLi.php',
	//计算某项商品的总价合计 单价*数量
	cart: SITEURL + 'zuoye/php/cart.php',
	//计算选中的商品的总数及价格
	goodsCheck: SITEURL + 'zuoye/php/goodsCheck.php',
}
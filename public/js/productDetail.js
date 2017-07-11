/*
* @Author: 夏本增
* @Date:   2017-07-07 13:49:43
* @Last Modified time: 2017-07-10 10:29:44
*/

'use strict';
$(function(){
	//产品产品详情页pid
	productDetailFn();
	// 产品产品详情页的大小图列表
	new createSmallImg();
	//地址切换菜单
	new addressMenu();
	//商品数量
	new chooseGoods();
});
//产品产品详情页pid
function productDetailFn() {
	//获取不同商品的pid
	var _url = location.href;
	var _pid = _url.substring(_url.indexOf('?') + 5);
	// console.log(_pid);
	getParam(APILIST.param,_pid,function(d){
		var txt = d.productInfo;
		var len = txt.length;
		$('#h1id').html(txt[0].title);
		$('#h2id').html(txt[1].pInfo);
		$('#h3id').html(txt[2].info);
	})
}
//产品产品详情页的大小图列表
function createSmallImg() {
	this.bigImgId = $('#bigImgId');
	this.mousemoveDivId = $('#mousemoveDivId');
	this.bigImg = $('#bigImg');
	this.zoomImgId = $('#zoomImgId');
	this.leftBtnId = $('#leftBtnId');
	this.rightBtnId = $('#rightBtnId');
	this.imgSmallListId = $('#imgSmallListId');
	this.num = 0;
	this.init();
}
createSmallImg.prototype = {
	init:function(){
		this.getJson();
		
	},
	getJson:function(){
		var that = this;
		getAjaxJsonp(APILIST.smallImgData,function(d){
			var _d = d.smallImg;
			that.modifyBigImgSrc(_d);
			that.imgSmallList(_d);
			//大图半透明遮罩事件
			that.mousemoveEvent();
		})
	},
	modifyBigImgSrc:function(_d){
		//页面打开第一张大图
		this.bigImgId.attr('src', _d[0].bigImg);
		this.partBigImg( _d[0].bigImg);
	},
	imgSmallList:function(_d){
		//升程小图列表
		var that = this;
		var len = _d.length;
		for (var i = 0; i < len; i++) {
			$('<li/>',{})
				.attr('data-bigImg', _d[i].bigImg)
				.html('<img src="'+ _d[i].imgurl+'"/>')
				.on('click',function(){
					that.smallImgEvent($(this).attr('data-bigImg'));
				})
				.appendTo(that.imgSmallListId);
		};
	},
	//小图的click事件
	smallImgEvent:function(_bigImg){
		this.bigImgId.attr('src', _bigImg);
		this.partBigImg(_bigImg);
	},
	// 大图的半透明遮罩
	mousemoveEvent:function(){
		var that = this;
		that.mousemoveDivId.css('display', 'block');
		that.bigImg.on('mousemove',function(e){
			var x = e.pageX;
			var y = e.pageY;
			var moveDiv = $(this).offset();
			//限制小黄块的位置
			if (x < (moveDiv.left + 83)) {
				x = moveDiv.left + 83;
			} else if(x > (moveDiv.left + $(this).width() - 83)){
				x = moveDiv.left + $(this).width() - 83;
			};
			if (y < (moveDiv.top + 83)) {
				y = moveDiv.top + 83;
			} else if(y > (moveDiv.top + $(this).height() - 83)){
				y = moveDiv.top + $(this).height() - 83;
			};
			that.mousemoveDivId.css({
				'left': x - moveDiv.left - 83,
				'top': y - moveDiv.top - 83
			});
			//缩略图的坐标，成比例
			var xy = {};
			xy['left'] = x - moveDiv.left - 83;
			xy['top'] = y - moveDiv.top - 83;
			that.partBigImgMove(xy);
		})
	},
	//大图局部细节图
	partBigImg:function(bigImgUrl){
		var that = this;
		that.bigImg.on('mouseenter',function(){
			that.zoomImgId.css('display', 'block');
		})
		that.bigImg.on('mouseleave',function(){
			that.zoomImgId.css('display', 'none');
		});
		$('<img/>',{})
			.attr('src', bigImgUrl)
			.appendTo(that.zoomImgId);
	},
	//大图的坐标
	partBigImgMove:function(xy){
		var that = this;
		that.zoomImgId.children('img').css({
				'left': -xy.left * 3,
				'top': -xy.top * 3
			});
	}
}
// 地址切换菜单
function addressMenu() {
	this.addressTitle = $('#addressTitle');
	this.addressWrap = $('#addressWrap');
	//省市区id
	this.provinceId = $('#provinceId');
	this.cityId = $('#cityId');
	this.areaId = $('#areaId');
	//三个tab菜单按钮
	this.tabA = $('#tabA');
	this.tabB = $('#tabB');
	this.tabC = $('#tabC');
	this.arr = [];
	this.init();
}
addressMenu.prototype = {
	init:function(){
		var that = this;
		this.addressTitle.on('click',function(){
			that.addressWrap.toggle();
		})
		this.getData();
	},
	getData:function(){
		var that = this;
		//获取省数据
		getAjaxJsonp(APILIST.province,function(d){
			that.createDom(d.province,that.provinceId);
			that.provinceData();
		});
		//获取市数据
		getAjaxJsonp(APILIST.city,function(d){
			that.createDom(d.city,that.cityId);
			that.cityData();
		});
		//获取区数据
		getAjaxJsonp(APILIST.area,function(d){
			that.createDom(d.area,that.areaId);
			that.areaData();
		})
	},
	//生成省市区的dom节点
	createDom:function(_d,_wrap){
		var that = this;
		for (var i = 0; i < _d.length; i++) {
			$('<p/>',{})
				.html(_d[i].name)
				.appendTo(_wrap);
		};
	},
	//省的tab html
	provinceData:function(){
		var that = this;
		this.provinceId.find('p').on('click',function(){
			that.tabA.removeClass('clickLi')
					 .html($(this).html());
			that.provinceId.hide();
			that.tabB.addClass('clickLi');
			that.finalAddressTitle(that.tabA.html());
		})
	},
	//市的tab html
	cityData:function(){
		var that = this;
		this.cityId.find('p').on('click',function(){
			that.tabB.removeClass('clickLi')
					 .html($(this).html());
			that.cityId.hide();
			that.tabC.addClass('clickLi');
			that.finalAddressTitle(that.tabB.html());
		})
	},
	//区的tab html
	areaData:function(){
		var that = this;
		this.areaId.find('p').on('click',function(){
			that.tabC.removeClass('clickLi')
					 .html($(this).html());
			that.areaId.hide();
			that.finalAddressTitle(that.tabC.html());
			that.addressWrap.hide();
		})
	},
	//最终地址 操作省市区的数组
	finalAddressTitle:function(n){
		var that = this;
		that.arr.push(n);
		var len = that.arr.length;
		var str = '';
		for (var i = 0; i < len; i++) {
			str += that.arr[i] + ' ';
		};
		$('#addressTitle span').html(str);
	}	
}
//商品加减数量输入及加入购物车
function chooseGoods() {
	this.buyNum = $('.buyNum');
	this.btnAdd = $('.btnAdd');
	this.btnReduce = $('.btnReduce');
	this.num = 1;
	this.init();
}
chooseGoods.prototype = {
	init:function(){
		this.buyNumBlur();
		this.addEvent();
		this.reduceEvent();
	},
	buyNumBlur:function(){
		var that = this;
		this.buyNum.on('blur',function(){
			var val = $(this).val();
			that.num = val;
		})
	},
	addEvent:function(){
		var that = this;
		this.btnAdd.on('click',function(){
			that.num ++;
			that.buyNum.val(that.num);
		})
	},
	reduceEvent:function(){
		var that = this;
		this.btnReduce.on('click',function(){
			that.num --;
			if (that.num < 1) {
				that.num = 1;
			}
			that.buyNum.val(that.num);
		})
	}
}
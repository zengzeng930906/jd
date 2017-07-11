/*
* @Author: 夏本增
* @Date:   2017-07-10 10:36:49
* @Last Modified time: 2017-07-11 10:16:23
*/

'use strict';
$(function(){
	new cartModule();
})
function cartModule(){
	this.cartBodyWrap = $('.cartBodyWrap');
	this.choosedGoodsNum = $('#choosedGoodsNum');
	this.allProducts = $('#allProducts');
	this.cartTotalMoney = $('#cartTotalMoney');
	this.AllSelectBtn = $('.AllSelectBtn');
	this.init();
}
cartModule.prototype = {
	init:function(){
		this.getGoodslist();
	},
	//获得商品列表
	getGoodslist:function(){
		var that = this;
		getAjaxJsonp(APILIST.cartUlLi,function(d){
			if (d.error.code == 0) {
				that.createGoodsList(d);
				that.choosedGoodsNum.html(d.total.num);
				that.allProducts.html(d.total.num);
				that.cartTotalMoney.html(d.total.totalMoney);
			} else{
				console.log('商品信息有误');
				return false;
			};
		})
	},
	//生成商品列表
	createGoodsList:function(d){
		var that = this;
		var _cartList = d.cartList;
		var len = _cartList.length;
		var str = '';
		for (var i = 0; i < len; i++) {
			str += '<div class="aaaLine"></div>'
			str += '<div class="cartItem">'
			str += '<input class="check" data-num="'+_cartList[i].num+'" data-total="'+_cartList[i].total+'" type="checkbox" checked />'
			str += '<label>'
			str += 	'<img src="'+_cartList[i].goodsimg+'" />'
			str += '</label>'
			str += '<p class="info">'+_cartList[i].name+'</p>'
			str += '<p class="props">'+_cartList[i].introduce+'</p>'
			str += '<p class="price">￥'+_cartList[i].unit+'</p>'
			str += '<div class="quantity_form">'
			str += 	'<input data-unit="'+_cartList[i].unit+'" class="left fl" type="button" value="-" />'
			str += 	'<input class="center" type="text" value="'+_cartList[i].num+'" />'
			str += 	'<input data-unit="'+_cartList[i].unit+'" class="right fl" type="button" value="+" />'
			str += '</div>'
			str += '<p class="sum">￥'+_cartList[i].total+'</p>'
			str += '<p class="del">删除</p>'
			str += '</div>'
		};
		that.cartBodyWrap.html(str);
		that.addGoodsBtn();
		that.reduceGoodsBtn();
		that.checkEvent();
	},
	//添加商品按钮
	addGoodsBtn:function(){
		var that = this;
		var _cartItem = that.cartBodyWrap.children('.cartItem');
		var add = _cartItem.find('.right');
		add.on('click',function(){
			var _this = $(this);
			var v = _this.prev().val();
			var singlePrice = _this.data('unit');
			var _sum = _this.parent().next();
			v ++;
			_this.prev().val(v);
			that.cartSingleTotal(v,singlePrice,_sum);
		})
	},
	//减少商品按钮
	reduceGoodsBtn:function(){
		var that = this;
		var _cartItem = that.cartBodyWrap.children('.cartItem');
		var reduce = _cartItem.find('.left');
		reduce.on('click',function(){
			var _this = $(this);
			var v = _this.next().val();
			var singlePrice = _this.data('unit');
			var _sum = _this.parent().next();
			v --;
			if (v < 1) {
				v = 1;
			}
			_this.next().val(v);
			that.cartSingleTotal(v,singlePrice,_sum);
		})
	},
	//计算某种商品的总价合计 单价*数量
	cartSingleTotal:function(v,s,sum){
		var that = this;
		var _d = '[{"num":'+v+',"price":'+s+'}]';
		cartFnJsonp(APILIST.cart,_d,function(d){
			sum.html('￥' + d);
		//点击加号是更新本条商品数量和总价
		var checkbox = sum.parents('.cartItem').children('.check');
		checkbox.attr({
			'data-num': v,
			'data-total': d
		});
		var _d = JSON.stringify(that.isCheckedGoodsInfo());
			goodsCheckFnJsonp(APILIST.goodsCheck,_d,function(d){
				that.choosedGoodsNum.html(d.num);
				that.cartTotalMoney.html(d.price);
			})
		})
	},
	//返回所有商品中被选中商品
	isCheckedGoodsInfo:function(){
		var that = this;
		var checkbox = that.cartBodyWrap.find('input:checked');
		var len = checkbox.length;
		var arr = [];
		for (var i = 0; i < checkbox.length; i++) {
			var obj = {};
			obj["price"] = checkbox.eq(i).data('total');
			obj["num"] = checkbox.eq(i).data('num');
			arr.push(obj);
		};
		console.log(arr);
		return arr;
	},
	//商品的选择事件
	checkEvent:function(){
		var that = this;
		var checkbox = that.cartBodyWrap.find("input[type='checkbox']");
		checkbox.on('click',function(){
			var _d = JSON.stringify(that.isCheckedGoodsInfo());
			goodsCheckFnJsonp(APILIST.goodsCheck,_d,function(d){
				that.choosedGoodsNum.html(d.num);
				that.cartTotalMoney.html(d.price);
			})
		})
	},
}
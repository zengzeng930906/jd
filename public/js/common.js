/*
* @Author: 夏本增
* @Date:   2017-06-28 13:03:55
* @Last Modified time: 2017-07-10 18:04:57
*/

'use strict';
	//tab栏切换 obj传入id 用于多个tab栏
// function tab(obj){
// 	var target = document.getElementById(obj);
// 	var spans = target.getElementsByTagName("span");
// 	var lis = target.getElementsByTagName("li");
// 	var len = spans.length
// 	for (var i = 0; i < len; i++) {
// 		spans[i].index = i;
// 		spans[i].onmouseover = function(){
// 			for (var j = 0; j < len; j++) {
// 				spans[j].className = "";
// 				lis[j].style.display = "none";
// 			};
// 			this.className = current;
// 			lis[this.index].style.display = "block";
// 		}
// 	};
// }

//封装自己的class 类名
/*function getClass(classname){
	//如果浏览器支持
	if (document.getElementsByClassName) {
		return document.getElementsByClassName(classname);
	};
	//不支持浏览器
	var arr = [];
	var dom = document.getElementsByTagName("*");
	for (var i = 0; i < dom.length; i++) {
		var txtarr = dom[i].className.split(" ");//分割类名并转化成数组
		for (var j = 0; j < txtarr.length; j++) {
			if(txtarr[j] == classname){
				arr.push(dom[i]);
			}
		};
	};
	return arr;
}
console.log(getClass(news-item).length);*/

// 公共搜索框
function searchFn() {
		//搜索框
		var searchBox = document.querySelector(".search-box");
		searchBox.onfocus = function() {
			this.value = "";
		}
		searchBox.onblur = function() {
			this.value = "照片打印机";
		}
	
		// 关闭topbanner广告
		var closeBanner = document.querySelector(".close-banner");
		var topBanner = document.querySelector(".topbanner");
		closeBanner.onclick = function(){
			topBanner.style.display = "none";
		};
	}

 // 多个属性运动框架
    function animate(obj,json) {  // 给谁    json
        clearInterval(obj.timer);
        obj.timer = setInterval(function() {
            //开始遍历 json
            for(var attr in json){   // attr  属性     json[attr]  值
                // 计算步长        用 target 位置 减去当前的位置  除以 10
               // console.log(attr);
                var current = parseInt(getStyle(obj,attr));  // 数值
               // console.log(current);
                 // 目标位置就是  属性值
                var step = ( json[attr] - current) / 10;  // 步长  用目标位置 - 现在的位置 / 10
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                obj.style[attr] = current  + step + "px" ;
            }
        },30)
    }
    function getStyle(obj,attr) {  //  谁的      那个属性
        if(obj.currentStyle)  // ie 等
        {
            return obj.currentStyle[attr];  // 返回传递过来的某个属性
        }
        else
        {
            return window.getComputedStyle(obj,null)[attr];  // w3c 浏览器
        }
    }
    //ajax方法
    function getAjax(_url,callback) {
    	$.ajax({
    		url: _url,
    		type: 'get',
    		dataType: 'json',
    		success:function(d){
    			callback(d);
    		}
    	})	
    }
    // 跨域的ajax公共方法
	function getAjaxJsonp( _url, callback){
		$.ajax({
			url: _url ,
			type:'get',
			dataType:'jsonp',
			jsonp:'callback',
			success:function(d){
				callback(d);
			}
		});
	}

	//全站公共网页头部
	function getHeader(){
		$.ajax({
			url: '../component/header.html',
			type:'get',
			dataType:'html',
			success:function(d){
				// console.log(d);
				$('body').prepend(d);
				// d.insertBefore($('body'));
				// 搜索框及关闭广告
				searchFn();
			}
		});
	}
	 getHeader();

	 // 接收pid参数，返回不同产品信息
	function getParam( _url, _pid,callback){
		$.ajax({
			url: _url ,
			type:'get',
			data:'cc=' + _pid,
			dataType:'jsonp',
			jsonp:'jsoncallback',
			success:function(d){
				callback(d);
			}
		});
	}

	//计算某项商品的总价合计 单价*数量
	function cartFnJsonp(_url,_d,callback){
		$.ajax({
			url: _url ,
			type:'get',
			data:'cart=' + _d,
			dataType:'jsonp',
			jsonp:'jsoncallback',
			success:function(d){
				callback(d);
			}
		});
	}

	//计算所有选中商品的数量和总价
	function goodsCheckFnJsonp(_url,_d,callback){
		$.ajax({
			url: _url ,
			type:'get',
			data:'goods=' + _d,
			dataType:'jsonp',
			jsonp:'jsoncallback',
			success:function(d){
				callback(d);
			}
		});
	}
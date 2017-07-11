/*
* @Author: 夏本增
* @Date:   2017-06-23 18:38:24
* @Last Modified time: 2017-07-11 10:31:50
*/

'use strict';
	// 生活服务背景图
	function bg(){
		var life = document.getElementById("life");
		var bgs = life.getElementsByTagName("i")
		var len = bgs.length
		for (var i = 0; i < len; i++) {
			bgs[i].style.backgroundPosition = "left -"+i*25+"px";
		};
	}

	//右侧广告
	function tab(){
		var newsTab = document.querySelector(".news-tab");
		var spans = newsTab.getElementsByTagName("span");
		var newsContent = document.querySelector(".news-content");
		var newsList = newsContent.children;
		var len = spans.length
		for (var i = 0; i < len; i++) {
			spans[i].index = i;
			spans[i].onmouseover = function() {
				for (var j = 0; j < len; j++) {
					newsList[j].style.display = "none";
				};
				newsList[this.index].style.display = "block";
			}
		};
	}

	// 轮播图部分
	function sliderFn() {
		var slider = document.getElementById("slider");
		var circle = document.querySelector(".circle");
		var sliderBox = document.getElementById("sliderBox");
		//如果要无缝滚动，所以要克隆第一张，放到最后面
		sliderBox.appendChild(sliderBox.children[0].cloneNode(true));
		var ulLis = sliderBox.children
		var len = ulLis.length;
		//创建ol中li
		for (var i = 0; i < len - 1; i++) {
			var li = document.createElement("li");
			circle.appendChild(li);
		};
		circle.children[0].className = "current";
		var olLis = circle.children;
		//开始动画部分
		for (var i = 0; i < olLis.length; i++) {
			olLis[i].index = i;//得到当前li的索引号
			olLis[i].onmouseover = function() {
				for (var j = 0; j < olLis.length; j++) {
					olLis[j].className = "";//清空
				};
				olLis[this.index].className = "current";
				animate(sliderBox,{left:-this.index * 790});
				num = key = this.index//鼠标放上去当前索引为主
			}
		};
		//添加定时器
		var timer = null;
		var key = 0;
		var num = 0;
		timer = setInterval(autoPlay,2000);//开启轮播图定时器
		function autoPlay() {
			key++;
			if (key > len - 1) {
				sliderBox.style.left = 0;
				key = 1;//跳回来直接播放第二张
			}
			animate(sliderBox,{left:-key * 790});

			//小圆点
			num++;
			if (num > olLis.length - 1) {
				num = 0;
			};
			for (var i = 0; i < olLis.length; i++) {
				olLis[i].className = "";//先清除所有

			};
			olLis[num].className = "current";
		}
		//轮播图箭头显示隐藏与定时器开关
		var arrow = document.getElementById("arrow");
		slider.onmouseover = function(){
			arrow.style.display = "block";
			clearInterval(timer);
		}
		slider.onmouseout = function(){
			arrow.style.display = "none";
			timer = setInterval(autoPlay,3000);
		}
		//左右按钮点击
		var arrowLeft = document.querySelector(".arrow-l");
		var arrowRight = document.querySelector(".arrow-r");
		arrowLeft.onclick = function() {
			animate(sliderBox,{left:-num * 790});
			for (var i = 0; i < olLis.length; i++) {
				olLis[i].className = "";//先清除所有
			};
			if (num < len-1) {
				num++;
				olLis[num-1].className = "current";
			} else{
				sliderBox.style.left = 0;
				num = 1;
				olLis[num-1].className = "current";
			};
			
		}
		arrowRight.onclick = function() {
			if (num > 0) {
				num--;
			} else{
				sliderBox.style.left = 0;
				num = len - 2;
			};
			animate(sliderBox,{left:-num * 790});
			for (var i = 0; i < olLis.length; i++) {
				olLis[i].className = "";//先清除所有

			};
			olLis[num].className = "current";
		}
	}

	//首页享品质产品列表
	function productBlockFn(){
		getAjaxJsonp(APILIST.productBlock,function(d){
			var _d = d.pb;
			var len = _d.length;
			var _productBlock = $('#productBlock');
			for (var i = 0; i < len; i++) {
				$('<a/>',{})
					.attr({
						'data-oldprice': _d[i].oldprice,
						// 'data-pid': _d[i].pid,
						'data-price': _d[i].price,
						'href': 'productDetail.html?pid=' + _d[i].pid,
						'target': '_blank'
					})
					.html(function(){
						$('<li/>',{'class':'bg' + (i + 1)})
							.html(function(){
								var self = $(this);
								$('<img/>',{'class':'transition1'})
									.attr('src',_d[i].productImg)
									.appendTo(self);
								$('<dl/>',{'class':'bg' + (i + 1)})
									.html(function(){
										var self = $(this);
										$('<dt/>',{})
											.html(_d[i].name)
											.appendTo(self);
										$('<dd/>',{})
											.html(_d[i].describe)
											.appendTo(self);
									})
									.appendTo(self);
							})
							.appendTo($(this));
					})
					.insertBefore(_productBlock);
			};
		})
	}
	

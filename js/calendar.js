/*
+------------------------------
@author:vczero
@time:2014/8/10
@desc:简易日历组件
+------------------------------
*/
var Calendar = (function(){
	var Calendar = function(div, date){
		this.div = document.getElementById(div);
		//var w = this.div.style.width || 270;
		//var h = this.div.style.height || 250;
		//this.width = parseInt(w) >= 360 ? w : 360;
		//this.height = parseInt(h) >= 180 ? h : 180;
		this.width = 270;
		this.height = 250;
		this.date = date;
		this.div.style.width = this.width + 'px'; //按默认值设置回去
		this.div.style.height = this.height + 'px';//按默认值设置回去
	};

	Calendar.week = ['一', '二','三', '四','五', '六', '日'];

	Calendar.prototype['showUI'] = function(callback){
		var exist = document.getElementById('vczero_celldom_0');
		if(!!exist){
			for(var e = 0; e < 42; e++){
				var node = document.getElementById('vczero_celldom_' + e);
				node.onclick = null; //移除事件处理程序
				this.div.removeChild(node);
			}
		}

		var width = this.width,
		    height = this.height,
		    cell = {width: (parseInt(width) - 20)/7, height: (parseInt(height) -30 - 20)/6},
		    monthArr = this._monthPanel(this.date);
		this.div.style.paddingLeft = '8px'; 
		this.div.style.border = 'none';
		this.div.style.cursor = 'default';
		this.div.style.fontFamily = '微软雅黑';
		this._addHeader();
		this._addWeekday();

		for(var i = 0; i < 42; i++){
			var cellDOM = document.createElement('div');
			cellDOM.style.width = cell.width + 'px';
			cellDOM.style.height = cell.height + 'px';
			cellDOM.style.display = 'inline-block';
			cellDOM.style.cssFloat = 'left';
			cellDOM.style.cursor = 'pointer';
			cellDOM.style.textAlign = 'center';
			cellDOM.id = 'vczero_celldom_' + i;
			cellDOM.style.lineHeight = cell.height + 'px';
			cellDOM.setAttribute('date',monthArr.date[i]); //设置日期对象到DOM属性date上
			var todaydate = new Date();
			if(todaydate.toLocaleDateString() == monthArr.date[i].toLocaleDateString()){
				cellDOM.className = 'today';
			}
			cellDOM.innerHTML = monthArr.date[i].getDate();
			//去掉最后一行横线
			//if(i < 35){
			//	cellDOM.style.borderBottom = '1px solid #C8CACC';
			//}

			if(i < monthArr.preLen || i >= monthArr.currentLen + monthArr.preLen){
				cellDOM.style.color = '#BFBFBF';
			}
			this.div.appendChild(cellDOM);
		}

		//使用父元素事件委托
		if(this.div.addEventListener){
			this.div.addEventListener('click',function(e){
				var node = e.target;
				if(node.id.indexOf('vczero_celldom_') > -1){
					var date = new Date(node.getAttribute('date')).toLocaleString();
					callback(date);
				}
			});
		}else{
			this.div.attachEvent('onclick',function(e){
				var node = e.target;
				if(node.id.indexOf('vczero_celldom_') > -1){
					var date = new Date(node.getAttribute('date')).toLocaleString();
					callback(date);
				}
			});
		}

	};

	Calendar.prototype._addHeader = function(){
		var exist = document.getElementById('vczero_datediv');
		if(!!exist){
			exist.onclick = null;
			this.div.removeChild(exist);
		}

		var header = document.createElement('div');
		header.style.height = '30px';
		header.style.width = this.div.style.width || '800px';

		//包含左 时间 右的大DIV
		var dateDiv = document.createElement('div');
		dateDiv.style.width = '200px';
		dateDiv.style.height = '30px';
		dateDiv.style.margin = '0 auto';
		dateDiv.style.textAlign = 'center';
		dateDiv.style.fontWeight = 'bold';
		dateDiv.id = 'vczero_datediv';

		//< DIV
		var leftDiv = document.createElement('div');
		leftDiv.innerHTML = '&lt;';
		leftDiv.style.display = 'inline-block';
		leftDiv.style.float = 'left';
		leftDiv.style.width = '50px';
		leftDiv.style.cursor = 'pointer';
		leftDiv.style.color = '#C5BFBF';
		var _that = this; //获取到this对象
		if(leftDiv.addEventListener){
			leftDiv.addEventListener('click', function(event){
				var year = parseInt(_that.date.getFullYear()),
					month = parseInt(_that.date.getMonth());
				if(month === 0){
					_that.date = new Date(year - 1, 11, 1);
				}else{
					_that.date = new Date(year, month - 1, 1);
				}
				_that['showUI'](function(){});

			});
		}else{
			leftDiv.attachEvent('onclick', function(event){
				var year = parseInt(_that.date.getFullYear()),
					month = parseInt(_that.date.getMonth());
				if(month === 0){
					_that.date = new Date(year - 1, 11, 1);
				}else{
					_that.date = new Date(year, month - 1, 1);
				}
				_that['showUI'](function(){});

			});
		}


		//> DIV
		var rightDiv = document.createElement('div');
		rightDiv.innerHTML = '&gt;';
		rightDiv.style.display = 'inline-block';
		rightDiv.style.float = 'left';
		rightDiv.style.width = '50px';
		rightDiv.style.cursor = 'pointer';
		rightDiv.style.color = '#C5BFBF';
		if(rightDiv.addEventListener){
			rightDiv.addEventListener('click', function(event){
				var year = parseInt(_that.date.getFullYear()),
					month = parseInt(_that.date.getMonth());
				if(month === 11){
					_that.date = new Date(year + 1, 0, 1);
				}else{
					_that.date = new Date(year, month + 1, 1);
				}
				_that['showUI'](function(){});
			});
		}else{
			rightDiv.attachEvent('onclick', function(event){
				var year = parseInt(_that.date.getFullYear()),
					month = parseInt(_that.date.getMonth());
				if(month === 11){
					_that.date = new Date(year + 1, 0, 1);
				}else{
					_that.date = new Date(year, month + 1, 1);
				}
				_that['showUI'](function(){});
			});
		}



		//显示月份的DIV
		var timeDiv = document.createElement('div');
		timeDiv.style.display = 'inline-block';
		timeDiv.style.float = 'left';
		timeDiv.style.width = '100px';
		timeDiv.innerHTML = this.date.getFullYear() + '年' + (this.date.getMonth() + 1) + '月';

		dateDiv.appendChild(leftDiv);
		dateDiv.appendChild(timeDiv);
		dateDiv.appendChild(rightDiv);
		this.div.appendChild(dateDiv);
	};

	//增加星期
	Calendar.prototype._addWeekday = function(){
		var exist = document.getElementById('vczero_week_0');
		if(!!exist){
			for(var i = 0; i < 7; i++){
				var node = document.getElementById('vczero_week_' + i);
				node.onclick = null;
				this.div.removeChild(node);
			}
			
		}

		for(var n = 0; n < 7; n++){
			var weekday = document.createElement('div');
			weekday.style.width = (parseInt(this.width) - 20)/7 + 'px';
			weekday.style.height = '20px';
			weekday.style.display = 'inline-block';
			weekday.style.float = 'left';
			weekday.style.color = '#BFBFBF';
			weekday.style.fontWeight = 'bold';
			weekday.style.textAlign = 'center';
			weekday.id = 'vczero_week_' + n;
			weekday.innerHTML = Calendar.week[n];
			this.div.appendChild(weekday);
		}
	};

	Calendar.prototype._monthPanel = function(date){
		//如果传递了Date对象，则按Date对象进行计算月份面板
		//否则，按照当前月份计算面板
		var myDate = date || new Date(),
		    year = myDate.getFullYear(),
		    month = myDate.getMonth(),
		    day = myDate.getDate(),
		    week = myDate.getDay(),
		    currentDays = new Date(year, month + 1, 0).getDate(),
		    preDays = new Date(year, month, 0).getDate(),
		    firstDay = new Date(year, month, 1),
		    firstCell = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1,
		    bottomCell =  42 - currentDays - firstCell;
		//前一个月该显示多少天
		var preMonth = [];
		for(var p = firstCell; p > 0; p--){
			preMonth.push(new Date(year, month - 1, preDays - p + 1));
		}
		var len = preMonth.length;
		//本月
		var currentMonth = [];
		for(var c = 0; c < currentDays; c++){
			currentMonth.push(new Date(year, month, c + 1));
		}
		//下一个月
	    var nextMonth = [];
	    for(var n = 0; n < bottomCell; n++){
	    	nextMonth.push(new Date(year, month + 1, n + 1));
	    }

	    preMonth = preMonth.concat(currentMonth, nextMonth);
	    return {
	    	date: preMonth,
	    	preLen: len,
	    	currentLen: currentMonth.length
	    };
	};

	return Calendar;

})();



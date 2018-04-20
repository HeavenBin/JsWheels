;(function(){
	window.Pagination = Pagination;
	// 初始化参数
	function Pagination(data){
		this.dom = document.getElementById(data.id);
		this.cur = data.cur;
		this.total = data.total;
		this.flag = false;
		this.fn = data.change;
		this.spans = [];
		this.num_btns = [];
		this.init();
	};
	
	Pagination.prototype.init = function(){
		for(var i = 0 ,v; i < 11 ; i++){
			this.spans[i] = document.createElement('a');
			this.spans[i].href = 'javascript:;';
			this.dom.appendChild(this.spans[i]);
			if (i>= 3 && i <= 7 || i === 1 || i === 9) {
				this.num_btns.push(this.spans[i]);
			};
		};
		this.spans[0].innerHTML = '上一页';
		this.spans[10].innerHTML = '下一页';
		this.spans[0].className = this.spans[10].className= 'btn';
		this.spans[1].innerHTML = 1;
		this.spans[9].innerHTML = this.total;
		if (this.total <= 7) {
			for(var i = 0 ; i < 7 ; i++){
				if (i<this.total) {
					this.num_btns[i].innerHTML = i+1;
				} else{
					this.dom.removeChild(this.num_btns[i]);
				};
			};
			this.dom.removeChild(this.spans[2]);
			this.dom.removeChild(this.spans[8]);
			this.toPage(this.cur);
			this.bindEvent();
			return;
		};
		this.spans[2].innerHTML = this.spans[8].innerHTML = '...';
		this.spans[2].className = this.spans[8].className = 'point';
		this.input = document.createElement('input');
		this.input.className = 'txt';
		this.dom.appendChild(this.input);
		this.input.value = this.cur;
		this.jump_btn = document.createElement('input');
		this.jump_btn.type = 'button';
		this.dom.appendChild(this.jump_btn);
		this.jump_btn.value = '跳转';
		this.toPage(this.cur);
		this.bindEvent();
	};
	Pagination.prototype.bindEvent = function(){
		var self = this;
		this.spans[10].onclick = function(){
			self.cur++;
			if (self.cur > self.total) {
				self.cur = self.total;
				return;
			};
			self.toPage(self.cur);
			self.input && (self.input.value = self.cur);
		};
		this.spans[0].onclick = function(){
			self.cur--;
			if (self.cur < 1) {
				self.cur = 1;
				return;
			};
			self.toPage(self.cur);
			self.input && (self.input.value = self.cur);
		};
		for(var i = 0 ; i < 7 ; i++){
			if (this.num_btns[i]) {
				this.num_btns[i].onclick = function(){
					if (self.cur == this.innerHTML) return;
					self.cur = +this.innerHTML;
					self.toPage(self.cur);
					self.input && (self.input.value = self.cur);
				};
			};
		};
		if (this.jump_btn) {
			this.jump_btn.onclick = function(){
				if (self.cur == self.input.value) return;
				self.cur = +self.input.value;
				self.toPage(self.cur);
			};
		};
	};
	Pagination.prototype.toPage = function(x){
		this.flag && this.fn(x);
		this.flag = true;
		var self = this;
		if (this.total <= 7) {
			clearCurs();
			this.num_btns[x-1].className = 'cur';
			return;
		} ;
		if (x<=4) {
			if (this.spans[2] && this.spans[8]) {
				this.spans[2].style.display = 'none';
				this.spans[8].style.display = 'inline-block';
			};
			clearCurs();
			this.num_btns[x-1].className = 'cur';
			for(var i = 1 ; i < 6 ; i++){
				this.num_btns[i].innerHTML = i+1;
			};
		} else if(x <= this.total - 4){
			if (this.spans[2] && this.spans[8]) {
				this.spans[2].style.display = 'inline-block';
				this.spans[8].style.display = 'inline-block';
			};
			clearCurs();
			this.num_btns[3].className = 'cur';
			var v = x - 2;
			for(var i = 1 ; i < 6 ; i++){
				this.num_btns[i].innerHTML = v++;
			};
		}else{
			if (this.spans[2] && this.spans[8]) {
				this.spans[2].style.display = 'inline-block';
				this.spans[8].style.display = 'none';
			};
			clearCurs();
			this.num_btns[x-(this.total-6)].className = 'cur';
			var v = this.total - 5;
			for(var i = 1 ; i < 6 ; i++){
				this.num_btns[i].innerHTML = v++;
			};
		};
		if (x != 1 && x != this.total && this.total > 7) {
			this.spans[0].style.visibility = 'visible';
			this.spans[10].style.visibility = 'visible';
		} else if(x == 1 && this.total > 7){
			this.spans[0].style.visibility = 'hidden';
			this.spans[10].style.visibility = 'visible';
		}else if (x == this.total && this.total > 7) {
			this.spans[0].style.visibility = 'visible';
			this.spans[10].style.visibility = 'hidden';
		};
		function clearCurs(){
			for(var i = 0 ; i < 7 ;i++){
				self.num_btns[i].className = '';
			};
		}
	};
})();
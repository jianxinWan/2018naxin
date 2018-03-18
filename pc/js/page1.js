let page1 = {

	getEle: function() {
		let goDown = document.getElementById('page1-goDown');
		goDown.onclick = function() {
	    	swiper.slideToLoop(1, 800, true);
	    }
	},

	tips: function() {
		if(loginEnroll.loginFlag) {
			layer.tips('点我退出登录', '#loginP', {
		  		tips: [1, '#F061B3'],
		  		time: 2000
			});
		}
	},

	init: function() {
		this.getEle();
	}

}

window.page1 = page1;
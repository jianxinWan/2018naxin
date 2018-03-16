let page1 = {
	getEle: function() {
		let goDown = document.getElementById('page1-goDown');
		goDown.onclick = function() {
	    	swiper.slideToLoop(1, 800, true);
	    }
	},

	init: function() {
		this.getEle();
	}
}

window.page1 = page1;
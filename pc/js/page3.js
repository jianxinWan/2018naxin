let page3 = {

	Group: null,
	groupFlag: true,
	swiperFlag: true,

	getEle: function() {
		let that = this;
		let groups = document.getElementsByClassName('page3-groups')[0];
		let login_enroll = document.getElementsByClassName('login_enroll-box')[0];

	    for(let i = 0; i < 4; i++) {
	    	let group = document.getElementsByClassName('page3-group')[i];
	    	this.Group = document.getElementsByClassName('page3-group');
	    	let groupLeft = document.getElementsByClassName('page3-group-left')[i];
	    	let groupRight = document.getElementsByClassName('page3-group-right')[i];
	    	let groupImg = group.getElementsByClassName('page3-group-image');
	    	let back = document.getElementsByClassName('back')[i];
	    	let enroll = document.getElementsByClassName('enroll')[i];
	    	group.onclick = function() {
	    		that.groupGo(groups, group, groupLeft, groupRight, groupImg);
	    	}
	    	back.onclick = function(event) {
	    		event.stopPropagation();
    			that.groupBack(groups, group, groupLeft, groupRight, groupImg);
	    	}
	    	enroll.onclick = function(event) {
	    		event.stopPropagation();
	    		loginEnroll.enrollShow(login_enroll, i);
	    	}
	    }
	},

	groupGo: function(groups, group, group_left, group_right, imgs) {
		swiper.allowSlidePrev = false;
		this.groupFlag = false;
		groups.className = groups.className + ' page3-groups-firstStep';
		group.className = group.className + ' page3-group-firstStep';
		setTimeout(() => {
			group.className = group.className + ' page3-group-secondStep';
			group_left.className = group_left.className + ' page3-group-left-secondStep';
			for(let i = 0; i < 4; i++) {
				imgs[i].className = imgs[i].className + ' ' + group.id.split('-')[1] + '-img' + (i + 1) + '-secondStep';
			}
		}, 500);
		setTimeout(() => {
			group.className = group.className + ' page3-group-thirdStep';
			group_right.className = group_right.className + ' page3-group-right-thirdStep';
		}, 1000);
		setTimeout(() => {
			group_right.className = group_right.className + ' page3-group-right-forthStep';
			this.groupFlag = true;
			this.checkSlide();
		}, 1500);
	},

	groupBack: function(groups, group, group_left, group_right, imgs) {
		group_right.className = group_right.className.split(' page3-group-right-forthStep')[0];
		setTimeout(() => {
			group.className = group.className.split(' page3-group-thirdStep')[0];
			group_right.className = group_right.className.split(' page3-group-right-thirdStep')[0];
		}, 500);
		setTimeout(() => {
			group.className = group.className.split(' page3-group-secondStep')[0];
			group_left.className = group_left.className.split(' page3-group-left-secondStep')[0];
			for(let i = 0; i < 4; i++) {
				let _group = ' ' + group.id.split('-')[1] + '-img' + (i + 1) + '-secondStep';
				imgs[i].className = imgs[i].className.split(_group)[0];
			}
		}, 1000);
		setTimeout(() => {
			groups.className = groups.className.split(' page3-groups-firstStep')[0];
			group.className = group.className.split(' page3-group-firstStep')[0];
		}, 1500);
	},

	startActive: function() {
		swiper.allowSlidePrev = false;
		this.swiperFlag = false;
		this.Group[0].className = this.Group[0].className + ' page3-group-show animated bounceIn';
		setTimeout(() => {
			this.Group[1].className = this.Group[1].className + ' page3-group-show animated bounceIn';
		}, 400);
		setTimeout(() => {
			this.Group[2].className = this.Group[2].className + ' page3-group-show animated bounceIn';
		}, 800);
		setTimeout(() => {
			this.Group[3].className = this.Group[3].className + ' page3-group-show animated bounceIn';
			this.swiperFlag = true;
			this.checkSlide();
		}, 1200);
	},

	endActive: function() {
		let groups = document.getElementsByClassName('page3-groups')[0];
		for(let i = 0; i < 4; i++) {
	    	let group = document.getElementsByClassName('page3-group')[i];
	    	let groupLeft = document.getElementsByClassName('page3-group-left')[i];
	    	let groupRight = document.getElementsByClassName('page3-group-right')[i];
	    	let groupImg = group.getElementsByClassName('page3-group-image');

    		groupRight.className = groupRight.className.split(' page3-group-right-forthStep')[0];
			group.className = group.className.split(' page3-group-thirdStep')[0];
			groupRight.className = groupRight.className.split(' page3-group-right-thirdStep')[0];
			group.className = group.className.split(' page3-group-secondStep')[0];
			groupLeft.className = groupLeft.className.split(' page3-group-left-secondStep')[0];
			for(let i = 0; i < 4; i++) {
				let _group = ' ' + group.id.split('-')[1] + '-img' + (i + 1) + '-secondStep';
				groupImg[i].className = groupImg[i].className.split(_group)[0];
			}
			group.className = group.className.split(' page3-group-firstStep')[0];
	    }
	    groups.className = groups.className.split(' page3-groups-firstStep')[0];
	    for(let i = 0; i < 4; i++) {
			this.Group[i].className = this.Group[i].className.split(' page3-group-show animated bounceIn')[0];
		}
	},

	checkSlide: function() {
		if(this.groupFlag && this.swiperFlag) {
			swiper.allowSlidePrev = true;
		} else {
			swiper.allowSlidePrev = false;
		}
	},

	init: function() {
		this.getEle();
	},


}

window.page3 = page3;


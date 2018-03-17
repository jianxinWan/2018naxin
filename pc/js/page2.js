let page2 = {

	boxes: null,
	box: null,
	button: null,

	getEle: function() {
		let that = this;

		let imgBoxes = document.getElementsByClassName('page2-showImgs')[0];
		this.boxes = imgBoxes;

		for(let i = 0; i < 4; i++) {
			let imgButton = document.getElementsByClassName('page2-show-photo');
			this.button = imgButton;
			let imgBox = imgBoxes.getElementsByTagName('div')[i];
			this.box = imgBoxes.getElementsByTagName('div');
			let img = imgBox.getElementsByTagName('img');
			let change = document.getElementsByClassName('page2-button-change')[i];
			let back = document.getElementsByClassName('page2-button-back')[i];
			imgButton[i].onclick = function() {
				that.showImg(imgBoxes, imgBox, imgButton, img);
			}
			change.onclick = function() {
				that.changeImg(img);
			}
			back.onclick = function() {
				that.closeImg(imgBoxes, imgBox, imgButton);
			}
		}

		let goDown = document.getElementById('page2-goDown');
		goDown.onclick = function() {
			swiper.slideToLoop(2, 800, true);
		}
	},

	showImg: function(imgBoxes, imgBox, imgButton, img) {
		for(let i = 0; i < 4; i++) {
			imgButton[i].className = imgButton[i].className + ' page2-photo-losePointer';
		}
		for(let i = 0; i < img.length; i++) {
			img[i].style.width = 510 + 'px';
			img[i].src = img[i].getAttribute('data-src');
			// console.log(img[i].getAttribute("data-src"));
		}
		imgBox.className = imgBox.className + ' page2-showBox-show';
		imgBoxes.className = imgBoxes.className + ' page2-showImgs-show';
	},

	changeImg: function(img) {
		let index = 0;
		for(let i = 0; i < img.length; i++) {
			if(img[i].className.split(' ')[1] !== undefined) {
				img[i].className = img[i].className.split(' page2-img-show')[0];
				index = i;
				break;
			}
		}
		if(index + 1 < img.length) {
			img[index+1].className = img[index+1].className + ' page2-img-show';
		} else {
			img[0].className = img[0].className + ' page2-img-show';
		}
	},

	closeImg: function(imgBoxes, imgBox, imgButton) {
		for(let i = 0; i < 4; i++) {
			imgButton[i].className = imgButton[i].className.split(" page2-photo-losePointer")[0];
		}
		imgBoxes.className = imgBoxes.className.split(" page2-showImgs-show")[0];
		imgBox.className = imgBox.className.split(" page2-showBox-show")[0];
	},

	endActive: function() {
		for(let i = 0; i < 4; i++) {
			this.button[i].className = this.button[i].className.split(" page2-photo-losePointer")[0];
			this.box[i].className = this.box[i].className.split(" page2-showBox-show")[0];
		}
		this.boxes.className = this.boxes.className.split(" page2-showImgs-show")[0];
	},

	init: function() {
		this.getEle();
	}
}

window.page2 = page2;
let loginEnroll = {
	
	session: null,
	data: null,
	type: null,

	loginFlag: false,
	enrollIndex: -1,

	login_enroll: document.getElementsByClassName('login_enroll-box')[0],

	enroll: document.getElementsByClassName('enroll-form')[0],
	inform: document.getElementsByClassName('inform-form')[0],


	login: document.getElementsByClassName('login-form')[0],
	login_front: document.getElementsByClassName('login-form-front')[0],
	login_back: document.getElementsByClassName('login-form-back')[0],
	loginResult: document.getElementById('login-result'),
	loginMsg: document.getElementById('login-message'),
	logOut: document.getElementById('loginOut'),


	getEle: function() {
		let that = this;
		//报名返回
		let enrollBack = document.getElementsByClassName('enroll-form-submit-button')[1];
		//查询信息返回
		let informBack = document.getElementsByClassName('inform-bottom-back')[0];
		enrollBack.onclick = function() {
	    	that.enrollBack(that.login_enroll, that.enroll);
	    }
	    informBack.onclick = function() {
	    	that.enrollBack(that.login_enroll, that.inform);
	    }
	    //打开登录
	    let loginOpen = document.getElementById('loginP');
	    loginOpen.onclick = function() {
	    	that.loginShow();
	    }
	    //关闭登录
	    let loginClose = document.getElementsByClassName('login-form-close');
	    for(let i = 0; i < loginClose.length; i++) {
	    	loginClose[i].onclick = function() {
	    		that.loginBack();
	    	}
	    }
	    //检查输入
	    let loginInput = document.getElementsByClassName('login-form-input');
	    for(let i = 0; i < loginInput.length; i++) {
	    	loginInput[i].oninput = function() {
	    		that.checkLogin(loginDo, loginInput[0].value.length, loginInput[1].value.length, loginInput[2].value.length);
	    	}
	    }
	    //执行登录
	    let loginDo = document.getElementsByClassName('login-form-button')[0];
	    let circle = document.getElementsByClassName('login-form-circle')[0];
	    loginDo.onclick = function() {
	    	that.do_login(loginInput, loginDo, circle, loginClose[0]);
		}
		//换验证码
		let vCode = document.getElementById('img_code');
		vCode.onclick = function() {
			that.getVcode(vCode);
		}
		//点击确认直接进入报名页面
		let logExact = document.getElementById('loginExact');
		logExact.onclick = function() {
			that.loginBack();
			setTimeout(() => {
				that.enrollShow(that.login_enroll, that.enrollIndex);
			},500);
		}




	    //检查报名输入
	    let emailTex = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	    let telTex = /^1(3|4|5|7|8)\d{9}$/
	    let enrollInput = document.getElementsByClassName('enroll-form-input');
	    let enrollTe = document.getElementsByClassName('enroll-form-textarea')[0];
	    for(let i = 0; i < enrollInput.length; i++) {
	    	enrollInput[i].oninput = function() {
	    		if(telTex.test(enrollInput[2].value) && emailTex.test(enrollInput[3].value) && enrollTe.value.length > 0) {
		    		enrollDo.className = enrollDo.className + ' enroll-form-submit-button_could';
				} else {
					enrollDo.classList.remove('enroll-form-submit-button_could');
				}
	    	}
	    }
	    enrollTe.oninput = function() {
	    	if(telTex.test(enrollInput[2].value) && emailTex.test(enrollInput[3].value) && enrollTe.value.length > 0) {
	    		enrollDo.className = enrollDo.className + ' enroll-form-submit-button_could';
			} else {
				enrollDo.classList.remove('enroll-form-submit-button_could');
			}
	    }

	    //执行报名
	    let enrollDo = document.getElementById('enroll-submit');
	    let enrollCircle = document.getElementsByClassName('enroll-form-circle')[0];
	    enrollDo.onclick = function() {
	    	that.do_enroll(enrollDo, enrollCircle, enrollInput, enrollTe);
	    }

	    //退出登录
	    this.logOut.onclick = function() {
	    	that.loginOut();
		}

	},


	//登录
	getVcode: function(vCode) {
		$.ajax({
            url: 'https://join.xiyoumobile.com/api/getverCode',
            type: 'GET',
            dataType: "JSONP",
            xhrFields: {
	            withCredentials: true,
	        },
            success: (msg) => {
                if(!msg.err) {
                   	this.session = msg.result.session;
                   	vCode.src = msg.result.src;
                } else {
                	alert('服务器出错啦，请耐心等待');
                }
            },
            error: (err) => {
                console.log(err);
            }
        });
	},


	loginShow: function() {
		let logExact = document.getElementById('loginExact');
		let vCode = document.getElementById('img_code');
		if(this.loginFlag === false) {
    		this.getVcode(vCode);
    	}
    	if(swiper.activeIndex === 2) {
    		logExact.className += ' login-form-exact_show';
    	} else {
    		logExact.classList.remove('login-form-exact_show');
    	}
		this.enroll.classList.remove('form-show');
		this.inform.classList.remove('form-show');
		this.login_enroll.className = this.login_enroll.className + ' login_enroll-box-show';
		this.login.className = this.login.className + ' form-show';
	},

	loginBack: function() {
		this.login_enroll.classList.remove('login_enroll-box-show');
		this.login.classList.remove('form-show');
		if(this.loginFlag === false) {
			this.login.classList.remove('login-form-turn');
			this.login_front.classList.remove('login-form-front_turn');
			this.login_back.classList.remove('login-form-back_turn');
		}
	},

	checkLogin: function(loginButton, userLength, passLength, vcodeLength) {
		if(userLength === 8 && passLength >= 1 && vcodeLength === 4) {
			loginButton.className = loginButton.className + ' login-form-button_chould';
		} else {
			loginButton.classList.remove('login-form-button_chould');
		}
	},

	//报名初始化
	loginInit: function(input, loginDo, circle, close) {
		loginDo.classList.remove('login-form-button_logining');
		circle.classList.remove('login-form-circling');
		close.style.pointerEvents = 'auto';
		input[1].value = '';
		input[2].value = '';
		loginDo.classList.remove('login-form-button_chould');
	},

	do_login: function(input, loginDo, circle, close) {
		loginDo.className += ' login-form-button_logining';
		circle.className += ' login-form-circling';
		close.style.pointerEvents = 'none';
		let publicKey = '-----BEGIN PUBLIC KEY-----\n' +
				        'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC7Bx1dglLflG8vP0jrgfGlvxLU\n' +
				        'n5wmqT5KxqsIvCOlV2KupRemnFPVbV6kWNtV+wRrzCfGJizpKZLram1aNAAH4sMh\n' +
				        '+mu04eb5Ai0iXA5Dl3YlM06VI8RuwOX2bTsaiOr95/a0F4n6RjRfuZ7Jl/If7aPy\n' +
				        'rb2XSh6PJ+JSCH2tVQIDAQAB\n' +
				        '-----END PUBLIC KEY-----';
        let jsencrypt = new JSEncrypt();
    	jsencrypt.setPublicKey(publicKey);
		$.ajax({
            url: 'https://join.xiyoumobile.com/api/getaccess',
            type: 'GET',
            dataType: "JSONP",
            data: {
            	'username': input[0].value,
            	'password': jsencrypt.encrypt(input[1].value),
            	'vercode': input[2].value,
            	'session': this.session,
            },
            xhrFields: {
	            withCredentials: true,
	        },
            success: (msg) => {
                if(!msg.err) {
                	if(msg.result.state === 'access') {
                		this.loginSuccess(msg.result.stateobj, msg.result.state);
                	} else if(msg.result.state === 'it has login') {
                		this.loginSuccess(msg.result.inf, msg.result.state);
                	}
                } else {
                	this.loginFlag = false;
                	this.loginResult.innerHTML = '登录失败';
                	this.loginMsg.innerHTML = msg.errtype;
                }
                this.loginInit(input, loginDo, circle, close);
                this.login.className = this.login.className + ' login-form-turn';
				this.login_front.className = this.login_front.className + ' login-form-front_turn';
				this.login_back.className = this.login_back.className + ' login-form-back_turn';
            },
            error: (err) => {
                console.log(err);
            }
        });
	},

	loginSuccess: function(data, type) {
		if(type === 'access') {
			type = 'it has access';
		}
		this.data = data;
		this.type = type;
		let loginOpen = document.getElementById('loginP');
		loginOpen.value = data.name;
		this.loginFlag = true;
        this.loginResult.innerHTML = '登录成功';
        if(type === 'it has access') {
        	this.loginMsg.innerHTML = '欢迎你，快去报名吧~';
        } else if(type === 'it has login') {
        	this.loginMsg.innerHTML = '你已报名，下方报名按钮可查看面试进度~';
        	for(let i = 0; i < 4; i++) {
				let enrollBtn = document.getElementsByClassName('enroll')[i];
				enrollBtn.value = '查询信息';
			}
        }
        this.logOut.className += ' login-form-out_show'; 
	},

	loginOut: function() {
		let that = this;
		layer.confirm('确认要退出登录吗？', {
		  	// skin: 'layui-layer-demo', //样式类名
		  	btn: ['确认', '取消'],
		}, function(index) {
			$.ajax({
	            url: 'https://join.xiyoumobile.com/api/deletesession',
	            type: 'GET',
	            dataType: "JSONP",
	            xhrFields: {
		            withCredentials: true,
		        },
	            success: (msg) => {
	                if(!msg.err) {
	                   	that.loginFlag = false;
				  		that.loginBack();
				  		that.logOut.classList.remove('login-form-out_show');
				  		that.type = null;
				  		that.data = null;
				  		let loginOpen = document.getElementById('loginP');
						loginOpen.value = '登录';
	                } else {
	                	layer.alert('你已经退出了');
	                }
	            },
	            error: (err) => {
	                console.log(err);
	            }
	        });
	        layer.close(index);
		}, function() {

		});
	},



	//报名
	enrollShow: function(ele, index) {
		let informMark = document.getElementsByClassName('inform-body-mark');
		let informBack = document.getElementsByClassName('inform-bottom-back')[0];

		let enrollLi = document.getElementsByClassName('enroll-form-li');
		let enrollButton = document.getElementsByClassName('enroll-form-submit-button');

		let enrollGroup = document.getElementById('enroll-form-group');

		this.enrollIndex = index;
		if(index === 0) {
			enrollGroup.value = 'Web';
			this.enroll.style.backgroundColor = '#CE5469';
			this.inform.style.backgroundColor = '#CE5469';
			informBack.style.backgroundColor = '#C91C39';
			for(let i = 0; i < informMark.length; i++) {
				informMark[i].style.backgroundColor = '#C91C39';
			}
			for(let i = 0; i < enrollLi.length; i++) {
				enrollLi[i].style.backgroundColor = '#C91C39';
			}
			for(let i = 0; i < enrollButton.length; i++) {
				enrollButton[i].style.backgroundColor = '#C91C39';
			}
		}

		if(index === 1) {
			enrollGroup.value = 'iOS';
			this.enroll.style.backgroundColor = '#FCD671';
			this.inform.style.backgroundColor = '#FCD671';
			informBack.style.backgroundColor = '#EAB221';
			for(let i = 0; i < informMark.length; i++) {
				informMark[i].style.backgroundColor = '#EAB221';
			}
			for(let i = 0; i < enrollLi.length; i++) {
				enrollLi[i].style.backgroundColor = '#EAB221';
			}
			for(let i = 0; i < enrollButton.length; i++) {
				enrollButton[i].style.backgroundColor = '#EAB221';
			}
		}

		if(index === 2) {
			enrollGroup.value = 'Android';
			this.enroll.style.backgroundColor = '#7CD8FC';
			this.inform.style.backgroundColor = '#7CD8FC';
			informBack.style.backgroundColor = '#2CA5D3';
			for(let i = 0; i < informMark.length; i++) {
				informMark[i].style.backgroundColor = '#2CA5D3';
			}
			for(let i = 0; i < enrollLi.length; i++) {
				enrollLi[i].style.backgroundColor = '#2CA5D3';
			}
			for(let i = 0; i < enrollButton.length; i++) {
				enrollButton[i].style.backgroundColor = '#2CA5D3';
			}
		}

		if(index === 3) {
			enrollGroup.value = '后台';
			this.enroll.style.backgroundColor = '#95A5F0';
			this.inform.style.backgroundColor = '#95A5F0';
			informBack.style.backgroundColor = '#4B62DB';
			for(let i = 0; i < informMark.length; i++) {
				informMark[i].style.backgroundColor = '#4B62DB';
			}
			for(let i = 0; i < enrollLi.length; i++) {
				enrollLi[i].style.backgroundColor = '#4B62DB';
			}
			for(let i = 0; i < enrollButton.length; i++) {
				enrollButton[i].style.backgroundColor = '#4B62DB';
			}
		}

		this.checkEnroll(ele);
	},

	enrollBack: function(login_enroll, form) {
		login_enroll.className = login_enroll.className.split(' login_enroll-box-show')[0];
		form.className = form.className.split(' form-show')[0];
	},

	checkEnroll: function(ele) {
		this.login.className = this.login.className.split(' form-show');
		ele.className = ele.className + ' login_enroll-box-show';
		if(this.type === 'it has access') {
			this.enroll.className = this.enroll.className + ' form-show';
			this.noEnroll();
		} else if(this.type === 'it has login') {
			this.inform.className = this.inform.className + ' form-show';
			this.haveEnroll();
		} else {
			this.loginShow();
		}
	},

	noEnroll: function() {
		let name = document.getElementsByClassName('enroll-form-input')[0];
		name.value = this.data.name;
	},

	haveEnroll: function() {
		let name = document.getElementById('inform-name');
		let group = document.getElementById('inform-group');
		let status = document.getElementById('inform-status');
		name.innerHTML = this.data.name;
		switch(this.data.direction) {
			case 'web': group.innerHTML = 'Web';
			break;
			case 'ios': group.innerHTML = 'iOS';
			break;
			case 'android': group.innerHTML = 'Android';
			break;
			case 'java后台': group.innerHTML = '后台';
			break;
		}
		switch(this.data.status) {
			case 'login': status.innerHTML = '未面试';
			break;
			case 'Pass through': status.innerHTML = '一面通过';
			break;
			case 'Two sides pass through': status.innerHTML = '二面通过';
			break;
			case 'Three sides pass through': status.innerHTML = '三面通过';
			break;
			case 'Have been accepted': status.innerHTML = '录取';
			break;
			default: status.innerHTML = '出错啦';
			break;
		}
	},

	do_enroll: function(enrollDo, circle, enrollInput, enrollTe) {
		switch(enrollInput[1].value) {
			case 'Web': enrollInput[1].value = 'web';
			break;
			case 'iOS': enrollInput[1].value = 'ios';
			break;
			case 'Android': enrollInput[1].value = 'android';
			break;
			case '后台': enrollInput[1].value = 'java后台';
			break;
		}
		enrollDo.className += ' enroll-form-button_enrolling';
		circle.className += ' enroll-form-circling';
		this.enroll.style.pointerEvents = 'none';
		$.ajax({
            url: 'https://join.xiyoumobile.com/api/login',
            type: 'GET',
            dataType: "JSONP",
            data: {
            	'username': this.data.username,
            	'name': this.data.name,
            	'sex': this.data.sex,
            	'class': this.data.class,
            	'direction': enrollInput[1].value,
            	'tel': enrollInput[2].value,
            	'email': enrollInput[3].value,
            	'message': enrollTe.value,
            },
            xhrFields: {
	            withCredentials: true,
	        },
            success: (msg) => {
            	console.log(msg);
                if(!msg.err) {
                	this.enrollSuccess(msg.inf.obj);
                } else {
                	console.log(msg.errtype);
                	this.enrollFall(msg.inf.obj);
                }
            },
            error: (err) => {
                console.log(err);
            }
        });
	},

	enrollSuccess: function(data) {
		this.login_enroll.classList.remove('login_enroll-box-show');
		this.data = data;
		this.type = 'it has login';
		let loginOpen = document.getElementById('loginP');
		loginOpen.innerHTML = data.name;
		this.loginFlag = true;
        this.loginMsg.innerHTML = '报名成功，下方报名按钮可查看面试进度~';
		layer.open({
		  	type: 0,
		  	skin: 'layui-layer-demo', //样式类名
		  	btn: ['确认'],
		  	yes: (index, layero) => {
		  		layer.close(index);
		  	},
		  	closeBtn: 1, //不显示关闭按钮
		  	anim: 2,
		  	shadeClose: true, //开启遮罩关闭
		  	content: '报名成功~'
		});
		for(let i = 0; i < 4; i++) {
			let enrollButton = document.getElementsByTagName('page3-group-button1')[i];
			enrollButton.value = '查询信息';
		}
		this.enroll.classList.remove('form-show');
	},

	enrollFall: function(data) {
		enrollDo.classList.remove('enroll-form-button_enrolling');
		circle.classList.remove('enroll-form-circling');
		this.enroll.style.pointerEvents = 'auto';
		layer.open({
		  	type: 0,
		  	skin: 'layui-layer-demo', //样式类名
		  	btn: ['确认'],
		  	yes: (index, layero) => {
		  		layer.close(index);
		  	},
		  	closeBtn: 1, //不显示关闭按钮
		  	anim: 2,
		  	shadeClose: true, //开启遮罩关闭
		  	content: '报名失败~'
		});
	},





	//获取信息
	getInf: function() {
		$.ajax({
            url: 'https://join.xiyoumobile.com/api/getinf',
            type: 'GET',
            dataType: "JSONP",
            xhrFields: {
	            withCredentials: true,
	        },
            success: (msg) => {
                if(!msg.err) {
                    this.loginSuccess(msg.result.inf, msg.result.type);
                    this.login.className = this.login.className + ' login-form-turn';
					this.login_front.className = this.login_front.className + ' login-form-front_turn';
					this.login_back.className = this.login_back.className + ' login-form-back_turn';
                } else {
                	
                }
            },
            error: (err) => {
                console.log(err);
            }
        });
	},

	init: function() {
		this.getEle();
		this.getInf();
	}

}

window.loginEnroll = loginEnroll;
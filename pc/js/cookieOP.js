let cookieOp = {

	setCookie: function(name, value, hour) {
		if(hour !== 0){
    		let expires = hour * 60 * 60 * 1000;
     		let date = new Date(+new Date() + expires);
     		document.cookie = name + "=" + escape(value) + ";expires=" + date.toUTCString();
   		} else{
     		document.cookie = name + "=" + escape(value);
   		}
	},

	getCookie: function(name) {
		var arr;
   		var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
   		if (arr = document.cookie.match(reg))
   			return unescape(arr[2]);
  		else
        	return null;
	}

}

window.cookieOp = cookieOp;
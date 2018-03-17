window.onload=function(){
    var insertHtml = $("#insertDom").html();
    var swiperV = new Swiper('.swiper-container-v', {
        direction: 'vertical',
        on: {
            slideChangeTransitionEnd: function(){
                animating(this.activeIndex);//根据页面索引动态加载css
                slideProblem(this.activeIndex,swiperH3,swiperH4,swiperH5,swiperH6);
                setGroup(this.activeIndex);
            },
            slideChangeTransitionStart: function(){
                insertDom(this.activeIndex,insertHtml);
            },
        },
        resistanceRatio:0,
    });
    //横屏分页创建实例
    var swiperH3 = new Swiper('.swiper-container-h3', {
        effect : 'coverflow',
        centeredSlides: true,
        coverflowEffect: {
            rotate: 30,
            stretch: 10,
            depth: 60,
            modifier: 2,
            slideShadows : true
        },
        on: {
            slideChangeTransitionStart: function(){
                page3SendInfo(this.activeIndex);
            },
        },
        resistanceRatio:0,
    });
    var swiperH4 = new Swiper('.swiper-container-h4', {
        effect : 'coverflow',
        centeredSlides: true,
        coverflowEffect: {
            rotate: 30,
            stretch: 10,
            depth: 60,
            modifier: 2,
            slideShadows : true
        },
        on: {
            slideChangeTransitionStart: function(){
                page3SendInfo(this.activeIndex);
            },
        },
        resistanceRatio:0,
    });
    var swiperH5 = new Swiper('.swiper-container-h5', {
        effect : 'coverflow',
        centeredSlides: true,
        coverflowEffect: {
            rotate: 30,
            stretch: 10,
            depth: 60,
            modifier: 2,
            slideShadows : true
        },
        on: {
            slideChangeTransitionStart: function(){
                page3SendInfo(this.activeIndex);
            },
        },
        resistanceRatio:0,
    });
    var swiperH6 = new Swiper('.swiper-container-h6', {
        effect : 'coverflow',
        centeredSlides: true,
        coverflowEffect: {
            rotate: 30,
            stretch: 10,
            depth: 60,
            modifier: 2,
            slideShadows : true
        },
        on: {
            slideChangeTransitionStart: function(){
                page3SendInfo(this.activeIndex);
            },
        },
        resistanceRatio:0,
    });
    groupLink(swiperV);
    setInputHeight();
    loginToPage3(swiperH3,swiperH4,swiperH5,swiperH6);
    developerShow();
};
function aLLClick(){
    // 下面为罗萍写：
    setInputHeight();
    $('#toSign').click(function(){
        var username = $('#username').val();
        var pass = $('#pass').val();
        var vcode = $('#vcode').val();
        // if(checkGrade(username)){
            if(check(username,pass,vcode)){     //前台验证合法
                toLogin(username,pass,vcode,window.sess);
                $("#toSign").css('display','none');
                $(".waitLogin").css('display','block');
            }
        // }else{
        //     showFail('您没有登录权限！');
        // }
        
    });
    $('.pop button').click(function(){
        $('#suc').css('display','none');
        $('#fail').css('display','none');
    });
    //点击二维码刷新验证码
    $('#login .vcode').click(function(){
        getVcode();
    });
    $('#sub').click(function(){
        var dir = document.getElementById('now').innerHTML;
        var tel = $('#phone').val();
        var mail = $('#email').val();
        var mess = $('#mess').val();
        if(checkContact(mail,tel,mess)){
            toSign(dir,mail,tel,mess);
        }
    });
    
    $("#logOut").click(loginOut);
    var oSel = document.getElementsByClassName('selected')[0];
    oSel.onclick = function(event){
        var event = event || window.event;
        var target = event.target || event.srcElement;
        document.getElementById('now').innerHTML = target.innerHTML;
        oSel.style.display = 'none';
    }
    $('.show').click(function(){
        if(oSel.style.display === 'block'){
            oSel.style.display = 'none';
        }else{
            oSel.style.display = 'block'
        }
    })
    $(window).resize(function() {
        var winHeight = document.body.clientHeight; //获取当前页面高度
        var thisHeight = $(this).height();
        if (winHeight - thisHeight > 50) {
            //当软键盘弹出，在这里面操作
            // alert("键盘弹出");
            $('body').css('height', winHeight + 'px');
        } else {
            //当软键盘收起，在此处操作
            // alert("键盘收起");
            $('body').css('height', '100%');
        }
        setCircle();
    });
    setCircle();
    setInputHeight();
}
function insertDom(index,Dom){
    switch(index+1){
        case 3:
            removeHtml();
            insertHtml(index,Dom);
            aLLClick();
            break;
        case 4:
            removeHtml();
            insertHtml(index,Dom);
            aLLClick();
            break;
        case 5:
            removeHtml();
            insertHtml(index,Dom);
            aLLClick();
            break;
        case 6:
            removeHtml();
            insertHtml(index,Dom);
            aLLClick();
            break;
    }
}
function page3SendInfo(index){
    if(index==2){
        getInfo();
    }
}
function insertHtml(index,Dom){
    var str = "#slide" +(index+1)+"-3";
    $(str).html(Dom);
}
function removeHtml(){
    $("#slide3-3").empty();
    $("#slide4-3").empty();
    $("#slide5-3").empty();
    $("#slide6-3").empty();
}
//设置输入信息时页面高度
function setInputHeight(){
    var sH = $('#slide1').height();
    // console.log(sH);
    $('#login').css('height',sH+'px');
    $('#signup').css('height',sH+'px');
}
function setCircle(){
    var cW1 = $(window).width();
    $('.circle').css('height',cW1*0.28+'px');
    $('.header .small').css('height',cW1*0.2+'px');
    $('.header .leftsmall').css('height',cW1*0.2+'px');
}
//点击登录跳转
function loginToPage3(swiperH3,swiperH4,swiperH5,swiperH6){
    $("#slide3-login").click(function(){
        swiperH3.slideTo(2,600,false);
        getInfo();
    });
    $("#slide4-login").click(function(){
        swiperH4.slideTo(2,600,false);
        getInfo();
    });
    $("#slide5-login").click(function(){
        swiperH5.slideTo(2,600,false);
        getInfo();
    });
    $("#slide6-login").click(function(){
        swiperH6.slideTo(2,600,false);
        getInfo();
    });
}
//第二页小组导航
function groupLink(myslide){
    $("#iosLink").click(function(){
        slide3AnimateClass(1);
        myslide.slideTo(3,600,false);
        slide3AnimateClass(0);
    });
    $("#androidLink").click(function(){
        slide4AnimateClass(1);
        myslide.slideTo(4,800,false);
        slide4AnimateClass(0);
    });
    $("#webLink").click(function(){
        slide2AnimateClass(1);
        myslide.slideTo(2,500,false);
        slide2AnimateClass(0);
    });
    $("#javaLink").click(function(){
        slide5AnimateClass(1);
        myslide.slideTo(5,1000,false);
        slide5AnimateClass(0);
    });
}
//处理横屏切换到其他页，竖屏切换回到第一页
function slideProblem(index,slideH3,slideH4,slideH5,slideH6){
    slideH4.slideTo(0,0,false);
    slideH6.slideTo(0,0,false);
    slideH3.slideTo(0,0,false);
    slideH5.slideTo(0,0,false);
    switch (index+1){
        case 2:
            slideH3.slideTo(0,0,false);
            break;
        case 3:
            slideH4.slideTo(0,0,false);
            break;
        case 4:
            slideH3.slideTo(0,0,false);
            slideH5.slideTo(0,0,false);
            break;
        case 5:
            slideH4.slideTo(0,0,false);
            slideH6.slideTo(0,0,false);
            break;
        case 6:
            slideH5.slideTo(0,0,false);
            break;
    }
}
function developerShow(){
    console.log("一张网页，要经历怎样的过程，才能抵达用户面前？\n" +
        "一位新人，要经历怎样的成长，才能站在技术之巅？\n" +
        "探寻这里的秘密；\n" +
        "体验这里的挑战；\n" +
        "成为这里的主人；\n" +
        "加入3g，加入网页搜索，你，可以影响世界。");
    console.log("如果你是一名web前端开发者");
    console.log("");
}

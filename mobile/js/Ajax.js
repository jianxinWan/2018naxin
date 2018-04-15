//获取验证码,本地存储信息
function getInfo(){
    $.ajax({
        url : 'https://join.xiyoumobile.com/api/getinf',
        type : 'get',
        dataType : 'JSONP',
        // xhrFields: {
        //     withCredentials: true,
        // },
        success : function(r){
            loadingShow(0);
            if(r.err){
                getVcode();
            }else{
                if(r.result.type){
                    var infor = r.result.inf;
                    sessionStorage.setItem('infor',JSON.stringify(infor));
                    if(r.result.type === 'it has login'){
                        $("#login").css('display','none');
                        $("#signup").css('display','none');
                        clearInput();
                        showStatustable(r.result.inf);
                    }else{
                        getVcode();
                        $("#login").css('display','block');
                    }
                }
            }
        },
        error : function(){
            showFail('获取不到验证码 请稍后重试!');
            $(".waitLogin").css('display','none');
            $("#toSign").css('display','block');

        }
    })
}

function getVcode(){
    $.ajax({
        url : 'https://join.xiyoumobile.com/api/getverCode',
        type : 'get',
        dataType : 'JSON',
        xhrFields: {
            withCredentials: true,
        },
        success : function(r){
            loadingShow(0);
            if(r.err){
                var str = changeErr(r.errtype);
                showFail(str);
                $(".waitLogin").css('display','none');
                $("#toSign").css('display','block');
            }else{
                $('#login .vcode').attr('src',r.result.src);
                $("#login").css('display','block');
                window.sess = r.result.session;
            }
        },
        error : function(){
            showFail('获取不到验证码 请稍后重试!');
            $(".waitLogin").css('display','none');
            $("#toSign").css('display','block');
        }
    })
}

//登录
function toLogin(username,password,vcode,sess){
    var publicKey ='-----BEGIN PUBLIC KEY-----\n' +
        'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC7Bx1dglLflG8vP0jrgfGlvxLU\n' +
        'n5wmqT5KxqsIvCOlV2KupRemnFPVbV6kWNtV+wRrzCfGJizpKZLram1aNAAH4sMh\n' +
        '+mu04eb5Ai0iXA5Dl3YlM06VI8RuwOX2bTsaiOr95/a0F4n6RjRfuZ7Jl/If7aPy\n' +
        'rb2XSh6PJ+JSCH2tVQIDAQAB\n' +
        '-----END PUBLIC KEY-----';
    var jsencrypt = new JSEncrypt();
    jsencrypt.setPublicKey(publicKey);
    // enData用来装载加密后的数据
    // 将参数用jsencrypt加密后赋给enData
    enpass= jsencrypt.encrypt(password);
    $.ajax({
        url : 'https://join.xiyoumobile.com/api/getaccess',
        type : 'get',
        dataType : 'JSON',
        data :{
            'username':username,
            'password':enpass,
            'vercode':vcode,
            'session':sess
        },
        xhrFields: {
            withCredentials: true,
        },
        success : function(r){
            if(r.err){
                var str = changeErr(r.errtype);
                showFail(str);
                clearInput();
                $(".waitLogin").css('display','none');
                $("#toSign").css('display','block');
                getVcode();
            }else{
                if(r.result.state === 'not Teaching evaluation||please check your Educational administration system'){
                    showFail('您暂未评教，请先评教再登录报名！');
                    $(".waitLogin").css('display','none');
                    $("#toSign").css('display','block');
                    getVcode();
                }else{
                    var infor = r.result.stateobj||r.result.inf;
                    if(r.result.state == "it has login"){
                        $('#login').css('display','none');
                        showSuc("登录成功！");
                        showStatustable(infor);
                    }else{
                        showFail("同学，报名已经结束啦");
                        $(".waitLogin").css('display','none');
                        $("#toSign").css('display','block');
                    }
                }
            }
        },
        error : function(err){
            showFail('Server error!');
            $(".waitLogin").css('display','none');
        },
    });
}

//报名
function toSign(direction,email,tel,message){
    var dir = toChange(direction);
    console.log(message);
    var infor = JSON.parse(sessionStorage.getItem('infor'));
    $.ajax({
        url:'https://join.xiyoumobile.com/api/login',
        type:'get',
        dataType:'JSON',
        xhrFields: {
            withCredentials: true,
        },
        data:{
            'username':infor.username,
            'name':infor.name,
            'sex':infor.sex,
            'class':infor.class,
            'direction':dir,
            'tel':tel,
            'message':message,
            'email':email
        },
        success:function(r){
            if(r.err){
                $("#subWait").css('display','none');
                $("#sub").css('display','block');
                showFail(changeErr(r.errtype));
            }else{
                $("#subWait").css('display','none');
                $("#sub").css('display','block');
                $('#signup').css('display','none');
                showSuc("报名成功！");
                $("#suc button").click(getInfo);
                $('#suc button').unbind('click',getInfo);
                showStatustable(r.inf.obj);
            }
        },
        error:function(){
            showFail('Server error!');
        }
    });
}

function loginOut(){
    $.ajax({
        url : 'https://join.xiyoumobile.com/api/deletesession',
        type : 'get',
        dataType : 'JSON',
        xhrFields: {
            withCredentials: true,
        },
        success : function(r){
            if(r.err){
                showFail("同学你已经退出了！");
            }else{
                showSuc("退出成功！");
                $("#suc button").bind('click',outSuc());
                $('#suc button').unbind('click',outSuc);
            }
        },
        error : function(){
            showFail("好像发生错误了！");
        }
    });
}

//展示报名界面
function showSigntable(infor){
    document.getElementById('stuName').innerHTML = infor.name;
    document.getElementById('stuClass').innerHTML = infor.class;
    $('#signup').css('display','block');
}
//展示面试状态
function showStatustable(infor){
    document.getElementById('gotName').innerHTML = infor.name + '同学：';
    document.getElementById('signedGroup').innerHTML = changeGroup(infor.direction);
    document.getElementById('pop-words').innerHTML = changeStatus(infor.status);
    $('#status').css('display','block');
}
//显示成功弹窗
function showSuc(str){
    var content = document.getElementById('suc').getElementsByClassName('content')[0];
    content.innerHTML = str;
    $('#suc').css('display','block');
}
//显示失败弹窗
function showFail(str){
    var content = document.getElementById('fail').getElementsByClassName('content')[0];
    content.innerHTML = str;
    $('#fail').css('display','block');
}

//检查学号密码验证码
function check(id,pass,vcode){
    if(isID(id)){
        if(isPass(pass)){
            if(isVcode(vcode)){
                return true;
            }else{
                showFail('验证码不合法!');
                return false;
            }
        }else{
            showFail('密码不能为空!');
            return false;

        }
    }else{
        showFail('学号不合法!');
        return false;
    }
}
//检查验证码
function isVcode(vcode){
    var vcodeReg = /^[A-Za-z0-9]{4}$/;
    if(!vcodeReg.test(vcode)){
        return false;
    }else{
        return true;	//为空
    }
}
//检查学号
function isID(id) {
    var idReg = /^\d{8}$/;
    if (!idReg.test(id)) {
        return false;
    } else {
        return true;
    };

};
//检查密码
function isPass(pass){
    if(pass === ""){
        return false;
    }else{
        return true;
    }
}
//检查手机
function isPhone(phone){
    var phonereg = /^1[3|4|5|7|8]\d{9}$/;
    if(!phonereg.test(phone))
    {
        return false;
    } else{
        return true;
    }
}
//检查邮箱
function isMail(mail){
    var mailreg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;

    if(!mailreg.test(mail)){
        return false;
    }else{
        return true;
    }
}
//检查留言
function isRight(message){
    if(message === ""){
        return true;
    }else{
        if( filterSqlStr(message)){
            showFail("留言字符中包含了敏感字符！");
            return false;
        }
        return true;
    }
}
//整合检查，检查所有
function checkContact(email,phone,mess){
    if(isPhone(phone)){
        if(isMail(email)){
            // if(isRight(mess)){
            //     return true;
            // }else{
            //     showFail('请输入合法的留言！');
            //     return false;
            // }
            return true;
        }else{
            showFail('请输入正确的邮箱!');
            return false;
        }
    }else{
        showFail('请输入正确的手机号!');
        return false;
    }
}
function filterSqlStr(value){
    var sqlStr=sql_str().split(',');
    var flag=false;
    for(var i=0;i<sqlStr.length;i++){
        if(value.toLowerCase().indexOf(sqlStr[i])!=-1){
            flag=true;
            break;
        }
    }
    return flag;
}
function sql_str(){
    var str="and,delete,or,exec,insert,select,union,update,count,*,',join,>,<";
    return str;
}
//转换后台状态信息
function changeStatus(str) {
    if(str === 'Pass through'){
        return '一面通过';
    }else if(str === 'Two sides pass through'){
        return '二面通过';
    }else if(str === 'Three sides pass through'){
        return '三面通过';
    }else if(str === 'Have been accepted'){
        return '录取';
    }else if(str === 'Luminescence'){
        return '再接再励';
    }else if(str === 'login'){
        return '未面试';
    }else{
        return '未知状态';
    }
}
//改变组名
function changeGroup(str){
    switch(str){
        case "web":
            return 'Web组';
            break;
        case "android":
            return 'Android组';
            break;
        case "ios":
            return 'iOS组';
            break;
        case "java后台":
            return "Java后台";
            break;
        case " " :
            return '未明确意向';
            break;
    }
}
function toChange(str) {
    switch(str){
        case "Android":
            return "android";
            break;
        case "Web":
            return "web";
            break;
        case "iOS":
            return "ios";
            break;
        case "Java后台":
            return 'java后台';
            break;
        case "未明确意向":
            return " ";
            break;
    }
}
//设置当前页面的组
function setGroup(activeIndex){
    switch(activeIndex+1){
        case 3:
            $("#direction #now").html("Android");
            break;
        case 4:
            $("#direction #now").html("iOS");
            break;
        case 5:
            $("#direction #now").html("Web");
            break;
        case 6:
            $("#direction #now").html("Java后台");
            break;
    }
}

function changeErr(str){
    if((str === "don't get info by default2.aspx")||(str === 'severs error')||(str === "can't get info by xs_main.aspx")){
        return '教务系统错误!';
    }else if((str ==='vercode err') ||(str ==='验证码不正确！！')){
        return '验证码错误！';
    }else if(str === '密码错误，如忘记密码，请与教务处联系!'){
        return '密码错误!';
    }else if(str === 'username err'){
        return '用户名不存在或未参加教学活动';
    }else if((str === 'no access')||(str === 'session is out')||(str ==='please check session')||(str === 'please check parameters')||(str === 'parameters err')){
        return '请检查你的信息！或者刷新重试！';
    }else if(str === 'please check session'){
        return '请检查你的信息！或者刷新重试！';
    }else if(str === 'get vercode too mary params'){
        return '您还未登录！';
    }else if(str === "can't get vercode！"){
        return '获取验证码失败！';
    }else if(str === 'login error!'){
        return '报名失败！';
    }else if(str === 'it has login'){
        return '重复报名！';
    }else if(str === 'tel err'){
        return '电话错误！';
    }else if(str === 'email err'){
        return '邮箱错误！';
    }else if(str === 'direction err'){
        return '方向错误！';
    }else{
        return str;
    }
}
 function outSuc(){
    $("#signup").css('display','none');
    $("#status").css('display','none');
    $('.waitLogin').css('display','none');
    getVcode();
    clearInput();
    $('#login').css('display','block');
    $('#toSign').css('display','block');
}

function clearInput(){
    $('#login #pass').val("");
    $('#login #vcode').val("");
    $('#signup input').val("");
    $('#signup textarea').val("");
}
function checkGrade(str){
    var gradeNumber = Number(str[2]+str[3]);
    if(gradeNumber<16){
        return false;
    }else{
        return true;
    }
}
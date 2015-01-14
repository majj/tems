/********************************************************************
*                                                                   *
*            用  途 ：人员登录JS脚本处理                      　　　  *
*            文  件 : Login.js                                      *
*            时  间 : 2010-11-15                                    *
*            创建人 : 张军军                                         *
*                                                                   *
********************************************************************/
var objuser, objpassword, redirectUrl = "main.html";
var serverPath = "http://" + window.location.host;
var loginHandlerPath = "main.html";
var loginPath = "/Portal/RfSoft.MapleTr.DPS/Hr/Html/Login.htm";
var vObject = null;
var isAppliedLoginSafety = "false";  //用户帐户登录安全是否启用
var loginSecurityMode = "code";  //登录安全模式  code验证码| lock锁定用户
var pwdTryCount = 3;  //登录时,密码错误次数
var unLockMode = "auto";   //用户账号解锁方式 auto自动|manual手动
var unLockAutoTime = 10;   //用户账号自动解锁时间  单位为分钟
var ckn = "ASP.NET_SessionId";

var screenWidth = window.screen.width;
var screenHeight = window.screen.height;
if (screenHeight < 768 || screenWidth < 1024) {
    alert("为达到更好的使用效果,建议使用1024*768或更高的分辨率");
}


var isUserVd = !(RfSoft.Common.QueryString("validater") == 'false');
if (isUserVd) {
    //是否安装登录控件
    try {
        vObject = new ActiveXObject("SysValidate.Validater");
    }
    catch (e) { }
}


function ValidateAddress() {
    var addr = vObject.GetCurServerAddress2();
    var arr = addr.split(',');
    if (arr.length == 2 && arr[1] != "" && arr[0] != serverPath) {
        if (!window.confirm("您确定登录此系统吗？")) {
            document.cookie = arr[1];
            window.navigate(arr[0]);
        }
        return false;
    }
}

//如果安装了客户端控件判断是否自动登录
if (vObject && (window.location.href.indexOf("autologin=false") == -1)) {
    ValidateAddress();
}

$(document).ready(function () {
    var url = window.location.search;
    var arrUrl = url.split('=');
    if (arrUrl.length == 2) { if (arrUrl[0].toUpperCase().substring(1, arrUrl[0].length) == 'REFERRER') { redirectUrl = arrUrl[1]; } }
    Hr.Login.getSafetyLoginMsg();  //得到登录安全配置信息
});

var Hr = {};
Hr.Login = {
    defaultClick: function () {
        var e = event.srcElement;
        if (event.keyCode == 13) {
            if (document.activeElement.id != "btnRefresh") {
                var btnLogin = document.getElementById("btnLogin");
                btnLogin.click();
            }
        }
    },
    login: function () {
        // 登录
        this.getLoginInfo();
        if (this.checkInputInfo() == false) { return false; }

        if ($("#divCode").get(0).style.display != 'none' && isAppliedLoginSafety.toLowerCase() == "true") {
            if (this.codeValidate() == false) return false;   //验证码
        }

        var loginState = "";
        loginState = this.ajaxRequestOperate('LOGIN');
        this.loginExec(loginState);
    },
    logout: function () {       // 注销 
        this.ajaxRequestOperate('LOGOUT');
        if (vObject) vObject.LogoutServer(serverPath);
        //window.location.href = loginPath;
    },
    codeValidate: function () {  //验证码

        if (loginSecurityMode.toLowerCase() == "lock" && $(objuser).val().toLowerCase() != 'admin')
            return true;

        var codeNum = this.ajaxRequestOperate('CODENUM');   //得到验证码的值
        if ($("#txtCodeNum").val() == "") {
            this.showErrorTip(true, '请输入验证码。');
            return false;
        }
        else if ($("#txtCodeNum").val().toLowerCase() != codeNum.toLowerCase()) {
            this.showErrorTip(true, '验证码输入错误。');
            return false;
        }
        return true;

    },
    loginRefresh: function () { // 重置
        $('#textUser', $('#login_User')).val('');
        $('#txtPassword', $('#login_User')).val('');
        $('#textUser', $('#login_User')).focus();
    },
    getSafetyLoginMsg: function () {   //得到登录安全信息        
        var html = this.ajaxRequestOperate('USERSAFETY');
        if (html == "") return;
        var xmlDoc = RfSoft.Common.CreateXMLDOM();
        xmlDoc.async = false;
        if (!xmlDoc.loadXML(html)) return;

        isAppliedLoginSafety = xmlDoc.selectSingleNode("//IsAppliedUserLock").text;
        pwdTryCount = xmlDoc.selectSingleNode("//LoginTryCount").text;
        unLockMode = xmlDoc.selectSingleNode("//UnLockMode").text;
        unLockAutoTime = xmlDoc.selectSingleNode("//AutoUnLockTime").text;
        loginSecurityMode = xmlDoc.selectSingleNode("//LoginSecurityMode").text;
    },

    getLoginInfo: function () {
        objuser = $('#textUser', $('#login_User'));
        objpassword = $('#txtPassword', $('#login_User'));
    },
    clearLoginInfo: function () {
        // $(objuser).val('');
        $(objpassword).val('');
        $(objuser).focus();
    },
    checkInputInfo: function () {
        if ($('#textUser', $('#login_User')).val().trim() == '') { this.loginExec('NOINPUTNAME'); return false; }
        if ($('#txtPassword', $('#login_User')).val() == '') { this.loginExec('NOINPUTPWD'); return false; } //$(objpassword).focus();
        return true;
    },
    ajaxRequestOperate: function (operateType) {
        try {
            var xml = this.createLoginXml(operateType);
            var html = $.ajax({ type: "POST", url: loginHandlerPath + "?opType=" + operateType, processData: false, /* 防止自动转换数据格式。*/data: xml, async: false }).responseText;
            return html;
        }
        catch (e) {
            return e.Message;
        }

    },
    createLoginXml: function (operateType) {
        var xml = RfSoft.Common.CreateXMLDOM();
        var loginNode;
        switch (operateType) {
            case 'LOGIN':
                loginNode = xml.createElement("Login");
                var userIdElement = xml.createElement("UserName");
                userIdElement.appendChild(xml.createTextNode($(objuser).val()));
                loginNode.appendChild(userIdElement);
                var passwordElement = xml.createElement("Password");
                passwordElement.appendChild(xml.createTextNode($(objpassword).val()));
                loginNode.appendChild(passwordElement);
                break;
            case "LOCKUSER":
                loginNode = xml.createElement("Login");
                var userIdElement = xml.createElement("UserName");
                userIdElement.text = $(objuser).val();
                loginNode.appendChild(userIdElement);
                break;
            default:
                return null;
        }
        xml.appendChild(loginNode);
        return xml;
    },
    //更换验证图片
    changeCodeImg: function () {

        document.getElementById("codeImg").src = "/Portal/RfSoft.MapleTr.DPS/Hr/Control/CodeImagePage.aspx?noCahe=" + Math.random();
    },
    //登录用户名称失去焦点函数
    userNameOnBlur: function () {
        if (isAppliedLoginSafety.toLowerCase() != "true") return;   //判断是否启用登录安全
        var userName = $("#textUser").val();
        var cookieLoginNum = RfSoft.Common.GetCookie(userName);
        if (loginSecurityMode == "lock") {   //使用锁模式
            if (userName != "admin" && $("#divCode").get(0).style.display != "none")
                $("#divCode").get(0).style.display = "none";
            else if (userName == "admin" && cookieLoginNum >= pwdTryCount - 1 && $("#divCode").get(0).style.display == "none") {
                $("#divCode").get(0).style.display = "block";
                Hr.Login.changeCodeImg();
            }

        }
        else {   //使用验证码的模式
            if (cookieLoginNum >= pwdTryCount - 1) {
                if ($("#divCode").get(0).style.display != "none") return;
                $("#divCode").get(0).style.display = "block";
                Hr.Login.changeCodeImg();
            }
            else {
                document.getElementById("codeImg").src = "";
                $("#divCode").get(0).style.display = "none";
            }

        }
    },
    loginExec: function (loginState) {
        //alert(loginState);
        /*      TRUE:           人员登录成功。
        *      FALSE:          登录失败。
        *      NOUSER:         不存在当前人员。
        *      USERLOCKED：    帐号被锁定。
        *      USERDELETE:     人员被删除。
        *      PWDERROR:       密码错误。
        *      USEROVERDUE:    密码已过期
        */
        var state = loginState;
        //返回值，如果不包含'|',则直接为用户返回的登录状态；如果包含'|'，'|'前为用户的登录状态；'|'后为还有几天过期的天数;
        if (state.indexOf('|') > 0) state = state.split('|')[0];
        switch (state) {
            case 'TRUE':
                RfSoft.Common.DelCookie($(objuser).val());  //删除记录用户输入密码错误的次数

                Hr.Login.transferInitialpage();  //登录成功得到个人默认站点路径

                return;
            case 'NOINPUTNAME': this.showErrorTip(true, '请输入用户名。'); objuser.val(''); break;
            case 'NOINPUTPWD': this.showErrorTip(true, '请输入密码。'); ; break;
            case 'FALSE': this.showErrorTip(true, '登录失败。'); objuser.val(''); $(objuser).focus(); break;
            case 'NOUSER': this.showErrorTip(true, '用户不存在,请向管理员咨询。'); break;
            case 'USERLOCKED':
                this.showErrorTip(true, '用户帐号被锁定。');
                break;
            case 'USERDELETE': this.showErrorTip(true, '用户已被删除。'); break;
            case 'PWDERROR':
                var isPwdError = true;
                objpassword.val('');
                if (isAppliedLoginSafety.toLowerCase() == "true") {    //启用
                    var name = $(objuser).val();

                    //Cookie记录用户登录,密码输入错误的数次
                    var cookieLoginNum = RfSoft.Common.GetCookie(name);

                    //更换验证码
                    if ($("#divCode").get(0).style.display != "none") {
                        this.changeCodeImg();
                        $("#txtCodeNum").val("");
                    }
                    if (cookieLoginNum != null) {
                        if (parseInt(cookieLoginNum) >= pwdTryCount - 1) {  //当用户输入密码错误的次数超过允许的次数时
                            if (loginSecurityMode == "lock" && name != 'admin') {   //当安全模式为锁定模式且不为admin用户,锁定该用户
                                this.ajaxRequestOperate('LOCKUSER'); //锁定用户
                                isPwdError = false;
                            }
                            else if ($("#divCode").get(0).style.display == "none") {   //当安全模式为验证码模式，显示验证码
                                $("#divCode").show();
                                Hr.Login.changeCodeImg();
                            }
                        }
                        else {
                            RfSoft.Common.SetCookie(name, parseInt(cookieLoginNum) + 1, 0.25)   //记录密码输入错误的次数
                        }
                    }
                    else {
                        RfSoft.Common.SetCookie(name, 1, 0.25);
                    }
                }
                if (isPwdError == true)
                    this.showErrorTip(true, $("#textUser").val() + '的用户密码不正确');
                else {
                    RfSoft.Common.DelCookie($(objuser).val());  //删除记录用户输入密码错误的次数
                    this.showErrorTip(true, '用户帐号被锁定。');
                }
                break;
            case "PWDATONCEOVERDUE":
                //密码过期前提示 
                var dayNum = 0;
                if (loginState.indexOf('|') > 0)
                    dayNum = loginState.split('|')[2];
                var info = (dayNum == "0") ? "即将" : (dayNum + "天后");
                if (confirm("您的密码" + info + "过期,是否现在更改密码。")) {
                    var obj = new Object();
                    obj.UserId = loginState.split('|')[1];
                    obj.IsLogin = true;
                    var result = window.showModalDialog("/Portal/RfSoft.MapleTr.DPS/Hr/Html/UserPWDModify.htm", obj, "dialogWidth=500px;dialogHeight=250px;center=1;scroll=0;resizable=no;help=0;status=0");
                    if (result != undefined && result.operate != undefined && result.operate == "TRUE") {
                        RfSoft.Common.DelCookie($(objuser).val());  //删除记录用户输入密码错误的次数
                        Hr.Login.transferInitialpage();  //转到个人默认站点路径
                    }
                }
                else {
                    Hr.Login.transferInitialpage();  //转到个人默认站点路径
                }
                break;
            case 'PWDOVERDUE':
                //密码超过有效期
                if (confirm("您的密码已过有效期，为了保证您账号安全请更改密码！")) {
                    var obj = new Object();
                    obj.UserId = loginState.split('|')[1];
                    obj.IsLogin = true;
                    var result = window.showModalDialog("/Portal/RfSoft.MapleTr.DPS/Hr/Html/UserPWDModify.htm", obj, "dialogWidth=500px;dialogHeight=250px;center=1;scroll=0;resizable=no;help=0;status=0");
                    if (result != undefined && result.operate != undefined && result.operate == "TRUE") {
                        RfSoft.Common.DelCookie($(objuser).val());  //删除记录用户输入密码错误的次数
                        Hr.Login.transferInitialpage();  //转到个人默认站点路径                        
                    }
                    else {
                        alert("未完成密码修改,无法登录系统！");
                        this.logout();
                    }
                }
                else {
                    alert("您的密码已过有效期，未能登录系统！");
                    this.logout();
                }
                break;
            case 'OVERMAXUSECOUNT': this.showErrorTip(true, '超过最大使用人数。'); break;
            default: this.showErrorTip(true, loginState); break;
        }
    },
    transferInitialpage: function () {
        window.location.href = serverPath + "/default.htm"; return;
        var referrer = RfSoft.Common.QueryString("referrer");
        if (referrer) {
            window.location.href = referrer;
            return;
        }
        //登录成功得到个人默认站点路径            
        redirectUrl = this.ajaxRequestOperate('USERSITEPATH');
        window.location.href = redirectUrl;
    },
    showErrorTip: function (isTip, dept, errorType) {
        if (isTip) {
            $('#errorImg').show();
            $('#errorTip').html(dept);
            $('#errorTip').attr('errorType', errorType);
        }
        else {
            $('#errorImg').hide();
            $('#errorTip').html('');
            $('#errorTip').attr('errorType', errorType);
        }
    },
    hideError: function (errorType) {
        this.showErrorTip(false, '');
    },
    changeBackGround: function (type, obj) { /* 鼠标进入后样式也变 */
        switch (type) {
            case 'over':
                $(obj).addClass("loginc");
                $(obj).removeClass("login");
                break;
            case 'out':
                $(obj).addClass("login");
                $(obj).removeClass("loginc");
                break;
        }
    }
}


var appValidity = Hr.Login.ajaxRequestOperate('APPVALIDITY');
var appvo = eval("(" + appValidity + ")");
if (appvo) {
    if (!appvo.haslicensFile) {
        window.location = "/Portal/Common/html/nolicens.htm";
    }
    else if (!appvo.isValidMacAddress) {
        window.location = "/Portal/Common/html/slopEngage.htm";
    }
    else if (appvo.isTimeout) {
        window.location = "/Portal/Common/html/overdue.htm";
    }
}

function ADLogin() {
    //AD登录验证
    if (Hr.Login.ajaxRequestOperate('LOGINCONFIG').toLowerCase() == 'true') {
        var sid = vObject.GetCurSid(serverPath);
        if (sid.indexOf("ASP.NET_SessionId") != -1) {
            window.navigate(serverPath);
        }
    }
}

ADLogin();
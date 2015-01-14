RfSoft.NS.register('RfSoft.Common.HotKey');
/********************************************************************
*                                                                   *
*            用  途 ：快捷键 [非跨域代码]                             *
*            文  件 : RfSoft.Common.HotKey.js                       *
*            时  间 : 2011-3-22                                     *
*            创建人 : zhu18                                         *
*                                                                   *
********************************************************************/
RfSoft.Common.HotKey.HTS = []; //全局快捷键集合
RfSoft.Common.HotKey.IsListen = true; //是否开启热键监听

//注册系统快捷键
/*
    keys: 注册的热键 如："event.ctrlKey && event.keyCode == 78"
    keysName:热键中文名称 如："重启IIS"
    exec:热键执行方法 如：iisreset
    desc:热键描述
列如:
    1.回车执行A方法
    RfSoft.Common.HotKey.register("event.keyCode==13","启动流程",A,"快捷键启动流程");   
    2.alt+回车执行B方法
    RfSoft.Common.HotKey.register("event.altKey&&event.keyCode==13","启动流程",B,"快捷键启动流程");
*/
RfSoft.Common.HotKey.register = function (keys, keysName, exec, desc) {
    top.RfSoft.Common.HotKey.HTS.push({ keys: keys, keysName: keysName, exec: exec, desc: desc });
}
//热键监听
RfSoft.Common.HotKey.Listen = function (win) {
    if (top.RfSoft.Common.HotKey.IsListen && event) {
        var ks = top.RfSoft.Common.HotKey.HTS;
        for (var i = 0; i < ks.length; i++) {
            if (eval(ks[i].keys)) {
                ks[i].exec(win);
                RfSoft.Common.HotKey.EventStop();
                break;
            }
        }
    }
}
//屏蔽事件冒泡
RfSoft.Common.HotKey.EventStop = function () {
    if (!event) return;
    try{
    event.keyCode = 0;
    event.returnValue = false;
    }catch(e){};
}
//关闭热键监听
RfSoft.Common.HotKey.DetachListen = function () {
    top.RfSoft.Common.HotKey.IsListen = false;
    $(window.document).unbind('keydown', RfSoft.Common.HotKey.Listen);
}
//重新激活事件监听
RfSoft.Common.HotKey.ReActivateEvent = function () {
    top.RfSoft.Common.HotKey.IsListen = true;
    $(window.document).unbind('keydown', RfSoft.Common.HotKey.Listen);
    $(window.document).bind("keydown", RfSoft.Common.HotKey.Listen);
}
$(window.document).bind("keydown", function () { RfSoft.Common.HotKey.Listen(window) });
window.onhelp = function () { return false; }
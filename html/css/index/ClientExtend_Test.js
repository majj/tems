/* -------------- 菜单JS扩展实例文件 ------------------- */
var _leftMenuShow = false;
function LeftMenuToggle() {
    application.content.splitter.show(_leftMenuShow);
    _leftMenuShow = !_leftMenuShow;
}
//注销
function Logout() {
    RfSoft.MapleTr.DPS.Hr.AjaxRequestJson(DPS_HR_URL + '?opType=Logout&opValue=Logout');
}
//启动ODPP
function execODPP() {
    execCommand("odpp");
}

//启动IIS配置
function IIS() {
    execCommand("inetmgr");
}
//重新启动IIS
function RestartIIS() {
    execCommand("iisreset");
}
//启动远程桌面
function RemoteConnect() {
    execCommand("mstsc");
}
//执行命令
function execCommand(cmd) {
    try {
        var shell = new ActiveXObject("WScript.Shell");
        if (shell) {
            try {
                shell.Run(cmd);
            } catch (e) {
                alert('错误描述:'+e.Message+'.\n执行命令失败:' + cmd+'.');
            }
        }
    } catch (e) {
        alert('无法执行JS扩展,请把站点设置为受信站点并允许ActiveXObject执行。');
    }
}
//注册到扩展管理中
ClientExtendManager.add({ name: '注销[不跳转到登录页面]', handler: 'Logout' });
ClientExtendManager.add({ name: '页头隐藏|显示', handler: '__toggle' });
ClientExtendManager.add({ name: '左侧菜单隐藏|显示', handler: 'LeftMenuToggle' });
ClientExtendManager.add({ name: '远程连接', handler: 'RemoteConnect' });
ClientExtendManager.add({ name: 'IIS配置管理器', handler: 'IIS' });
ClientExtendManager.add({ name: '重新启动IIS', handler: 'RestartIIS' });
ClientExtendManager.add({ name: '启动ODPP', handler: 'execODPP' });

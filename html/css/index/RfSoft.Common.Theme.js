RfSoft.NS.register('RfSoft.Common.Theme');
/********************************************************************
*                                                                   *
*            用  途 ： 选择不同的皮肤，应用不同的样式                 *
*            文  件 : RfSoft.Common.Theme.js                        *
*            时  间 : 2010-11-15                                    *
*            创建人 : zhu18                                         *
*                                                                   *
********************************************************************/
/* 主题cookie名称*/
var APP_THEME = "_theme";

RfSoft.Common.Theme.ApplyDocs = [];
/* 初始化样式 */
RfSoft.Common.Theme.Init = function () {
    try {
        top.RfSoft.Common.Theme.ApplyDocs.push(window.document);
        this.SetTheme(this.GetCurrentUserTheme(), true);
    } catch (e) { }
}

/* 设置主题样式 theme:要设置的主题名称，isLocal：是否局部设置*/
RfSoft.Common.Theme.SetTheme = function (theme, isLocal) {
    if (!isLocal) {
        for (var i = 0; i < top.RfSoft.Common.Theme.ApplyDocs.length; i++) {
            RfSoft.Common.Theme.SetThemeByDoc(top.RfSoft.Common.Theme.ApplyDocs[i], theme);
        }
    }
    else {
        RfSoft.Common.Theme.SetThemeByDoc(document, theme);
    }

    //重新设置主题到cookie
    //  var key = RfSoft.MapleTr.DPS.Hr.CurrentUser().UserId + APP_THEME;
    // RfSoft.Common.DelCookie(key);
    // RfSoft.Common.SetCookie(key, theme);
}


/* 为document设置主题样式 doc:要设置的DOC，theme:要设置的主题名称*/
RfSoft.Common.Theme.SetThemeByDoc = function (doc, theme) {
    var hisTheme = null;
    try {
        var objs = doc.getElementsByTagName("link");
        hisTheme = objs[3].href.split('/')[3].toLowerCase();
    } catch (e) { return; }
    //历史主题

    //当前主题一致
    if (!hisTheme || (hisTheme == theme.toLowerCase()))
        return;
    var link = null;
    var href = "";
    var arrHref = [];

    for (var i = 0; i < objs.length; i++) {
        link = $(objs[i]);
        href = link.attr('href');
        if (href.toLowerCase().indexOf('/themes/style/') != -1) {
            arrHref = href.split('/');
            arrHref[3] = theme;
            link.attr('href', arrHref.join('/'));
        }
    }
    //页面换肤扩展
    if (doc.parentWindow.themeCallback)
        doc.parentWindow.themeCallback(hisTheme, theme);
}

/* 得到当前主题 */
RfSoft.Common.Theme.GetCurrentUserTheme = function () {
    var userId = RfSoft.MapleTr.DPS.Hr.CurrentUser().UserId;
    //    var theme = this.GetUserThemeFromCookie(userId);
    var theme;
    var siteid = RfSoft.MapleTr.DPS.Site.CurrentSite().ID;
    theme = this.GetCurrentUserThemeFromDB(userId, siteid);
    //    if (!theme) {
    //        theme = this.GetCurrentUserThemeFromDB(userId, siteid);
    //    }
    return theme;
}

/*AJax请求获得当前人员的主题*/
RfSoft.Common.Theme.GetCurrentUserThemeFromDB = function (userId, siteid) {
    var theme = '';
    try {
        theme = baseInfo.theme;
    } catch (e) {
        try {
            theme = top.baseInfo.theme;
        } catch (e) {
            theme = $.ajax({
                url: "/Portal/RfSoft.MapleTr.DPS/Hr/Control/UserIndividuation.ashx",
                data: "Value=&OP=GET&Type=USER&ColumnName=theme&Id=" + userId + "&SiteId=" + siteid,
                async: false,
                cache: false
            }).responseText;
        }
    }
    return theme || 'Default';
}

/*从Cookies中获得主题*/
RfSoft.Common.Theme.GetUserThemeFromCookie = function (userId) {
    try {
        var theme = RfSoft.Common.GetCookie(userId + APP_THEME); // 
        return theme;
    }
    catch (e) {
        alert('错误的Cookies，刷新页面后重试。');
        return '';
    }
}


$(document).ready(function () { RfSoft.Common.Theme.Init(); })
//cookie 中用户格式  用户ID + '_theme' : '主题名称'
//                     us001_theme : blue

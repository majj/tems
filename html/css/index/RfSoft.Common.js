RfSoft.NS.register('RfSoft.Common');
RfSoft.NS.register('RfSoft.MapleTr.Common');
/********************************************************************
*                                                                   *
*            用  途 ：常用公共方法                                   *
*            文  件 : RfSoft.Common.js                              *
*            时  间 : 2010-11-15                                    *
*            创建人 : zhu18                                         *
*                                                                   *
********************************************************************/

//支持json RfSoft.Common.SetCookie("AAA", "[{id:3,name:'zhu18',theme:'blue'},{id:4,name:'zjj',theme:'red'}]");
// 写Cookie 默认保存365天
RfSoft.Common.SetCookie = function (name, value, days) {
    var Days = days || 365;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
}

// 读Cookie
RfSoft.Common.GetCookie = function (name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]); return null;

}

// 删除Cookie
RfSoft.Common.DelCookie = function (name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = RfSoft.Common.GetCookie(name);
    if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/";
}
// 选择颜色  隐藏域或文本框ID:valueId  呈现颜色的容器ID:viewId
RfSoft.Common.ColorSelect = function (valueId, viewId, action) {
    action = action || "";
    var dEL = document.getElementById(valueId);
    var sEL = document.getElementById(viewId);
    var color = (dEL) ? dEL.value : "#ffffff";
    var url = "/Include/Controls/ColorPicker/selcolor.htm?color=" + encodeURIComponent(color) + "&action=" + action;
    var c = showModalDialog(url, window, "dialogWidth:250px;dialogHeight:250px;help:no;scroll:no;status:no");
    if (c) {
        if (dEL) dEL.value = c;
        if (sEL) sEL.style.backgroundColor = c;
        else if (event && event.srcElement) event.srcElement.style.backgroundColor = c;
    }
    return c;
}

//选择文件或文件夹，返回值 为用逗号分隔的文件或文件夹名称
/*  参数说明 
*    obj.IsSelFolder = false;  //标识是选择文件夹或文件（true:文件夹|false:文件）
*    obj.BeginCatalog = "/";   //搜索开始目录
*    obj.IsSelMore = true;  //标识是否选择多个文件或文件夹
*    obj.IsShowSearch = true;  //标识是否显示搜索栏

*    obj.SelFileName = "";  //搜索指定文件后缀或名称(多个用';'分隔)
*    obj.RemoveFileName = "*.ini;";   //排除指定文件后缀或名称(多个用';'分隔)
*    obj.RemoveFolderName = ".svn;bin;";  //排除指定文件夹名称(多个用';'分隔)
*/
RfSoft.Common.SelFolder = function (obj) {
    var width = "600px";
    if (obj && obj.IsSelFolder === false) {
        width = "800px"
    }
    var result = window.showModalDialog("/Include/Controls/ChooseFile/html/ChooseFilePage.htm", obj, "dialogHeight=550px; dialogWidth=" + width + ";center=1;scroll=0;resizable=no;help=0;status=0");
    return result;
}


// 颜色同步 
RfSoft.Common.ColorSync = function (obj) {
    try {
        var t = event.srcElement;
        if (t.value.trim().length == 7) {
            if (obj) {
                obj = (typeof obj != "object") ? $("#" + obj) : $(obj);
                obj[0].style.background = t.value;
            }
            else
                t.nextSibling.style.background = t.value;
        }
    }
    catch (e){ }
}

// 选择图片 searchName:图片过滤名称，displaySize:图片大小,isAsyn:是否异步
RfSoft.Common.ImagesSelect = function (img, searchName, displaySize, isAsyn) {
    if (typeof img == "string") {
        img = document.getElementById(img);
    }
    // 图片的地址    
    var strUrl = "/Include/Controls/ImagesDisplay/SelectImage.aspx";
    var obj = new Object();
    //	过滤图片名称
    (!searchName) ? obj.Name = "" : obj.Name = searchName;
    //	过滤图片尺寸（如：12,12|宽,高、16,16|宽,高。请用小写逗号间隔）
    (!displaySize) ? obj.Size = "14,14" : obj.Size = displaySize;
    // 是否异步
    obj.IsAsyn = (isAsyn == true);

    //var imgsrc = img.value;
    var resault = window.showModalDialog(strUrl, obj, 'dialogHeight:522px;dialogWidth:760px;resizable:no');
    if (resault != undefined) {
        if (resault) {
            if (resault != "false") {
                img.style.display = "";
                $(img).attr({ "src": resault, "value": resault });
            }
        }
        else {
            img.src = "";
            img.style.display = "none";
            $(img).attr({ "src": resault, "value": resault });
        }
    }

}
//执行EXE文件 IE 自带
RfSoft.Common.ExecCommand = function (cmd) {
    try {
        var shell = new ActiveXObject("WScript.Shell");
        if (shell) {
            try {
                shell.Run(cmd);
            } catch (e) {
                alert('错误描述:' + e.Message + '.\n执行命令失败:' + cmd + '.');
            }
        }
    } catch (e) {
        alert('无法执行JS扩展,请把站点设置为受信站点并允许ActiveXObject执行。');
    }
}
//执行EXE文件 公司 插件
RfSoft.Common.ExecCommand2 = function (cmdName, execType) {
    execType = execType || 0;
    try {
        var obj = new ActiveXObject("ShellExecuter.ShellExecutor");

        if (!obj)            
            Urt_setupValidate();
        else {
            if (execType == 0) {
                var sepIndex = cmdName.indexOf(" ");
                if (sepIndex > 0) {
                    obj.Execute('open', cmdName.substr(0, sepIndex), cmdName.substr(sepIndex + 1));
                }
                else {
                    obj.Execute('open', cmdName, '');
                }
            }
            else
                obj.Run();
        }

    }
    catch (e) {
        Urt_setupValidate();
    }
}
function Urt_setupValidate() {
    if (window.confirm("系统启动应用程序需要安装相应的控件，请确认是否安装？")) 
        window.navigate("/Resource/ShellExecutor.exe");
}

RfSoft.Common.Trim = function (str) {
    return null == str ? str : str.replace(/^\s+|\s+$/g, "");
}
//客户端解析枚举类型 如0代表女 1代表男 ParamEnum(val, "0:女,1:男")
RfSoft.Common.ParamEnum = function (val, enumstring) {
    var rvalue = null;
    var arrenums = enumstring.split(',');
    for (var i = 0; i < arrenums.length; i++) {
        if (val.toString().toLowerCase() == $.trim(arrenums[i].split(':')[0]).toLowerCase()) {
            rvalue = arrenums[i].split(':')[1];
            break;
        }
    }
    return rvalue;
}


// 创建一个XMLDOM实体对象
RfSoft.Common.CreateXMLDOM = function () {
    try {
        this.xmlDoc = new ActiveXObject("MSXML2.DOMDocument");
        return this.xmlDoc;
    }
    catch (e) {
        alert("DOM document not created. Check MSXML version used in createXmlDomDocument.");
        return null;
    }
}


/********************************************************************
*                                                                   *
* 用  途 ：通过 XSLT 格式化 XML文件                                 *
* 时  间 : 2010-11-30                                               *
* 创建人 : ccl                                                      *
* 参  数 : xmlString 指 XML 的字符串表示形式；                      *
*          xsltString 指 XSLT 的字符串表示形式                      *                                           
* 返回值 : 返回转换后的 XML 的字符串值                              *
*                                                                   *
********************************************************************/
RfSoft.Common.XmlDocTransferByXslt = function (xmlString, xsltString) {
    try {
        if (xmlString && xsltString) {
            // Load XML 
            var xml = RfSoft.Common.CreateXMLDOM();
            xml.async = false;
            xml.loadXML(xmlString);

            // Load XSL
            var xsl = new RfSoft.Common.CreateXMLDOM();
            xsl.async = false;
            xsl.loadXML(xsltString);

            // Transform
            return xml.transformNode(xsl);
        }
        else {
            alert("XML 字符串为空或 XSLT 字符串为空!");
            return null;
        }
    }
    catch (err) {
        alert("转化XML异常：" + err.Message);
    }
}
/********************************************************************
*                                                                   *
* 用  途 ：弹出验证提示信息                                          *
* 时  间 : 2011-4-27                                                *
* 创建人 : hyw                                                      *
* 参数                                                              *
* isCk: 如果是正确信息应传入true,如果是错误信息应传入false             *
* strVal：提示信息字符串                                             *
* oInput：在这个元素后面显示提示信息                                  *
* checkname：验证的名称，确保同一oInput 该名称一样                    *
********************************************************************/
RfSoft.Common.GetCheckDiv = function (isCk, strVal, oInput, checkname) {
    var d = document.getElementById(checkname);
    if (d == null || d == undefined) {
        d = document.createElement("span");
        d.style.padding = "3px";
        d.style.margin = "3px";
        //        d.style.marginBottom = "3px";
        d.id = checkname;
    }
    if (isCk) {
        d.style.border = "1px solid Green";
        d.style.color = "Green";
    }
    else {
        d.style.border = "1px solid Red";
        d.style.color = "Red";
    }
    d.innerText = strVal;
    oInput.insertAdjacentElement("afterEnd", d);
}
/********************************************************************
*                                                                   *
* 用  途 ：截获服务器端未通过编译引发的异常                           *
* 时  间 : 2011-04-20                                               *
* 创建人 : ccl                                                      *
* 参  数 : inString 指 ajax请求返回的结果字符串；                    *
*          inString 格式为:Failed|errorMesage;                      *                                           
* 返回值 : 若有异常则返回 true ，否则返回false;                       *
*                                                                   *
********************************************************************/
RfSoft.Common.HttpCompileException = function (inString) {
    var result = inString.split("|");
    if (result && result[0] == "Failed") {
        alert(result[1]);
        return true;
    }
    else {
        return false;
    }
}

/* --------------------------- Data --------------------------------------- */
// 切除方法
// "  zhu18   ".trim() ==> "zhu18";
// "111zhu1811".trim('1') ==> "zhu18";
String.prototype.trim = function (value) {
    if (value) {
        var exp = eval("/^" + value + "+|" + value + "+$/g");
        return this.replace(exp, "");
    }
    return this.replace(/^\s+|\s+$/g, "");
}

//名称：日期格式转换
//参数：日期字符串和格式类型
//type： 0--用'-'分隔日期  1--用'/'分隔日期  2--年月日分隔日期  3--包含具体的时间信息
RfSoft.Common.DateFormat = function (date, type) {
    var dateFormat = "";
    var dateSplit = date.split("T");

    switch (type) {
        case "0": dateFormat = dateSplit[0];
            break;
        case "1": dateFormat = dateSplit[0].replace(/-/g, "/");
            break;
        case "2": var arrDate = dateSplit[0].split("-");
            dateFormat = arrDate[0] + "年" + arrDate[1] + "月" + arrDate[2] + "日";
            break;
        case "3":
            if (dateSplit[1].indexOf(".") != -1) {
                dateFormat = dateSplit[0] + " " + dateSplit[1].split(".")[0];
            }
            else if (dateSplit[1].indexOf("+") != -1) {
                dateFormat = dateSplit[0] + " " + dateSplit[1].split("+")[0];
            }
            break;
    }

    return dateFormat;
}

//名  称： 获取服务器端时间
//返回值： 返回 Date 对象
//示  例： var date = RfSoft.Common.GetServerDate();
//          date.getFullYear();
RfSoft.Common.GetServerDate = function () {
    var datetimeFormat = "";
    var sendXml = "<Execute TagName='GetServerDatetime' datetimeFormat='" + datetimeFormat + "' />";
    var url = "/BaseSOA/GetDatetime.aspx";
    var dateS = RfSoft.Common.XmlHttp.ExecuteXmlUrl(sendXml, url).split(" ");
    var dateDay = dateS[0].split("-");
    var hourMinSec = dateS[1].split(":");
    var date = new Date(parseInt(dateDay[0]), parseInt(dateDay[1]) - 1, parseInt(dateDay[2]), parseInt(hourMinSec[0]), parseInt(hourMinSec[1]), parseInt(hourMinSec[2]));
    return date;
}


//名  称：扩展 Date 对象，获取服务器端时间,此方法为静态方法
//返回值: 返回 Date 对象
//示  例： var date =Date.GetServerDate();
//          date.getFullYear();
Date.getServerDate = function () {
    var datetimeFormat = "";
    var sendXml = "<Execute TagName='GetServerDatetime' datetimeFormat='" + datetimeFormat + "' />";
    var url = "/BaseSOA/GetDatetime.aspx";
    var dateS = RfSoft.Common.XmlHttp.ExecuteXmlUrl(sendXml, url).split(" ");
    var dateDay = dateS[0].split("-");
    var hourMinSec = dateS[1].split(":");
    var date = new Date(parseInt(dateDay[0]), parseInt(dateDay[1]) - 1, parseInt(dateDay[2]), parseInt(hourMinSec[0]), parseInt(hourMinSec[1]), parseInt(hourMinSec[2]));
    return date;
};

//名称：日期格式转换
//参数：日期字符串和格式类型
//type： 0--用'-'分隔日期  1--用'/'分隔日期  2--年月日分隔日期  3--包含具体的时间信息
Date.prototype.Format = function (date, pattern) {
    return RfSoft.Common.DateFormat(date, pattern);
}

//
Date.getDateFromDateString = function (dateString) {
    var dateTimeArr = dateString.split("");
    var dateArr = dateTimeArr[0].split("-");
    var timeArr = dateTimeArr[1].split(":");

}

//名  称： 加毫秒。负数也可,表示减毫秒
//返回值:  增加毫秒后的 Date 对象
//示  例： var date = new Date();
//         var dateMillis = date.getTime();
//         date.add(123);
//         var dateMillisAfterAdding = date.getTime();
Date.prototype.add = function (milliseconds) {
    var ms = this.getTime() + milliseconds;
    return new Date(ms);
};

//名  称： 加秒。负数也可,表示减秒
//返回值:  增加秒后的 Date 对象
//示  例： var date = new Date();
//         var dateSeconds = date.getSeconds();
//         date.addSeconds(123);
//         var dateSecondsAfterAdding = date.dateSeconds();
Date.prototype.addSeconds = function (second) {
    return this.add(second * 1000);
};

/****************************
*
*    增加分钟。负数也可
*   
*****************************/
Date.prototype.addMinutes = function (minute) {
    return this.addSeconds(minute * 60);
};

/****************************
*
*    增加小时。负数也可
*   
*****************************/
Date.prototype.addHours = function (hour) {
    return this.addMinutes(60 * hour);
};

/****************************
*
*    增加天。负数也可
*   
*****************************/

Date.prototype.addDays = function (day) {
    return this.addHours(day * 24);
};

/****************************
*
*    获取某年某月的天数
*   
*****************************/
Date.daysInMonth = function (year, month) {
    if (month == 2) {
        if (year % 4 == 0 && year % 100 != 0)
            return 29;
        else
            return 28;
    }
    else if ((month <= 7 && month % 2 == 1) || (month > 7 && month % 2 == 0))
        return 31;
    else
        return 30;
};

/****************************
*
*    加一月
*   
*****************************/
Date.prototype.addMonth = function () {
    var m = this.getMonth();
    if (m == 11) return new Date(this.getFullYear() + 1, 1, this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds());

    var daysInNextMonth = Date.daysInMonth(this.getFullYear(), this.getMonth() + 1);
    var day = this.getDate();
    if (day > daysInNextMonth) {
        day = daysInNextMonth;
    }
    return new Date(this.getFullYear(), this.getMonth() + 1, day, this.getHours(), this.getMinutes(), this.getSeconds());
};

/****************************
*
*    减一月
*   
*****************************/
Date.prototype.subMonth = function () {
    var m = this.getMonth();
    if (m == 0) return new Date(this.getFullYear() - 1, 12, this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds());
    var day = this.getDate();
    var daysInPreviousMonth = Date.daysInMonth(this.getFullYear(), this.getMonth());
    if (day > daysInPreviousMonth) {
        day = daysInPreviousMonth;
    }
    return new Date(this.getFullYear(), this.getMonth() - 1, day, this.getHours(), this.getMinutes(), this.getSeconds());
};

/****************************
*
*     增加月。负数也可
*   
*****************************/
Date.prototype.addMonths = function (addMonth) {
    var result = false;
    if (addMonth > 0) {
        while (addMonth > 0) {
            result = this.addMonth();
            addMonth--;
        }
    } else if (addMonth < 0) {
        while (addMonth < 0) {
            result = this.subMonth();
            addMonth++;
        }
    } else {
        result = this;
    }
    return result;
};

/****************************
*
*     增加年。负数也可
*   
*****************************/
Date.prototype.addYears = function (year) {
    return new Date(this.getFullYear() + year, this.getMonth(), this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds());
};

/**********************************
*
* 比较两个日期
* 前一个日期大于后一个日期则返回 1;
* 前一个日期等于后一个日期则返回 0;
* 前一个日期小于后一个日期则返回-1; 
* 
***********************************/
Date.compare = function (date1, date2) {
    var millisecond1 = date1.getTime();
    var millisecond2 = date2.getTime();
    if (millisecond1 > millisecond2)
        return 1;
    else if (millisecond1 == millisecond2)
        return 0;
    else if (millisecond1 < millisecond2)
        return -1;
    else
        return null;
}

/**********************************
*
* 比较两个日期
* 前一个日期大于后一个日期则返回 1;
* 前一个日期等于后一个日期则返回 0;
* 前一个日期小于后一个日期则返回-1; 
* 
***********************************/
Date.prototype.compareTo = function (date) {
    var millisecond1 = this.getTime();
    var millisecond2 = date.getTime();
    if (millisecond1 > millisecond2)
        return 1;
    else if (millisecond1 == millisecond2)
        return 0;
    else if (millisecond1 < millisecond2)
        return -1;
    else
        return null;
}

DateFormat = function (date, type) {
    var dateFormat = "";
    var dateSplit = date.split("T");

    switch (type) {
        case "0": dateFormat = dateSplit[0];
            break;
        case "1": dateFormat = dateSplit[0].replace(/-/g, "/");
            break;
        case "2": var arrDate = dateSplit[0].split("-");
            dateFormat = arrDate[0] + "年" + arrDate[1] + "月" + arrDate[2] + "日";
            break;
        case "3":
            if (dateSplit[1].indexOf(".") != -1) {
                dateFormat = dateSplit[0] + " " + dateSplit[1].split(".")[0];
            }
            else if (dateSplit[1].indexOf("+") != -1) {
                dateFormat = dateSplit[0] + " " + dateSplit[1].split("+")[0];
            }
            break;
    }

    return dateFormat;
}
/* --------------------------- URL --------------------------------------- */
//得到URL参数集合
RfSoft.Common.GetUrlParam = function (url) {
    //如果URL为空或不带参数则直接返回null  
    url = (url || "").replace(/\?+/g, "?").replace(/[\s\#\?\&]+$/g, "");
    if (url.indexOf("?") == -1) {
        return null;
    }

    var argsUrl = url.split("?")[1];

    if (argsUrl.indexOf("=") == -1) {
        return null;
    }
    var result = {};
    var arrParams = argsUrl.split('&');
    for (var i = 0; i < arrParams.length; i++) {
        var pos = arrParams[i].indexOf("=");
        if (pos <= 0) continue;
        var paramName = arrParams[i].substr(0, pos);
        var paramValue = arrParams[i].substr(pos + 1);
        result[paramName] = paramValue;
    }

    return result;
}

RfSoft.Common.QueryString = function (name) {
    return RfSoft.Common.GetUrlParamValue(window.location.href, name);
}
//得到URL指定参数的值
RfSoft.Common.GetUrlParamValue = function (url, paramName) {
    if (typeof paramName == "undefined") return null;
    var queryString = RfSoft.Common.GetUrlParam(url);
    if (!queryString) return null;
    for (var key in queryString) {
        if (key.toLowerCase() == paramName.toLowerCase()) {
            return queryString[key];
        }
    }
    return null;
}


//URL参数值替换
RfSoft.Common.UpdateUrlParameter = function (url, p_name, p_value) {
    var u = url.split('?')[0];
    var ps = url.split('?')[1].split('&');
    var n;
    for (var i = 0; i < ps.length; i++) {
        n = ps[i].split('=')[0];
        if (n.toLowerCase() == p_name.toLowerCase()) {
            ps[i] = p_name + "=" + p_value;
            break;
        }
    }
    u = u + "?";
    for (var i = 0; i < ps.length; i++)
        u += ps[i] + "&"

    if (u.lastIndexOf("&") == u.length - 1) 
        u = u.substring(0, u.length - 1);

    return u;
}



/* --------------------------- UI --------------------------------------- */
//页面高度的控制
RfSoft.Common.FindDimensions = function () //函数：获取尺寸
{
    var winWidth = 0;
    var winHeight = 0;
    //获取窗口宽度
    if (window.innerWidth)
        winWidth = window.innerWidth;
    else if ((document.body) && (document.body.clientWidth))
        winWidth = document.body.clientWidth;
    //获取窗口高度
    if (window.innerHeight)
        winHeight = window.innerHeight;
    else if ((document.body) && (document.body.clientHeight))
        winHeight = document.body.clientHeight;
    //通过深入Document内部对body进行检测，获取窗口大小
    if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
        winHeight = document.documentElement.clientHeight;
        winWidth = document.documentElement.clientWidth;
    }
    //结果输出
    var results = new Array(2);
    results[0] = winHeight;
    results[1] = winWidth;
    return results;
}

//ymPrompt对话框
var ymPrompt;
RfSoft.Common.InitPrompt = function () {
    if (ymPrompt) return;
    eval(function (B, D, A, G, E, F) { function C(A) { return A < 62 ? String.fromCharCode(A += A < 26 ? 65 : A < 52 ? 71 : -4) : A < 63 ? '_' : A < 64 ? '$' : C(A >> 6) + C(A & 63) } while (A > 0) E[C(G--)] = D[--A]; return B.replace(/[\w\$]+/g, function (A) { return E[A] == F[A] ? A : E[A] }) } ('(z(){O(v.0)n;U CX=z(N){n CS CR("DD","n Do.prototype.toString.D3(DD)==\'[Cr "+N+"]\'")},Bl=CX("Array"),Bs=CX("Do");v.0={version:"EB.I",pubDate:"2009-03-02",k:z(B,M,N){O(N)0.k(B,N);O(B&&M&&Bs(M))Z(U A BZ M)B[A]=M[A];n B},B1:[]};U Cw=["CF","f"],BK={},H;BX(H=Cw.BB())0[H]=CK("I,z(){BK."+H+"?BK."+H+".g(9):(BK."+H+"=[9])}");U BE=!+"\\v1",BT=2.compatMode=="CSS1Compat",BD=BE&&/MSIE (\\C$)\\./.Ce(navigator.userAgent)&&6(RegExp.$1)<EC,Br=!BE||(!BD&&BT),N=z(N){n 2.getElementById(N)},Bn=z(N){n 6(N.h.u)||N.Bt},3=(z(){n CS CR("BI","S","X","X=X||2;"+(v.Cg?"X.Cg(\'Dg\'+BI,S)":"X.addEventListener(BI,S,i)")+";0.B1.g([BI,S,X])")})(),$=(z(){n CS CR("BI","S","X","X=X||2;"+(v.Cg?"X.$(\'Dg\'+BI,S)":"X.removeEventListener(BI,S,i)"))})(),1=z(A,B,N){O(!A)n;O(Bs(B)){Z(U C BZ B)1(A,C,B[C]);n}O(Bl(A)||/htmlcollection|nodelist/Bd.Ce(""+A)){Z(C=A.s-J;C>=I;C--)1(A[C],B,N);n}Bq{A.h[B]=N}Bz(M){}},5=I,4,DB=I,Cq=z(E,M,D,N){O(!E)n;O(Bl(E)){U B,A=[],C={Bm:[m.Dk,"ok"],Di:[m.Dp,"cancel"]};BX(E.s)(B=E.BB())&&A[A.g(Cq.k(d,C[B]||B))-J]||A.pop();n A}N=N||"ymPrompt_btn_"+DB++;D=D==Ca?"Ca":!!D;n{Q:N,Da:"<DP type=\'button\' Q=\'"+N+"\' onclick=\'0.Cc(\\""+M+"\\","+D+")\' h=\'Db:pointer\' j=\'btnStyle Cd\' value=\'"+E+"\' />"}},DZ=z(N){O(!N)n 4="";O(!Bl(N))N=[N];O(!N.s)n 4="";4=N.CG();U M=[];BX(N.s)M.g(N.BB().Da);n M.DF("&Dj;&Dj;")},Cb={B4:"\\u5185\\u5bb9",l:300,u:185,BO:"\\u6807\\u9898",Cd:z(){},Dw:"#DX",Cp:I.J,r:i,BV:"",BG:d,Dd:a,B0:a,D9:i,CU:a,CL:a,DQ:"CQ",C_:I.ED,closeBtn:a,B$:i,BQ:i,Bo:{Ch:I.L,Cj:50},closeTxt:"\\DO\\Ds",Dk:" \\u786e \\u5b9a ",Dp:" \\u53d6 \\u6d88 ",DY:"P-content",minBtn:i,minTxt:"\\B7\\Dv\\B6",Dx:i,maxTxt:"\\B7\\De\\B6",DG:i,C0:i},m={};(z(){U o=2.Bv,CB=9.CB;O(!o||typeof o!="Cr")n 3("load",CB,v);O(BE&&2.Dr!="DV")n 3("readystatechange",z(){2.Dr=="DV"&&CB()});o=BT?2.documentElement:o;U CH=2.C8("CH").s;O(!BE&&CH)n;U Bk=z(){n m.B0&&Br?[I,I]:[o.DJ,o.D5]},B_=z(){U N=Bk();0.k(BC,{C4:6(p.h.c)-N[I],C5:6(p.h.Y)-N[J]})},CO="BF:BM;Y:I;c:I;w:b;DM-align:center",T=2.createElement("T");T.8=["<T Q=\'BL\' h=\'"+CO+";Bf-Bi:Dm;\'></T>",BD?("<r Q=\'DA\' Cl=\'D7:i\' h=\'"+CO+";Bf-Bi:9999;BJ:B3(x=I);x:I\'></r>"):"","<T Q=\'P-v\' h=\'BF:BM;Bf-Bi:10001;w:b\'>",BD?"<r Cl=\'D7:i\' h=\'l:BH%;u:BH%;BF:BM;Y:I;c:I;Bf-Bi:-J\'></r>":"","<T j=\'P-CV\' Q=\'P-CV\'><T j=\'P-tr\'><T j=\'P-DL\' h=\'Db:move;\'><T j=\'P-C2-DM\'></T><T j=\'P-C2-tools\'>","<T j=\'DE\' BO=\'\\B7\\Dv\\B6\'><BW>I</BW></T>","<T j=\'Dt\' BO=\'\\B7\\De\\B6\'><BW>J</BW></T>","<T j=\'ymPrompt_close\' BO=\'\\DO\\Ds\'><BW>DI</BW></T>","</T></T></T></T>","<T j=\'P-B9\' Q=\'P-B9\'><T j=\'P-Dq\'><T j=\'P-mc\'><T j=\'P-Bv\' h=\'BF:relative\'></T></T></T></T>","<T j=\'P-B9\' Q=\'P-Dh\'><T j=\'P-Dq\'><T j=\'P-BG\'></T></T></T>","<T j=\'P-CY\' Q=\'P-CY\'><T j=\'P-br\'><T j=\'P-bc\'></T></T></T>","</T>",BE?"<T Q=\'P-Df\' h=\'BF:BM;Bf-Bi:Dm;CT:#808080;BJ:B3(x=80) progid:DXImageTransform.Microsoft.Blur(pixelradius=K);w:b\'></T>":""].DF("");2.Bv.appendChild(T);U BL=N("BL"),p=N("P-v"),Be=N("P-Df"),BS,CC=N("P-CV"),BA=CC._._,CE=BA._,Ba=CE.CZ,y=N("P-B9")._._._,Bu=N("P-Dh"),Dc=Bu._._,DK=N("P-CY"),Bj=[BL];BD&&Bj.g(N("DA"));U q=Ba.childNodes,BC={},7="Bh",Bw=[I,I],CA=z(){U N=Bk();Bw=[6(p.h.c)-N[I],6(p.h.Y)-N[J]]},CP=z(){CA();7="V";q[J]._.8="K";q[J].BN="DC";BY(o.Bx,o.Bg,[I,I])},Cm=z(){CA();7="W";q[I]._.8="K";q[I].BN="DC";BY(I,Bn(CC),Bw)},Bp=z(N){!N&&7=="W"&&CA();7="Bh";q[I]._.8="I";q[J]._.8="J";q[I].BN="DE";q[J].BN="Dt";BY.k(this,N?[]:[I,I,Bw])},V,W;3("Ck",W=z(){7!="Bh"?Bp():Cm()},q[I]);3("Ck",V=z(){7!="Bh"?Bp():CP()},q[J]);3("dblclick",z(N){m.Dx&&(N.Cs||N.Ct).DU!=Ba&&V()},BA);3("Ck",z(){0.Cc("CW")},q[K]);U CD=z(){n[e.V(o.scrollWidth,o.Bx),e.V(o.scrollHeight,o.Bg)]},Cv=CD(),t=BA.C6&&BA,BR=z(N){!CH&&1(p,N==J&&BT?{BJ:"",x:""}:{BJ:"Dn(x="+N*BH+")",x:N})},CI=z(A){U M=BC.D0+A.C1,C=BC.D1+A.Cz;O(!m.D9){U D=Bk(),N=D[I],B=D[J];M=e.W(e.V(M,N),o.Bx-p.Cu+N);C=e.W(e.V(C,B),o.Bg-p.Bt+B)}Cy O(m.CL&&""+Cv!=""+CD())B8(a);1(BS,{c:M+"R",Y:C+"R"})},Bb=z(){BR(J);$("C9",CI,t);$("DR",Bb,t);B_();m.r&&1(BU().CZ,"w","b");t&&($("DH",Bb,t),t.releaseCapture())};3("mousedown",z(M){O((M.Cs||M.Ct).DU==Ba)n i;BR(m.C_);0.k(BC,{D0:6(p.h.c)-M.C1,D1:6(p.h.Y)-M.Cz});3("C9",CI,t);3("DR",Bb,t);O(m.r){U A={w:""},N=BU();BT&&BD&&0.k(A,{l:N.Cu,u:N.Bt});1(N.CZ,A)}t&&(3("DH",Bb,t),t.C6())},BA);U DS=z(){1(p,{c:BC.C4+o.DJ+"R",Y:BC.C5+o.D5+"R"})},D2=z(A){U M=A.DT;O(M==27)B2();O(4){U C=4.s,B;2.Dy&&2.Dy.Q!=4[5].Q&&(B=a);O(M==C3||M==39)B&&(5=-J),N(4[++5==C?(--5):5].Q).Cf();O(M==37)B&&(5=C),N(4[--5<I?(++5):5].Q).Cf();O(M==C7)n a}n Bc(A,(M>110&&M<123)||M==C3||M==C7)},Bc=z(A,M){A=A||event;O(!M&&/DP|select|textarea/Bd.Ce((A.Cs||A.Ct).tagName))n a;Bq{A.returnValue=i;A.DT=I}Bz(N){A.Du&&A.Du()}n i};BL.DW=Bc;U B8=z(N){1(Bj,"w","b");U A=CD(),M=z(){1(Bj,{l:A[I]+"R",u:A[J]+"R",w:""})};BE?N===a?M():setTimeout(M,I):M();7=="W"?Cm():7=="V"?CP():BY()},B5=z(N){O(!m.CL)n;(N===i?$:3)("resize",B8,v);O(N===i)n 1(Bj,"w","b");1(BL,{CT:m.Dw,BJ:"Dn(x="+m.Cp*BH+")",x:m.Cp});B8(a)},Dz=z(G){G=Bl(G)&&G.s==K?(G[I]+"+{K},{L}+"+G[J]):(CN[G]||CN["CQ"]);U Cx=[o.Bx-p.Cu,o.Bg-p.Bt].CG(Bk()),Ci=G.replace(/\\{(\\C$)\\}/D$,z(M,N){n Cx[N]}).split(",");n[CK(Ci[I]),CK(Ci[J])]},CN={CQ:"{I}/K+{K},{J}/K+{L}",EA:"{K},{J}/K+{L}",DI:"{I}+{K},{J}/K+{L}",H:"{I}/K+{K},{L}",D_:"{I}/K,{J}+{L}",lt:"{K},{L}",lb:"{K},{J}+{L}",rb:"{I}+{K},{J}+{L}",rt:"{I}+{K},{L}"},BY=z(N,M,A){O(p.h.w=="b")n;M=6(M)||m.u;N=6(N)||m.l;1(BS,{l:N+"R",u:M+"R",c:I,Y:I});A=Dz(A||m.DQ);1(BS,{Y:A[J]+"R",c:A[I]+"R"});B_();1(y,"u",M-Bn(CC)-Bn(Bu)-Bn(DK)+"R");BT&&BD&&m.r&&1(BU(),{u:y.Bg})},By=[],BP=[],Co=z(A){U CM=A===i?$:3;CM("scroll",m.B0&&!Br?DS:B_,v);1(BS,"BF",m.B0&&Br?"fixed":"BM");CM("keydown",D2);O(A===i){1(Be,"w","b");U C=z(){1(p,"w","b");1(By,"CJ","visible");By=[];BP.BB();O(BP.s)0.f.k(d,BP[I].CG(a))},M=z(){U A=J,M=z(){A=e.V(A-m.Bo.Ch,I);BR(A);O(A==I){B5(i);C();D4(N)}};M();U N=D6(M,m.Bo.Cj)};m.BQ?M():C();n}Z(U D=2.C8("Cr"),F=D.s-J;F>-J;F--)D[F].h.CJ!="D8"&&By.g(D[F])&&(D[F].h.CJ="D8");1([CE,Ba],"w",(m.CU?"":"b"));BA.BN="P-DL"+(m.CU?"":" P-ttc");CE.8=m.BO;Z(U F=I,B=["W","V","CW"];F<L;F++){q[F].h.w=m[B[F]+"Btn"]?"":"b";q[F].BO=m[B[F]+"Txt"]}U E="BF:BM;l:BH%;u:BH%;Y:I;c:I;x:J;BJ:B3(x=BH)";y.8=!m.r?("<T j=\\""+m.DY+"\\">"+m.B4+"</T>"):"<r h=\'"+E+"\' border=\'I\' frameborder=\'I\' Cl=\'"+m.B4+"\'></r><T h=\'"+E+";CT:#DX;x:I.J;BJ:B3(x=10);w:b\'></T>";(z(M,A){Z(U B BZ A){Bq{M[B]=A[B]}Bz(N){}}})(y._,m.r);y.BN="P-Bv "+m.BV;1(Bu,"w",((Dc.8=DZ(Cq(m.BG)))?"":"b"));!m.BQ&&m.B$&&1(Be,"w","");1(p,"w","");Bp(a);BR(m.BQ?I:J);m.BQ&&(z(){U A=I,N=z(){A=e.W(A+m.Bo.Ch,J);BR(A);O(A==J){D4(M);m.B$&&1(Be,"w","")}};N();U M=D6(N,m.Bo.Cj)})();4&&N(4[5=I].Q).Cf();p.onselectstart=m.DG?d:Bc;p.DW=m.C0?d:Bc},DN=z(){BS=[p].CG(m.B$?Be:"");B5();Co()},B2=z(){!m.BQ&&B5(i);Co(i)},BU=z(){n m.r?y._:d};0.k(0,{CW:B2,V:V,W:W,Bh:Bp,BU:BU,f:z(M,N,C){O(!C&&BP.g([M,N])&&BP.s>J)n;U A=[].slice.D3(M,I),B={},D=-J;O(!Bs(A[I])){Z(U E BZ Cb)O(A[++D])B[E]=A[D]}Cy B=A[I];0.k(m,0.k({},B,N),0.CF());Z(E BZ m)m[E]=m[E]!=d?m[E]:0.Cn[E];DN()},Cc:z(N,B,A){O(B==Ca?m.Dd:B)B2();Bq{(m.Cd)(N)}Bz(M){Dl(M.B4)}},resizeWin:BY,CF:z(N){n 0.Cn=0.k({},N,0.k({},0.Cn,Cb))},getButtons:z(){U A=4||[],M,B=[];BX(M=A.BB())B.g(N(M.Q));n B}});0.CF();U H;Z(U Bd BZ BK)BX(H=BK[Bd].BB())0[Bd].k(d,H);3("unload",z(){BX(0.B1.s)$.k(d,0.B1.BB())},v)})()})();0.k(0,{Dl:z(){0.f(9,{BV:"ymPrompt_alert",BG:["Bm"]})},succeedInfo:z(){0.f(9,{BV:"ymPrompt_succeed",BG:["Bm"]})},errorInfo:z(){0.f(9,{BV:"ymPrompt_error",BG:["Bm"]})},confirmInfo:z(){0.f(9,{BV:"ymPrompt_confirm",BG:["Bm","Di"]})},win:z(){0.f(9)}})', 'G|f|t|0|1|2|3|_|$|if|ym|id|px|fn|div|var|max|min|obj|top|for|true|none|left|null|Math|show|push|style|false|class|apply|width|curCfg|return|rootEl|ym_win|ym_ico|iframe|length|bindEl|height|window|display|opacity|ym_body|function|ymPrompt|setStyle|document|addEvent|btnCache|btnIndex|parseInt|cur_state|innerHTML|arguments|firstChild|detachEvent|ym_head|shift|dragVar|IE6|isIE|position|btn|100|env|filter|_initFn|maskLevel|absolute|className|title|cacheWin|useSlide|filterWin|ym_wins|isCompat|getPage|icoCls|strong|while|setWinSize|in|ym_hTool|uEvent|keyEvent|i|ym_shadow|z|clientHeight|normal|index|maskEl|getScrollPos|isArray|OK|$height|slideCfg|doNormal|try|useFixed|isObj|offsetHeight|ym_btn|body|cur_cord|clientWidth|_obj|catch|fixPosition|eventList|destroy|alpha|message|maskVisible|u5316|u6700|resizeMask|ml|saveWinInfo|showShadow|cal_cord|callee|ym_headbox|getWinSize|ym_hText|setDefaultCfg|concat|frameset|mEvent|visibility|eval|showMask|F|posMap|maskStyle|doMax|c|Function|new|background|titleBar|tl|close|objType|bl|nextSibling|undefined|dftCfg|doHandler|handler|test|focus|attachEvent|increment|arr|interval|click|src|doMin|cfg|winVisible|maskAlpha|mkBtn|object|srcElement|target|offsetWidth|winSize|initFn|pos|else|clientY|allowRightMenu|clientX|header|9|_offX|_offY|setCapture|13|getElementsByTagName|mousemove|winAlpha|d|maskIframe|seed|ymPrompt_normal|o|ymPrompt_min|join|allowSelect|losecapture|r|scrollLeft|ym_bottom|tc|text|init|u5173|input|winPos|mouseup|scrollEvent|keyCode|parentNode|complete|oncontextmenu|000|msgCls|joinBtn|html|cursor|ym_btnContent|autoClose|u5927|shadow|on|btnl|CANCEL|nbsp|okTxt|alert|10000|Alpha|Object|cancelTxt|mr|readyState|u95ed|ymPrompt_max|preventDefault|u5c0f|maskAlphaColor|maxBtn|activeElement|getPos|offX|offY|keydownEvent|call|clearInterval|scrollTop|setInterval|javascript|hidden|dragOut|b|g|l|4|7|8'.split('|'), 255, 259, {}, {}))
}


/* --------------------------- hotkey --------------------------------------- */

/* --------------------------- other --------------------------------------- */
// JS对象解析器 
//  使用方法 JsObjectParser.showMembers(object);
JsObjectParser = {
    dataSource: null,
    infoPanlzIndex: 1000,
    showMembers: function (obj) {
        var showWin;
        var jsObj_s = "<script>var JsObjectParser = opener.JsObjectParser;<\/script>";
        showWin = open("");
        this.dataSource = obj;
        showWin.document.write(jsObj_s);

        showWin.document.write(this.getMembersHTML(this.dataSource, "JsObjectParser.dataSource"));
    },
    getMembersHTML: function (data, source_s) {
        var s = "<div style='background:#5484A8;padding:1px;'><table style='width:100%;font-size:12px;background:#CCDDE9;color:#4B6070;BORDER-COLLAPSE: collapse;' border='1' cellpadding='1' cellspacing='0' borderColor='#5484A8' ><tr style='background:#5484A8;color:#ffffff;'><td>成员名称</td><td>成员值</td><td>类型</td></tr>";
        try {
            for (var p in data) {
                var _type = typeof data[p];
                var _name = p;
                var _value = data[p];

                if (_type == "object") {
                    var evt = "";
                    if (_value != null) {
                        evt = "style='cursor:hand;color:#ff9933' onclick=\"JsObjectParser.showObjectInfo('" + source_s + "','" + _name + "',this)\"";
                    }
                    s += "<tr><td>" + _name + "</td><td " + evt + " >" + _value + "</td><td>" + _type + "</td></tr>";

                }
                else {
                    s += "<tr><td>" + _name + "</td><td>" + _value + "</td><td>" + _type + "</td></tr>";
                }
            }
        }
        catch (e) {
            return "";
        }
        s += "</table></div>";
        return s;
    },
    showObjectInfo: function (source_s, name_s, el) {
        el.ownerDocument.parentWindow.event.cancelBubble = true;
        var divs = el.getElementsByTagName("DIV");
        if (divs)
            for (var i = 0; i < divs.length; i++) {
                if (divs[i].isInfoPanel)
                    divs[i].parentElement.removeChild(divs[i]);
            }
        var doc = el.ownerDocument;
        var obj;

        if (!isNaN(name_s) && name_s.length > 0)
            source_s = source_s + "[" + name_s + "]";
        else
            source_s = source_s + "." + name_s;

        obj = eval(source_s);
        var opanl = doc.createElement("DIV");
        opanl.isInfoPanel = true;
        var _title = source_s.replace("JsObjectParser.dataSource", "obj");
        var s_close = "<div style='cursor:hand;background:#5484A8;color:#D0EBFF;padding-left:3px;' onclick='JsObjectParser.hideObjectInfo(this.parentElement)' title='" + _title + "'><nobr>" + _title + "</nobr></div>";
        var _html = this.getMembersHTML(obj, source_s);
        if (_html)
            opanl.innerHTML = s_close + _html;
        el.appendChild(opanl);
        opanl.style.position = "absolute";

        JsObjectParser.infoPanlzIndex++;
        opanl.style.zIndex = JsObjectParser.infoPanlzIndex;
    },
    hideObjectInfo: function (el) {
        el.parentElement.removeChild(el);
    }
};

//传入code获取自动编码
RfSoft.Common.GetAutoCode = function (code) {
    var sendXml = "<Execute TagName='GetAutoCode' Code='" + code + "' />";
    var url = "/BaseSOA/GetAutoCode.aspx";

    //根据XML和url逻辑操作地址，调用方法得到自动编码
    var s = RfSoft.Common.XmlHttp.ExecuteXmlUrl(sendXml, url);
    return s;
}

//客户端解析枚举类型 如0代表女 1代表男 ParamEnum(val, "0:女,1:男")
RfSoft.Common.ParamEnum = function (val, enumstring) {
    var rvalue = null;
    var arrenums = enumstring.split(',');
    for (var i = 0; i < arrenums.length; i++) {
        if (val.toString().toLowerCase() == $.trim(arrenums[i].split(':')[0]).toLowerCase()) {
            rvalue = arrenums[i].split(':')[1];
            break;
        }
    }
    return rvalue;
}

//设置容器的HTML 如果html包含脚本将重新激发脚本
RfSoft.Common.SetInnerHtml = function (container, html) {
    if (typeof container == "string") {
        container = document.getElementById(container);
    }
    var re = /<script[^>]*>[\s|\S]*?<\/script>/igm;
    var s_re = /<script(.|\n)*?>((.|\n|\r\n)*)?<\/script>/im;
    var ssrc_re = /src=("|').*?("|')/gi;

    var ss = html.match(re); //得到所有脚本标记                
    html = html.replace(re, ''); //清楚所有脚本标记
    container.innerHTML = html;

    //reignite script Dom
    var head = document.getElementsByTagName("head")[0];
    var s_all = [];
    if (ss) {
        for (var i = 0; i < ss.length; i++) {
            if (/ src=/gi.test(ss[i])) {
                var src = ss[i].match(ssrc_re)[0].replace(/src=/gi, '').replace(/("|')/gi, '');
                //脚本库JS不重复加载
                if (src.toLowerCase().indexOf("include/js/rfsoft.") != -1) {
                    if (eval("/src=('|\")*" + src.replace(/\//gi, '\\/') + "('|\")*/gi").test(head.innerHTML))
                        continue; //已引用就不再添加
                }

                $.ajax({
                    url: src,
                    async: false,
                    dataType: "script"
                });
            }
            else {
                var sss = ss[i];
                s_all.push(sss.match(s_re)[2]);
            }
        }

        setTimeout(function () {
            var scon = s_all.join('').replace(/\r/gm, '').replace(/\n/gm, '');
            if (scon != "") 
                window.execScript ? window.execScript(scon) : eval(scon);            
        }, 0);
    }
}

//引用JS文件
RfSoft.Common.IncludeScript = function (strScript) {
    var head = document.getElementsByTagName("head")[0];
    if (eval("/src=('|\")*" + strScript.replace(/\//gi, '\\/') + "('|\")*/gi").test(head.innerHTML)) {
        return; //已引用就不再添加
    }
    var a = document.createElement("script");
    a.type = "text/javascript";
    a.src = strScript;
    head.appendChild(a);
}

//创建GUID
RfSoft.Common.NewGuid = function () {
    var guid = "";
    for (var i = 1; i <= 32; i++) {
        var n = Math.floor(Math.random() * 16.0).toString(16);
        guid += n;
        if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
            guid += "-";
    }
    return guid.toUpperCase();
}

RfSoft.Common.HTMLEncode = function (text) {
    if (typeof (text) != "string")
        text = text.toString();

    text = text.replace(/&/gi, "&amp;")
    .replace(/"/gi, "&quot;")
    .replace(/</gi, "&lt;")
    .replace(/>/gi, "&gt;")
    //.replace(/ /gi, "&nbsp;")
    .replace(/\xa1/gi, "&iexcl;")
    .replace(/\xa2/gi, "&cent;")
    .replace(/\xa3/gi, "&pound;")
    .replace(/\xa9/gi, "&copy;");
    return text;
}

RfSoft.Common.HTMLDecode = function (text) {
    if (!text)
        return '';

    text = text.replace(/&(amp|#38);/gi, "&")
        .replace(/&(quot|#34);/gi, "\"")
        .replace(/&(lt|#60);/gi, "<")
        .replace(/&(gt|#62);/gi, ">")
    //.replace(/&(nbsp|#160);/gi, " ")
        .replace(/&(iexcl|#161);/gi, "\xa1")
        .replace(/&(cent|#162);/gi, "\xa2")
        .replace(/&(pound|#163);/gi, "\xa3")
        .replace(/&(copy|#169);/gi, "\xa9")

    return text;
}
/********************************************************************
*                                                                   *
*            用  途 ：                                              *
*            文  件 : RfSoft.MapleTr.WebControl.js                  *
*            时  间 :                                               *
*            创建人 : *****                                         *
*                                                                   *
********************************************************************/
RfSoft.NS.register('RfSoft.MapleTr.WebControl');
// 脚本入口，自动搜索
RfSoft.MapleTr.WebControl.AutoSearch = function (objID, dataTagName, txtSearch) {
    if (!document.getElementById(objID)) {
        alert("数据源无效,请核实");
        return;
    }

    var divSearch = document.getElementById("div" + txtSearch.id);
    if (divSearch) {
        divSearch.innerHTML = "";
        //记录上下键移动时选中的索引值。
        divSearch.moveindex = -1;
    } else {
        txtSearch.document.attachEvent("onclick", function () {
            divSearch.style.display = "none";
        });
        //设置搜索文本框的父级元素的position以确保divSearch的定位正确。
        if (txtSearch.parentElement) {
            $(txtSearch.parentElement).css("position", "relative");
        }
        //创建搜索提示下拉DIV。
        divSearch = document.createElement("div");
        divSearch.id = "div" + txtSearch.id;
        txtSearch.insertAdjacentElement("afterEnd", divSearch);

        divSearch.style.position = "absolute";
        //设置div背景色
        divSearch.style.background = "#FFFFFF";
        //设置div边框
        divSearch.style.border = "1px solid black";
        //记录上下键移动时选中的索引值。
        divSearch.moveindex = -1;

        txtSearch.document.attachEvent("onblur", function (e) {
            e = e || window.event;
            if (e.srcElement.id !== txtSearch.id) return;
            if (divSearch.style.display !== "none") {
                divSearch.focus();
            }
        });
        txtSearch.document.attachEvent("onkeydown", function (e) {
            e = e || window.event;
            if (e.srcElement.id !== txtSearch.id) return;
            if (!(e.keyCode == 40 || e.keyCode == 38)) return;
            if (divSearch.style.display == "none") return;
            var totalNum = $(divSearch).find("td").length;
            if (totalNum <= 0) return;
            //向下
            if (e.keyCode == 40) {
                divSearch.moveindex = divSearch.moveindex + 1;
                if (divSearch.moveindex >= totalNum) {
                    divSearch.moveindex = 0;
                }
            }
            //向上
            else if (e.keyCode == 38) {
                divSearch.moveindex = divSearch.moveindex - 1;
                if (divSearch.moveindex < 0) {
                    divSearch.moveindex = totalNum - 1;
                }
            }
            $(divSearch).find("td").css("background", "#FFFFFF");
            $(divSearch).find("td")[divSearch.moveindex].style.background = "#D2E0FF";
            //先把函数 RfSoft.MapleTr.WebControl.AutoSearch 放空，防止在改变 txtSearch.value 时 txtSearch 对其的调用。
            var tempAutoSearch = RfSoft.MapleTr.WebControl.AutoSearch;
            RfSoft.MapleTr.WebControl.AutoSearch = function () { };
            txtSearch.value = $(divSearch).find("td")[divSearch.moveindex].innerHTML;
            RfSoft.MapleTr.WebControl.AutoSearch = tempAutoSearch;
        });
        txtSearch.document.attachEvent("onkeyup", function (e) {
            e = e || window.event;
            if (e.srcElement.id !== txtSearch.id) return;
            if (e.keyCode == 13) {
                divSearch.style.display = "none";
            }
        });
    }

    //设置div隐藏
    divSearch.style.display = "none";
    if (txtSearch.value == "") {
        return;
    }

    //设置div位置
    divSearch.style.left = txtSearch.offsetLeft + "px";
    divSearch.style.top = (txtSearch.offsetHeight + txtSearch.offsetTop) + "px";

    //设置div宽度
    divSearch.style.width = txtSearch.offsetWidth;

    //设置div值
    RfSoft.MapleTr.WebControl.DataBinder(objID, dataTagName, txtSearch, divSearch);
}

RfSoft.MapleTr.WebControl.AutoSearch_List = function (objID, dataTagName, txtSearch, field) {
    if (!document.getElementById(objID)) {
        alert("数据源无效,请核实");
        return;
    }

    var divSearch = txtSearch.document.getElementById("div" + txtSearch.id);
    if (!divSearch) {
        txtSearch.document.attachEvent("onclick", function () {
            divSearch.style.display = "none";
        });
        divSearch = txtSearch.document.createElement("div");
        divSearch.id = "div" + txtSearch.id;
        //设置div边框
        divSearch.style.border = "1px solid black";
        //设置div位置
        divSearch.style.position = "absolute";
        //设置div背景色
        divSearch.style.background = "#FFFFFF";
        //记录上下键移动时选中的索引值。
        divSearch.moveindex = -1;

        txtSearch.document.body.appendChild(divSearch);

        txtSearch.document.attachEvent("onblur", function (e) {
            e = e || window.event;
            if (e.srcElement.id !== txtSearch.id) return;
            if (divSearch.style.display !== "none") {
                divSearch.focus();
            }
        });
        txtSearch.document.attachEvent("onkeydown", function (e) {
            e = e || window.event;
            if (e.srcElement.id !== txtSearch.id) return;
            if (!(e.keyCode == 40 || e.keyCode == 38)) return;
            if (divSearch.style.display === "none") return;
            var totalNum = $(divSearch).find("td").length;
            if (totalNum <= 0) return;
            //向下
            if (e.keyCode == 40) {
                divSearch.moveindex = divSearch.moveindex + 1;
                if (divSearch.moveindex >= totalNum) {
                    divSearch.moveindex = 0;
                }
            }
            //向上
            else if (e.keyCode == 38) {
                divSearch.moveindex = divSearch.moveindex - 1;
                if (divSearch.moveindex < 0) {
                    divSearch.moveindex = totalNum - 1;
                }
            }
            $(divSearch).find("td").css("background", "#FFFFFF");
            $(divSearch).find("td")[divSearch.moveindex].style.background = "#D2E0FF";
            //先把函数 RfSoft.MapleTr.WebControl.AutoSearch_List 放空，防止在改变 txtSearch.value 时 txtSearch 对其的调用。
            var tempAutoSearch = RfSoft.MapleTr.WebControl.AutoSearch_List;
            RfSoft.MapleTr.WebControl.AutoSearch_List = function () { };
            txtSearch.value = $(divSearch).find("td")[divSearch.moveindex].innerHTML;
            RfSoft.MapleTr.WebControl.AutoSearch_List = tempAutoSearch;
        });
        txtSearch.document.attachEvent("onkeyup", function (e) {
            e = e || window.event;
            if (e.srcElement.id !== txtSearch.id) return;
            if (e.keyCode == 13) {
                divSearch.style.display = "none";
            }
        });
    }
    //设置div隐藏
    divSearch.style.display = "none";

    if (txtSearch.value != "") {
        //设置div宽度
        divSearch.style.width = txtSearch.offsetWidth;
        //设置div位置
        divSearch.style.left = RfSoft.MapleTr.WebControl.realOffset(txtSearch).x + "px";
        divSearch.style.top = RfSoft.MapleTr.WebControl.realOffset(txtSearch).y + txtSearch.offsetHeight + "px";

        //设置div值
        RfSoft.MapleTr.WebControl.DataBinder_List(objID, dataTagName, txtSearch, divSearch, field);
        if ($(divSearch).find("td").length > 0) {
            divSearch.style.display = "";
        }
    }
}

//鼠标跟随-从数据库数据（效率可能存在问题） @@20120817 add
//参数：tableNfieldName 表名.字段名, searchObj 使用跟随的控件
RfSoft.MapleTr.WebControl.AutoSearch_List_Ex = function (tableNfieldName, searchObj) {
    if (searchObj && searchObj.value != "" && tableNfieldName != "") {
        if (indexOf(tableNfieldName, ".") > 0) {
            var arrTemp = tableNfieldName.split('.');
            RfSoft.MapleTr.WebControl.AutoSearch_List_Ex(arrTemp[0], arrTemp[1], searchObj);
        } else
            alert("表名与字段名不正确！");
    }
}
//鼠标跟随-从数据库数据（效率可能存在问题） @@20120817 add
//参数：tableName 表名；fieldName 字段名, searchObj 使用跟随的控件
RfSoft.MapleTr.WebControl.AutoSearch_List_Ex = function (tableName, fieldName, searchObj, sqlCondition) {
    var divSearch = searchObj.document.getElementById("div" + searchObj.id);
    if (!divSearch) {
        searchObj.document.attachEvent("onclick", function () {
            divSearch.style.display = "none";
        });
        divSearch = searchObj.document.createElement("div");
        divSearch.id = "div" + searchObj.id;
        //设置div边框
        divSearch.style.border = "1px solid black";
        //设置div位置
        divSearch.style.position = "absolute";
        //设置div背景色
        divSearch.style.background = "#FFFFFF";
        //记录上下键移动时选中的索引值。
        divSearch.moveindex = -1;
        divSearch.attachEvent("onblur", function (e) {
            //设置div隐藏
            divSearch.style.display = "none";
        });

        searchObj.document.body.appendChild(divSearch);

        searchObj.document.attachEvent("onkeydown", function (e) {
            e = e || window.event;
            if (e.srcElement.id === searchObj.id) return;
            if (divSearch.style.display !== "none") {
                divSearch.focus();
            }
        });
        searchObj.document.attachEvent("onkeydown", function (e) {
            e = e || window.event;
            if (e.srcElement.id !== searchObj.id) return;
            if (e.keyCode == 13) {
                divSearch.style.display = "none";
            }
        });
        searchObj.document.attachEvent("onkeydown", function (e) {
            e = e || window.event;
            if (e.srcElement.id !== searchObj.id) return;
            if (!(e.keyCode == 40 || e.keyCode == 38)) return;
            if (divSearch.style.display === "none") return;
            var totalNum = $(divSearch).find("td").length;
            if (totalNum <= 0) return;
            //向下
            if (e.keyCode == 40) {
                divSearch.moveindex = divSearch.moveindex + 1;
                if (divSearch.moveindex >= totalNum) {
                    divSearch.moveindex = 0;
                }
            }
            //向上
            else if (e.keyCode == 38) {
                divSearch.moveindex = divSearch.moveindex - 1;
                if (divSearch.moveindex < 0) {
                    divSearch.moveindex = totalNum - 1;
                }
            }
            $(divSearch).find("td").css("background", "#FFFFFF");
            $(divSearch).find("td")[divSearch.moveindex].style.background = "#D2E0FF";
            //先把函数 RfSoft.MapleTr.WebControl.AutoSearch_List_Ex 放空，防止在改变 searchObj.value 时 searchObj 对其的调用。
            var tempAutoSearch = RfSoft.MapleTr.WebControl.AutoSearch_List_Ex;
            RfSoft.MapleTr.WebControl.AutoSearch_List_Ex = function () { };
            searchObj.value = $(divSearch).find("td")[divSearch.moveindex].innerText;
            RfSoft.MapleTr.WebControl.AutoSearch_List_Ex = tempAutoSearch;
        });
    }
    //设置div隐藏
    divSearch.style.display = "none";

    if (tableName != "" && fieldName != "" && searchObj.value != "") {
        //设置div宽度。
        divSearch.style.width = searchObj.offsetWidth;
        //设置div的位置。
        divSearch.style.left = RfSoft.MapleTr.WebControl.realOffset(searchObj).x + "px";
        divSearch.style.top = RfSoft.MapleTr.WebControl.realOffset(searchObj).y + searchObj.offsetHeight + "px";
        //记录上下键移动时选中的索引值。
        divSearch.moveindex = -1;

        var val = searchObj.value.trim();
        sqlCondition = (sqlCondition || "").replace(/^\s*((where)|(and)|(or))*\s+/i, "");
        //搜索数据
        //其中SQL为操作的字符串，rtype设置返回类型M属性型，V值类型，默认为M类型
        var sendXml = "<Send SQL=\"select * from (select distinct " + fieldName + " AUTOFIELD from " + tableName + " where " + (sqlCondition || "1=1") + " and instr(upper(" + fieldName + ") , upper('" + val + "'))>0 order by instr(upper(" + fieldName + ") , upper('" + val + "'))," + fieldName + ") Where rownum &lt;9\" rtype='M' />"
        var retXml = RfSoft.Common.XmlHttp.GetSQLXML(sendXml);
        var oXmlDoc = new ActiveXObject("MSXML2.DOMDocument");
        oXmlDoc.loadXML(retXml);
        var nodes = oXmlDoc.selectNodes("/NewDataSet/Table");

        var tableHTML = "<table width=\"100%\">";
        var checkSameValue = {};
        for (i = 0; i < nodes.length; i++)
            tableHTML += "<tr><td nowrap IsKeyWordContainer=\"true\" divSearchId=\"" + divSearch.id + "\" searchObjId=\"" + searchObj.id + "\" onmouseup=\"RfSoft.MapleTr.WebControl.DataSpanOnClick(this.divSearchId, this.searchObjId, this.innerText);\" onmouseover=\"RfSoft.MapleTr.WebControl.DataSpanOnMouseMove(this)\" onmouseout=\"RfSoft.MapleTr.WebControl.DataSpanOnMouseOut(this)\" >" + (nodes[i].getAttributeNode("AUTOFIELD").value || "").replace(/&/ig, "&amp;").replace(/</ig, "&lt;").replace(/>/ig, "&gt;").replace(/\s/ig, "&nbsp;") + "</td></tr>";
        tableHTML += "</table>";

        if (nodes.length > 0) {
            divSearch.style.display = "";
            divSearch.innerHTML = tableHTML;
        }
    }
}


//  清除DIV
RfSoft.MapleTr.WebControl.ClearDivSearch = function (txtSearch) {
    if (document.getElementById("div" + txtSearch.id)) {
        document.body.removeChild(document.getElementById("div" + txtSearch.id));
    }
}

//  计算div位置
RfSoft.MapleTr.WebControl.realOffset = function (txtSearch) {
    var x = y = 0;
    do {
        x += txtSearch.offsetLeft || 0;
        y += txtSearch.offsetTop || 0;
        txtSearch = txtSearch.offsetParent;
    }
    while (txtSearch);
    return { "x": x, "y": y };
}

//  绑定数据
RfSoft.MapleTr.WebControl.DataBinder = function (objID, dataTagName, txtSearch, divSearch) {
    var count_temp = 0;

    var spanArray = document.getElementById(objID).getElementsByTagName(dataTagName);

    var tableHTML = "<table width=\"100%\">";
    var checkSameValue = {};
    for (var i = 0; i < spanArray.length; i++) {
        if (spanArray[i].innerText.toLowerCase().indexOf(txtSearch.value.toLowerCase()) >= 0) {
            if (count_temp < 6) {
                if (checkSameValue[spanArray[i].innerText]) continue;
                checkSameValue[spanArray[i].innerText] = true;
                tableHTML += "<tr><td onclick=\"RfSoft.MapleTr.WebControl.DataSpanOnClick('" + divSearch.id + "', '" + txtSearch.id + "', '" + spanArray[i].innerText + "')\" onmouseover=\"RfSoft.MapleTr.WebControl.DataSpanOnMouseMove(this)\" onmouseout=\"RfSoft.MapleTr.WebControl.DataSpanOnMouseOut(this)\" nowrap >" + spanArray[i].innerText + "</td></tr>";
                count_temp++;
            }
            else
                break;
        }
    }

    tableHTML += "</table>";

    if (count_temp > 0) {
        divSearch.style.display = "";
        divSearch.innerHTML = tableHTML;
    }
}
RfSoft.MapleTr.WebControl.DataBinder_List = function (objID, dataTagName, txtSearch, divSearch, field) {
    var count_temp = 0;
    var search_content = document.getElementById(objID);
    var field_text = field.options[field.selectedIndex].text;
    var table = search_content.getElementsByTagName("table");
    var notRemove = -1;
    if (table.length > 0) {
        search_content = $(table[0]).clone();
        search_content.find("THEAD").find("tr").first().end().find("td").each(function (i, obj) {
            if (field_text.toUpperCase() == $(obj).text().toUpperCase()) {
                notRemove = i;
                return;
            }
        });
        search_content.find("THEAD").remove();
        search_content.find("TBODY").find("tr").each(function (i, obj) {
            $(obj).find("td").each(function (j, tdobj) {
                if (j != notRemove) {
                    $(tdobj).remove();
                }
            });
        });
        search_content = search_content[0];
    }
    var spanArray = search_content.getElementsByTagName(dataTagName);

    var tableHTML = "<table width=\"100%\">";
    var checkSameValue = {};
    for (var i = 0; i < spanArray.length; i++) {
        if (spanArray[i].innerText.toLowerCase().indexOf(txtSearch.value.toLowerCase()) >= 0) {
            if (count_temp < 6) {
                if (checkSameValue[spanArray[i].innerText]) continue;
                checkSameValue[spanArray[i].innerText] = true;
                tableHTML += "<tr><td onclick=\"RfSoft.MapleTr.WebControl.DataSpanOnClick('" + divSearch.id.replace(/\\/g, "\\\\") + "', '" + txtSearch.id.replace(/\\/g, "\\\\") + "', '" + spanArray[i].innerText.replace(/\\/g, "\\\\") + "')\" onmouseover=\"RfSoft.MapleTr.WebControl.DataSpanOnMouseMove(this)\" onmouseout=\"RfSoft.MapleTr.WebControl.DataSpanOnMouseOut(this)\" >" + spanArray[i].innerText + "</td></tr>";
                count_temp++;
            }
            else
                break;
        }
    }

    tableHTML += "</table>";

    if (count_temp > 0) {
        divSearch.style.display = "";
        divSearch.innerHTML = tableHTML;
    }
}

//  点击项
RfSoft.MapleTr.WebControl.DataSpanOnClick = function (divSearchID, txtSearchID, spanValue) {
    if (document.getElementById(txtSearchID)) document.getElementById(txtSearchID).value = spanValue;
    if (document.getElementById(divSearchID)) document.getElementById(divSearchID).style.display = "none";
    var search_id = txtSearchID.replace(/condition/g, 'search');
    if (document.getElementById(search_id)) {
        document.getElementById(search_id).click();
    }
}

//  鼠标移入项
RfSoft.MapleTr.WebControl.DataSpanOnMouseMove = function (span) {
    if (span.style.background == "" || span.style.background.toUpperCase() == "#FFFFFF") {
        span.style.background = "#D2E0F0";
    }
}

//  鼠标移除项
RfSoft.MapleTr.WebControl.DataSpanOnMouseOut = function (span) {
    if (span.style.background.toUpperCase() == "#D2E0F0") {
        span.style.background = "#FFFFFF";
    }
}
/********************************************************************
*                                                                   *
*            Usage ：Common Object Selection                                   *
*            文  件 : RfSoft.Common.js                              *
*            时  间 : 2010-12-28                                    *
*            创建人 : YokiYu                                         *
*                                                                   *
********************************************************************/
// 返回值：{ id: "", name: "", displayName: "" }
RfSoft.Common.COS = function () {
    this.initialize.apply(this, arguments);
}

RfSoft.Common.COS.prototype = {
    //关于参数配置的说明（请务必严格按照说明进行配置）：
    //multiSelected ：是否可多选，false为单选，true为多选，默认为false
    //displayedTabs : 要显示的tab页，必须至少配置一个tab页
    //tabID         : tab页的ID,其可选ID枚举如下
    //                          ---DBTable：数据建模（表）
    //                          ---DBView：数据建模（视图）
    //                          ---DBCTable：公用表
    //                          ---DBCView：公用视图
    //                          ---DBOTable：其他表
    //                          ---DBOView：其他视图
    //selectedItems : 该tab页上所选择中的条目
    //filter        ：该tab页上的列表过滤条件,如提供过滤条件，则这3个过滤条件必须同时提供
    //                  如果资源是基于整个站点的siteID不能为空，如果资源是基于业务的siteID可以为空
    initialize: function (parameter, config) {
        this.config = this.extend({ dialogHeight: 480, dialogWidth: 600, resizable: 0, scroll: 1, status: 0 }, config || {});
        this.parameter = this.extend({ multiSelected: false,
            displayedTabs: [
            { tabID: "DBTable", selectedItems: [], filter: { businessID: "", resourceType: "", siteID: ""} },
            { tabID: "DBView", selectedItems: [], filter: { businessID: "", resourceType: "", siteID: ""} },
            { tabID: "DBCTable", selectedItems: [], filter: { businessID: "", resourceType: "", siteID: ""} },
                { tabID: "DBCView", selectedItems: [], filter: { businessID: "", resourceType: "", siteID: ""} },
                { tabID: "DBOTable", selectedItems: [], filter: { businessID: "", resourceType: "", siteID: ""} },
                { tabID: "DBOView", selectedItems: [], filter: { businessID: "", resourceType: "", siteID: ""} }
        ]
        }, parameter || {});
        this.URL = "/BaseSOA/CommonObjectSelection.htm";
    },
    show: function () {
        var features = "dialogHeight:" + this.config.dialogHeight + "px;dialogWidth:"
        + this.config.dialogWidth + "px;resizable:" + this.config.resizable + ";scroll:"
        + this.config.scroll + ";status:" + this.config.status;
        return window.showModalDialog(this.URL, { win: window, parameter: this.parameter }, features);
    },
    extend: function (destination, source) {
        for (var property in source) {
            destination[property] = source[property];
        }
        return destination;
    }
}
//将xml数据转化为json数据
//author: heyawei
RfSoft.MapleTr.Common = {
    // converts xml documents and xml text to json object
    xml2json: function (xml, extended) {
        if (!xml) return {};
        function parseXML(node, simple) {
            if (!node) return null;
            var txt = '', obj = null, att = null;
            var nt = node.nodeType, nn = jsVar(node.localName || node.nodeName);
            var nv = node.text || node.nodeValue || '';
            if (node.childNodes) {
                if (node.childNodes.length > 0) {
                    $.each(node.childNodes, function (n, cn) {
                        var cnt = cn.nodeType, cnn = jsVar(cn.localName || cn.nodeName);
                        var cnv = cn.text || cn.nodeValue || '';
                        if (cnt == 8) {
                            return;
                        }
                        else if (cnt == 3 || cnt == 4 || !cnn) {
                            if (cnv.match(/^\s+$/)) {
                                return;
                            };
                            txt += cnv.replace(/^\s+/, '').replace(/\s+$/, '');
                        }
                        else {
                            obj = obj || {};
                            if (obj[cnn]) {
                                if (!obj[cnn].length) obj[cnn] = myArr(obj[cnn]);
                                obj[cnn][obj[cnn].length] = parseXML(cn, true);
                                obj[cnn].length = obj[cnn].length;
                            }
                            else {
                                obj[cnn] = parseXML(cn);
                            };
                        };
                    });
                };
            };
            if (node.attributes) {
                if (node.attributes.length > 0) {
                    att = {}; obj = obj || {};
                    $.each(node.attributes, function (a, at) {
                        var atn = jsVar(at.name), atv = at.value;
                        att[atn] = atv;
                        if (obj[atn]) {
                            if (!obj[atn].length) obj[atn] = myArr(obj[atn]);
                            obj[atn][obj[atn].length] = atv;
                            obj[atn].length = obj[atn].length;
                        }
                        else {
                            obj[atn] = atv;
                        };
                    });
                };
            };
            if (obj) {
                obj = $.extend((txt != '' ? new String(txt) : {}), obj || {});
                txt = (obj.text) ? (typeof (obj.text) == 'object' ? obj.text : [obj.text || '']).concat([txt]) : txt;
                if (txt) obj.text = txt;
                txt = '';
            };
            var out = obj || txt;
            if (extended) {
                if (txt) out = {};
                txt = out.text || txt || '';
                if (txt) out.text = txt;
                if (!simple) out = myArr(out);
            };
            return out;
        };
        var jsVar = function (s) { return String(s || '').replace(/-/g, "_"); };
        var isNum = function (s) { return (typeof s == "number") || String((s && typeof s == "string") ? s : '').test(/^((-)?([0-9]*)((\.{0,1})([0-9]+))?$)/); };
        var myArr = function (o) {
            if (!o.length) o = [o]; o.length = o.length;
            return o;
        };
        if (typeof xml == 'string') xml = XmlToJson.text2xml(xml);
        if (!xml.nodeType) return;
        if (xml.nodeType == 3 || xml.nodeType == 4) return xml.nodeValue;
        var root = (xml.nodeType == 9) ? xml.documentElement : xml;
        var out = parseXML(root, true);
        xml = null; root = null;
        return out;
    },
    text2xml: function (str) {
        var out;
        try {
            var xml = ($.browser.msie) ? new ActiveXObject("Microsoft.XMLDOM") : new DOMParser();
            xml.async = false;
        } catch (e) { throw new Error("XML Parser could not be instantiated") };
        try {
            if ($.browser.msie) out = (xml.loadXML(str)) ? xml : false;
            else out = xml.parseFromString(str, "text/xml");
        } catch (e) { throw new Error("Error parsing XML string") };
        return out;
    }
}
/********************************************************************
*                                                                   *
*            Usage ：RfSoft.Common.DownFile                         *
*            文  件 : RfSoft.Common.js                              *
*            时  间 : 2011-8-1                                      *
*            创建人 : liguisheng                                    *
*                                                                   *
********************************************************************/
//文件下载
//filename：   文件名  相对路径或者要保存的文件名
//content      要下载保存成文件的字符串
//downtype:    文件下载类型 tf Transmit方式下载文件,wf 流输出下载文件 fp 流输出分块下载文件 用于大型文件  bf 以流方式下载文件  默认tf文件下载
RfSoft.Common.DownFile = function (filepath, content, downtype, filename) {
    window.location.href("/Include/Controls/DownFileTool/DownFileHandler.ashx?filepath=" + encodeURIComponent(filepath) + "&filename=" + encodeURIComponent(filename) + "&downtype=" + encodeURIComponent(downtype) + "&content=" + encodeURIComponent(content));
    //    if (IsUse == 0) {
    //        //        return RfSoft.Common.XmlHttp.Request("POST", "/Include/Controls/DownFileTool/DownFileHandler.ashx?filename=" + encodeURI(filename) + "&downtype=" + encodeURI(downtype), "");
    //        var retstr = window.location.href("/Include/Controls/DownFileTool/DownFileHandler.ashx?filename=" + encodeURI(filename) + "&downtype=" + encodeURI(downtype));
    //        if (retstr == "true") {
    //            alert(retstr);
    //        }
    //    }
    //    else {
    //        return encodeURI(filename);
    //    }
}


///
//功能：弹出枚举选择层
//tagetObj:目标对象
//enumItems:枚举值集合 可以是对象数组[{key:'1',value:'男'}]，或者是xml 或者是xml字符串 xml格式
//selectedFunction:选择后指定的操作（函数）传递进去的参数是 选择的对象  如果该参数为空则默认操作
RfSoft.Common.ShowEnumSelDialog = function (targetObj, enumItems, selectedFunction, style) {

    //当document.isShowEnd == 1时 已经有一个div层已经弹出
    if (document.isShowEnd == 1) {
        return;
    }
    var dataArray = new Array();
    //如果xml字符串格式为<EnumList><EnumItem key="1" value="男" ></EnumItem></EnumList>
    if (enumItems.constructor == String) {
        var xml = RfSoft.Common.CreateXMLDOM();
        xml.loadXML(enumItems);
        enumNodeList = xml.selectNodes("/EnumList/EnumItem");
        dataArray.length = enumNodeList.length;
        for (var i = 0; enumNodeList.length; i++) {
            dataArray[enumNodeList[i].getAttribute("key")] = enumNodeList[i].getAttribute("value");
        }
        //对象数组格式[{key:'1',value:'男'}]
    } else if (enumItems.constructor == Array) {
        dataArray.length = enumItems.length;
        for (var i = 0; i < enumItems.length; i++) {
            dataArray[enumItems[i].key] = enumItems[i].value;
        }
    } else {
        enumNodeList = enumItems.selectNodes("/EnumList/EnumItem");
        dataArray.length = enumNodeList.length;
        for (var i = 0; enumNodeList.length; i++) {
            dataArray[enumNodeList[i].getAttribute("key")] = enumNodeList[i].getAttribute("value");
        }
    }
    if (dataArray.length == 0) {
        alert("枚举值数组不合法");
        return;
    }
    if (targetObj) {

        var height = targetObj.offsetHeight;
        var left = targetObj.offsetLeft;
        var top = targetObj.offsetTop;
        var width = 120;
        if (style) {
            height += (style.height ? style.height : 0);
            width = (style.width ? style.width : width);
            left += (style.left ? style.left : 0);
            top += (style.top ? style.top : 0);
        }
        var showDivObj = $("<div id=\"div_showEnumSelDialog\" style=\"position: absolute;z-index:1000; border: 1px solid #5aa8d9; width: " + width + "px;display: block; background-color: #f7fbff; border-top: 0px solid #5aa8d9\"></div>").appendTo($(targetObj).parent())[0];
        var dataTable = $("<table style=\"width:100%;height:100%;cursor:pointer \" ></table>");
        //根据数据填充table
        for (var item in dataArray) {
            var tr = $("<tr><td  value='" + item + "' align='left' onmouseover='this.style.backgroundColor=\"#FFEEC2\";' onmouseout='this.style.backgroundColor=\"\";' ><label style=\"margin-left:5px;\">" + dataArray[item] + "</label></td ></tr>")[0];
            $(tr).find("td").bind("click", function () {
                //如果没有指定操作则默认是targetObj的text为选择的value
                if (selectedFunction) {
                    eval(selectedFunction + "({key:'" + $(this).attr("value") + "',value:'" + $(this).text() + "'});");
                } else {
                    $(targetObj).attr("value", $(this).attr("value"));
                    $(targetObj).text($(this).text());
                }
            });
            $(tr).appendTo(dataTable);
        }
        $(showDivObj).append(dataTable);
        //计算div出现的位置
        showDivObj.style.left = left;
        showDivObj.style.top = top + height;
        //记录原来的click事件用于还原
        var tmpFun = document.onclick;
        //为当前文档添加click事件 在任何地方点击一次都使div消失
        document.onclick = function () {
            var showDiv = $("#div_showEnumSelDialog")[0];
            //isShowEnd为1表示已经有div弹出
            if (showDiv && document.isShowEnd == 1) {
                $(showDiv).hide();
                $(showDivObj).remove();
                document.isShowEnd = 0;
                document.onclick = tmpFun;
            } else {
                document.isShowEnd = 1;
            }
        }
    }
}
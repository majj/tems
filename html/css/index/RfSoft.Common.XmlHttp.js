RfSoft.NS.register('RfSoft.Common.XmlHttp');
/********************************************************************
*                                                                   *
*            用  途 ：XmlHttp请求                                    *
*            文  件 : RfSoft.Common.XmlHttp.js                     *
*            时  间 : 2010-11-23                                    *
*            创建人 :                                               *
*                                                                   *
********************************************************************/
//传入SQL获取XML的操作
//sendXml = "<Send SQL=\"select id,name,CASE WHEN id=classid then -1 else classid end as parent from item2_enum_part_subclass\" rtype='M' />"
//其中SQL为操作的字符串，rtype设置返回类型M属性型，V值类型，默认为M类型
RfSoft.Common.XmlHttp.GetSQLXML = function (sendXml) {
    var xmlHttp = this.Request("POST", "/BaseSOA/GetDataXml.aspx", sendXml);    
    return xmlHttp.responseText;
}

RfSoft.Common.XmlHttp.ExecuteUrl = function (url) {
    xmlHttp = this.Request("GET", url);
    return xmlHttp.responseText;
}

//传入XML进行逻辑处理的操作
//sendXml = "<Execute TagName='Test' rtype='M' />"
//url逻辑操作地址
RfSoft.Common.XmlHttp.ExecuteXmlUrl = function (sendXml, url) {
    xmlHttp = this.Request("POST", url, sendXml);
    return xmlHttp.responseText;
}


//封装XmlHttp请求支持POST,GET方法；同步与异步调用
//callback 参数为异步调用必传参数
//2010-11-16 zhu18 添加
RfSoft.Common.XmlHttp.Request = function (method, url, data, callback) {
    var bAsync = false;
    if (callback != undefined && callback != null) bAsync = true;
    var oXmlHttp = RfSoft.Common.XmlHttp.Create();
    oXmlHttp.open(method, url, bAsync);
    if (bAsync) oXmlHttp.onreadystatechange = function () {
        if (oXmlHttp.readyState == 4 && oXmlHttp.status == 200)
            callback(oXmlHttp.responseText);
    };

    try {
        oXmlHttp.send(data);
    }
    catch (e) {
        alert("请求异常:" + e.Message + "\nUrl:" + url + "\n发送数据:" + data);
    }
    return oXmlHttp;
}

//创建XmlHttpRequest对象
RfSoft.Common.XmlHttp.Create = function () {
    var xmlHttp = null;
    try {
        if (window.ActiveXObject)
            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        else if (window.XMLHttpRequest)
            xmlHttp = new XMLHttpRequest();
    } catch (e) { }
    return xmlHttp;
}
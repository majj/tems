RfSoft.NS.register('RfSoft.Common.Validate');
/********************************************************************
*                                                                   *
*            用  途 ：表单验证                                       *
*            文  件 : RfSoft.Common.Validate.js                     *
*            时  间 : 2010-11-23                                    *
*            创建人 : zhu18                                         *
*                                                                   *
********************************************************************/
//1.对象值是否为空
//-----------------------------------------
//参数：obj要验证的对象，isSelect 值为空时光标是否选中对象
//返回值：bool
RfSoft.Common.Validate.IsNullOrEmpty = function (obj, isSelect) {
    var result = true;
    var value;
    value = (this.IsObject(obj)) ? getObjectValue(obj) : obj;
    result = value.length == 0;
    try {
        if (isSelect && result)
            obj.select();
    } catch (e) { }
    return result;
}


//2.对象值是否有效变量命名  字母+数字+下划线
//-----------------------------------------
//参数：obj要验证的对象，isSelect 结果为false时是否选中对象
//返回值：bool
RfSoft.Common.Validate.IsVar = function (obj, isSelect) {
    var result = false;
    var value;
    value = (this.IsObject(obj)) ? getObjectValue(obj) : obj;
    result = /^[\w_]*$/g.test(value);
    try {
        if (isSelect && !result)
            obj.select();
    } catch (e) { }
    return result;
}

//3.对象值是否是字母
//-----------------------------------------
//参数：obj要验证的对象，isSelect 结果为false时是否选中对象
//返回值：bool
RfSoft.Common.Validate.IsEn = function (obj, isSelect) {
    var result = false;
    var value;
    value = (this.IsObject(obj)) ? getObjectValue(obj) : obj;   
    result = /^[a-zA-Z]*$/g.test(value);
    try {
        if (isSelect && !result)
            obj.select();
    } catch (e) { }
    return result;
}

//4.对象值是否是中文
//-----------------------------------------
//参数：obj要验证的对象，isSelect 结果为false时是否选中对象
//返回值：bool
RfSoft.Common.Validate.IsCh = function (obj, isSelect) {
    var result = false;
    var value;
    value = (this.IsObject(obj)) ? getObjectValue(obj) : obj;
    result = /^[\u4e00-\u9fa5]*$/g.test(value);
    try {
        if (isSelect && !result)
            obj.select();
    } catch (e) { }
    return result;
}

//5.对象值是否是整数
//-----------------------------------------
//参数：obj要验证的对象，isSelect 结果为false时是否选中对象
//返回值：bool
RfSoft.Common.Validate.IsInt = function (obj, isSelect) {
    var result = false;
    var value;
    value = (this.IsObject(obj)) ? getObjectValue(obj) : obj;
    result = /^[\d]*$/g.test(value);
    try {
        if (isSelect && !result)
            obj.select();
    } catch (e) { }
    return result;
}

//6.对象值长度验证
//-----------------------------------------
//参数：obj要验证的对象，length 要验证的长度，isCh 是否已中文计算(一个汉字占用2个长度),isSelect 结果为false时是否选中对象
//返回值：bool 对象值长度大于length返回false
RfSoft.Common.Validate.IsInLength = function (obj, length, isCh, isSelect) {
    var result = false;
    var value;
    value = (this.IsObject(obj)) ? getObjectValue(obj) : obj;
    if (isCh)
        value = value.replace(/[^\x00-\xff]/gi, "**");
    result = value.length <= length;
    try {
        if (isSelect && !result)
            obj.select();
    } catch (e) { }
    return result;
}

//7.对象值是否是标准颜色
//-----------------------------------------
//参数：obj要验证的对象，isSelect 结果为false时是否选中对象
//返回值：bool
RfSoft.Common.Validate.IsColor = function (obj, isSelect) {
    var result = false;
    var value;
    value = (this.IsObject(obj)) ? getObjectValue(obj) : obj;
    result = /^#[a-fA-F0-9]{6}$/g.test(value);
    try {
        if (isSelect && !result)
            obj.select();
    } catch (e) { }
    return result;
}

//验证特殊字符 &,",<,>
RfSoft.Common.Validate.HasSpecialChar = function (obj, isSelect) {
    var result = false;
    var value;
    value = (this.IsObject(obj)) ? getObjectValue(obj) : obj;
    result = value.indexOf('&') > -1 || value.indexOf('"') > -1 || value.indexOf('<') > -1 || value.indexOf('>') > -1;
    try {
        if (isSelect && result)
            obj.select();
    } catch (e) { }
    return result;
}

//8.对象值自定义验证
//-----------------------------------------
//参数：obj要验证的对象，isSelect 结果为false时是否选中对象
//返回值：bool
RfSoft.Common.Validate.IsExp = function (obj, regExp, isSelect) {
    var result = false;
    var value;
    value = (this.IsObject(obj)) ? getObjectValue(obj) : obj;
    result = regExp.test(value);
    try {
        if (isSelect && !result)
            obj.select();
    } catch (e) { }
    return result;
}

//9.是否是对象
//---------------------------------------
//obj可以是对象 和方法, null不为对象。
RfSoft.Common.Validate.IsObject = function (obj) {
    return (typeof obj == "object");
}


//10.对象是否是该类型(对象是否是该类型实例,如：user1是不是User类型)
//---------------------------------------
//type:Object|Array|Date|String|自定义类型
RfSoft.Common.Validate.IsType = function (obj, type) {
    //值类型特殊处理
    if (type == String && (typeof obj == "string")) {
        return true;
    }
    return (obj instanceof type);
}

//11.对象值是否是URL
//-----------------------------------------
//参数：obj要验证的对象，isSelect 结果为false时是否选中对象
//返回值：bool
RfSoft.Common.Validate.IsURL = function (obj, isSelect) {
    var result = false;
    var value;
    value = (this.IsObject(obj)) ? getObjectValue(obj) : obj;
    var strRegex = "(https?:)?(/){0,2}([\\w\\.-]+(/)?)*([\\w-]+\\.[\\w]+)(:[0-9]{0,5})?(\\?[\\w-]+=[\\w-]+(&([\\w-]+=[\\w-]+))*)?";
    var regex = new RegExp(strRegex);
    result = regex.test(value);
    try {
        if (isSelect && !result)
            obj.select();
    } catch (e) { }
    return result;
}



//得到对象值
function getObjectValue(obj) {
    var value = '';
    if (obj) {
        if (obj.tagName.toLowerCase() == "input")
            value = obj.value;
        else if (obj.tagName.toLowerCase() == "textarea")
            value = obj.innerText;
        value = value.replace(/^\s+|\s+$/g, "");
    }
    return value;
}


RfSoft.NS.register('RfSoft.Common.Error');
/********************************************************************
*                                                                   *
*            用  途 ：错误处理 [非跨域代码]                          *
*            文  件 : RfSoft.Common.Error.js                        *
*            时  间 : 2011-3-22                                     *
*            创建人 : zhu18                                         *
*                                                                   *
********************************************************************/
RfSoft.Common.Error.IsApply = false;
RfSoft.Common.Error.ERS = []; //全域错误集合[{msg,position,row},..]
RfSoft.Common.Error.IsThrow = false; //是否抛出
RfSoft.Common.Error.HisMaxCount = 50; //历史最大错误数 [顶层域统一处理]
RfSoft.Common.Error.Callback = null;//新的错误回调 [顶层域统一处理]
RfSoft.Common.Error.CatchHandler = function () {
   
    //    tmp = "";
    //    tmp += "错误信息：" + arguments[0] + "\r\n";
    //    tmp += "错误位置：" + arguments[1] + "\r\n";
    //    tmp += "第" + arguments[2] + "行";
    var err = { msg: arguments[0], position: arguments[1], row: arguments[2] };
    if (top.RfSoft.Common.Error.ERS.length > RfSoft.Common.Error.HisMaxCount)
        top.RfSoft.Common.Error.ERS.shift();
    top.RfSoft.Common.Error.ERS.push(err);
    if (top.RfSoft.Common.Error.Callback)
        top.RfSoft.Common.Error.Callback();
    return !RfSoft.Common.Error.IsThrow;
}

RfSoft.Common.Error.Catch = function (isApply) {
    if (isApply!=null) RfSoft.Common.Error.IsApply = isApply;   
    if (RfSoft.Common.Error.IsApply)
        window.onerror = top.RfSoft.Common.Error.CatchHandler;
    else {
        window.onerror = null;
    }
}
RfSoft.Common.Error.Catch();
RfSoft.NS.register('RfSoft.Common.Checkbox');
/********************************************************************
*                                                                   *
*            用  途 ：复选框操作                                     *
*            文  件 : RfSoft.Common.Checkbox.js                     *
*            时  间 : 2010-11-15                                    *
*            创建人 : zhu18                                         *
*                                                                   *
********************************************************************/
//'全选'复选框className格式为 1234_all
//它所控制的子复选框 className 为 1234
//id '全选'复选框ID
RfSoft.Common.Checkbox.SelAllInit = function (id) {
    var name = $('#' + id).attr("name").replace("_all","");
    $('#' + id).bind("click", function () { RfSoft.Common.Checkbox.SelToggle() });
    $("input[name='" + name + "']").bind("click", function () { RfSoft.Common.Checkbox.Click() });
}
//得到一组checkbox的值
RfSoft.Common.Checkbox.GetGroupValue = function (name) {
    var values = "";
    $("input[name='" + name + "']").each(function () {
        if (this.checked)
            values += this.value + ',';
    })
    return values.trim(','); 
}
//全选复选框绑定事件
RfSoft.Common.Checkbox.SelToggle = function (name, obj) {    
    obj = obj || event.target || event.srcElement;
    name = name || obj.name.replace("_all", "");
    if (obj.checked)
        RfSoft.Common.Checkbox.SelAll(name);
    else
        RfSoft.Common.Checkbox.UnSelAll(name);
}

//子复选框绑定事件
RfSoft.Common.Checkbox.Click = function () {   
    var name = ((event.target || event.srcElement).name);
    var isAllChecked = true;
    $("input[name='" + name + "']").each(function () {
        if (!this.checked) {
            isAllChecked = false;
            return;
        }
    });
    $("input[name='" + name + "_all']")[0].checked = isAllChecked;
}

//全选
RfSoft.Common.Checkbox.SelAll = function (name) {
    RfSoft.Common.Checkbox.SetCheckBoxState(name, true);
}

//全不选
RfSoft.Common.Checkbox.UnSelAll = function (name) {
    RfSoft.Common.Checkbox.SetCheckBoxState(name, false);
}

//设置复选框选中状态 className:className属性值，state:是否选中
RfSoft.Common.Checkbox.SetCheckBoxState = function (name, state) {
    $("input[name='" + name + "']").each(function () {
        this.checked = state;
    });
}
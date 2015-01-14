//扩展动作
var ClientExtendAction= function (_name, _handler,  _desc,_group) {
    this.name = _name;
    this.handler = _handler;
    this.group = _group;
    this.desc = _desc;
}
//扩展动作管理
var ClientExtendManager  = {
    as: [],
    add: function (action) {
        action.registered=true;
        this.as.push(action);
    },
    clear: function () {
        this.as = [];
    }
};



//单独使用时，请注释下面这一行，并取消其后2行的注释
RfSoft.NS.register("RfSoft.MapleTr");
//var RfSoft = RfSoft || {};
//RfSoft.MapleTr = RfSoft.MapleTr || {};
RfSoft.MapleTr.RfMenu = function (goals, setting, menu_Action, apply_Rule, before_ContextMenu, handerType) {
    var extend = function (des, src) {
        for (var prop in src) {
            des[prop] = src[prop];
        }
        return des;
    };
    var returnFalse = function () {
        return false;
    };
    //拷贝，html参数中的html字符串的开头不能带有换行或者空格等，且仅包含一个根元素。
    var cloneNode = function (html) {
        var div = document.createElement("div");
        div.innerHTML = html;
        return div.firstChild;
        //return document.createElement(html);
    };

    //获取元素相对于文档的左上角的偏移量
    var getOffset = function (ele) {
        var box = ele.getBoundingClientRect(), doc = ele.ownerDocument, body = doc.body,
        docElem = doc.documentElement, clientTop = docElem.clientTop || body.clientTop || 0,
        clientLeft = docElem.clientLeft || body.clientLeft || 0,
        top = box.top + (docElem.scrollTop || body.scrollTop) - clientTop,
		left = box.left + (docElem.scrollLeft || body.scrollLeft) - clientLeft;
        return { top: top, left: left };
    };

    //获取元素的外宽及外高，display为none的情况需要特殊处理
    var getOuterSize = function (ele) {
        var val = null;
        if (ele.offsetWidth && ele.offsetHeight) {
            val = { outerWidth: ele.offsetWidth, outerHeight: ele.offsetHeight };
        } else {
            var cssShow = { position: "absolute", visibility: "hidden", display: "block" }, old = {};
            for (var name in cssShow) {
                old[name] = ele.style[name];
                ele.style[name] = cssShow[name];
            }
            val = { outerWidth: ele.offsetWidth, outerHeight: ele.offsetHeight };
            for (var name in cssShow) {
                ele.style[name] = old[name];
            }
        }
        return val;
    };

    //获取元素的宽度，处理width为auto或""(未考虑IE Box Model，仅考虑兼容模式)
    var getWidth = function (ele) {
        return ele.clientWidth - parseFloat(ele.currentStyle.paddingLeft) || 0 - parseFloat(ele.currentStyle.paddingRight) || 0;
    };
    //绑定回调函数
    //author: heyawei
    var setFunction = function ($item) {
        for (var item in $item.items) {
            if ($item.items[item].text != undefined) {
                $item.items[item].text = $item.items[item].text[0];
            }
            if ($item.items[item].items != undefined) {
                if ($item.items[item].items.length >= 2) {
                    arguments.callee($item.items[item]);
                } else {
                    var arr = new Array();
                    var item_temp = $item.items[item].items;
                    arr[0] = { "text": item_temp.text[0], "icon": item_temp.icon, "alias": item_temp.alias, "action": menu_Action, "type": item_temp.type, "width": item_temp.width };
                    $item.items[item].items = undefined;
                    $item.items[item].items = arr;

                }
            } else {
                if ($item.items[item].action != undefined) {
                    $item.items[item].action = menu_Action;
                }
            }
        }
    }
    //如果传入的setting为xml文件的地址执行如下流程 将setting 转化为json格式数据
    if (typeof setting === "string") {
        if (typeof menu_Action === "function" && typeof apply_Rule === "function" && typeof before_ContextMenu === "function") {
            $.ajax({
                dataType: "xml",
                url: setting,
                async: false,
                success: function (xml) {
                    setting = XmlToJson.xml2json(xml);
                },
                error: function (error) {
                    alert("错误：" + error);
                }
            });
            setting.onShow = apply_Rule;
            setting.onContextMenu = before_ContextMenu;
            setFunction(setting);
        } else {
            alert('请传入正确的回调函数！');
            return false;
        }
    }
    //如果是json
    //var setting = extend({ alias: "mRoot", width: 150 }, setting),
    var ruleName = null,
    target = null, groups = {}, mItems = {}, actions = {}, groupsOnShow = [],
    itemTemplate = '<div class="m-@[type]" unselectable="on"><nobr unselectable="on"><img src="@[icon]" align="absmiddle"/><span unselectable="on">@[text]</span></nobr></div>',
    groupHTML = '<div class="m-mpanel" unselectable="on" style="display:none;"></div>',
    itemHTML = '<div class="m-item" unselectable="on"></div>',
    splitHTML = '<div class="m-split"></div>';

    var buildGroup = function (item) {
        groups[item.alias] = this;
        this.gidx = item.alias;
        this.id = item.alias;
        if (item.disable) {
            this.disable = item.disable;
            this.className = "m-idisable";
        }
        this.style.width = item.width;
        this.onclick = returnFalse;
        this.onmousesdown = returnFalse;
        //document.body.insertAdjacentElement("beforeEnd", this);
        //此处涉及到IE的一个bug，暂时无法处理，该bug一般玩不出来。
        //其表现为：在IE6中产生横向滚动条，在IE8中出现菜单脱离既定位置。
        //产生原因：
        //          正常情况下，display为none的元素，其offsetWidth应该为0(此属性为显示外宽)，
        //      一种不甚严格的非官方的计算方式为：
        //      offsetWidth=borderLeftWidth+boderRightWidth+paddingLeft+paddingRight+width；
        //      上式中需用parseFloat去掉单位进行计算（前提是单位统一，否则需用currentStyle进行转换）
        //          这种计算方式对于inline元素管用，因为inline元素的外宽由内部内容决定，但是对于block元素，
        //      其外宽会受它offsetParent的影响，即使在指定width的情况下也是如此，特别是在使用绝对定位脱离
        //      文档流、甚至还是用了left和top进行了偏移的情况下。
        //          目前jQuery解决了此问题，但遗憾的是只有代码却没有说明，为了不依赖jQuery故没用它，而且
        //      jQuery内部代码中解决该问题的位置牵连到对象缓存及this漂移等问题，难以剥离。
        //          欢迎高手解决此问题 。
        var tempIFrame = document.createElement("iframe");
        tempIFrame.style.display = "none";
        tempIFrame.style.position = "absolute";
        this.backIFrame =tempIFrame;
        document.body.appendChild(tempIFrame);

        document.body.appendChild(this);
        item = null;
        return this;
    };

    var buildItem = function (item) {
        this.idx = item.alias;
        this.gidx = item.gidx;
        this.title = item.text;
        this.data = item;
        this.innerHTML = itemTemplate.replace(/@\[([^\]]+)\]/g, function () {
            return item[arguments[1]];
        });
        if (item.disable) {
            this.disable = item.disable;
            this.className = "m-idisable";
        }
        item.items && (this.group = true);
        item.action && (actions[item.alias] = item.action);
        mItems[item.alias] = this;
        item = null;
        return this;
    };

    var addItems = function (gidx, items) {
        var temp = null;
        for (var i = 0; i < items.length; i++) {
            if (items[i].type == "splitLine") {
                temp = cloneNode(splitHTML);
            }
            else {
                items[i].gidx = gidx;
                if (items[i].type == "group") {
                    buildGroup.apply(cloneNode(groupHTML), [items[i]]);
                    if (items[i].items != undefined && items[i].items != null) {
                        arguments.callee(items[i].alias, items[i].items);
                    }
                    items[i].type = "arrow";
                    temp = buildItem.apply(cloneNode(itemHTML), [items[i]]);
                }
                else {
                    items[i].type = "iBody";
                    temp = buildItem.apply(cloneNode(itemHTML), [items[i]]);
                    temp.onclick = function () {
                        if (!this.disable) {
                            (typeof actions[this.idx] === "function") && (actions[this.idx].call(this, target));
                            hideMenuGroup();
                        }
                        return false;
                    }
                }
                temp.oncontextmenu = returnFalse;
                temp.onmouseover = overItem;
                temp.onmouseout = outItem;
            }
            groups[gidx].appendChild(temp);
            temp = items[i] = items[i].items = null;
        }
        gidx = items = null;
    };

    var overItem = function () {
        if (this.disable) return false;
        hideMenuGroup.call(groups[this.gidx]);
        if (this.group) {
            var pos = getOffset(this), width = getOuterSize(this).outerWidth;
            showMenuGroup.apply(groups[this.idx], [pos, width]);
        }
        this.className = "m-ifocus";
        return false;
    };

    var outItem = function () {
        if (this.disable) return false;
        if (!this.group) this.className = "m-item";
        return false;
    };

    var showMenuGroup = function (position, width) {
        var bWidth = getWidth(document.body), bHeight = document.documentElement.clientHeight,
        size = getOuterSize(this), mWidth = size.outerWidth, mHeight = size.outerHeight;
        position.left = (position.left + width + mWidth > bWidth) ? (position.left - mWidth < 0 ? 0 : position.left - mWidth) : position.left + width;
        position.top = (position.top + mHeight > bHeight) ? (position.top - mHeight + (width > 0 ? 25 : 0) < 0 ? 0 : position.top - mHeight + (width > 0 ? 25 : 0)) : position.top;
        this.style.left = position.left;
        this.style.top = position.top;
        this.style.display = "";

        this.backIFrame.style.left = position.left;
        this.backIFrame.style.top = position.top;
        this.backIFrame.style.width = this.offsetWidth + "px";
        this.backIFrame.style.height = this.offsetHeight + "px";
        this.backIFrame.style.display = "";

        groupsOnShow.push(this.gidx);
    };

    var hideMenuGroup = function () {
        var alias = null;
        for (var i = groupsOnShow.length - 1; i >= 0; i--) {
            if (groupsOnShow[i] === this.gidx) break;
            alias = groupsOnShow.pop();
            groups[alias].backIFrame.style.display = "none";
            groups[alias].style.display = "none";
            mItems[alias] && (mItems[alias].className = "m-item");
        }
    };

    function applyRule(rule) {
        if (ruleName) {
            hideMenuGroup();
        }
        if (ruleName && ruleName == rule.name) return false;
        for (var i in mItems) disable(i, !rule.disable);
        for (var i = 0; i < rule.items.length; i++) disable(rule.items[i], rule.disable);
        ruleName = rule.name;
    };

    function disable(alias, disabled) {
        var item = mItems[alias];
        if (item) {
            item.className = (item.disable = item.lastChild.disabled = disabled) ? "m-idisable" : "m-item";
        }
    };

    function showMenu(e, menuTarget) {
        target = menuTarget;
        showMenuGroup.call(groups[setting.alias], { left: e.pageX, top: e.pageY }, 0);
        /*
        document.onmouseover = function () {
        hideMenuGroup();
        document.detachEvent("onmouseover", arguments.callee);
        };
        */
        document.onclick = function () {
            hideMenuGroup();
            // document.onclick = null;
        }
    };

    var $root = document.getElementById(setting.alias), root = null;
    if (!$root) {
        root = buildGroup.apply(cloneNode(groupHTML), [setting]);
        root.applyRule = applyRule;
        root.showMenu = showMenu;
        addItems(setting.alias, setting.items);
    } else {
        root = $root;
    }

    //给指定对象绑定右键事件对应的方法
    function hander() {
        //onContextMenu函数用于设置是否显示菜单，如果不需要显示，返回false即可
        var bShowMenu = (setting.onContextMenu && typeof setting.onContextMenu === "function") ? setting.onContextMenu.call(this) : true;
        if (bShowMenu) {
            //在onShow中可执行自定义操作诸如应用规则等
            if (setting.onShow && typeof setting.onShow === "function") {
                setting.onShow.call(this, root);
            }
            var e = {};
            e.pageX = event.clientX + document.body.scrollLeft || 0 - document.body.clientLeft || 0;
            e.pageY = event.clientY + document.body.scrollTop || 0 - document.body.clientTop || 0;
            root.showMenu(e, this);
        }
        //event.cancelBubble = true;
        //阻止系统默认菜单
        return false;
    }
    //给指定对象绑定右键事件
    if (typeof goals === "string") {
        goals = goals.split(",");
        for (var i = 0; i < goals.length; i++) {
            if (goals[i] != "") {
                var goal = document.getElementById(goals[i]);
                if (goal != null && goal != undefined) {
                    if (handerType != null && handerType != undefined) {
                        if (handerType.toUpperCase() == "ONCLICK") {
                            $(goal).bind("click", hander);
                        }
                        goal.oncontextmenu = hander;
                    }
                    else {
                        goal.oncontextmenu = hander;
                    }
                }
            }
        }
    }

    //启动时的显示规则设置
    if (setting.rule) {
        applyRule(setting.rule);
    }

    groupHTML = itemHTML = splitHTML = itemTemplate = buildGroup = buildItem = null;
    addItems = overItem = outItem = null;
}

RfSoft.MapleTr.RfMenu.prototype = {
    applyRule: function (rule) {
        alert(369);
    }
};
//将xml数据转化为json数据
//author: heyawei
var XmlToJson = {
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
};
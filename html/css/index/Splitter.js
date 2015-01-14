//Splitter控件  zhu18 at 2011.1.21
var Splitter = function (id) {
    if (!id) { alert("Splitter控件ID不可以为空！"); return; }
    this.id = id;
    this.table;
    this.enableMouseEvent = true; //middleBtn是否激发鼠标的over和out事件（页面有weboffice使用）
    this.isEffic = true; //拖动是否有黑色线
    this.isResizeH = true; //是否可以水平拖动
    this.isResizeV = true; //是否可以垂直拖动
    this.isFloatPanel = true;
    this.mode; // h:水平分割 | v:垂直分割
    this.leftPanel;
    this.middlePanel;
    this.rightPanel;
    this.topPanel;
    this.middlePanelV;
    this.bottomPanel;
    this.middleBtn;
    this.middleBtnV;
    this.middlePanelGhost;
    this.moddlePanelGhostV;
    this.leftMinWidth = 20; //左侧最小宽度
    this.bottomMinHeight = 20; //下部最小高度
    this.onresize = {
        fnArr: [],
        add: function (fn) {
            this.fnArr.push(fn);
        },
        run: function () {
            for (var i = 0, length = this.fnArr.length; i < length; i++) {
                var func = this.fnArr[i];
                if (typeof func == "function") {
                    func();
                }
            }
        }
    }; //改变大小后激活
    this.floatDiv = null;
    this.ifream = null;
    this.create = function () {
        this.table = $("#" + id)[0];
        if (this.table.tagName != "TABLE") { alert("Splitter控件只能实例化TABLE标签"); return; }
        if (!this.table) { alert("ID:" + this.id + "不存在的"); return; }
        if (this.table.rows.length == 1 && this.table.rows[0].cells.length == 3) {
            this.mode = 'h';
        }
        else if (this.table.rows.length == 3 && this.table.rows[0].cells.length == 1
        && this.table.rows[1].cells.length == 1 && this.table.rows[2].cells.length == 1) {
            this.mode = 'v';
        }
        else {
            alert("被实例化的TABLE格式不匹配：\n\t1.水平分割:一行3列\n\t2.垂直分割:3行一列");
            return;
        }

        if (this.mode == 'h') {//水平分割
            this.bulidSplitterH();
        }
        else if (this.mode == 'v') {//垂直分割
            this.bulidSplitterV();
        }
        if (this.isFloatPanel) {
            this.floatDiv = $("<DIV>", { "class": "splitter_floatPanel" })[0];
            this.ifream = $("<iframe>", { "class": "splitter_ifream" })[0];
            document.body.appendChild(this.floatDiv);
            document.body.appendChild(this.ifream);
            var self = this;
            this.floatDiv.onmouseout = function () {
                if (!self.floatDiv.contains(event.toElement)) {
                    self.floatPanelHide();
                }
            };
        }
    };

    //水平分割
    this.bulidSplitterH = function () {
        this.leftPanel = this.table.rows[0].cells[0];
        this.middlePanel = this.table.rows[0].cells[1];
        this.rightPanel = this.table.rows[0].cells[2];
        if (this.leftPanel.minWidth) {
            this.leftMinWidth = parseInt(this.leftPanel.minWidth);
        }
        this.middlePanel.innerHTML = "";
        this.middleBtn = $("<DIV>", { id: this.id + "_middleBtn" })[0];
        this.middlePanel.appendChild(this.middleBtn);
        this.leftPanel.className = "splitter_leftPanel";
        this.middlePanel.className = "splitter_middlePanel";
        this.rightPanel.className = "splitter_rightPanel";
        this.middleBtn.className = (this.leftPanel.style.display != 'none') ? "splitter_hor_collapse" : "splitter_hor_extend";

        var self = this;
        if (this.isResizeH) {
            if (this.isEffic) {
                if (!this.middlePanelGhost) {
                    this.middlePanelGhost = $("<DIV>", { "class": "splitter_middlePanel_ghost" })[0];
                    this.middlePanelGhost.style.display = "none";
                    document.body.appendChild(this.middlePanelGhost);
                }
                this.middlePanelGhost.style.display = "none";
                this.middlePanel.onmousedown = function () { self.resizeBegin() };
                this.middlePanelGhost.onmousemove = function () { self.resizing() };
                this.middlePanelGhost.onmouseup = function () { self.resizeEnd() };
            }
            else {
                this.middlePanel.onmousedown = function () { self.resizeBegin() };
                this.middlePanel.onmousemove = function () { self.resizing() };
                this.middlePanel.onmouseup = function () { self.resizeEnd(); };
            }
        }
        else {
            this.middlePanel.style.cursor = "default"; //不可拖动鼠标样式取消
        }
        this.middlePanel.onmouseover = function () { self.floatPanelExtend() };
        this.middleBtn.onclick = function () { self.splitterCollapseExtend(); };
        if (!this.enableMouseEvent) {
            this.middleBtn.onmouseover = function () { event.cancelBubble = true; this.className = this.className + '_over'; };
            this.middleBtn.onmouseout = function () { event.cancelBubble = true; this.className = this.className.replace('_over', ''); };
        }
    };

    //垂直分割
    this.bulidSplitterV = function () {
        this.topPanel = this.table.rows[0].cells[0];
        this.middlePanelV = this.table.rows[1].cells[0];
        this.bottomPanel = this.table.rows[2].cells[0];
        if (this.bottomPanel.minHeight) {
            this.bottomMinHeight = parseInt(this.bottomPanel.minHeight);
        }
        this.middlePanelV.innerHTML = "";
        this.middleBtnV = $("<DIV>", { id: this.id + "_middleBtnV" })[0];
        this.middlePanelV.appendChild(this.middleBtnV);
        this.topPanel.className = "splitter_topPanel";
        this.middlePanelV.className = "spliter_middlePanelV";
        this.bottomPanel.className = "splitter_bottomPanel";
        this.middleBtnV.className = (this.bottomPanel.style.display != 'none') ? "splitter_ver_collapse" : "splitter_ver_extend";

        var self = this;
        if (this.isResizeV) {
            if (this.isEffic) {
                if (!this.middlePanelGhostV) {
                    this.middlePanelGhostV = $("<DIV>", { "class": "splitter_middlePanel_ghostV" })[0];
                    document.body.appendChild(this.middlePanelGhostV);
                }
                this.middlePanelGhostV.style.display = "none";
                this.middlePanelV.onmousedown = function () { self.resizeBegin() };
                this.middlePanelGhostV.onmousemove = function () { self.resizing() };
                this.middlePanelGhostV.onmouseup = function () { self.resizeEnd() };
            }
            else {
                this.middlePanelV.onmousedown = function () { self.resizeBegin() };
                this.middlePanelV.onmousemove = function () { self.resizing() };
                this.middlePanelV.onmouseup = function () { self.resizeEnd() };
            }
        }
        else {
            this.middlePanelV.style.cursor = "default"; //不可拖动鼠标样式取消
        }
        this.middlePanelV.onmouseover = function () { self.floatPanelExtend() };
        this.middleBtnV.onclick = function () { self.splitterCollapseExtend(); };
        if (!this.enableMouseEvent) {
            this.middleBtnV.onmouseover = function () { this.className = this.className + '_over'; };
            this.middleBtnV.onmouseout = function () { this.className = this.className.replace('_over', ''); };
        }
    };

    this.splitterCollapseExtend = function (isShow) {
        var panel = this.leftPanel;
        var midBtn = this.middleBtn;
        var className = "hor";
        var $contentPanel = $(this.leftPanel);
        if (this.mode == 'v') {
            panel = this.bottomPanel.parentNode;
            midBtn = this.middleBtnV;
            className = "ver";
            $contentPanel = $(this.bottomPanel);
        }

        if (isShow != undefined) {
            if (isShow == (panel.style.display != "none")) return;
        }
        else {
            isShow = panel.style.display == "none"
        }
        if (isShow) {
            if (this.isFloatPanel) {
                /*填充浮动面板*/
                var strHtml = $(this.floatDiv).html();
                if (strHtml) {
                    $(this.floatDiv).html(null);
                    $contentPanel.html(strHtml);
                }
                this.floatPanelHide();
            }
            panel.style.display = "";
            midBtn.className = 'splitter_' + className + '_collapse';
        }
        else {
            panel.style.display = "none";
            midBtn.className = 'splitter_' + className + '_extend';
            if (this.isFloatPanel) {
                /*填充浮动面板*/
                var strHtml = $contentPanel.html();
                if (strHtml) {
                    $(this.floatDiv).html(strHtml);
                    $contentPanel.html(null);
                }
            }
        }
        if (this.onresize instanceof Function) {
            this.onresize();
        } else if (this.onresize.run instanceof Function) {
            this.onresize.run();
        }
    };

    //开始拖动
    this.resizeBegin = function () {
        if (this.mode == 'h') {
            if (event.srcElement == this.middleBtn)
                return;
            if (this.leftPanel.style.display == "none") return;
            if (this.isEffic) {
                this.middlePanelGhost.mouseDownX = this.middlePanel.getBoundingClientRect().left;
                this.middlePanelGhost.style.left = this.middlePanel.getBoundingClientRect().left;
                this.middlePanelGhost.style.top = this.middlePanel.getBoundingClientRect().top;
                this.middlePanelGhost.style.height = $(this.middlePanel).height();
                this.middlePanelGhost.style.display = "";
                this.middlePanelGhost.setCapture();
            }
            else {
                this.middlePanel.mouseDownX = event.clientX;
                this.middlePanel.leftTdW = this.middlePanel.previousSibling.offsetWidth;
                this.middlePanel.setCapture();
            }
        }
        else if (this.mode == 'v') {
            if (event.srcElement == this.middleBtnV)
                return;
            if (this.bottomPanel.parentNode.style.display == "none") return;
            if (this.isEffic) {
                this.middlePanelGhostV.mouseDownY = this.middlePanelV.getBoundingClientRect().top;
                this.middlePanelGhostV.style.left = this.middlePanelV.getBoundingClientRect().left;
                this.middlePanelGhostV.style.top = this.middlePanelV.getBoundingClientRect().top;
                this.middlePanelGhostV.style.width = $(this.middlePanelV).width() - 2;
                this.middlePanelGhostV.style.display = "";
                this.middlePanelGhostV.setCapture();
            }
            else {
                this.middlePanelV.mouseDownY = event.clientY;

                this.middlePanelV.bottomTdH = this.middlePanelV.parentNode.nextSibling.childNodes[0].offsetHeight;
                this.middlePanelV.setCapture();
            }
        }
        this.isResizing = true;
    };

    //拖动
    this.resizing = function () {
        if (this.mode == 'h') {
            if (!this.isResizing) return;
            if (this.isEffic) {
                if (this.leftMinWidth <= event.clientX && event.clientX <= (this.table.getBoundingClientRect().left + $(this.table).width())) {
                    this.middlePanelGhost.style.left = event.clientX;
                }
            }
            else {
                var newWidth = this.middlePanel.leftTdW * 1 + event.clientX * 1 - this.middlePanel.mouseDownX; // 新的width
                if (newWidth > 0 && newWidth > this.leftMinWidth) {
                    this.middlePanel.previousSibling.style.width = newWidth + 'px';
                }
                else {// 设置一个最小的宽度
                    this.middlePanel.previousSibling.style.width = this.leftMinWidth + 'px';
                }
            }
        }
        else if (this.mode == 'v') {
            if (!this.isResizing) return;
            if (this.isEffic) {
                if (document.body.clientHeight - this.bottomMinHeight > event.clientY && event.clientY <= (this.table.getBoundingClientRect().top + $(this.table).height())) {
                    this.middlePanelGhostV.style.top = event.clientY;
                }
            }
            else {
                var newHeight = this.middlePanelV.bottomTdH * 1 + event.clientY * 1 - this.middlePanelV.mouseDownY; // 新的height
                if (newHeight > 0 && newHeight > this.bottomMinHeight) {
                    this.middlePanelV.parentNode.nextSibling.childNodes[0].style.height = newWidth + 'px';
                }
                else {// 设置一个最小的高度
                    this.middlePanelV.parentNode.nextSibling.childNodes[0].style.height = this.bottomMinHeight + 'px';
                }
            }
        }
    };

    //结束拖动
    this.resizeEnd = function () {
        if (this.mode == 'h') {
            if (!this.isResizing) return;
            if (this.isEffic) {
                this.middlePanelGhost.releaseCapture();
                var offset = parseInt(this.middlePanelGhost.style.left) - this.middlePanelGhost.mouseDownX;
                offset = ($(this.middlePanel.previousSibling).width() + offset);
                this.middlePanel.previousSibling.style.width = (offset > 0) ? offset : 1 + 'px';
                this.middlePanelGhost.style.display = "none";
            }
            else {
                this.middlePanel.releaseCapture();
            }
        }
        else if (this.mode == 'v') {
            if (!this.isResizing) return;
            if (this.isEffic) {
                this.middlePanelGhostV.releaseCapture();
                var offset = this.middlePanelGhostV.mouseDownY - parseInt(this.middlePanelGhostV.style.top);
                //var tableHeight = this.middlePanelV.parentNode.parentNode.scrollHeight;
                offset = (this.middlePanelV.parentNode.nextSibling.scrollHeight + offset);
                offset = Math.max(offset, 1);
                this.middlePanelV.parentNode.nextSibling.childNodes[0].style.height = (offset > 0) ? offset : 1 + 'px';
                this.middlePanelGhostV.style.display = "none";
            }
            else {
                this.middlePanelV.releaseCapture();
            }
        }
        this.isResizing = false;
        if (this.onresize instanceof Function) {
            this.onresize();
        } else if (this.onresize.run instanceof Function) {
            this.onresize.run();
        }
    };

    this.floatPanelExtend = function () {
        if (!this.isFloatPanel) return;
        var offLeft = 0;
        var offTop = 0;
        var width;
        var height;
        if (this.mode == 'h') {//水平分割
            if (event.srcElement == this.middleBtn)
                return;
            if (this.leftPanel.style.display == "none") {
                if (!(width = this.leftPanel.style.width))
                    width = this.leftPanel.scrollWidth + "px";
                height = $(this.leftPanel).parent().height() + "px";
                var offParent = this.table;
                while (offParent) {
                    offLeft += offParent.offsetLeft;
                    offTop += offParent.offsetTop;
                    offParent = offParent.offsetParent;
                }
                offLeft += this.rightPanel.offsetLeft;
                $(this.ifream).css({ "left": offLeft, "top": offTop, "width": width, "height": height }).show();
                $(this.floatDiv).css({ "left": offLeft, "top": offTop, "width": width, "height": height }).show(300);
            }
        }
        if (this.mode == 'v') {//垂直分割
            if (event.srcElement == this.middleBtnV)
                return;
            if (this.bottomPanel.parentNode.style.display == "none") {
                width = Math.max(this.bottomPanel.parentNode.scrollWidth, this.bottomPanel.scrollWidth);
                height = Math.min($(".splitter_floatPanel").height(), $(this.table).height());
                var offParent = this.table;
                while (offParent) {
                    offLeft += offParent.offsetLeft;
                    offTop += offParent.offsetTop - 2;
                    offParent = offParent.offsetParent;
                }
                offTop += $(this.table).height() - 7 - height;
                $(this.ifream).css({ "overflow": "auto", "left": offLeft, "top": offTop, "width": width + "px", "height": height + "px" }).show();
                $(this.floatDiv).css({ "overflow": "auto", "left": offLeft, "top": offTop, "width": width + "px", "height": height + "px" }).show(300);
            }
        }
    }
    this.floatPanelHide = function () {
        if (!this.isFloatPanel) return;
        var panel = this.middlePanelV;
        if (this.mode == 'h') {
            panel = this.middlePanel;
        }
        if (event && panel.contains(event.toElement)) {
            return;
        }
        $(this.floatDiv).hide();
        $(this.ifream).hide();
    }

    this.IsExtend = function () {
        if (this.mode == 'h')
            return this.leftPanel.style.display != "none";
        else
            return this.bottomPanel.parentNode.style.display != "none"
    }
}
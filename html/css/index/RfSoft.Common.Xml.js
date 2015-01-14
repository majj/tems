RfSoft.NS.register('RfSoft.Common.Xml');
/********************************************************************
*                                                                   *
*            用  途 ：XmlDocment操作                                 *
*            文  件 : RfSoft.Common.Xml.js                          *
*            时  间 : 2011-08-26                                    *
*            创建人 : zhu18                                         *
*                                                                   *
********************************************************************/
//创建XmlDocument对象 
RfSoft.Common.Xml.Create = RfSoft.Common.CreateXMLDOM = function () {
    var xmlDoc = null;
    try {
        //Mozilla, Opera and webkit nightlies
        if (document.implementation && document.implementation.createDocument) {
            xmlDoc = document.implementation.createDocument("", "", null);
        }
        else {//IE
            xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        }
        xmlDoc.async = false;
        return xmlDoc;
    }
    catch (e) {
           alert("浏览器无法创建XMLDOM对象,请把站点设置为受信站点并允许ActiveXObject执行。");
        return null;
    }
}
//Mozilla, Opera ,NS 非IE加入浏览器兼容操作
if (!document.all) {
    // 为 XMLDocument 添加 loadXML 方法   
    XMLDocument.prototype.loadXML = function (xmlString) {
        var childNodes = this.childNodes;
        for (var i = childNodes.length - 1; i >= 0; i--) {
            this.removeChild(childNodes[i]);
        }
        var dp = new DOMParser();
        var newDOM = dp.parseFromString(xmlString, "text/xml");
        var newElt = this.importNode(newDOM.documentElement, true);
        this.appendChild(newElt);
        return true;
    }
    // prototying the XMLDocument   
    XMLDocument.prototype.selectNodes = function (cXPathString, xNode) {
        if (!xNode) { xNode = this; }
        var oNSResolver = this.createNSResolver(this.documentElement)
        var aItems = this.evaluate(cXPathString, xNode, oNSResolver, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
        var aResult = [];
        for (var i = 0; i < aItems.snapshotLength; i++) {
            aResult[i] = aItems.snapshotItem(i);
        }
        return aResult;
    }
    // prototying the Element   
    Element.prototype.selectNodes = function (cXPathString) {
        if (this.ownerDocument.selectNodes) {
            return this.ownerDocument.selectNodes(cXPathString, this);
        } else { throw "For XML Elements Only"; }
    }
    XMLDocument.prototype.selectSingleNode = function (cXPathString, xNode) {
        if (!xNode) { xNode = this; }
        var xItems = this.selectNodes(cXPathString, xNode);
        if (xItems.length > 0) {
            return xItems[0];
        } else {
            return null;
        }
    }
    // prototying the Element   
    Element.prototype.selectSingleNode = function (cXPathString) {
        if (this.ownerDocument.selectSingleNode) {
            return this.ownerDocument.selectSingleNode(cXPathString, this);
        } else { throw "For XML Elements Only"; }
    }
    // 为 Firefox 下的 Node 添加 text 属性   
    Element.prototype.__defineGetter__("text", function () {
        return this.textContent;
    }
    );
} 
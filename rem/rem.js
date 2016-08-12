(function(win) {
    var remCalc = {};
    var docEl = win.document.documentElement,
        tid;
    /*根据设备屏幕计算rem*/
    function refreshRem() {

        var width = docEl.getBoundingClientRect().width;
        /*浏览器打开，已最大模式呈现*/
        if (width > 640) { width = 640 }
 
        var rem = width /640 * 100;
        docEl.style.fontSize = rem + "px";
        remCalc.rem = rem;
        /*解决误差*/
        var actualSize = parseFloat(window.getComputedStyle(document.documentElement)["font-size"]);
        if (actualSize !== rem && actualSize > 0 && Math.abs(actualSize - rem) > 1) {
            var remScaled = rem * rem / actualSize;
            docEl.style.fontSize = remScaled + "px"
        }
    }

    /*节流*/
    function dbcRefresh() {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 100)
    }

    win.addEventListener("resize", function() { dbcRefresh() }, false);
    /*返回上一页到达该页后激活计算*/
    win.addEventListener("pageshow", function(e) {
        if (e.persisted) { dbcRefresh() }
    }, false);
    refreshRem();
    remCalc.refreshRem = refreshRem;
    /*转换方法，方便工程其他位置临时判断*/
    remCalc.rem2px = function(d) {
        var val = parseFloat(d) * this.rem;
        if (typeof d === "string" && d.match(/rem$/)) { val += "px" }
        return val
    };
    remCalc.px2rem = function(d) {
        var val = parseFloat(d) / this.rem;
        if (typeof d === "string" && d.match(/px$/)) { val += "rem" }
        return val
    };
    win.remCalc = remCalc
})(window);
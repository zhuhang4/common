!function(e) {
    function t() {
        e.rem = d.getBoundingClientRect().width / 16, d.style.fontSize = e.rem + "px";
    }
    var n, 
        i = e.devicePixelRatio, 
        a = 1 / i, 
        d = document.documentElement, 
        o = document.createElement("meta");
    if (e.dpr = i, 
        e.addEventListener("resize", function() {
        clearTimeout(n), n = setTimeout(t, 300);
    }, !1), 
        e.addEventListener("pageshow", function(e) {
        e.persisted && (clearTimeout(n), n = setTimeout(t, 300));
    }, !1), 
        d.setAttribute("data-dpr", i), o.setAttribute("name", "viewport"), 
        o.setAttribute("content", "initial-scale=" + a + ", maximum-scale=" + a + ", minimum-scale=" + a + ", user-scalable=no"), d.firstElementChild) 
        d.firstElementChild.appendChild(o); 
    else {
        var m = document.createElement("div");
        m.appendChild(o), document.write(m.innerHTML);
    }
    t();
}(window), document.addEventListener("DOMContentLoaded", function() {
    var e = document.createElement("input");
    e.type = "hidden", 
    e.value = '{"platform": "qq_qzone_weixin_weibo_copy","title":"","desc": "","image":"","comment": "", "url":"","callback":"shareCallback()"}', 
    e.id = "app_share_conf", document.getElementsByTagName("body")[0].appendChild(e);
}, !1);
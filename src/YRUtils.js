export class Cookie {
    static getCookie(name) {
        var strcookie = document.cookie;
        var arrcookie = strcookie.split("; ");
        for (var i = 0; i < arrcookie.length; i++) {
            var arr = arrcookie[i].split("=");
            if (arr[0] == name) {
                if (arr[1]) {
                    return unescape(arr[1]);
                }
                else {
                    return null;
                }

            }  //增加对特殊字符的解析
        }
        return null;
    }
    static addCookie(name, value, expireHours) {
        var cookieString = name + "=" + escape(value) + "; path=/";
        //判断是否设置过期时间
        if (expireHours > 0) {
            var date = new Date();
            console.log(date.getTime());
            date.setTime(date.getTime() + expireHours * 3600 * 1000);
            cookieString = cookieString + "; expires=" + date.toGMTString();
        }
        document.cookie = cookieString;
    }
}
export class Tool {
    static getParams(paraName) {
        var url = document.location.toString();
        var arrObj = url.split("?");

        if (arrObj.length > 1) {
            var arrPara = arrObj[1].split("&");
            var arr;

            for (var i = 0; i < arrPara.length; i++) {
                arr = arrPara[i].split("=");

                if (arr != null && arr[0] == paraName) {
                    return arr[1];
                }
            }
            return "";
        }
        else {
            return "";
        }
    }
    static getServerDate() {
        var xhr = null;
        if (window.XMLHttpRequest) {
            xhr = new window.XMLHttpRequest();
        } else { // ie
            xhr = new ActiveObject("Microsoft")
        }

        xhr.open("GET", "/", false)//false不可变
        xhr.send(null);
        var date = xhr.getResponseHeader("Date");
        return new Date(date);
    }

    //用法
    // let ob = { loop: true };
    // Tool.TimeChain(2999, () => {
    //   console.log('执行一些事情')
    // }, ob);
    static async TimeChain(delay, handler, ob) {
        let p = function () {
            return new Promise((s, f) => {
                handler();
                setTimeout(() => {
                    s();
                }, delay)
            })
        }
        while (ob.loop) {
            await p();
        }
    }

    static deepCopy(source) {
        const targetObj = source.constructor === Array ? [] : {}; // 判断复制的目标是数组还是对象
        for (let keys in source) { // 遍历目标
            console.log(keys);
            if (source.hasOwnProperty(keys)) {
                if (source[keys] && typeof source[keys] === 'object') { // 如果值是对象，就递归一下
                    targetObj[keys] = source[keys].constructor === Array ? [] : {};
                    targetObj[keys] = Tool.deepCopy(source[keys]);
                } else { // 如果不是，就直接赋值
                    targetObj[keys] = source[keys];
                }
            }
        }
        return targetObj;
    }

    static loopObject(target, key) {
        if (target instanceof Object) {
            for (let i in target) {
                if (i == key) {
                    return target[i];
                }
                else {
                    let val = Tool.loopObject(target[i], key);
                    if (val) {
                        return val;
                    }
                }
            }
        }
        else {
            return null;
        }
    }

    static ArrayFlat(target) {

        return target.reduce((pre, cur) => {
            if (Array.isArray(cur)) {
                return pre.concat(Tool.ArrayFlat(cur));
            }
            else {
                return pre.concat(cur);
            }
        }, []);
    }

    static throllte(handler, delay) {

        let pre = new Date().getTime();
        return function () {
            let t = new Date().getTime();
            if (t - pre > delay) {
                pre = t;
                handler.apply(this, arguments)
            }
        }
    }
    static debounce(handler, delay, immediate = true) {
        // let pre=new Date().getTime();
        let t = 0;
        return function () {
            clearTimeout(t);
            if (immediate) {
                if (t == 0) {
                    handler();
                }

                t = setTimeout(() => {
                    if (t - pre > delay) {
                        pre = t;
                        handler.apply(this, arguments)
                    }
                }, delay);

            }
            else {
                t = setTimeout(() => {
                    if (t - pre > delay) {
                        pre = t;
                        handler.apply(this, arguments)
                    }
                }, delay);
            }
        }
    }
    // MyData.axios({
    //     method: "post",
    //     url: "/api/v1/useractivate",
    //     data: {

    //     }

    // })
    //     .then(response => {


    // })
    // .catch(error => {
    //     console.log(error); //请求失败返回的数据

    // });

}
export class EasyMath {
    static linear(x1, y1, x2, y2) {
        let k = (y1 - y2) / (x1 - x2);
        let b = y1 - k * x1;
        return { k: k, b: b };
    }
    static range(value, arr_v, arr_r = [0, 1]) {
        let percent = (value) / (arr_v[1] - arr_v[0]);
        let cal = arr_r[0] + percent * (arr_r[1] - arr_r[0]);
        return cal;
    }
}
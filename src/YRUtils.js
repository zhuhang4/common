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
        let p = () => {
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
export class SAT {
    collidesWith(shape0, shape1) {
        let arr_projectaxes = this.getAxes(shape0).concat(this.getAxes(shape1));
        for (let i = 0; i < arr_projectaxes.length; i++) {
            let axes = arr_projectaxes[i];
            let projection0 = this.getProject(shape0, axes);
            let projection1 = this.getProject(shape1, axes);
            console.log('p:', projection0, projection1)
            if (!projection0.overlaps(projection1)) {
                console.log('false')
                return false;
            }
        }
        console.log('true')


    }
    getAxes(shape) {
        //返回vector2数组
        let arr = shape.points;
        console.log(arr)
        let arr_bian = [];
        for (let i = 0; i < arr.length; i++) {
            let axes;
            if (i != arr.length - 1) {
                axes = arr[i + 1].sub(arr[i]).normalize();
            }
            else {
                axes = arr[i].sub(arr[0]).normalize();
            }
            arr_bian.push(axes);
        }

        let arr_axes = [];
        for (let i = 0; i < arr_bian.length; i++) {
            let v = arr_bian[i].perpendicular();
            arr_axes.push(v);
        }

        // let arr_minproject = [];
        // for (let i = 0; i < arr_axes.length; i++) {
        //     let arr_project = [];
        //     for (let j = 0; j < arr_bian.length; j++) {
        //         arr_project.push(arr_bian[j].dot(arr_axes[i]));
        //     }
        //     arr_minproject.push(new Projection(Math.min(...arr_project),Math.max(...arr_project)))
        // }

        return arr_axes;
    }
    // getProjectAxes(shape) {
    //     let arr = SAT.prototype.getAxes(shape);
    //     let arr_project = [];
    //     for (let i = 0; i < arr.length; i++) {
    //         let v = arr[i].perpendicular();
    //         arr_project.push(v);
    //     }
    //     return arr_project;
    // }

    getProject(shape, axes) {
        let points = shape.points;
        console.log(points);
        let arr = points.map(e => {
            // console.log("points:",e)
            return e.dot(axes);
        })
        return new Projection(Math.min(...arr), Math.max(...arr));
    }

}
export class Projection {
    constructor(min, max) {
        this.min = min;
        this.max = max;
    }
    overlaps(project) {
        console.log(this.max, project.min, this.min, project.max)
        if (this.max > project.min && this.min < project.max) {
            return true;
        }
        else {
            return false;
        }
    }

}
export class Vector2D {
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }
    clone() {
        return new PIXI.Vector(this.x, this.y);
    }
    perpendicular() {
        var v = new Vector2D();
        let _x = this.x;
        v.x = this.y;
        v.y = _x * -1;
        return v.normalize();
    }
    add(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }
    sub(v) {
        let vec = new Vector2D();
        vec.x = this.x - v.x;
        vec.y = this.y - v.y;
        return vec;
    }
    invert(v) {
        this.x *= -1;
        this.y *= -1;
        return this;
    }
    multiplyScalar(s) {
        this.x *= s;
        this.y *= s;
        return this;
    };
    divideScalar(s) {
        if (s === 0) {
            this.x = 0;
            this.y = 0;
        } else {
            var invScalar = 1 / s;
            this.x *= invScalar;
            this.y *= invScalar;
        }
        return this;
    };
    dot(v) {
        return this.x * v.x + this.y * v.y;
    };
    length(v) {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };
    lengthSq() {
        return this.x * this.x + this.y * this.y;
    };
    normalize() {
        return this.divideScalar(this.length());
    };
    distanceTo(v) {
        return Math.sqrt(this.distanceToSq(v));
    };
    distanceToSq(v) {
        var dx = this.x - v.x, dy = this.y - v.y;
        return dx * dx + dy * dy;
    };

    set(x, y) {
        this.x = x;
        this.y = y;
        return this;
    };

    setX(x) {
        this.x = x;
        return this;
    };

    setY(y) {
        this.y = y;
        return this;
    };

    setLength(l) {
        var oldLength = this.length();
        if (oldLength !== 0 && l !== oldLength) {
            this.multiplyScalar(l / oldLength);
        }
        return this;
    };

    invert(v) {
        this.x *= -1;
        this.y *= -1;
        return this;
    };

    lerp(v, alpha) {
        this.x += (v.x - this.x) * alpha;
        this.y += (v.y - this.y) * alpha;
        return this;
    };

    rad() {
        return Math.atan2(this.x, this.y);
    };

    deg() {
        return this.rad() * 180 / Math.PI;
    };

    equals(v) {
        return this.x === v.x && this.y === v.y;
    };

    rotate(theta) {
        var xtemp = this.x;
        this.x = this.x * Math.cos(theta) - this.y * Math.sin(theta);
        this.y = xtemp * Math.sin(theta) + this.y * Math.cos(theta);
        return this;
    };
}
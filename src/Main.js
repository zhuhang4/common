// corejs3.0+使用下两句
// import 'core-js/stable';
// import 'regenerator-runtime/runtime';

//babel按需导入时，不需要import（但是可能用坑，所以不用）
import "@babel/polyfill";
import PixiMain from './PixiMain.js'
import MyData from './MyData.js'
import * as YR from './YR'
import ThreeMain from './ThreeMain.js';
import { Tool } from "./YRUtils.js";


export default class Main {
    constructor(canvas_2d, canvas_3d) {
        //数据初始化
        let resource = window.resource = require('./static/resource.json');
        for (let name in resource) {
            window[name] = resource[name];
        }
        console.log(resource);
        if (MyData.mode == '2d') {
            canvas_3d.remove();
            canvas_2d.style.cssText = 'z-index:99;position:absolute;left:0px;top:0px;';
            let pm = new PixiMain(canvas_2d);
            YR.Mediator.getInstance().add('Main_2DLoaded', () => {
                console.log('OnlyPixi模式开始');
                pm.pixiStart();
            });
        }
        else if (MyData.mode == '3d') {
            canvas_2d.remove();
            canvas_3d.style.cssText = 'z-index:99;position:absolute;left:0px;top:0px;';
            document.body.insertBefore(canvas_3d, document.body.firstChild);
            let three = new ThreeMain(canvas_3d);
            YR.Mediator.getInstance().add('Main_3DLoaded', () => {
                console.log('Three模式开始');
                three.init();
            });
        }
        else {
            // $.getScript('static/resource.js?v=' + MyData.version, function () {
            canvas_2d.style.cssText = 'z-index:99;position:absolute;left:0px;top:0px;';
            canvas_3d.style.cssText = 'z-index:0;position:absolute;left:0px;top:0px;';

            let pm = new PixiMain(canvas_2d);
            let three = new ThreeMain(canvas_3d);
            let bool_loaded2 = false;//2D资源加载完毕
            let bool_loaded3 = false;//3D资源加载完毕
            YR.Mediator.getInstance().add('Main_2DLoaded', () => {
                bool_loaded2 = true;
                if (bool_loaded2 && bool_loaded3) {
                    console.log('Pixi+Three模式开始');
                    pm.pixiStart();
                    three.init();
                }
            });
            //接受3D资源加载完毕
            YR.Mediator.getInstance().add('Main_3DLoaded', () => {
                console.log('3D资源载入完成');
                bool_loaded3 = true;
                if (bool_loaded2 && bool_loaded3) {
                    console.log('Pixi+Three模式开始');
                    pm.pixiStart();
                    three.init();
                }
            });
            // });
        }
    }
}

if (document.title != 'edit') {
    new MyData();

    console.log('f:',Tool.ArrayFlat([123,[1,[2,3,123]],23]));
    // Tool.ArrayFlat([1,2,3,4,5,6])
    //如果没有提供微信jssdk逻辑，就用这个
    // new WeChat();
    let cvs_2d = document.createElement('canvas');
    cvs_2d.setAttribute('id','cvs_2d');
    let cvs_3d = document.createElement('canvas');
    cvs_3d.setAttribute('id','cvs_2d');
    document.body.insertBefore(cvs_2d, document.body.firstChild);
    document.body.insertBefore(cvs_3d, document.body.firstChild);
    new Main(cvs_2d, cvs_3d);
}



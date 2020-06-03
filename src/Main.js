// corejs3.0+使用下两句
// import 'core-js/stable';
// import 'regenerator-runtime/runtime';

//babel按需导入时，不需要import（但是可能用坑，所以不用）
import "@babel/polyfill";
import PixiMain from './PixiMain.js'
import MyData from './MyData.js'
import * as YR from './YR'
import ThreeMain from './ThreeMain.js';
import YRShader from './YRShader.js';


export default class Main {
    constructor() {
        //数据初始化
        let resource = window.resource = require('./static/resource.json');
        for (let name in resource) {
            window[name] = resource[name];
        }
        console.log(resource);
        if (MyData.mode == '2d') {
            let canvas = document.createElement('canvas');
            canvas.style.cssText = 'z-index:99;position:absolute;left:0px;top:0px;';
            document.body.insertBefore(canvas, document.body.firstChild);
            // $.getScript('static/resource.js?v=' + MyData.version, function () {
            let pm = new PixiMain(canvas);
            YR.Mediator.getInstance().add('Main_2DLoaded', () => {
                console.log('OnlyPixi模式开始');
                pm.pixiStart();
            });
            // });
        }
        else if (MyData.mode == '3d') {
            let canvas = document.createElement('canvas');
            canvas.style.cssText = 'z-index:99;position:absolute;left:0px;top:0px;';
            document.body.insertBefore(canvas, document.body.firstChild);
            let three = new ThreeMain(canvas);
            YR.Mediator.getInstance().add('Main_3DLoaded', () => {
                console.log('Three模式开始');
                three.init();
            });
        }
        else {
            // $.getScript('static/resource.js?v=' + MyData.version, function () {

            let canvas = document.createElement('canvas');
            canvas.style.cssText = 'z-index:99;position:absolute;left:0px;top:0px;';

            let div3 = document.createElement('div');
            div3.id = "div_3d";
            div3.style.cssText = 'z-index:2;position:absolute;left:0px;top:0px;';
            document.body.appendChild(div3);

            let pm = new PixiMain(canvas);
            let three = new ThreeMain();
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



new MyData();
//如果没有提供微信jssdk逻辑，就用这个
// new WeChat();
new Main();
// let a=new YRShader();
// console.log(a)
import * as YR from './YR'
import axios from 'axios';

export default class MyData {
    constructor() {
        axios.defaults.baseURL = window.baseurl;
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        axios.defaults.withCredentials = true
        MyData.axios = axios;
        MyData.resource = null;
        MyData.stageW = 750;
        MyData.stageH = 1450;
        MyData.stage = null;
        MyData.scale = 0;
        MyData.offsetX = 0;
        MyData.offsetY = 0;
        //2d,3d,都不是就是2d+3d
        MyData.mode = '2d';
        //竖屏：ver ；横屏hor
        MyData.direct = "ver";
        MyData.threeProgress = 0;
        //微信昵称
        MyData.wx_openid = null;
        MyData.wx_nickname = null;
        MyData.wx_sex = null;
        MyData.wx_headimgurl = null;
        MyData.version = __webpack_hash__;

        // MyData.factory = dragonBones.PixiFactory.factory;
        window.mydata=MyData;
    }
}

var bool_auido = false;
if (bool_auido) {
    let audio = document.createElement('audio');
    audio.setAttribute('id', 'sound_bg');
    audio.setAttribute('src', 'static/medias/bg.mp3');
    audio.setAttribute('autoplay', 'autoplay');
    audio.setAttribute('preload', 'preload');
    audio.setAttribute('loop', 'loop');
    window.audio_bg = document.getElementById('sound_bg');
    if (window.WeixinJSBridge) {
        WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
            // domotion();
            playMusic();
        }, false);
    } else {
        document.addEventListener("WeixinJSBridgeReady", function () {
            WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
                // domotion();
                playMusic();
            });
        }, false);
    }
    function playMusic() {
        if (window.audio_bg) {
            window.audio_bg.play();
        }
    }
}

var browser = {
    versions: function () {
        var u = navigator.userAgent,
            app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
            weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
            qq: u.match(/\sQQ/i) == " qq" //是否QQ
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
}
console.log('当前UA：',browser.versions);
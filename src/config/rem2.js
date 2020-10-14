(function(doc, win) {
    var myfontsize;
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            

            // console.log('window~!!',window.isPC);
            let _width=1920;
            // if(!window.isPC)
            // {
            //     _width=375
            //     if(clientWidth<0)
            //     {
            //         clientWidth=0;
            //     }
            // }
            // else
            // {
            //     if(clientWidth<1500)
            //     {
            //         clientWidth=1500;
            //     }
            // }
            

            window.myfontsize=100 * (clientWidth / _width);
            if(window.myfontsize>60)
            {
                window.myfontsize=60;
            }
            else if(window.myfontsize<40)
            {
                window.myfontsize=40;
            }
            
            window.scale = (window.innerHeight / 750 < window.innerWidth /750) ? (window.innerWidth / 1450)*window.devicePixelRatio : (window.innerHeight / 1450)*window.devicePixelRatio;
            // console.log(window.scale);
            docEl.style.fontSize = parseInt(window.myfontsize+1) + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
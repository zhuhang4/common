!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("GLPerf",[],t):"object"==typeof exports?exports.GLPerf=t():e.GLPerf=t()}(window,function(){return function(e){var t={};function r(o){if(t[o])return t[o].exports;var n=t[o]={i:o,l:!1,exports:{}};return e[o].call(n.exports,n,n.exports,r),n.l=!0,n.exports}return r.m=e,r.c=t,r.d=function(e,t,o){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(o,n,function(t){return e[t]}.bind(null,n));return o},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=2)}([function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o="text-shadow: -1px -1px hsl(0,100%,50%), 1px 1px hsl(5.4, 100%, 50%), 3px 2px hsl(10.8, 100%, 50%), 5px 3px hsl(16.2, 100%, 50%), 7px 4px hsl(21.6, 100%, 50%), 9px 5px hsl(27, 100%, 50%), 11px 6px hsl(32.4, 100%, 50%), 13px 7px hsl(37.8, 100%, 50%), 14px 8px hsl(43.2, 100%, 50%), 16px 9px hsl(48.6, 100%, 50%), 18px 10px; font-size: 40px; color: #ffffff;";t.colorLog=function(e){console.log("%c"+e,o)},t.log=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];console.log.apply(console,["🚀 [GLPerf]"].concat(e))},t.errorLog=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];console.error.apply(console,["🚀 [GLPerf]"].concat(e))}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=r(3),n=r(4),s=r(5),i=r(0),a=function(){function e(e){this.samplingFrames=60,this.samplingIndex=0;try{this.gl=e.getContext("webgl"),this.gl&&i.colorLog("Good Boy Play WebGL")}catch(e){i.errorLog("Can't get WebGL context.")}this.gl&&this.hook(this.gl)}return e.prototype.hook=function(e){this.drawCallHook=new o.default(e),this.textureHook=new n.default(e),this.shaderHook=new s.default(e)},e.prototype.reset=function(){this.drawCallHook&&this.drawCallHook.reset()},e.prototype.release=function(){this.drawCallHook&&this.drawCallHook.release(),this.textureHook&&this.textureHook.release(),this.shaderHook&&this.shaderHook.release()},e.prototype.update=function(){var e=performance.now(),t=e-this.now;if(this.now=e,this.samplingIndex!==this.samplingFrames)return this.reset(),void this.samplingIndex++;this.samplingIndex=0;var r={fps:t?Math.min(60,1e3/t>>0):0,memory:performance.memory&&performance.memory.usedJSHeapSize/1048576>>0,drawCall:this.drawCallHook.drawCall,triangles:this.drawCallHook.triangles,lines:this.drawCallHook.lines,points:this.drawCallHook.points,textures:this.textureHook.textures,shaders:this.shaderHook.shaders};return this.reset(),r},e}();t.default=a},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=r(1);t.Core=o.default;var n=r(6);t.Monitor=n.default},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=r(0),n=function(){function e(e){this.drawCall=0,this.triangles=0,this.lines=0,this.points=0,this.realDrawElements=e.drawElements,this.realDrawArrays=e.drawArrays,e.drawElements=this.hookedDrawElements.bind(this),e.drawArrays=this.hookedDrawArrays.bind(this),this.hooked=!0,this.gl=e,o.log("DrawCall is hooked.")}return e.prototype.hookedDrawElements=function(e,t,r,o){this.realDrawElements.call(this.gl,e,t,r,o),this.update(t,e)},e.prototype.hookedDrawArrays=function(e,t,r){this.realDrawArrays.call(this.gl,e,t,r),this.update(r,e)},e.prototype.update=function(e,t){var r=this.gl;switch(this.drawCall++,t){case r.TRIANGLES:this.triangles+=e/3;break;case r.TRIANGLE_STRIP:case r.TRIANGLE_FAN:this.triangles+=e-2;break;case r.LINES:this.lines+=e/2;break;case r.LINE_STRIP:this.lines+=e-1;break;case r.LINE_LOOP:this.lines+=e;break;case r.POINTS:this.points+=e;break;default:o.errorLog("Unknown draw mode: "+t)}},e.prototype.reset=function(){this.drawCall=0,this.triangles=0,this.lines=0,this.points=0},e.prototype.release=function(){this.hooked&&(this.gl.drawElements=this.realDrawElements,this.gl.drawArrays=this.realDrawArrays),this.hooked=!1},e}();t.default=n},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=r(0),n=function(){function e(e){this.textures=0,this.realCreateTexture=e.createTexture,this.realDeleteTexture=e.deleteTexture,e.createTexture=this.hookedCreateTexture.bind(this),e.deleteTexture=this.hookedDeleteTexture.bind(this),this.hooked=!0,this.gl=e,o.log("Texture is hooked.")}return e.prototype.hookedCreateTexture=function(){var e=this.realCreateTexture.call(this.gl);return this.textures++,o.log("CreateTexture:",e,"textures: "+this.textures),e},e.prototype.hookedDeleteTexture=function(e){this.realDeleteTexture.call(this.gl,e),this.textures--,o.log("DeleteTexture. textures: "+this.textures)},e.prototype.reset=function(){this.textures=0},e.prototype.release=function(){this.hooked&&(this.gl.createTexture=this.realCreateTexture,this.gl.deleteTexture=this.realDeleteTexture),this.hooked=!1},e}();t.default=n},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=r(0),n=function(){function e(e){this.shaders=0,this.realAttachShader=e.attachShader,this.realDetachShader=e.detachShader,e.attachShader=this.hookedAttachShader.bind(this),e.detachShader=this.hookedDetachShader.bind(this),this.hooked=!0,this.gl=e,o.log("Shader is hooked.")}return e.prototype.hookedAttachShader=function(e,t){this.realAttachShader.call(this.gl,e,t),this.shaders++,o.log("AttachShader:",t,"shaders: "+this.shaders)},e.prototype.hookedDetachShader=function(e,t){this.realDetachShader.call(this.gl,e,t),this.shaders--,o.log("DetachShader. shaders: "+this.shaders)},e.prototype.reset=function(){this.shaders=0},e.prototype.release=function(){this.hooked&&(this.gl.attachShader=this.realAttachShader,this.gl.detachShader=this.realDetachShader),this.hooked=!1},e}();t.default=n},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=r(1),n=function(){function e(e){this.core=new o.default(e),this.items=[],this.items=["fps","memory","drawCall","triangles","textures","shaders"],this.createContainer(),this.update=this.update.bind(this)}return e.prototype.createContainer=function(){var e=document.createElement("div");e.classList.add("gl-perf"),e.innerHTML='\n  <dl>\n    <dt>FPS</dt>\n    <dd>0</dd>\n    <dt>Memory <span class="unit">(MB)</span></dt>\n    <dd>0</dd>\n    <dt>DrawCall</dt>\n    <dd>0</dd>\n    <dt>Triangles</dt>\n    <dd>0</dd>\n    <dt>Textures</dt>\n    <dd>0</dd>\n    <dt>Shaders</dt>\n    <dd>0</dd>\n  </dl>\n',e.appendChild(this.createStyle()),document.body.appendChild(e),this.doms=Array.prototype.slice.apply(e.querySelectorAll("dd")),this.container=e},e.prototype.createStyle=function(){var e=document.createElement("style");return e.type="text/css",e.appendChild(document.createTextNode("\n  .gl-perf {\n    pointer-events: none;\n    user-select: none;\n    position: fixed;\n    top: 0;\n    left: 0;\n    padding: "+20/7.5+"vw "+20/7.5+"vw 0 "+20/7.5+"vw;\n    background: rgba(0, 0, 0, 0.3);\n    color: #fff;\n    font: "+20/7.5+"vw arial;\n  }\n\n  .gl-perf dl,\n  .gl-perf dt,\n  .gl-perf dd {\n    padding: 0;\n    margin: 0;\n  }\n\n  .gl-perf dt {\n    color: orange;\n  }\n\n  .gl-perf dt .unit{\n    font-size: 2vw;\n  }\n\n  .gl-perf dd {\n    font-size: "+40/7.5+"vw;\n    padding: "+10/7.5+"vw 0 "+20/7.5+"vw;\n  }\n")),e},e.prototype.update=function(){var e=this.core.update();if(e)for(var t=function(t,o){var n=r.doms[t],s=r.items[t],i=e[s]||0;requestAnimationFrame(function(){n.innerText=i})},r=this,o=0,n=this.items.length;o<n;o++)t(o)},e.prototype.reset=function(){this.core.reset()},e.prototype.release=function(){this.core.release()},e.prototype.destroy=function(){this.release(),document.body.removeChild(this.container)},e}();t.default=n}])});
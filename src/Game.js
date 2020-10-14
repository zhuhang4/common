import Page0 from './pages/Page0.js';
import * as YR from './YR';
import MyData from './MyData';
import MyVideo from './MyVideo.js';
import PageShader from './PageShader.js';
import { Tool, EasyMath } from './YRUtils';
import PageEdit from './PageEdit.js';
export default class Game extends PIXI.Container {
  constructor() {
    super();

    if (document.title == 'edit') {
      this.editInit();
    }
    else {
      this.pageInit();
    }
    // this.input=YR.Easy.CreateInput('请输入...',10,{left:150,top:50,width:300,height:50,color:"#fff"});
    // this.input.show();
    // this.addShader();
  }
  async pageInit() {
    for (let i in window.resource) {
      //import如果传入得是变量，则会在编译时遍历该文件所在路径的全部文件（所以建立pages文件夹单独存放Page）
      let key = "p" + i.replace(/^Page/g, '');
      let module = await import(`./pages/${i}.js`);
      let _class = module.default.prototype.constructor;
      this[key] = new _class();
    }

    if (this.p0) {
      this.addChild(this.p0);
      this.p0.In();
    }
    // console.log(EasyMath.range(300, [100, 600], [0, 200]));
  }

  async editInit() {
    let arr=[];
    for (let i in window.resource) {
      //import如果传入得是变量，则会在编译时遍历该文件所在路径的全部文件（所以建立pages文件夹单独存放Page）
      let key = "p" + i.replace(/^Page/g, '');
      let module = await import(`./pages/${i}.js`);
      let _class = module.default.prototype.constructor;
      this[key] = new _class();
      let titleName=i;
      //text:resource.json的key，target->构建的页面，resourceJson->resource.json的值
      arr.push({resourceJsonKey:titleName,resourceJsonValue:window.resource[i],targetName:key,target:this[key]})
    }
    arr.sort((a,b)=>
    {
      return a.resourceJsonKey.localeCompare(b.resourceJsonKey)
    })
    this.ep=new PageEdit();
    this.ep.init(arr)
    this.addChild(this.ep);
    YR.Mediator.getInstance().fire('Vue_EditUpdate',{data:arr})

  }

  addShader() {
    this.pshader = new PageShader();
    this.addChild(this.pshader);

  }
  downHandler(e) {
    console.log(e)
  }
  longPress() {
    // console.log('长按啊啊啊啊啊啊啊啊啊啊啊')
  }
  init() {

    /* 粒子 */
    // this.pd=new YR.MyParticle();
    // this.addChild(this.pd.emitterContainer);

    /* 滚动容器 */
    // let arr_sc=[];
    // this.p0=new Page0();
    // this.p1=new Page0();
    // this.addChild(this.p0);
    // this.addChild(this.p1);
    // arr_sc.push(this.p0,this.p1);

    // let sc_con=new PIXI.Container();
    // this.addChild(sc_con);
    // let sc=new YR.Scroller(sc_con,844,1496,'ver','AA',arr_sc);

    // YR.Mediator.getInstance().add('AA_ScrollStart',(e)=>
    // {
    //     sc.arrPage[e.idx].Out()
    // });
    // YR.Mediator.getInstance().add('AA_ScrollComplete',(e)=>
    // {
    //     sc.arrPage[e.idx].In()
    // });
    // YR.Mediator.getInstance().add('Game_SCStart',(e)=>
    // {
    //     sc_con.interactive=true;
    // });
    // YR.Mediator.getInstance().add('Game_SCStop',(e)=>
    // {
    //     sc_con.interactive=false;
    // });

    // if(sc.dir=='ver')
    // {
    //     for(var i=0;i<arr_sc.length;i++)
    //     {
    //         sc_con.addChild(arr_sc[i]);
    //         arr_sc[i].y=MyData.stageH*i;
    //     }
    // }
    // else
    // {
    //     for(var i=0;i<arr_sc.length;i++)
    //     {
    //         sc_con.addChild(arr_sc[i]);
    //         arr_sc[i].x=MyData.stageW*i;
    //     }
    // }

    /* 长拉页 */
    // let sclong_con=new PIXI.Container();
    // let _mask=new PIXI.Graphics();

    /* 竖版逻辑 */
    // _mask.beginFill(0xff0000,1);
    // _mask.drawRect(0,0,844,1400);
    // let scLong=new YR.ScrollLong(sclong_con,'ver',844,1496,_mask);
    // for(var i=0;i<5;i++)
    // {
    //     var p=new Page0();
    //     p.y=1496*i;
    //     sclong_con.addChild(p);
    // }
    // this.addChild(sclong_con);
    // this.addChild(_mask);

    /* 横版逻辑 */
    // _mask.beginFill(0xff0000,1);
    // _mask.drawRect(0,0,844,1400);
    // let scLong=new YR.ScrollLong(sclong_con,'hor',844,1496,_mask);
    // for(var i=0;i<5;i++)
    // {
    //     var p=new Page0();
    //     p.x=844*i;
    //     sclong_con.addChild(p);
    // }
    // this.addChild(sclong_con);
    // this.addChild(_mask);
  }
  resize() {
    console.log('game:resize');
  }
}
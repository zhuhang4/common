import * as YR from "../YR";
import MyData from '../MyData';
import {Tool} from '../YRUtils';
export default class Page0 extends PIXI.Container{
    constructor()
    {
        super();
        this.name="Page0";
        this.con=new PIXI.Container();
        this.gp=YR.Easy.CreateJSONGroup(window.resource["Page0"],this.con);
        this.addChild(this.con);

        YR.Easy.BType(this.gp.p0_a0,Tool.debounce(()=>
        {
           console.log('doSomthing')
        },1000));
        YR.Easy.BType(this.gp.p0_a1,()=>
        {
            console.log('Page1_DoSomething');
        });

    
    }
    
    In()
    {
        
    }

    Out()
    {

    }

    resize()
    {

    }
}
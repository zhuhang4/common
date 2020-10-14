import * as YR from "../YR";
import MyData from '../MyData';

export default class Page1 extends PIXI.Container{
    constructor()
    {
        super();
        this.name="Page1";
        this.con=new PIXI.Container();
        this.gp=YR.Easy.CreateJSONGroup(window.resource["Page1"],this.con);
        this.addChild(this.con);

        YR.Easy.BType(this.gp.p1_a0,()=>
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
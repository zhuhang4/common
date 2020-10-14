import * as YR from "../YR";
import MyData from '../MyData';

export default class Page2 extends PIXI.Container{
    constructor()
    {
        super();
        this.name="Page2";
        this.con=new PIXI.Container();
        this.gp=YR.Easy.CreateJSONGroup(window.resource["Page2"],this.con);
        this.addChild(this.con);
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
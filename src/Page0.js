import * as YR from "./YR";
import MyData from './MyData';

export default class Page0 extends PIXI.Container{
    constructor()
    {
        super();
        this.name="Page0";
        this.con=new PIXI.Container();
        this.gp=YR.Easy.CreateJSONGroup(window.resource["Page0"],this.con);
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
import { Vector2D, SAT } from './YRUtils';

let v = new Vector2D(10, 20);
v = v.perpendicular();
console.log(v);


var shape0 = {
    points: [
        new Vector2D(0, 0),
        new Vector2D(100, 0),
        new Vector2D(100, 100),
        new Vector2D(0, 100),
    ]
}
var shape1 = {
    points: [
        new Vector2D(200, 0),
        new Vector2D(400, 0),
        new Vector2D(400, 100),
        new Vector2D(200, 100),
        
    ]
}

SAT.prototype.collidesWith(shape0, shape1);

// console.log(new Vector2D(2,2).normalize());
// let sat=new SAT();

// console.log(SAT.prototype.getAxes(shape0));
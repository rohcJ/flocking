import Resizable from "./resizable.js"

export default class Agent extends Resizable{

    constructor(_x, _y, _angle, _ID){

        super();

        this.ID = _ID;

        //mathematical attributes
        this.x = _x;
        this.y = _y;
        this.angle = _angle;
        this.previousAngle = _angle;
        this.targetHeading;

        //visual attributes 
        this.scale = 25; //~length in pixels
        this.colour = `rgba(${Math.random()*40 + 150}, ${Math.random()*20 + 41}, ${Math.random()*40 + 150})`;

        //behavioural attributes
        this.speed = 0.1;
        this.avoidanceRadius = 10; //px
        this.smoothing = 400;

        this.cohesionWeight = 0.1;
        this.alignmentWeight = 0.1;
        this.avoidanceWeight = 0.1;

    }

    cohesion(neighbours, dt){

        let totalX = 0, totalY = 0, i = 0, x, y;

        neighbours.forEach(neighbour => {
            totalX += neighbour.x;
            totalY += neighbour.y;
            i++;
        });

        x = totalX/i, y = totalY/i; //average coods of neighbours 
        let dy = y - this.y;
        let dx = x - this.x;
        //let distance = Math.sqrt(dy*dy + dx*dx);
        //this.speed = distance/600 - 0.01;
        //console.log(x,y);

        let sign = (dx) / Math.abs(dx); // flips the orientation when agent is to the right of the target (allowing arctan to have a range of 2pi)
        this.targetHeading = Math.atan(dy/dx) + Math.PI * (1.5 + sign/2) ;//Math.atan(dy/dx) * sign; //angle of average location from this agent

        this.angle += this.calculateDirection(this.angle, this.targetHeading) / 25;

        //console.log(Math.round((this.angle - this.targetHeading) * 100) / 100);

    }

    calculateDirection(input, target){ //input direction, target direction (radians), outputs the quickest direction 

        if(input - Math.PI == target){return 1;} //target and input are exactly opposite
    
        else if(input != target){
    
            //sets all variables between 0 and 2PI
            let c = (input + Math.PI * 10000000) % (2 * Math.PI); //modulo operator doesnt behave how i want when the input is negative, so it needs a large positive offset
            let cBar = (c + Math.PI) % (2 * Math.PI); //c + pi radians
            let t = target % (2 * Math.PI);
    
            let condition1 = c - cBar; //is c bigger than cBar? (has value + if true and - if false)
            let condition2 = t - cBar; //is t bigger than cBar? 
            let condition3 = t - c; //is t bigger than c? 
    
            let output = condition1 * condition2 * condition3;
    
            //conditions all get multiplied at the end to produce the fastest direction to get from input to target (1 being clockwise, -1 being anti-clockwise)
            return output / Math.abs(output); 
    
        }else{return 0;} //no turning needed
    }

    alignment(neighbours, dt){

        

    }

    avoidance(neighbours, dt){

        

    }

    move(dt){
        
        this.x += dt * Math.cos(this.angle) * this.speed;
        this.y += dt * Math.sin(this.angle) * this.speed;

    }

    draw(ctx){

        //triangle pointing in their direction
        ctx.fillStyle = this.colour;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.scale * Math.cos(this.angle - (7 * Math.PI / 8)) + this.x, this.scale * Math.sin(this.angle - (7 * Math.PI / 8)) + this.y);
        ctx.lineTo(this.scale * Math.cos(this.angle + (7 * Math.PI / 8)) + this.x, this.scale * Math.sin(this.angle + (7 * Math.PI / 8)) + this.y);
        ctx.fill();

        /* debug
        //target direction
        ctx.strokeStyle = "#bb5555";
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + (30 * Math.cos(this.targetHeading)), this.y + (30 * Math.sin(this.targetHeading)));
        ctx.lineWidth = 5;
        ctx.stroke();

        ctx.strokeStyle = "#55bb55";
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + (20 * Math.cos(this.angle)), this.y + (20 * Math.sin(this.angle)));
        ctx.lineWidth = 2.5;
        ctx.stroke();*/

    }

}
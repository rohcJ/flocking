import Flock from "./flock.js";

var canvas = document.getElementById("canvas"); 
var ctx = canvas.getContext("2d"); 
window.addEventListener('resize', resizeCanvas, false);

let dt, previousT;
let flock = new Flock();

resizeCanvas();

function resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    flock.resize(canvas.width, canvas.height);
    flock.members.forEach(agent => agent.resize(canvas.width, canvas.height));
}

flock.populate(5); //instantiates agents

flock.draw(ctx);

let frameID = 0;

function mainLoop(timestamp){

    dt = timestamp - previousT;
    previousT = timestamp;

    ctx.fillStyle = "#2C2F33";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if(dt && frameID < 3){
        flock.update(dt);
        flock.draw(ctx);
    }

    frameID++;

    requestAnimationFrame(mainLoop);
}

mainLoop();
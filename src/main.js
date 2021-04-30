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

flock.populate(500); //instantiates agents
flock.members.forEach(agent => agent.resize(canvas.width, canvas.height));

flock.draw(ctx);

function mainLoop(timestamp){

    dt = timestamp - previousT;
    previousT = timestamp;

    ctx.fillStyle = "#2C2F33";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if(dt){
        flock.update(dt);
        flock.draw(ctx);
    }

    requestAnimationFrame(mainLoop);
}

mainLoop();
import Resizable from "./resizable.js";
import Agent from "./agent.js";

export default class Flock extends Resizable{

    constructor(){

        super(); //initialises parent attributes and methods

        this.members = [];
        this.radius = 30; //px

    }

    populate(count){ //creates count agents

        for(let i = 0; i < count; i++){
            this.members.push(new Agent(Math.random() * this.width, Math.random() * this.height, Math.random() * Math.PI * 2, i));
        }

    }

    update(dt){

        let tempArray;

        let distanceCollection = [];
        let distance, distances = [], dx, dy;

        for(let i = 0; i < this.members.length-1; i++){
            for(let j = i+1; j < this.members.length; j++){
                //console.log(`comparing ${this.members[j].ID} to ${this.members[i].ID}`);
                dx = this.members[j].x - this.members[i].x;
                dy = this.members[j].y - this.members[i].y;
                distance = Math.sqrt(dx * dx, dy * dy);
                if(distance <= this.radius){distances.push(this.members[j]);}
            }
            distanceCollection.push(distances); //adds array to 2d array 
            distances = [];
        }

        console.log(distanceCollection);

        this.members.forEach((agent, index) => {

            tempArray = this.members.slice(); //copy array
            tempArray.splice(index, 1); //remove the agent being updated
            //console.log(`ID ${index}`);
            agent.cohesion(tempArray, dt);
            agent.move(dt);

        });

    }

    draw(ctx){

        this.members.forEach(agent => agent.draw(ctx));

    }

}
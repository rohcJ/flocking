export default class Resizable{ //parent that contains a method to let all children know the size of the canvas

    constructor(){ 
        this.width;
        this.height;
    }

    resize(_width, _height){
        this.width = _width;
        this.height = _height;
    }

}
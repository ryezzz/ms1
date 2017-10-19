var input;
var ritaString;

function setup() {
    noCanvas();
    input = createInput();
    input.changed(rita);
}

function rita(event) {
    
    
    
    console.log('changed');
    
    ritaString = riString();
    

    
}
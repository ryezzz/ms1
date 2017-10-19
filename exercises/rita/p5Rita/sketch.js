var input;
var ritaString;

function setup() {
    noCanvas();
    input = createInput();
    input.changed(rita); //reference p5
    content = createElement('div')
    content.id('content');
}

function rita(event) {
    //look at full event first to see where input is located
    var string = event.target.value;
    
    /// Takes even and makes rita string out of it
    ritaString = RiString(string);
    
    var words = ritaString.words();
    
    console.log (words);
    
    words.forEach(function(element){
    var features = RiString(element).features();
    console.log(features);
    
    var span = createElement('span', features.text);
    console.log(features);
    
    var span = createElement('span', features.text);
    
    if (features.pos === 'nn')
        span.style('background', 'purple');
        
    span.parent(content);
    
    
    });
}
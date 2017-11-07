

        //     var newObj = new Object();
testData = ["1","2"]

var svg = d3.select("body")
          .append("svg")
          .attr("width", window.innerWidth)
          .attr("height", window.innerHeight);
          
// Set the ranges
// var x = d3.time.scale().range([0, width]);
var y = d3.scaleLinear().range([window.innerHeight, 0]);

// Define the axes
// var xAxis = d3.svg.axis().scale(x)
//     .orient("bottom").ticks(5);

// var yAxis = d3.svg.axis().scale(y)
//     .orient("left").ticks(5);
    
    

d3.csv('/project-3/data/wiidthreessa.csv', function(error, data) {
    
    
    // Ghana
    // var ghana = data.filter(ghanaFilter);

    function ghanaFilter(data) { return data.Country === "Ghana";}
    function burkinaFilter(data) { return data.Countrycode3 === "BFA";}
     function tanzaniaFilter(data) { return data.Country === "Tanzania"; }
                
        
                var GhanaPoints = svg.selectAll("circle")
                              .data(data.filter(ghanaFilter))
                              .enter()
                              .append("circle")
                              .attr("cx", function(d){
                                return(d.Year*1*.3 + 50);
                                })
                              .attr("cy", function(d){
                                return(d.Gini*1*5);
                                })
                              .attr("r", 5);

                d3.selectAll("circle")
                              .append("text")
                              .text( function (d) { return (d.country) });


        
  }); 

        
  